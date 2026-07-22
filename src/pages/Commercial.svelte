<script>
  import CategoryView from '../components/CategoryView.svelte';
  import { commercialWork as items } from '../data/work';

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
