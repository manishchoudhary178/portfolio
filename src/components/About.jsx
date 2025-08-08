import Tilt from 'react-parallax-tilt';
import { motion } from 'framer-motion';

import { styles } from '../styles';
import { services } from '../constants';
import { SectionWrapper } from '../hoc';
import { fadeIn, textVariant } from '../utils/motion';

const ServiceCard = ({ index, title, icon }) => (
  <Tilt tiltMaxAngleX={25} tiltMaxAngleY={25} scale={1.05} transitionSpeed={450} className='w-full xs:w-[250px]'>
    {/* <motion.div
      variants={fadeIn("right", "spring", index * 0.3, 0.75)}
      className="w-full bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 p-[2px] rounded-[20px] shadow-lg  hover:shadow-[0_0_20px_white] transition-all duration-300"
    >
      <div className="bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col">
        <img src={icon} alt={title} className="w-16 h-16 object-contain" />
        <h3 className="text-white text-[20px] font-bold text-center">
          {title}
        </h3>
      </div>
    </motion.div> */}

    <motion.div
      variants={fadeIn('right', 'spring', index * 0.3, 0.75)}
      className='w-full rounded-[20px] bg-gradient-to-r from-[#9333EA] via-[#7C3AED] to-[#A855F7] p-[2px] shadow-lg transition-all duration-300 hover:shadow-[0_0_20px_#9333EA]'
    >
      <div className='flex min-h-[280px] flex-col items-center justify-evenly rounded-[20px] bg-[#0f0f1a] py-5 px-12'>
        <img src={icon} alt={title} className='h-16 w-16 object-contain' />
        <h3 className='text-center text-[20px] font-bold text-white'>{title}</h3>
      </div>
    </motion.div>
  </Tilt>
);

const About = () => {
  return (
    <div>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Introduction</p>
        <h2 className={styles.sectionHeadText}>Overview</h2>
      </motion.div>

      <motion.p variants={fadeIn('', '', 0.1, 1)} className='mt-4 max-w-3xl text-[17px] leading-[30px] text-secondary'>
        I'm a motivated software developer with internship experience in building real-world web applications using
        React, Next.js, and Tailwind CSS. I enjoy turning ideas into scalable and user-friendly products, and I'm always
        eager to learn and grow in a collaborative environment.
      </motion.p>

      <div className='mt-20 flex flex-wrap justify-center gap-10 lg:justify-between'>
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>
    </div>
  );
};

export default SectionWrapper(About, 'about');
