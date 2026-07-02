<script>
  import { onMount } from 'svelte';
  import Layout from './Layout.svelte';
  import MarketLinks from './MarketLinks.svelte';
  import VideoGrid from './VideoGrid.svelte';
  import VideoModal from './VideoModal.svelte';
  import { itemListSchema, personSchema, setDynamicSchema, siteUrl, videoSchema, websiteSchema } from './seo';

  import site from '../data/site.json';

  export let active = '';
  export let heading = '';
  export let intro = '';
  export let items = [];
  export let pagePath = '/';
  export let showMarketLinks = false;
  export let marketLinksIntro = 'Available for productions in Japan, the UK, and US-led international projects.';

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
    const videoObjects = items.map((v) => videoSchema(v, pagePath)).filter(Boolean);

    setDynamicSchema({
      '@context': 'https://schema.org',
      '@graph': [
        websiteSchema(),
        personSchema(),
        {
          '@type': 'CollectionPage',
          '@id': `${siteUrl(pagePath)}#webpage`,
          name: heading,
          url: siteUrl(pagePath),
          isPartOf: { '@id': siteUrl('/#website') },
          about: { '@id': siteUrl('/#person') },
          mainEntity: itemListSchema(`${heading} films by Hank Orion`, items, pagePath)
        },
        itemListSchema(`${heading} films by Hank Orion`, items, pagePath),
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

  {#if showMarketLinks}
    <MarketLinks
      title="Production Markets"
      intro={marketLinksIntro}
    />
  {/if}

  <VideoGrid {items} onPick={pick} />

  <VideoModal item={picked} open={modalOpen} onClose={close} />
</Layout>

<style>
  .top{margin-bottom:14px;}
  .intro{color:var(--muted); font-weight:450; max-width:68ch;}

  @media(max-width: 700px){
    .top{
      margin:4px auto 22px;
      text-align:center;
    }

    .top :global(.kicker){
      margin-bottom:8px;
    }

    .top h2{
      font-size:34px;
      line-height:1;
      margin-bottom:12px;
    }

    .intro{
      max-width:30ch;
      margin:0 auto;
      font-size:16px;
      line-height:1.55;
    }
  }
</style>
