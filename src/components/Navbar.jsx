import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { styles } from '../styles';
import { navLinks } from '../constants';
import { logo, menu, close } from '../assets';

const Navbar = () => {
  const [active, setActive] = useState('');
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`${styles.paddingX} fixed top-0 z-20 flex w-full items-center py-5 ${
        scrolled ? 'bg-[#0f0f0f]/70 shadow-lg backdrop-blur-lg' : 'bg-transparent'
      }`}
    >
      <div className='mx-auto flex w-full max-w-7xl items-center justify-between'>
        <Link
          to='/'
          className='flex items-center gap-2'
          onClick={() => {
            setActive('');
            window.scrollTo(0, 0);
          }}
        >
          <div className='h-9 w-9 object-contain text-4xl'>
            <spam className='text-red-800'>M</spam>anish
          </div>
        </Link>

        <ul className='hidden list-none flex-row gap-10 sm:flex'>
          {navLinks.map((nav) => (
            <li
              key={nav.id}
              className={`font-poppins cursor-pointer text-[18px] font-semibold ${
                active === nav.title ? 'text-white' : 'text-gray-400'
              } transition-colors duration-200 hover:text-white`}
              onClick={() => {
                setToggle(false);
                setActive(nav.title);
              }}
            >
              <a href={`#${nav.id}`}>{nav.title}</a>
            </li>
          ))}
        </ul>

        {/* <div className='sm:hidden flex flex-1 justify-end items-center'>
          <img
            src={toggle ? close : menu}
            alt='menu'
            className='w-[28px] h-[28px] object-contain'
            onClick={() => setToggle(!toggle)}
          />

          <div
            className={`${
              !toggle ? "hidden" : "flex"
            } p-6 black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl`}
          >
            <ul className='list-none flex justify-end items-start flex-1 flex-col gap-4'>
              {navLinks.map((nav) => (
                <li
                  key={nav.id}
                  className={`font-poppins font-medium cursor-pointer text-[16px] ${
                    active === nav.title ? "text-white" : "text-secondary"
                  }`}
                  onClick={() => {
                    setToggle(!toggle);
                    setActive(nav.title);
                  }}
                >
                  <a href={`#${nav.id}`}>{nav.title}</a>
                </li>
              ))}
            </ul>
          </div>
        </div> */}

        <div className='flex flex-1 items-center justify-end sm:hidden'>
          <img
            src={toggle ? close : menu}
            alt='menu'
            className='h-[28px] w-[28px] object-contain'
            onClick={() => setToggle(!toggle)}
          />

          <div
            className={`fixed top-0 right-0 z-30 h-screen w-1/2 transform bg-[#0f0f0f]/70 shadow-lg backdrop-blur-lg ${
              toggle ? 'translate-x-0' : 'translate-x-full'
            } rounded-l-2xl transition-transform duration-300 ease-in-out`}
          >
            <div className='flex justify-end p-5'>
              <img src={close} alt='close' className='h-6 w-6 cursor-pointer' onClick={() => setToggle(false)} />
            </div>

            <ul className='mt-10 flex list-none flex-col items-start gap-6 p-6'>
              {navLinks.map((nav) => (
                <li
                  key={nav.id}
                  className={`font-poppins cursor-pointer text-[18px] font-semibold ${
                    active === nav.title ? 'text-white' : 'text-gray-400'
                  } transition-colors duration-200 hover:text-white`}
                  onClick={() => {
                    setToggle(false);
                    setActive(nav.title);
                  }}
                >
                  <a href={`#${nav.id}`}>{nav.title}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
