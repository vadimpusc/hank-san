<script>
  import { onMount } from 'svelte';
  import Layout from './Layout.svelte';
  import VideoGrid from './VideoGrid.svelte';
  import VideoModal from './VideoModal.svelte';
  import { embedUrl, getThumbnail } from './video';
  import { setDynamicSchema, siteUrl } from './seo';

  import site from '../data/site.json';

  export let active = '';
  export let heading = '';
  export let intro = '';
  export let items = [];
  export let pagePath = '/';

  let picked = null;
  let modalOpen = false;

  function pick(item){
    picked = item;
    modalOpen = true;
  }

  function close(){
    modalOpen = false;
  }

  onMount(() => {
    const videoObjects = items.map((v) => ({
      '@type': 'VideoObject',
      name: v.title,
      description: v.description || `${v.title} video.`,
      thumbnailUrl: [siteUrl(getThumbnail(v))],
      embedUrl: embedUrl(v),
      uploadDate: v.year ? `${v.year}-01-01` : undefined
    }));

    setDynamicSchema({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'CollectionPage',
          name: heading,
          url: siteUrl(pagePath)
        },
        {
          '@type': 'ItemList',
          name: heading,
          itemListElement: items.map((v, idx) => ({
            '@type': 'ListItem',
            position: idx + 1,
            name: v.title,
            url: siteUrl(pagePath)
          }))
        },
        ...videoObjects
      ]
    });
  });
</script>

<Layout {active} title={site.name} subtitle={site.tagline}>
  <section class="top">
    <div>
      <div class="kicker">{heading}</div>
      <h2>{heading}</h2>
      <p class="intro">{intro}</p>
    </div>
  </section>

  <VideoGrid {items} onPick={pick} />

  <VideoModal item={picked} open={modalOpen} onClose={close} />
</Layout>

<style>
  .top{margin-bottom:14px;}
  .intro{color:var(--muted); font-weight:450; max-width:68ch;}
</style>
