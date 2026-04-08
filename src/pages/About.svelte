<script>
  import { onMount } from 'svelte';
  import Layout from '../components/Layout.svelte';
  import PhotoGrid from '../components/PhotoGrid.svelte';
  import { setDynamicSchema, siteUrl } from '../components/seo';
  import { getThumbnail } from '../components/video';

  import site from '../data/site.json';
  import commercial from '../data/commercial.json';
  import narrative from '../data/narrative.json';

  const credits = [...commercial, ...narrative].map(item => ({
    project: item.title,
    role: item.credit,
    director: item.director,
    year: item.year
  })).sort((a, b) => b.year - a.year);

  const stills = [...narrative, ...commercial].map(item => ({
    ...item,
    src: getThumbnail(item),
    alt: item.title
  }));

  onMount(() => {
    setDynamicSchema({
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: site.name,
      jobTitle: site.tagline,
      url: siteUrl('/about/'),
      email: site.email ? `mailto:${site.email}` : undefined,
      sameAs: Object.values(site.social || {}).filter(Boolean)
    });
  });
</script>

<Layout active="/about/" title={site.name} subtitle={site.tagline}>
  <section class="copy">
    <div class="kicker">About</div>
    <h2>Story-first filmmaking with a premium finish.</h2>
    <p>
      I'm a writer, director and producer based between London and Kyoto, and the founder of San Roku Ku, a production studio focused on international storytelling.
    </p>
    <p>
      I collaborate with producers, brands, and artists to create work that feels crafted and human.
      The goal is always the same: clarity, emotion, and images that support performance.
    </p>
    <p>
      Available for narrative and commercials.
    </p>

    <div class="contactLine">
      <a class="btn" href="/contact/">Contact</a>
      <a class="btn secondary" href={site.social?.imdb || '#'} target="_blank" rel="noreferrer">IMDb</a>
    </div>
  </section>

  <div class="spacer"></div>

  <section>
    <div class="sectionHead">
      <h2>Stills</h2>
      <div class="small">Frames and textures.</div>
    </div>
    <PhotoGrid items={stills} />
  </section>

  <div class="spacer"></div>

  <section>
    <div class="sectionHead">
      <h2>Credits</h2>
    </div>
    <div class="list">
      {#each credits as c}
        <div class="row">
          <div class="proj">{c.project}</div>
          <div class="meta">
            <span class="role">{c.role}</span>
            <span class="dot">•</span>
            <span>{c.director}</span>
            <span class="dot">•</span>
            <span>{c.year}</span>
          </div>
        </div>
      {/each}
    </div>
  </section>
</Layout>

<style>
  .copy p{color:var(--muted); font-weight:450; max-width:62ch;}

  .contactLine{display:flex; gap:12px; flex-wrap:wrap; margin-top:14px;}

  .list{display:flex; flex-direction:column; gap:14px;}

  .row{padding-bottom:12px;}
  .row:last-child{padding-bottom:0;}

  .proj{font-weight:600;}
  .meta{margin-top:4px; color:var(--muted); font-size:14px; font-weight:450;}
  .dot{margin:0 6px;}

  .sectionHead{display:flex; justify-content:space-between; align-items:flex-end; gap:14px; margin-bottom:12px;}
  .spacer{height:28px;}
</style>
