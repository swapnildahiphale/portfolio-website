import { Link } from "react-router-dom";

export const LINKEDIN_URL = "https://www.linkedin.com/in/swapnil2233/";
export const X_URL = "https://x.com/Swapnil2233";

export const BlogHeader = () => (
  <nav className="blog-nav" aria-label="Primary">
    <Link to="/" className="blog-nav-link">Home</Link>
    <Link to="/blog" className="blog-nav-link">Blog</Link>
    <a
      href={LINKEDIN_URL}
      className="blog-nav-link"
      target="_blank"
      rel="noopener noreferrer"
    >
      LinkedIn
    </a>
    <a
      href={X_URL}
      className="blog-nav-link"
      target="_blank"
      rel="noopener noreferrer"
    >
      X
    </a>
  </nav>
);

export const BlogFooter = () => (
  <footer className="blog-footer">
    <p>Swapnil Dahiphale &middot; SRE & AI Engineer</p>
    <p>
      <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer">LinkedIn</a>
      <span aria-hidden="true"> &middot; </span>
      <a href={X_URL} target="_blank" rel="noopener noreferrer">X</a>
      <span aria-hidden="true"> &middot; </span>
      <a href="https://github.com/swapnildahiphale/" target="_blank" rel="noopener noreferrer">GitHub</a>
    </p>
  </footer>
);
