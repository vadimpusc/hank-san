<script>
  import { onMount } from 'svelte';
  import Layout from '../components/Layout.svelte';
  import { setDynamicSchema, siteUrl } from '../components/seo';
  import site from '../data/site.json';

  onMount(() => {
    setDynamicSchema({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'ContactPage',
          name: 'Contact',
          url: siteUrl('/contact/')
        },
        {
          '@type': 'Person',
          name: site.name,
          jobTitle: site.tagline,
          url: siteUrl('/'),
          email: site.email ? `mailto:${site.email}` : undefined,
          sameAs: Object.values(site.social || {}).filter(Boolean)
        }
      ]
    });
  });
</script>

<Layout active="/contact/" title={site.name} subtitle={site.tagline}>
  <section class="wrap">
    <div class="left">
      <div class="kicker">Contact</div>
      <h2>Bookings, availability, and reels.</h2>
      <p class="intro">
        For production enquiries, send a short brief and timelines. I reply quickly.
      </p>

      <div class="card">
        <div class="label">Email</div>
        <a class="value" href={`mailto:${site.email}`}>{site.email}</a>

        <div class="hr"></div>

        <div class="label">Location</div>
        <div class="value">{site.location}</div>

        <div class="hr"></div>

        <div class="label">Links</div>
        <div class="links">
          {#if site.social?.facebook}<a href={site.social.facebook} target="_blank" rel="noreferrer">Facebook</a>{/if}
          {#if site.social?.instagram}<a href={site.social.instagram} target="_blank" rel="noreferrer">Instagram</a>{/if}
          {#if site.social?.youtube}<a href={site.social.youtube} target="_blank" rel="noreferrer">YouTube</a>{/if}
          {#if site.social?.imdb}<a href={site.social.imdb} target="_blank" rel="noreferrer">IMDb</a>{/if}
        </div>
      </div>
    </div>
  </section>
</Layout>

<style>
  .wrap{display:grid; grid-template-columns:1fr; gap:34px; align-items:start;}
  .intro{color:var(--muted); font-weight:450; max-width:66ch;}

  .card{
    margin-top:14px;
    border:0;
    border-radius:16px;
    padding:18px;
    background:transparent;
  }

  .label{font-size:12px; font-weight:520; letter-spacing:0.14em; text-transform:uppercase; color:var(--muted);}
  .value{font-size:18px; font-weight:600;}

  .links{display:flex; flex-wrap:wrap; gap:12px; margin-top:8px;}
  .links a{font-weight:520; text-decoration:underline; text-underline-offset:6px; text-decoration-thickness:1px;}

  @media(max-width:1024px){
    .wrap{grid-template-columns:1fr;}
  }
</style>
