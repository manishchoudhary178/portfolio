import { lazy, Suspense, useCallback, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import SmoothScroll from './components/providers/SmoothScroll';
import CustomCursor from './components/cursor/CustomCursor';
import ScrollProgress from './components/ui/ScrollProgress';
import Preloader from './components/preloader/Preloader';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import Intro from './components/sections/Intro';
import Work from './components/sections/Work';
import Experience from './components/sections/Experience';
import Skills from './components/sections/Skills';
import Craft from './components/sections/Craft';
import CodeToUi from './components/sections/CodeToUi';
import About from './components/sections/About';
import Contact from './components/sections/Contact';

const Chatbot = lazy(() => import('./components/Chatbot'));

export default function App() {
  const [booted, setBooted] = useState(false);
  const finish = useCallback(() => setBooted(true), []);

  return (
    <BrowserRouter>
      <SmoothScroll>
        {!booted ? <Preloader onComplete={finish} /> : null}
        <ScrollProgress />
        <CustomCursor />
        <div className='noise' aria-hidden='true' />
        <Navbar />
        <main>
          <Hero />
          <Intro />
          <Work />
          <Experience />
          <Skills />
          <Craft />
          <CodeToUi />
          <About />
          <Contact />
        </main>
        <Footer />
        <Suspense fallback={null}>
          <Chatbot />
        </Suspense>
      </SmoothScroll>
    </BrowserRouter>
  );
}
