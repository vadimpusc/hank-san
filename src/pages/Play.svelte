<script>
  import { onMount } from 'svelte';
  import Layout from '../components/Layout.svelte';
  import { embedUrl } from '../components/video';
  import { setDynamicSchema, siteUrl } from '../components/seo';
  import narrative from '../data/narrative.json';
  import commercial from '../data/commercial.json';

  const allItems = [...narrative, ...commercial];
  
  let slug = '';
  let item = null;

  onMount(() => {
    const params = new URLSearchParams(window.location.search);
    slug = params.get('v') || '';
    item = allItems.find(v => v.slug === slug);

    if (item) {
      setDynamicSchema({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'VideoObject',
            name: item.title,
            description: item.description || `${item.title} video.`,
            thumbnailUrl: [siteUrl(item.thumbnail)],
            embedUrl: embedUrl(item),
            uploadDate: item.year ? `${item.year}-01-01` : undefined
          }
        ]
      });
    }
  });
</script>

<Layout active="" title="Hank Orion" subtitle="Director | Screenwriter | Producer">
  {#if item}
    <section class="player">
      <div class="title">{item.title}</div>
      <div class="frame">
        <iframe
          src={embedUrl(item)}
          title={item.title}
          allow="autoplay; fullscreen; picture-in-picture"
          allowfullscreen
        />
      </div>
      <div class="meta">
        {#if item.credit}<span>{item.credit}</span>{/if}
        {#if item.director}<span>dir. {item.director}</span>{/if}
        {#if item.client}<span>{item.client}</span>{/if}
        {#if item.year}<span>{item.year}</span>{/if}
      </div>
      {#if item.description}
        <p class="desc">{item.description}</p>
      {/if}
      <a class="back" href="/">← Back to Portfolio</a>
    </section>
  {:else}
    <div class="notFound">Video not found. <a href="/">Go home</a></div>
  {/if}
</Layout>

<svelte:head>
  <meta name="robots" content="noindex, nofollow" />
</svelte:head>

<style>
  .player{max-width:900px; margin:0 auto;}

  .title{font-size:24px; font-weight:620; margin-bottom:18px;}

  .frame{
    position:relative;
    width:100%;
    aspect-ratio:16/9;
    background:#000;
    border-radius:12px;
    overflow:hidden;
  }

  iframe{position:absolute; inset:0; width:100%; height:100%; border:0;}

  .meta{
    margin-top:14px;
    color:var(--muted);
    font-size:14px;
    display:flex;
    flex-wrap:wrap;
    gap:12px;
  }

  .desc{
    margin-top:18px;
    color:var(--muted);
    line-height:1.6;
  }

  .back{
    display:inline-block;
    margin-top:24px;
    color:var(--text);
    font-weight:520;
  }

  .notFound{text-align:center; padding:60px; color:var(--muted);}
</style>