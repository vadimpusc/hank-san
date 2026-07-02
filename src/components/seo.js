import site from '../data/site.json';
import { embedUrl, getThumbnail } from './video';

export function setDynamicSchema(obj) {
  const el = document.getElementById('schema-dynamic');
  if (!el) return;
  try {
    el.textContent = JSON.stringify(obj, null, 2);
  } catch {
    el.textContent = '';
  }
}

export function siteUrl(pathname) {
  const base = (site.baseUrl || '').replace(/\/$/, '');
  const path = String(pathname || '/');
  return base + (path.startsWith('/') ? path : '/' + path);
}

export function personSchema() {
  return {
    '@type': 'Person',
    '@id': siteUrl('/#person'),
    name: site.name,
    url: siteUrl('/'),
    image: siteUrl('/og.jpg'),
    description: 'Film director, screenwriter, and producer based between London and Kyoto.',
    jobTitle: ['Film Director', 'Screenwriter', 'Producer'],
    email: site.email ? `mailto:${site.email}` : undefined,
    sameAs: Object.values(site.social || {}).filter(Boolean),
    knowsAbout: [
      'Film direction',
      'Screenwriting',
      'Film production',
      'Commercial film directing',
      'Narrative filmmaking'
    ],
    worksFor: {
      '@type': 'Organization',
      name: 'San Roku Ku',
      url: 'https://sanrokuku.com/'
    }
  };
}

export function websiteSchema() {
  return {
    '@type': 'WebSite',
    '@id': siteUrl('/#website'),
    name: site.name,
    url: siteUrl('/'),
    publisher: { '@id': siteUrl('/#person') },
    inLanguage: 'en'
  };
}

export function videoSchema(video, pagePath = '/') {
  if (!video?.id) return null;

  return {
    '@type': 'VideoObject',
    '@id': `${siteUrl(pagePath)}#video-${video.slug || video.id}`,
    name: video.title,
    description: video.description || `${video.title} by ${site.name}.`,
    thumbnailUrl: [siteUrl(getThumbnail(video))],
    embedUrl: embedUrl(video),
    uploadDate: video.year ? `${video.year}-01-01` : undefined,
    genre: video.genre,
    creator: { '@id': siteUrl('/#person') },
    director: { '@id': siteUrl('/#person') },
    productionCompany: video.prodCompany
      ? {
          '@type': 'Organization',
          name: video.prodCompany
        }
      : undefined,
    url: video.link || siteUrl(pagePath),
    sameAs: video.imdb
  };
}

export function itemListSchema(name, items, pagePath = '/') {
  return {
    '@type': 'ItemList',
    name,
    itemListElement: items.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: item.title,
      url: item.link || siteUrl(pagePath)
    }))
  };
}
