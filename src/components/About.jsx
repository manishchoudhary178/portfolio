
import Tilt from "react-parallax-tilt";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

import { styles } from "../styles";
import { services } from "../constants";
import { SectionWrapper } from "../hoc";

const ServiceCard = ({ title, icon }) => (
  <Tilt
    tiltMaxAngleX={30}
    tiltMaxAngleY={30}
    scale={1.05}
    transitionSpeed={400}
    className="w-[250px]"
  >
    <div className="rounded-[20px] bg-gradient-to-r from-[#9333EA] via-[#7C3AED] to-[#A855F7] p-[2px] shadow-lg hover:shadow-[0_0_20px_#9333EA]">
      <div className="flex min-h-[200px] flex-col items-center justify-evenly rounded-[20px] bg-[#0f0f1a] p-5">
        <img src={icon} alt={title} className="h-14 w-14 object-contain" />
        <h3 className="text-center text-[18px] font-bold text-white">
          {title}
        </h3>
      </div>
    </div>
  </Tilt>
);

const About = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-change every 3s
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % services.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative flex flex-col">
      {/* Text Section (LEFT aligned) */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-left"
      >
        <p className={styles.sectionSubText}>Introduction</p>
        <h2 className={styles.sectionHeadText}>Overview</h2>
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mt-4 max-w-3xl text-[17px] leading-[30px] text-secondary text-left"
      >
        I'm a motivated software developer with internship experience in
        building real-world web applications using React, Next.js, and Tailwind
        CSS. I enjoy turning ideas into scalable and user-friendly products, and
        I'm always eager to learn and grow in a collaborative environment.
      </motion.p>

      {/* Centered Card Section */}
      <div className="mt-16 flex w-full justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={services[currentIndex].title}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.8 }}
            className="relative z-10"
          >
            <ServiceCard {...services[currentIndex]} />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SectionWrapper(About, "about");
