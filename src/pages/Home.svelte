<script>
  import { onMount } from 'svelte';
  import Layout from '../components/Layout.svelte';
  import VideoGrid from '../components/VideoGrid.svelte';
  import VideoModal from '../components/VideoModal.svelte';

  import { embedUrl } from '../components/video';
  import { itemListSchema, personSchema, setDynamicSchema, videoSchema, websiteSchema } from '../components/seo';

  import site from '../data/site.json';
  import { allWork } from '../data/work';


  function shuffleArray(arr) {
    const shuffled = [...arr];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  const first = allWork[0];
  const rest = shuffleArray(allWork.slice(1));
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
    const videoObjects = featured.map((v) => videoSchema(v, '/')).filter(Boolean);

    setDynamicSchema({
      '@context': 'https://schema.org',
      '@graph': [
        websiteSchema(),
        personSchema(),
        itemListSchema('Selected Work by Hank Orion', featured, '/'),
        ...videoObjects
      ]
    });
  });
</script>

<Layout active="/" title={site.name} subtitle={site.tagline}>
  <div class="profileImg">
    <picture>
      <source media="(max-width: 1024px)" srcset="/og-mobile.jpg" />
      <img src="/og.jpg" alt="Profile" />
    </picture>
  </div>

  <section class="hero">
    <div>
      <div class="kicker">Selected Work</div>
      <h2>Film director based in Kyoto, working across Japan, the UK, the USA and international productions.</h2>
      <p class="lead">
        I direct narrative films, commercials and branded work with a focus on performance, atmosphere and cinematic storytelling.
      </p>
      <div class="cta">
        <a class="btn" href="/contact/">Hire / Availability</a>
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
        <div class="small">{site.demoReel.description}</div>
      </div>
    </div>
  </section>

  <div class="spacer"></div>

  <section>
      <h2>Recent Film & Commercial Work</h2>

      <VideoGrid items={featured} onPick={pick} />
    </section>

  <div class="spacer"></div>


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

  .cta .btn{
    min-width:142px;
  }

  .reelFrame{
    width:100%;
    aspect-ratio:16/9;
    border-radius:16px;
    overflow:hidden;
    background:#000;
  }

  iframe{width:100%; height:100%; border:0;}

  .reelMeta{margin-top:12px;}

  .spacer{height:28px;}

  .profileImg{margin-bottom:28px;}
  .profileImg img{width:100%; aspect-ratio:16/9; object-fit:cover; border-radius:16px;}

  @media(max-width: 1024px){
    .hero{grid-template-columns: 1fr;}
    .profileImg{display:block; margin-bottom:20px;}
    .profileImg img{width:100%; aspect-ratio:4/5; object-fit:cover; border-radius:12px;}
    .spacer{height:20px;}
  }

  @media(max-width: 600px){
    .profileImg img{aspect-ratio:3/4;}
  }
</style>
