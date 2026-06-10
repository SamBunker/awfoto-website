import { Link } from 'react-router-dom';
import { formatDate } from '../content/loader';
import { CATEGORIES } from '../content/categories';
import '../styles/PostCard.css';

function PostCard({ post, showCategory = false }) {
  const to = `/${post.category}/${post.slug}`;
  const cat = CATEGORIES[post.category];

  return (
    <article className="post-card">
      <Link to={to} className="post-card-media">
        <img src={post.cover} alt={post.title} loading="lazy" />
        {post.images?.length > 0 && (
          <span className="post-card-badge">{post.images.length} photos</span>
        )}
        {post.video && (
          <span className="post-card-play" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
          </span>
        )}
      </Link>

      <div className="post-card-body">
        <div className="post-card-meta">
          {showCategory && cat && (
            <Link to={`/${post.category}`} className="post-card-cat">{cat.label}</Link>
          )}
          <span className="post-card-date">{formatDate(post.date)}</span>
        </div>

        <h3 className="post-card-title">
          <Link to={to}>{post.title}</Link>
        </h3>

        {post.excerpt && <p className="post-card-excerpt">{post.excerpt}</p>}

        {post.tags?.length > 0 && (
          <ul className="post-card-tags">
            {post.tags.slice(0, 3).map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        )}
      </div>
    </article>
  );
}

export default PostCard;
