import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FiMessageSquare, FiSend, FiX } from 'react-icons/fi';
import resume from '../data/resume.json';
import { createResumeSearcher } from '../utils/resumeSearch';

const searcher = createResumeSearcher(resume);

const quickQuestions = [
  'What are your skills?',
  'Tell me about your projects',
  "What's your experience?",
  'Show contact info',
];

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 0,
      sender: 'bot',
      text: "Hi. I'm a resume helper. Ask about skills, projects, experience or contact info.",
    },
  ]);
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages, open]);

  const pushMessage = (sender, text, meta = {}) => {
    setMessages((prev) => [...prev, { id: prev.length + 1, sender, text, ...meta }]);
  };

  const handleSend = (query) => {
    const next = query?.trim();
    if (!next) return;
    pushMessage('user', next);
    setInput('');
    const { answer, sources } = searcher(next);
    pushMessage('bot', answer, { sources });
  };

  return (
    <>
      <button
        type='button'
        aria-label='Open resume chat'
        onClick={() => setOpen(true)}
        data-cursor='button'
        className='fixed bottom-5 right-5 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-line bg-surface text-ink shadow-lg transition-colors hover:bg-accent hover:text-accent-ink'
      >
        <FiMessageSquare size={18} />
      </button>

      <AnimatePresence>
        {open ? (
          <div className='fixed inset-0 z-50 flex justify-end'>
            <button
              type='button'
              aria-label='Close chat overlay'
              className='absolute inset-0 bg-black/50'
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ x: 32, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 32, opacity: 0 }}
              transition={{ duration: 0.28, ease: 'easeOut' }}
              className='relative flex h-full w-full flex-col border-l border-line bg-bg text-ink sm:w-[420px]'
              role='dialog'
              aria-label='Resume chatbot'
            >
              <div className='flex items-center justify-between border-b border-line px-4 py-3'>
                <div>
                  <p className='text-sm font-medium'>Manish | Resume chatbot</p>
                  <p className='text-xs text-mute'>Ask about skills, projects, or experience</p>
                </div>
                <button type='button' onClick={() => setOpen(false)} className='p-2 text-mute hover:text-ink' aria-label='Close chat'>
                  <FiX />
                </button>
              </div>

              <div ref={containerRef} className='flex-1 space-y-3 overflow-auto px-4 py-4'>
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div
                      className={`max-w-[82%] rounded-2xl px-3 py-2 text-sm leading-relaxed ${
                        msg.sender === 'user' ? 'bg-accent text-accent-ink' : 'border border-line bg-surface'
                      }`}
                    >
                      <p className='whitespace-pre-wrap'>{msg.text}</p>
                      {msg.sources?.length ? (
                        <p className='mt-2 text-[11px] opacity-70'>
                          Sources: {msg.sources.map((source) => source.title || source.type).join(' • ')}
                        </p>
                      ) : null}
                    </div>
                  </div>
                ))}
              </div>

              <div className='border-t border-line px-3 py-3'>
                <div className='mb-2 flex gap-2 overflow-x-auto pb-1'>
                  {quickQuestions.map((question) => (
                    <button
                      key={question}
                      type='button'
                      onClick={() => handleSend(question)}
                      className='whitespace-nowrap rounded-full border border-line px-3 py-1.5 text-xs text-mute hover:text-ink'
                    >
                      {question}
                    </button>
                  ))}
                </div>
                <form
                  onSubmit={(event) => {
                    event.preventDefault();
                    handleSend(input);
                  }}
                  className='flex gap-2'
                >
                  <input
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                    placeholder='Ask about skills, projects, experience...'
                    className='flex-1 rounded-full border border-line bg-surface px-4 py-2 text-sm text-ink outline-none placeholder:text-faint focus:border-accent'
                  />
                  <button
                    type='submit'
                    aria-label='Send message'
                    className='flex h-10 w-10 items-center justify-center rounded-full bg-ink text-bg'
                  >
                    <FiSend size={14} />
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
