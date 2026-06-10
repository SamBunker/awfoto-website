// Shared metadata for each content category. Drives the listing pages,
// breadcrumbs, and the home-page section banners so everything stays in sync.
export const CATEGORIES = {
  'sports-media': {
    slug: 'sports-media',
    label: 'Sports Media',
    numeral: '101',
    kicker: 'On the Field',
    blurb:
      'Game-day coverage, recaps, and the stories behind the scoreline — the grit, the sweat, and the triumph of competition.',
  },
  videography: {
    slug: 'videography',
    label: 'Videography',
    numeral: '202',
    kicker: 'Motion & Light',
    blurb:
      'Cinematic films, highlight reels, and visual narratives built frame by frame.',
  },
  photography: {
    slug: 'photography',
    label: 'Photography',
    numeral: '303',
    kicker: 'Stills & Frames',
    blurb:
      'Studio portraits, sidelines, and stills — single moments held still and made to last.',
  },
};

export const CATEGORY_ORDER = ['sports-media', 'videography', 'photography'];

export function getCategory(slug) {
  return CATEGORIES[slug] || null;
}
