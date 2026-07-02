<script>
  import CategoryView from '../components/CategoryView.svelte';
  import items from '../data/commercial.json';

  const heading = 'Commercial';
  const intro = 'Commercial and branded work with story discipline: clear messaging, strong images, and a director who understands both the idea and the deadline.';
</script>

<CategoryView
  active="/commercial/"
  {heading}
  {intro}
  {items}
  pagePath="/commercial/"
/>
