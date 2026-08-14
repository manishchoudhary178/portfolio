import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import emailjs from '@emailjs/browser';
import { site } from '../../data';
import { gsap } from '../../lib/gsap';
import { usePrefersReducedMotion } from '../../hooks/useMedia';
import SplitWords from '../ui/SplitWords';
import MagneticButton from '../ui/MagneticButton';

const initial = { name: '', email: '', message: '' };

export default function Contact() {
  const rootRef = useRef(null);
  const formRef = useRef(null);
  const [form, setForm] = useState(initial);
  const [status, setStatus] = useState({ type: 'idle', message: '' });
  const [loading, setLoading] = useState(false);
  const reduced = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (reduced) return;
      gsap.from('.finale-line .split-word > span', {
        yPercent: 110,
        rotate: 5,
        stagger: 0.06,
        ease: 'none',
        transformOrigin: '0% 100%',
        scrollTrigger: {
          trigger: rootRef.current,
          start: 'top 80%',
          end: 'top 28%',
          scrub: 0.55,
        },
      });
    },
    { scope: rootRef, dependencies: [reduced] }
  );

  const onChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    setStatus({ type: 'idle', message: '' });

    emailjs
      .send(
        import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          to_name: site.name,
          from_email: form.email,
          to_email: site.email,
          message: form.message,
        },
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
      )
      .then(() => {
        setLoading(false);
        setForm(initial);
        setStatus({ type: 'ok', message: 'Message sent. I will get back to you soon.' });
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
        setStatus({ type: 'err', message: 'Something went wrong. Please email me directly.' });
      });
  };

  return (
    <section id='contact' ref={rootRef} data-theme='dark' className='relative overflow-hidden bg-bg py-24 md:py-32'>
      <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_80%_120%,rgba(200,245,74,0.12),transparent_50%)]' />
      <div className='container-site relative'>
        <p className='meta mb-8'>
          <span className='text-accent'>07</span> — Contact
        </p>
        <h2 className='font-display text-display font-extrabold'>
          <span className='finale-line line-mask block'>
            <SplitWords text="LET'S MAKE" />
          </span>
          <span className='finale-line line-mask block'>
            <SplitWords text='SOMETHING' />
          </span>
          <span className='finale-line line-mask block font-serif text-[0.86em] font-normal italic'>
            <SplitWords text='worth using.' accent />
          </span>
        </h2>

        <div className='mt-12 grid items-start gap-16 lg:grid-cols-[0.9fr_1.1fr]'>
          <div>
            <p className='max-w-md text-lg text-mute'>
              Open to frontend roles and product work that needs a careful interface.
            </p>
            <div className='mt-8 flex flex-wrap gap-x-8 gap-y-3 text-sm'>
              <a href={`mailto:${site.email}`} data-cursor='link' className='underline-anim'>
                {site.email}
              </a>
              <a href={site.github} target='_blank' rel='noreferrer' data-cursor='link' className='underline-anim'>
                GitHub
              </a>
              {site.linkedin ? (
                <a href={site.linkedin} target='_blank' rel='noreferrer' data-cursor='link' className='underline-anim'>
                  LinkedIn
                </a>
              ) : null}
              {site.resumeUrl ? (
                <a href={site.resumeUrl} target='_blank' rel='noreferrer' data-cursor='link' className='underline-anim'>
                  Resume
                </a>
              ) : null}
            </div>
            <MagneticButton href={`mailto:${site.email}`} className='mt-10'>
              Start a conversation
              <span className='transition-transform duration-300 group-hover:translate-x-1' aria-hidden='true'>
                →
              </span>
            </MagneticButton>
          </div>

          <form
            ref={formRef}
            onSubmit={onSubmit}
            autoComplete='on'
            className='rounded-[1.6rem] border border-line bg-[#121212] p-6 md:p-8 [color-scheme:dark]'
          >
            <p className='mb-6 text-sm text-mute'>Write a short note — I read everything.</p>
            <label className='block' htmlFor='contact-name'>
              <span className='meta'>Name</span>
              <input
                required
                id='contact-name'
                name='name'
                value={form.name}
                onChange={onChange}
                autoComplete='name'
                placeholder='Your name'
                className='contact-field mt-2 w-full rounded-xl border border-line px-4 py-3.5 text-ink outline-none transition-[border-color,box-shadow] focus:border-accent'
              />
            </label>
            <label className='mt-5 block' htmlFor='contact-email'>
              <span className='meta'>Email</span>
              <input
                required
                id='contact-email'
                type='email'
                name='email'
                value={form.email}
                onChange={onChange}
                autoComplete='email'
                placeholder='you@email.com'
                className='contact-field mt-2 w-full rounded-xl border border-line px-4 py-3.5 text-ink outline-none transition-[border-color,box-shadow] focus:border-accent'
              />
            </label>
            <label className='mt-5 block' htmlFor='contact-message'>
              <span className='meta'>Message</span>
              <textarea
                required
                id='contact-message'
                name='message'
                rows={5}
                value={form.message}
                onChange={onChange}
                placeholder='What are you building?'
                className='contact-field mt-2 w-full resize-none rounded-xl border border-line px-4 py-3.5 text-ink outline-none transition-[border-color,box-shadow] focus:border-accent'
              />
            </label>
            <button
              type='submit'
              disabled={loading}
              data-cursor='button'
              className='mt-7 inline-flex items-center rounded-full bg-ink px-6 py-3 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-bg transition-colors hover:bg-accent hover:text-accent-ink disabled:opacity-60'
            >
              {loading ? 'Sending...' : 'Send message'}
            </button>
            {status.message ? (
              <p className={`mt-4 text-sm ${status.type === 'err' ? 'text-red-400' : 'text-accent'}`} role='status'>
                {status.message}
              </p>
            ) : null}
          </form>
        </div>
      </div>
    </section>
  );
}
