// src/utils/resumeSearch.js
import Fuse from 'fuse.js';

/**
 * Build a flattened searchable document list from your resume JSON.
 * Each document is { id, type, title, content, [link] } to help Fuse find
 * granular facts (name parts, contacts, each skill/project/experience).
 */
function buildDocuments(resume = {}) {
  const docs = [];

  // name / name parts
  if (resume.name) docs.push({ id: 'name.full', type: 'name', title: 'Full name', content: String(resume.name) });
  if (resume.firstName)
    docs.push({ id: 'name.first', type: 'name', title: 'First name', content: String(resume.firstName) });
  if (resume.lastName)
    docs.push({ id: 'name.last', type: 'name', title: 'Last name', content: String(resume.lastName) });

  // contact fields (email, github, website, phone, location, etc.)
  if (resume.contact && typeof resume.contact === 'object') {
    Object.entries(resume.contact).forEach(([k, v]) => {
      if (v !== undefined && v !== null && String(v).trim() !== '') {
        docs.push({ id: `contact.${k}`, type: 'contact', title: k, content: String(v) });
      }
    });
  }

  // skills (each skill is searchable)
  (resume.skills || []).forEach((s, i) => {
    docs.push({ id: `skill-${i}`, type: 'skill', title: s, content: s });
  });

  // experience entries
  (resume.experience || []).forEach((e, i) => {
    const title = `${e.role || ''}${e.company ? ` @ ${e.company}` : ''}`.trim() || `Experience ${i + 1}`;
    const contentParts = [e.description || '', (e.technologies || []).join(', '), e.start || '', e.end || ''].filter(
      Boolean
    );
    docs.push({ id: `exp-${i}`, type: 'experience', title, content: contentParts.join(' ') });
  });

  // projects
  (resume.projects || []).forEach((p, i) => {
    const contentParts = [p.description || '', (p.technologies || []).join(', '), p.link || ''].filter(Boolean);
    docs.push({
      id: `proj-${i}`,
      type: 'project',
      title: p.name || `Project ${i + 1}`,
      content: contentParts.join(' '),
      link: p.link || null,
    });
  });

  // education
  (resume.education || []).forEach((ed, i) => {
    const title = `${ed.degree || ''} ${ed.institution ? `— ${ed.institution}` : ''}`.trim() || `Education ${i + 1}`;
    docs.push({ id: `edu-${i}`, type: 'education', title, content: ed.year || '' });
  });

  // summary
  if (resume.summary) docs.push({ id: 'summary', type: 'summary', title: 'Summary', content: String(resume.summary) });

  return docs;
}

/** small helpers */
function normalize(q = '') {
  return q.toString().trim().toLowerCase();
}
function shorten(s = '', n = 160) {
  if (!s) return '';
  return s.length > n ? s.slice(0, n - 1) + '…' : s;
}

/**
 * createResumeSearcher(resume) -> returns an `ask(query)` function
 * Usage: const ask = createResumeSearcher(resume); const { answer, sources } = ask("what is your surname?");
 */
