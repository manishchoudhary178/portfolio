import Tilt from 'react-parallax-tilt';
import { motion } from 'framer-motion';

import { SectionWrapper } from '../hoc';
import { technologies } from '../constants';

// Animation variant for the container
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

// Animation variant for each icon
const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.8 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 120,
      damping: 10,
    },
  },
};

const Tech = () => {
  return (
    <motion.div
      className='flex flex-row flex-wrap justify-center gap-10'
      variants={containerVariants}
      initial='hidden'
      whileInView='show'
      viewport={{ once: true, amount: 0.3 }}
    >
      {technologies.map((tech, index) => (
        <motion.div key={tech.name} variants={itemVariants}>
          <Tilt
            glareEnable={true}
            glareMaxOpacity={0.2}
            glareColor='#ffffff'
            glarePosition='all'
            scale={1.05}
            transitionSpeed={450}
            className='flex h-28 w-28 items-center justify-center rounded-xl bg-white/5 shadow-md transition-all duration-300 hover:shadow-[0_0_20px_white]'
          >
            <img src={tech.icon} alt={tech.name} className='h-12 w-12 object-contain' />
          </Tilt>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default SectionWrapper(Tech, '');
