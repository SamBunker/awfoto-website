import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPost, getPostsByCategory, formatDate } from '../content/loader';
import { getCategory } from '../content/categories';
import { ArrowRight } from '../components/icons';
import Lightbox from '../components/Lightbox';
import PostCard from '../components/PostCard';
import NotFound from './NotFound';
import '../styles/PostPage.css';

function PostPage() {
  const { category, slug } = useParams();
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const meta = getCategory(category);
  const post = getPost(category, slug);

  if (!meta || !post) return <NotFound />;

  const related = getPostsByCategory(category)
    .filter((p) => p.slug !== post.slug)
    .slice(0, 3);

  return (
    <article className="page post-page">
      <div className="container post-narrow">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <span className="breadcrumb-sep">/</span>
          <Link to={`/${category}`}>{meta.label}</Link>
          <span className="breadcrumb-sep">/</span>
          <span className="breadcrumb-current">{post.title}</span>
        </nav>

        <header className="post-header">
          <div className="post-header-meta">
            <Link to={`/${category}`} className="post-header-cat">{meta.label}</Link>
            <span>{formatDate(post.date)}</span>
            {post.body && <span>{post.readTime} min read</span>}
          </div>
          <h1 className="display post-title">{post.title}</h1>
          {post.excerpt && <p className="post-lede">{post.excerpt}</p>}
          {post.tags?.length > 0 && (
            <ul className="post-tags">
              {post.tags.map((t) => <li key={t}>{t}</li>)}
            </ul>
          )}
        </header>
      </div>

      {/* Video embed takes priority as the visual lead; otherwise the cover */}
      {post.video ? (
        <div className="container post-media-wrap">
          <div className="post-video">
            <iframe
              src={post.video}
              title={post.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      ) : (
        post.cover && (
          <div className="post-cover">
            <img src={post.cover} alt={post.title} />
          </div>
        )
      )}

      {post.body && (
        <div className="container post-narrow">
          <div className="prose" dangerouslySetInnerHTML={{ __html: post.html }} />
        </div>
      )}

      {post.images?.length > 0 && (
        <div className="container post-gallery-wrap">
          <h2 className="heading post-section-title">The Set</h2>
          <div className="post-gallery">
            {post.images.map((src, i) => (
              <button
                key={src}
                className="post-gallery-item"
                onClick={() => setLightboxIndex(i)}
                aria-label={`Open image ${i + 1}`}
              >
                <img src={src} alt={`${post.title} — ${i + 1}`} loading="lazy" />
              </button>
            ))}
          </div>
        </div>
      )}

      {related.length > 0 && (
        <div className="container post-related">
          <div className="post-related-head">
            <h2 className="heading post-section-title">More from {meta.label}</h2>
            <Link to={`/${category}`} className="post-related-all">
              View all <ArrowRight />
            </Link>
          </div>
          <div className="post-related-grid">
            {related.map((p) => <PostCard key={p.slug} post={p} />)}
          </div>
        </div>
      )}

      <Lightbox
        images={post.images}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={setLightboxIndex}
      />
    </article>
  );
}

export default PostPage;