export function createResumeSearcher(resume = {}) {
  const documents = buildDocuments(resume);
  const fuse = new Fuse(documents, {
    keys: ['title', 'content'],
    includeScore: true,
    threshold: 0.45, // tweak for stricter/looser matches
  });

  // helpers for direct facts (avoids fuzzy fallback for common fields)
  function getSurname() {
    if (resume.lastName) return resume.lastName;
    if (resume.name) {
      const parts = resume.name.trim().split(/\s+/);
      if (parts.length > 1) return parts[parts.length - 1];
    }
    return null;
  }
  function getFirstName() {
    if (resume.firstName) return resume.firstName;
    if (resume.name) {
      const parts = resume.name.trim().split(/\s+/);
      if (parts.length > 0) return parts[0];
    }
    return null;
  }

  // high-priority intent detection and direct answers
  function tryDirectAnswer(q) {
    // surname / last name
    if (/\b(surname|last name|family name)\b/.test(q)) {
      const s = getSurname();
      if (s)
        return { answer: `His surname is ${s}.`, sources: [{ id: 'name.last', type: 'name', title: 'Last name' }] };
      if (resume.name)
        return {
          answer: `No separate surname field — full name is: ${resume.name}. I assume the surname is the last token, which would be "${resume.name.trim().split(/\s+/).slice(-1)[0]}".`,
          sources: [{ id: 'name.full', type: 'name', title: 'Full name' }],
        };
      return null;
    }

    // first name / given name
    if (/\b(first name|given name)\b/.test(q)) {
      const f = getFirstName();
      if (f)
        return {
          answer: `His first name is ${f}.`,
          sources: [{ id: 'name.first', type: 'name', title: 'First name' }],
        };
      if (resume.name)
        return {
          answer: `I couldn't find a separate first-name field — full name is: ${resume.name}. The likely first name is "${resume.name.trim().split(/\s+/)[0]}".`,
          sources: [{ id: 'name.full', type: 'name', title: 'Full name' }],
        };
      return null;
    }

    // full name / who is he?
    if (/\b(who is|what is his name|what is your name|what is the name)\b/.test(q)) {
      if (resume.name)
        return {
          answer: `His name is ${resume.name}.`,
          sources: [{ id: 'name.full', type: 'name', title: 'Full name' }],
        };
      const f = getFirstName();
      if (f) return { answer: `First name: ${f}.`, sources: [] };
      return null;
    }

    // skills
    if (/\b(skill|skills|technolog|stack|framework|language)\b/.test(q)) {
      if (resume.skills && resume.skills.length) {
        return {
          answer: `Key skills: ${resume.skills.join(', ')}.`,
          sources: [{ id: 'skills', type: 'skills', title: 'Skills' }],
        };
      }
      return { answer: `No skills listed in the resume.`, sources: [] };
    }

    // how many projects / number of projects
    if (/\b(how many|number of|count).*(project|projects)\b/.test(q)) {
      const cnt = (resume.projects || []).length;
      return {
        answer: `He has ${cnt} project${cnt === 1 ? '' : 's'} listed.`,
        sources: [{ id: 'projects', type: 'projects', title: 'Projects' }],
      };
    }

    // list projects
    if (/\b(project|projects|portfolio|work)\b/.test(q) && /\b(show|list|tell|what|which)\b/.test(q)) {
      if (resume.projects && resume.projects.length) {
        const parts = resume.projects.map(
          (p) => `${p.name}${p.description ? ` — ${shorten(p.description, 160)}` : ''}`
        );
        return {
          answer: `Projects:\n${parts.join('\n• ')}`,
          sources: resume.projects.map((p, i) => ({ id: `proj-${i}`, type: 'project', title: p.name })),
        };
      }
      return { answer: 'No projects listed yet.', sources: [] };
    }

    // work experience — companies or roles
    if (/\b(experience|worked|company|role|job|worked at|employed)\b/.test(q)) {
      if (resume.experience && resume.experience.length) {
        const parts = resume.experience.map(
          (e) =>
            `${e.role || 'Role'} @ ${e.company || 'Company'}${e.start ? ` (${e.start}${e.end ? ` - ${e.end}` : ''})` : ''}${e.description ? ` — ${shorten(e.description)}` : ''}`
        );
        return {
          answer: `Experience:\n${parts.join('\n\n')}`,
          sources: resume.experience.map((e, i) => ({
            id: `exp-${i}`,
            type: 'experience',
            title: `${e.role || ''} @ ${e.company || ''}`,
          })),
        };
      }
      return { answer: 'No experience entries found.', sources: [] };
    }

    // contact lookups: email, github, website, phone
    if (/\b(email|e-mail|gmail|contact)\b/.test(q)) {
      if (resume.contact && resume.contact.email)
        return {
          answer: `Email: ${resume.contact.email}`,
          sources: [{ id: 'contact.email', type: 'contact', title: 'email' }],
        };
    }
    if (/\b(github|git hub)\b/.test(q)) {
      if (resume.contact && resume.contact.github)
        return {
          answer: `GitHub: ${resume.contact.github}`,
          sources: [{ id: 'contact.github', type: 'contact', title: 'github' }],
        };
    }
    if (/\b(phone|mobile|contact number|whatsapp)\b/.test(q)) {
      if (resume.contact && resume.contact.phone)
        return {
          answer: `Phone: ${resume.contact.phone}`,
          sources: [{ id: 'contact.phone', type: 'contact', title: 'phone' }],
        };
    }
    if (/\b(website|site|portfolio)\b/.test(q)) {
      if (resume.contact && (resume.contact.website || resume.website))
        return {
          answer: `Website: ${resume.contact.website || resume.website}`,
          sources: [{ id: 'contact.website', type: 'contact', title: 'website' }],
        };
    }

    // education
    if (/\b(education|degree|university|college|school)\b/.test(q)) {
      if (resume.education && resume.education.length) {
        const parts = resume.education.map(
          (ed) => `${ed.degree || ''} — ${ed.institution || ''} ${ed.year ? `(${ed.year})` : ''}`
        );
        return {
          answer: `Education:\n${parts.join('\n')}`,
          sources: resume.education.map((ed, i) => ({
            id: `edu-${i}`,
            type: 'education',
            title: ed.institution || ed.degree,
          })),
        };
      }
      return { answer: 'No education listed.', sources: [] };
    }

    // fallback: nothing matched as a direct intent
    return null;
  }

  // Primary ask() function returned to caller
  function ask(rawQuery, opts = { maxResults: 3 }) {
    const q = normalize(rawQuery || '');
    if (!q) return { answer: 'Please ask a question about the resume.', sources: [] };

    // Try direct high-confidence answers first
    const direct = tryDirectAnswer(q);
    if (direct) return direct;

    // Fuzzy search fallback
    const fuseRes = fuse.search(rawQuery).slice(0, opts.maxResults);
    if (!fuseRes || fuseRes.length === 0) {
      return {
        answer:
          "I couldn't find anything in the resume that matches your question. Try asking about skills, projects, experience or contact info.",
        sources: [],
      };
    }

    // Compose summary answer from the top matches
    const summaryParts = fuseRes.map((r) => {
      const item = r.item;
      const title = item.title || item.type || 'item';
      const content = shorten(item.content || '');
      return `• ${title}: ${content}${item.link ? ` (link: ${item.link})` : ''}`;
    });

    return {
      answer: `I found these relevant items:\n${summaryParts.join('\n')}\n\nAsk me to show full details of any item.`,
      sources: fuseRes.map((r) => ({ id: r.item.id, type: r.item.type, title: r.item.title })),
    };
  }

  // return the ask function
  return ask;
}
