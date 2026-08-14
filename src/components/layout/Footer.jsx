import { site } from '../../data';
import { useLenis } from '../providers/SmoothScroll';

export default function Footer() {
  const lenis = useLenis();
  const year = new Date().getFullYear();

  const toTop = () => {
    if (lenis) lenis.scrollTo(0, { duration: 1.6, easing: (t) => 1 - Math.pow(1 - t, 4) });
    else window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer data-theme='dark' className='border-t border-line bg-bg py-10'>
      <div className='container-site flex flex-col gap-10 md:flex-row md:items-end md:justify-between'>
        <div>
          <p className='font-display text-2xl font-semibold tracking-tight'>{site.name}</p>
          <p className='mt-1 text-sm text-mute'>{site.title}</p>
        </div>
        <div className='flex flex-wrap gap-x-6 gap-y-2 text-sm text-mute'>
          <a href={site.github} target='_blank' rel='noreferrer' data-cursor='link' className='underline-anim'>
            GitHub
          </a>
          {site.linkedin ? (
            <a href={site.linkedin} target='_blank' rel='noreferrer' data-cursor='link' className='underline-anim'>
              LinkedIn
            </a>
          ) : null}
          <a href={`mailto:${site.email}`} data-cursor='link' className='underline-anim'>
            Email
          </a>
          {site.resumeUrl ? (
            <a href={site.resumeUrl} target='_blank' rel='noreferrer' data-cursor='link' className='underline-anim'>
              Resume
            </a>
          ) : null}
        </div>
        <button
          type='button'
          onClick={toTop}
          data-cursor='button'
          className='group text-left'
        >
          <span className='block font-display text-3xl leading-none transition-transform duration-500 group-hover:-translate-y-1'>
            ↑
          </span>
          <span className='meta mt-2 block'>Back to top</span>
        </button>
      </div>
      <p className='container-site mt-10 text-xs text-faint'>
        © {year} {site.name}
      </p>
    </footer>
  );
}
