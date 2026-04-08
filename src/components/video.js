export function embedUrl(item) {
  if (!item) return '';
  return `https://www.youtube-nocookie.com/embed/${item.id}?rel=0&modestbranding=1`;
}

export function getThumbnail(item) {
  if (item?.thumbnail) return item.thumbnail;
  return '/stills/placeholder.jpg';
}
