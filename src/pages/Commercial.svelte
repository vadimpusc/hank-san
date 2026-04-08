<script>
  import CategoryView from '../components/CategoryView.svelte';
  import items from '../data/commercial.json';

  const heading = 'Commercial';
  const intro = 'Brand films, ads, and social campaigns. Built for clear messaging and strong craft.';
</script>

<CategoryView
  active="/commercial/"
  {heading}
  {intro}
  {items}
  pagePath="/commercial/"
/>
