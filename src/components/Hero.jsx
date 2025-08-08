import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { styles } from '../styles';

const codeDescription = ` Front-End Developer - Manish Choudhary
. Specializing in building clean, scalable, and responsive web applications
. Skilled in React, Next.js, TypeScript, Tailwind CSS, PostgreSQL, and Git
. Developed enterprise dashboards, authentication systems, and real-time interfaces
. Passionate about UI/UX and performance optimization
`;

const Hero = () => {
  const [displayedText, setDisplayedText] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (index < codeDescription.length) {
        setDisplayedText((prev) => prev + codeDescription[index]);
        setIndex((prev) => prev + 1);
      } else {
        setTimeout(() => {
          setDisplayedText('');
          setIndex(0);
        }, 2000);
      }
    }, 30);

    return () => clearTimeout(timeout);
  }, [index]);

  return (
    <section className='relative mx-auto flex h-screen w-full items-center justify-center overflow-hidden'>
      <div
        className={`inset-0 top-[120px] mx-auto max-w-7xl ${styles.paddingX} flex flex-col items-start gap-8 md:flex-row`}
      >
        <div className='flex flex-col md:flex-1'>
          <div className='flex flex-row items-start gap-5'>
            <div className='mt-5 flex flex-col items-center justify-center'>
              <div className='h-5 w-5 rounded-full bg-[#915EFF]' />
              <div className='violet-gradient h-40 w-1 sm:h-80' />
            </div>

            <div>
              <h1 className={`${styles.heroHeadText} text-white`}>
                Hi, I'm <span className='text-[#915EFF]'>Manish</span>
              </h1>
              <p className={`${styles.heroSubText} mt-2 text-white-100`}>
                I develop <br className='hidden sm:block' />
                user interfaces and web applications
              </p>
            </div>
          </div>
        </div>

        {/* Code Box */}
        <div className='animate-borderRotate relative h-60 w-full max-w-md overflow-hidden rounded-xl border border-purple-500 bg-[#0a0a0a]/50 p-4 shadow-md backdrop-blur-md md:flex-1'>
          <div className='animate-borderGradient pointer-events-none absolute inset-0 z-0 rounded-xl border-2 border-transparent' />
          <div className='relative z-10 h-full whitespace-pre-wrap font-mono text-sm leading-relaxed text-white'>
            {displayedText}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
