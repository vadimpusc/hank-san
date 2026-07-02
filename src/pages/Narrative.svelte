<script>
  import CategoryView from '../components/CategoryView.svelte';
  import items from '../data/narrative.json';

  const heading = 'Narrative Work';
  const intro = 'A selection of series and features, shot across Japan, the USA, the UK and Europe.';
</script>

<CategoryView
  active="/narrative/"
  kicker="Narrative"
  {heading}
  {intro}
  {items}
  pagePath="/narrative/"
/>
