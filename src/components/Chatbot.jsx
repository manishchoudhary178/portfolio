// src/components/Chatbot.jsx
import React, { useEffect, useRef, useState } from 'react';
import resume from '../data/resume.json';
import { createResumeSearcher } from '../utils/resumeSearch';
import { FiMessageSquare, FiSend, FiX } from 'react-icons/fi';

const searcher = createResumeSearcher(resume);

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { id: 0, sender: 'bot', text: `Hi — I'm a resume helper. Ask about skills, projects, experience or contact info.` },
  ]);
  const containerRef = useRef(null);

  useEffect(() => {
    // auto scroll to bottom
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages, open]);

  function pushMessage(sender, text, meta = {}) {
    setMessages((prev) => [...prev, { id: prev.length + 1, sender, text, ...meta }]);
  }

  function handleSend(q) {
    const query = q?.trim();
    if (!query) return;
    pushMessage('user', query);
    setInput('');

    // Synchronously search & produce an answer
    // const { answer, sources } = searcher.ask(query);
    const { answer, sources } = searcher(query);
    pushMessage('bot', answer, { sources });
  }

  const quickQuestions = [
    'What are your skills?',
    'Tell me about your projects',
    "What's your experience?",
    'Show contact info',
    'Give me a short summary',
  ];

  return (
    <>
      {/* Floating button */}
      <button
        aria-label='Open chat'
        onClick={() => setOpen(true)}
        className='fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg'
      >
        <FiMessageSquare size={20} />
      </button>

      {/* Modal */}
      {open && (
        <div className='fixed inset-0 z-50 flex justify-end'>
          {/* backdrop */}
          <div className='absolute inset-0 bg-black/40' onClick={() => setOpen(false)} />

          <div className='relative flex h-full w-[35%] flex-col overflow-hidden bg-gray-900 text-white shadow-2xl'>
            <div className='flex items-center justify-between border-b border-gray-700 px-4 py-2'>
              <div className='flex items-center gap-3'>
                <div className='flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white'>M</div>
                <div>
                  <div className='font-medium'>Manish — Resume Chatbot</div>
                  <div className='text-xs text-gray-400'>Ask me about skills, projects or experience</div>
                </div>
              </div>
              <button onClick={() => setOpen(false)} className='p-2 text-gray-400 hover:text-white'>
                <FiX />
              </button>
            </div>

            {/* messages */}
            <div ref={containerRef} className='flex-1 space-y-3 overflow-auto px-4 py-3'>
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[80%] rounded-lg p-3 shadow-sm ${
                      msg.sender === 'user' ? 'bg-blue-600 text-white' : 'border border-gray-700 bg-gray-800 text-white'
                    }`}
                  >
                    <div className='whitespace-pre-wrap'>{msg.text}</div>
                    {msg.sources && msg.sources.length > 0 && (
                      <div className='mt-2 text-xs text-gray-300'>
                        Sources: {msg.sources.map((s) => s.title || s.type).join(' • ')}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* quick chips & input - UPDATED SECTION */}
            <div className='border-t border-gray-700 bg-gray-900 px-3 py-2'>
              <div className='flex gap-2 overflow-x-auto pb-2'>
                {quickQuestions.map((q) => (
                  <button
                    key={q}
                    onClick={() => handleSend(q)}
                    className='whitespace-nowrap rounded-full border border-gray-600 bg-gray-800 px-4 py-2 text-sm text-gray-300 transition-colors duration-200 hover:bg-gray-700'
                  >
                    {q}
                  </button>
                ))}
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend(input);
                }}
                className='mt-2 flex gap-2'
              >
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder='Ask about skills, projects, experience...'
                  className='flex-1 rounded-lg border border-gray-600 bg-gray-800 px-3 py-2 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500'
                />
                <button
                  type='submit'
                  className='flex items-center justify-center rounded-lg bg-blue-600 px-3 py-2 text-white hover:bg-blue-700'
                >
                  <FiSend />
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
