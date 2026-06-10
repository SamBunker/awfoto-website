import { useParams, Link } from 'react-router-dom';
import { getCategory } from '../content/categories';
import { getPostsByCategory } from '../content/loader';
import PostCard from '../components/PostCard';
import Reveal from '../components/Reveal';
import NotFound from './NotFound';
import '../styles/CategoryPage.css';

function CategoryPage() {
  const { category } = useParams();
  const meta = getCategory(category);

  if (!meta) return <NotFound />;

  const posts = getPostsByCategory(category);

  return (
    <div className="page category-page">
      <div className="container">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <span className="breadcrumb-sep">/</span>
          <span className="breadcrumb-current">{meta.label}</span>
        </nav>

        <header className="category-hero">
          <div className="category-hero-text">
            <p className="kicker">{meta.kicker}</p>
            <h1 className="display category-hero-title">{meta.label}</h1>
            <p className="category-hero-blurb">{meta.blurb}</p>
            <p className="category-hero-count">
              {posts.length} {posts.length === 1 ? 'entry' : 'entries'}
            </p>
          </div>
          <span className="numeral category-hero-numeral" aria-hidden="true">{meta.numeral}</span>
        </header>

        {posts.length > 0 ? (
          <div className="category-grid">
            {posts.map((post, i) => (
              <Reveal key={post.slug} delay={(i % 3) * 90}>
                <PostCard post={post} />
              </Reveal>
            ))}
          </div>
        ) : (
          <p className="category-empty">No entries here yet — check back soon.</p>
        )}
      </div>
    </div>
  );
}

export default CategoryPage;
