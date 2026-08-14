export default function SplitWords({ text, accent = false, className = '' }) {
  return text.split(' ').map((word, index) => (
    <span key={`${word}-${index}`} className='split-word inline-block overflow-hidden align-bottom'>
      <span
        className={`inline-block pr-[0.22em] will-change-transform ${accent ? 'accent-live' : ''} ${className}`}
      >
        {word}
      </span>
    </span>
  ));
}
