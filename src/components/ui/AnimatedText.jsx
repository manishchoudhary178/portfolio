export default function AnimatedText({ lines, as: Comp = 'h2', className = '' }) {
  return (
    <Comp className={className}>
      {lines.map((line) => (
        <span key={line} className='line-mask block'>
          <span className='block'>{line}</span>
        </span>
      ))}
    </Comp>
  );
}
