export default function FlexButton({ href, text, onClick, className }) {
  return (
    <>
      {href && !onClick && (
        <div>
          <a href={href} className={`text-button ${className}`}>
            {text}
          </a>
        </div>
      )}

      {!href && onClick && (
        <span className={`text-button ${className}`} onClick={onClick}>
          {text}
        </span>
      )}
    </>
  );
}
