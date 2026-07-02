<script>
  import CategoryView from '../components/CategoryView.svelte';
  import items from '../data/commercial.json';

  const heading = 'Commercial & Branded Work';
  const intro = 'Selected commercial work across advertising, branded content and online campaigns.';
</script>

<CategoryView
  active="/commercial/"
  kicker="Commercial"
  {heading}
  {intro}
  {items}
  pagePath="/commercial/"
/>
