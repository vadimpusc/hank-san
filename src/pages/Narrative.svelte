<script>
  import CategoryView from '../components/CategoryView.svelte';
  import items from '../data/narrative.json';

  const heading = 'Narrative';
  const intro = 'Narrative-driven work.';
</script>

<CategoryView
  active="/narrative/"
  {heading}
  {intro}
  {items}
  pagePath="/narrative/"
/>
