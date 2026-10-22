import { lazy, Suspense, useCallback, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SmoothScroll from './components/providers/SmoothScroll';
import ScrollProgress from './components/ui/ScrollProgress';
import Preloader from './components/preloader/Preloader';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import DeferredSection from './components/layout/DeferredSection';

const CustomCursor = lazy(() => import('./components/cursor/CustomCursor'));
const Intro = lazy(() => import('./components/sections/Intro'));
const Work = lazy(() => import('./components/sections/Work'));
const Experience = lazy(() => import('./components/sections/Experience'));
const Skills = lazy(() => import('./components/sections/Skills'));
const Craft = lazy(() => import('./components/sections/Craft'));
const CodeToUi = lazy(() => import('./components/sections/CodeToUi'));
const About = lazy(() => import('./components/sections/About'));
const Contact = lazy(() => import('./components/sections/Contact'));
const Chatbot = lazy(() => import('./components/Chatbot'));
const AnimatedPortfolio = lazy(() => import('./pages/AnimatedPortfolio'));

const VISITED_KEY = 'portfolio-visited';

function MainSite() {
  const [booted, setBooted] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.sessionStorage.getItem(VISITED_KEY) === '1';
  });
  const [showChatbot, setShowChatbot] = useState(false);

  const finish = useCallback(() => {
    setBooted(true);
    try {
      window.sessionStorage.setItem(VISITED_KEY, '1');
    } catch {
      /* private mode / quota */
    }
  }, []);

  useEffect(() => {
    if (showChatbot) return undefined;
    const idle = window.requestIdleCallback
      ? window.requestIdleCallback(() => setShowChatbot(true), { timeout: 4000 })
      : window.setTimeout(() => setShowChatbot(true), 2500);
    return () => {
      if (window.requestIdleCallback) window.cancelIdleCallback(idle);
      else window.clearTimeout(idle);
    };
  }, [showChatbot]);

  return (
    <SmoothScroll>
      {!booted ? <Preloader onComplete={finish} /> : null}
      <ScrollProgress />
      <Suspense fallback={null}>
        <CustomCursor />
      </Suspense>
      <div className='noise' aria-hidden='true' />
      <Navbar />
      <main>
        <Hero />
        <DeferredSection minHeight='40vh'>
          <Intro />
        </DeferredSection>
        <DeferredSection minHeight='60vh'>
          <Work />
        </DeferredSection>
        <DeferredSection minHeight='70vh'>
          <Experience />
        </DeferredSection>
        <DeferredSection minHeight='50vh'>
          <Skills />
        </DeferredSection>
        <DeferredSection minHeight='50vh'>
          <Craft />
        </DeferredSection>
        <DeferredSection minHeight='55vh'>
          <CodeToUi />
        </DeferredSection>
        <DeferredSection minHeight='45vh'>
          <About />
        </DeferredSection>
        <DeferredSection minHeight='55vh'>
          <Contact />
        </DeferredSection>
      </main>
      <Footer />
      {showChatbot ? (
        <Suspense fallback={null}>
          <Chatbot />
        </Suspense>
      ) : null}
    </SmoothScroll>
  );
}

function Loader() {
  return (
    <div className='fixed inset-0 z-50 grid place-items-center bg-[#050505]'>
      <div className='text-center'>
        <div className='mx-auto h-8 w-8 animate-spin rounded-full border-2 border-[#c8f54a] border-t-transparent' />
        <p className='mt-4 font-display text-xs uppercase tracking-[0.3em] text-white/40'>Loading 3D</p>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainSite />} />
        <Route
          path='/3d'
          element={
            <Suspense fallback={<Loader />}>
              <AnimatedPortfolio />
            </Suspense>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
