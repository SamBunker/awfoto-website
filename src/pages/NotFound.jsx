import { Link } from 'react-router-dom';
import '../styles/NotFound.css';

function NotFound() {
  return (
    <div className="page notfound">
      <div className="container notfound-inner">
        <span className="numeral notfound-code" aria-hidden="true">404</span>
        <h1 className="display notfound-title">Out of Frame</h1>
        <p className="notfound-text">
          The page you're looking for isn't here. It may have been moved, or the
          link was never in focus to begin with.
        </p>
        <Link to="/" className="btn">Back Home</Link>
      </div>
    </div>
  );
}

export default NotFound;
