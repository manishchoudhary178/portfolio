export default function SectionHeading({ index, label, align = 'left' }) {
  return (
    <div className={`mb-10 flex items-baseline gap-4 ${align === 'center' ? 'justify-center' : ''}`}>
      {index ? <span className='meta text-accent'>{index}</span> : null}
      <p className='meta'>{label}</p>
    </div>
  );
}
