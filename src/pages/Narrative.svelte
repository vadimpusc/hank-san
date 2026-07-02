<script>
  import CategoryView from '../components/CategoryView.svelte';
  import items from '../data/narrative.json';

  const heading = 'Narrative';
  const intro = 'Films built around character, atmosphere, and a clear emotional turn. My focus is performance, visual restraint, and stories that stay with the viewer after the cut.';
</script>

<CategoryView
  active="/narrative/"
  {heading}
  {intro}
  {items}
  pagePath="/narrative/"
  showMarketLinks={true}
  marketLinksIntro="Available for narrative films and director-for-hire work in Japan, the UK, and international productions."
/>
