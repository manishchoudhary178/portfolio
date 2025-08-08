import React from 'react';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import { motion } from 'framer-motion';

import 'react-vertical-timeline-component/style.min.css';

import { styles } from '../styles';
import { experiences } from '../constants';
import { SectionWrapper } from '../hoc';
import { textVariant } from '../utils/motion';

const ExperienceCard = ({ experience }) => {
  return (
    <VerticalTimelineElement
      contentStyle={{
        background: '#1d1836',
        color: '#fff',
      }}
      contentArrowStyle={{ borderRight: '7px solid  #232631' }}
      date={experience.date}
      iconStyle={{
        background: experience.iconBg,
        padding: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      icon={
        <div className='flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-white'>
          <img src={experience.icon} alt={experience.company_name} className='h-[80%] w-[80%] object-contain' />
        </div>
      }
    >
      <div>
        <h3 className='text-[20px] font-bold text-white sm:text-[24px]'>{experience.title}</h3>
        <p className='text-[14px] font-semibold text-secondary sm:text-[16px]' style={{ margin: 0 }}>
          {experience.company_name}
        </p>
      </div>
      <ul className='mt-5 ml-5 list-disc space-y-2'>
        {experience.points.map((point, index) => (
          <li
            key={`experience-point-${index}`}
            className='pl-1 text-[13px] tracking-wider text-white-100 sm:text-[14px]'
          >
            {point}
          </li>
        ))}
      </ul>
    </VerticalTimelineElement>
  );
};

const Experience = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} text-center`}>What I have done so far</p>
        <h2 className={`${styles.sectionHeadText} text-center`}>Work Experience</h2>
      </motion.div>

      <div className='mt-20 flex flex-col'>
        <VerticalTimeline>
          {experiences.map((experience, index) => (
            <ExperienceCard key={`experience-${index}`} experience={experience} />
          ))}
        </VerticalTimeline>
      </div>
    </>
  );
};

export default SectionWrapper(Experience, 'work');
