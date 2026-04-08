<script>
  import { onMount } from 'svelte';
  import Layout from '../components/Layout.svelte';
  import VideoGrid from '../components/VideoGrid.svelte';
  import VideoModal from '../components/VideoModal.svelte';
  import PhotoGrid from '../components/PhotoGrid.svelte';
  import { embedUrl, getThumbnail } from '../components/video';
  import { setDynamicSchema, siteUrl } from '../components/seo';

  import site from '../data/site.json';
  import narrative from '../data/narrative.json';
  import commercial from '../data/commercial.json';

  const stills = [...narrative, ...commercial].map(item => ({
    ...item,
    src: getThumbnail(item),
    alt: item.title
  }));

  function shuffleArray(arr) {
    const shuffled = [...arr];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  const allItems = [...narrative, ...commercial];
  const first = allItems[0];
  const rest = shuffleArray(allItems.slice(1));
  const featured = [first, ...rest].slice(0, 6);

  let picked = null;
  let modalOpen = false;

  function pick(item) {
    picked = item;
    modalOpen = true;
  }

  function close() {
    modalOpen = false;
  }

  onMount(() => {
    const videoObjects = featured.map((v) => ({
      '@type': 'VideoObject',
      name: v.title,
      description: v.description || `${v.title} video.`,
      thumbnailUrl: [siteUrl(v.thumbnail)],
      embedUrl: embedUrl(v),
      uploadDate: v.year ? `${v.year}-01-01` : undefined
    }));

    setDynamicSchema({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'ItemList',
          name: 'Selected Work',
          itemListElement: featured.map((v, idx) => ({
            '@type': 'ListItem',
            position: idx + 1,
            name: v.title,
            url: siteUrl('/')
          }))
        },
        ...videoObjects
      ]
    });
  });
</script>

<Layout active="/" title={site.name} subtitle={site.tagline}>
  <div class="profileImg">
    <img src="/og.jpg" alt="Profile" />
  </div>

  <section class="hero">
    <div>
      <div class="kicker">Selected Work</div>
      <h2>Stories shaped through light, silence, and tension.</h2>
      <p class="lead">
        Exploring narrative, human connection, and cinematic atmosphere across film and commercial work.
      </p>
      <div class="cta">
        <a class="btn" href="/contact/">Availability</a>
        <a class="btn secondary" href="/about/">About</a>
      </div>
    </div>

    <div class="reel">
      <div class="reelFrame">
        <iframe
          src={embedUrl(site.demoReel)}
          title={site.demoReel.title}
          allow="autoplay; fullscreen; picture-in-picture"
          allowfullscreen
          loading="lazy"
        />
      </div>
      <div class="reelMeta">
        <div class="reelTitle">{site.demoReel.title}</div>
        <div class="small">{site.demoReel.description}</div>
      </div>
    </div>
  </section>

  <div class="spacer"></div>

  <section>
    <div class="sectionHead">
      <h2>Recent Narrative & Commercial Work</h2>
      <div class="small">Tap any frame to watch.</div>
    </div>

    <VideoGrid items={featured} onPick={pick} />
  </section>

  <div class="spacer"></div>

  <section>
    <div class="sectionHead">
      <h2>Stills from Recent Productions</h2>
      <div class="small">Select frames from recent projects.</div>
    </div>
    <PhotoGrid items={stills} />
  </section>

  <VideoModal item={picked} open={modalOpen} onClose={close} />
</Layout>

<style>
  .hero{
    display:grid;
    grid-template-columns: 1.1fr 1fr;
    gap:34px;
    align-items:start;
  }

  .lead{color:var(--muted); font-weight:450; max-width:56ch;}

  .cta{display:flex; gap:12px; flex-wrap:wrap; margin-top:14px;}

  .reelFrame{
    width:100%;
    aspect-ratio:16/9;
    border-radius:16px;
    overflow:hidden;
    background:#000;
  }

  iframe{width:100%; height:100%; border:0;}

  .reelMeta{margin-top:12px;}
  .reelTitle{font-weight:600; font-size:16px;}

  .sectionHead{display:flex; justify-content:space-between; align-items:flex-end; gap:14px; margin-bottom:12px;}

  .spacer{height:28px;}

  .profileImg{display:none;}

  @media(max-width: 1024px){
    .hero{grid-template-columns: 1fr;}
    .profileImg{display:block; margin-bottom:20px;}
    .profileImg img{width:100%; height:320px; object-fit:cover; border-radius:12px;}
    .spacer{height:20px;}
  }
</style>
