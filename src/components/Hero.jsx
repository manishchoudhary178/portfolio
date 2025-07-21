import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { styles } from "../styles";

const codeDescription = ` Front-End Developer - Manish Choudhary
. Specializing in building clean, scalable, and responsive web applications
. Skilled in React, Next.js, TypeScript, Tailwind CSS, PostgreSQL, and Git
. Developed enterprise dashboards, authentication systems, and real-time interfaces
. Passionate about UI/UX and performance optimization
`;

const Hero = () => {
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (index < codeDescription.length) {
        setDisplayedText((prev) => prev + codeDescription[index]);
        setIndex((prev) => prev + 1);
      } else {
        setTimeout(() => {
          setDisplayedText("");
          setIndex(0);
        }, 2000);
      }
    }, 30);

    return () => clearTimeout(timeout);
  }, [index]);

  return (
    <section className="relative flex items-center justify-center w-full h-screen mx-auto overflow-hidden">
      <div
        className={` inset-0 top-[120px] max-w-7xl mx-auto ${styles.paddingX} flex flex-col md:flex-row items-start gap-8`}
      >
        <div className="flex flex-col md:flex-1">
          <div className="flex flex-row gap-5 items-start">
            <div className="flex flex-col justify-center items-center mt-5">
              <div className="w-5 h-5 rounded-full bg-[#915EFF]" />
              <div className="w-1 sm:h-80 h-40 violet-gradient" />
            </div>

            <div>
              <h1 className={`${styles.heroHeadText} text-white`}>
                Hi, I'm <span className="text-[#915EFF]">Manish</span>
              </h1>
              <p className={`${styles.heroSubText} mt-2 text-white-100`}>
                I develop <br className="sm:block hidden" />
                user interfaces and web applications
              </p>
            </div>
          </div>
        </div>

        {/* Code Box */}
        <div className="relative md:flex-1 w-full max-w-md h-60 bg-[#0a0a0a]/50 backdrop-blur-md rounded-xl border border-purple-500 p-4 shadow-md overflow-hidden animate-borderRotate">
          <div className="absolute inset-0 rounded-xl border-2 border-transparent animate-borderGradient pointer-events-none z-0" />
          <div className="relative z-10 font-mono text-white text-sm leading-relaxed whitespace-pre-wrap h-full">
            {displayedText}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
