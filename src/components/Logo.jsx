import '../styles/Logo.css';

/**
 * The "AW" monogram lockup. `tagline` toggles the "Design & Foto" line,
 * `est` toggles the "Est. 2023" serif mark beside it.
 */
function Logo({ tagline = true, est = false }) {
  return (
    <span className="logo">
      <span className="logo-mark">
        <span className="logo-aw">AW</span>
        {tagline && <span className="logo-tag">Design &amp; Foto</span>}
      </span>
      {est && <span className="logo-est">Est. 2023</span>}
    </span>
  );
}

export default Logo;
