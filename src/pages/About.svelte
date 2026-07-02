<script>
  import { onMount } from 'svelte';
  import Layout from '../components/Layout.svelte';
  import { personSchema, setDynamicSchema, siteUrl, websiteSchema } from '../components/seo';

  import site from '../data/site.json';
  import commercial from '../data/commercial.json';
  import narrative from '../data/narrative.json';

  const credits = [...commercial, ...narrative].map(item => ({
    project: item.title,
    role: item.credit,
    director: item.director,
    year: item.year,
    genre: item.genre,
    prodCompany: item.prodCompany,
    workType: item.workType
  })).sort((a, b) => b.year - a.year);

  const years = [...new Set(credits.map(c => c.year))];

  onMount(() => {
    setDynamicSchema({
      '@context': 'https://schema.org',
      '@graph': [
        websiteSchema(),
        personSchema(),
        {
          '@type': 'AboutPage',
          '@id': `${siteUrl('/about/')}#webpage`,
          name: 'About Hank Orion',
          url: siteUrl('/about/'),
          isPartOf: { '@id': siteUrl('/#website') },
          mainEntity: { '@id': siteUrl('/#person') }
        }
      ]
    });
  });
</script>

<Layout active="/about/" title={site.name} subtitle={site.tagline}>
  <section class="copy">
    <div class="kicker">About</div>
    <h2>Story-first filmmaking with a premium finish.</h2>
    <p>
      I'm a writer, director and producer based between London and Kyoto.
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
    <h2 class="sectionTitle">Credits</h2>
    {#each years as year}
      <div class="yearGroup">
        <div class="year">{year}</div>
        <div class="list">
          {#each credits.filter(c => c.year === year) as c}
            <div class="row">
              <div class="proj">{c.project}</div>
              <div class="meta">
                <span class="role">{c.role}</span>
                {#if c.workType}<span class="sep">—</span><span class="workType">{c.workType}</span>{/if}
                {#if c.genre}<span class="sep">—</span><span class="genre">{c.genre}</span>{/if}
                {#if c.prodCompany}<span class="sep">—</span><span class="company">{c.prodCompany}</span>{/if}
              </div>
            </div>
          {/each}
        </div>
      </div>
    {/each}
  </section>
</Layout>

<style>
  .copy p{color:var(--muted); font-weight:450; max-width:62ch;}
  .copy a{color:var(--text); text-decoration:underline;}

  .contactLine{
    display:flex;
    flex-wrap:wrap;
    gap:10px;
    margin-top:18px;
  }

  .contactLine .btn{
    min-width:118px;
    height:42px;
    padding:0 18px;
    border:1px solid #000;
    border-radius:6px;
    background:#000;
    color:#fff;
    text-decoration:none;
    font-size:12px;
    font-weight:650;
    letter-spacing:0.08em;
    text-transform:uppercase;
    transition:background 160ms ease, color 160ms ease, transform 160ms ease, opacity 160ms ease;
  }

  .contactLine .btn:hover{
    opacity:1;
    background:transparent;
    color:#000;
  }

  .contactLine .btn:active{
    transform:translateY(1px);
  }

  .spacer{height:48px;}

  .yearGroup{margin-bottom:24px;}
  .year{font-size:24px; font-weight:600; margin-bottom:12px; color:var(--text);}

  .list{display:flex; flex-direction:column; gap:12px;}

  .row{display:flex; gap:16px; align-items:baseline;}
  .row:last-child{padding-bottom:0;}

  .proj{font-weight:600; min-width:200px;}
  .meta{color:var(--muted); font-size:14px; font-weight:450;}
  .role{color:var(--text);}
  .sep{margin:0 8px; opacity:0.5;}
  .genre, .workType{opacity:0.7;}
  .company{opacity:0.5;}

  .sectionTitle{font-size:20px; margin-bottom:20px;}

  @media(max-width: 640px){
    .contactLine{justify-content:center;}
    .contactLine .btn{
      flex:1 1 0;
      min-width:0;
      max-width:160px;
    }
    .row{flex-direction:column; gap:4px;}
    .proj{min-width:auto;}
    .spacer{height:32px;}
  }
</style>
