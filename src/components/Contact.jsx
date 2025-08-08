import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';

import { styles } from '../styles';
import { EarthCanvas } from './canvas';
import { SectionWrapper } from '../hoc';
import { slideIn } from '../utils/motion';

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { target } = e;
    const { name, value } = target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .send(
        import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          to_name: 'Manish Choudhary',
          from_email: form.email,
          to_email: 'manishchoudhary799961@gmail.com',
          message: form.message,
        },
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          setLoading(false);
          alert('Thank you. I will get back to you as soon as possible.');

          setForm({
            name: '',
            email: '',
            message: '',
          });
        },
        (error) => {
          setLoading(false);
          console.error(error);

          alert('Ahh, something went wrong. Please try again.');
        }
      );
  };

  return (
    <div className={`flex flex-col-reverse gap-10 overflow-hidden xl:mt-12 xl:flex-row`}>
      <motion.div variants={slideIn('left', 'tween', 0.2, 1)} className='flex-[0.75] rounded-2xl bg-black-100 p-8'>
        <p className={styles.sectionSubText}>Get in touch</p>
        <h3 className={styles.sectionHeadText}>Contact.</h3>

        <form ref={formRef} onSubmit={handleSubmit} className='mt-12 flex flex-col gap-8'>
          <label className='flex flex-col'>
            <span className='mb-4 font-medium text-white'>Your Name</span>
            <input
              type='text'
              name='name'
              value={form.name}
              onChange={handleChange}
              placeholder="What's your good name?"
              className='rounded-lg border-none bg-tertiary py-4 px-6 font-medium text-white outline-none placeholder:text-secondary'
            />
          </label>
          <label className='flex flex-col'>
            <span className='mb-4 font-medium text-white'>Your email</span>
            <input
              type='email'
              name='email'
              value={form.email}
              onChange={handleChange}
              placeholder="What's your web address?"
              className='rounded-lg border-none bg-tertiary py-4 px-6 font-medium text-white outline-none placeholder:text-secondary'
            />
          </label>
          <label className='flex flex-col'>
            <span className='mb-4 font-medium text-white'>Your Message</span>
            <textarea
              rows={7}
              name='message'
              value={form.message}
              onChange={handleChange}
              placeholder='What you want to say?'
              className='rounded-lg border-none bg-tertiary py-4 px-6 font-medium text-white outline-none placeholder:text-secondary'
            />
          </label>

          <button
            type='submit'
            className='w-fit rounded-xl bg-tertiary py-3 px-8 font-bold text-white shadow-md shadow-primary outline-none transition-all duration-300 hover:shadow-[0_0_20px_white]'
          >
            {loading ? 'Sending...' : 'Send'}
          </button>
        </form>
      </motion.div>

      <motion.div variants={slideIn('right', 'tween', 0.2, 1)} className='h-[350px] md:h-[550px] xl:h-auto xl:flex-1'>
        <EarthCanvas />
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, 'contact');
