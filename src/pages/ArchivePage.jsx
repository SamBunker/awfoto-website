import { useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllPosts } from '../content/loader';
import { CATEGORIES, CATEGORY_ORDER } from '../content/categories';
import PostCard from '../components/PostCard';
import Reveal from '../components/Reveal';
import '../styles/ArchivePage.css';

function ArchivePage() {
  const [filter, setFilter] = useState('all');
  const all = getAllPosts();
  const posts = filter === 'all' ? all : all.filter((p) => p.category === filter);

  return (
    <div className="page archive-page">
      <div className="container">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <span className="breadcrumb-sep">/</span>
          <span className="breadcrumb-current">Archive</span>
        </nav>

        <header className="archive-hero">
          <p className="kicker">Everything in One Place</p>
          <h1 className="display archive-title">The Archive</h1>
          <p className="archive-blurb">
            Every recap, film, and photo set — the full body of work, newest first.
          </p>
        </header>

        <div className="archive-filters" role="tablist" aria-label="Filter by category">
          <button
            className={`archive-filter ${filter === 'all' ? 'is-active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All <span>{all.length}</span>
          </button>
          {CATEGORY_ORDER.map((slug) => {
            const count = all.filter((p) => p.category === slug).length;
            return (
              <button
                key={slug}
                className={`archive-filter ${filter === slug ? 'is-active' : ''}`}
                onClick={() => setFilter(slug)}
              >
                {CATEGORIES[slug].label} <span>{count}</span>
              </button>
            );
          })}
        </div>

        <div className="archive-grid">
          {posts.map((post, i) => (
            <Reveal key={`${post.category}/${post.slug}`} delay={(i % 3) * 80}>
              <PostCard post={post} showCategory />
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ArchivePage;
