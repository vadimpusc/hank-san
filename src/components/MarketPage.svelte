<script>
  import { onMount } from 'svelte';
  import Layout from './Layout.svelte';
  import { personSchema, setDynamicSchema, siteUrl, websiteSchema } from './seo';
  import site from '../data/site.json';
  import { marketList } from '../data/markets';

  export let market;

  onMount(() => {
    setDynamicSchema({
      '@context': 'https://schema.org',
      '@graph': [
        websiteSchema(),
        personSchema(),
        {
          '@type': 'WebPage',
          '@id': `${siteUrl(market.path)}#webpage`,
          name: market.schemaName,
          description: market.schemaDescription,
          url: siteUrl(market.path),
          isPartOf: { '@id': siteUrl('/#website') },
          about: { '@id': siteUrl('/#person') },
          mainEntity: { '@id': siteUrl('/#person') }
        },
        {
          '@type': 'BreadcrumbList',
          '@id': `${siteUrl(market.path)}#breadcrumbs`,
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Home',
              item: siteUrl('/')
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: market.label,
              item: siteUrl(market.path)
            }
          ]
        }
      ]
    });
  });
</script>

<Layout active="" title={site.name} subtitle={site.tagline}>
  <section class="hero">
    <div class="kicker">{market.kicker}</div>
    <h1>{market.title}</h1>
    <p class="lead">{market.lead}</p>
    <div class="cta">
      {#each market.links as link}
        <a class:secondary={link.secondary} class="btn" href={link.href}>{link.label}</a>
      {/each}
    </div>
  </section>

  <section class="copy">
    {#each market.intro as paragraph}
      <p>{paragraph}</p>
    {/each}
  </section>

  <section class="details">
    {#each market.sections as section}
      <article>
        <h2>{section.heading}</h2>
        <p>{section.body}</p>
      </article>
    {/each}
  </section>

  <section class="markets">
    <div>
      <div class="kicker">Related Markets</div>
      <p>Hank works from Kyoto with productions connected to Japan, the UK, the USA and wider international locations.</p>
    </div>
    <div class="marketLinks">
      {#each marketList.filter(item => item.path !== market.path) as item}
        <a class="btn secondary" href={item.path}>{item.label}</a>
      {/each}
    </div>
  </section>
</Layout>

<style>
  .hero{
    max-width:780px;
  }

  h1{
    margin-top:8px;
  }

  .lead{
    max-width:62ch;
    color:var(--muted);
    font-weight:450;
  }

  .cta{
    display:flex;
    flex-wrap:wrap;
    gap:10px;
    margin-top:18px;
  }

  .copy{
    max-width:760px;
    margin-top:38px;
  }

  .copy p{
    color:var(--muted);
    font-weight:450;
  }

  .details{
    display:grid;
    grid-template-columns:repeat(2, minmax(0, 1fr));
    gap:28px;
    margin-top:36px;
    max-width:980px;
  }

  article{
    padding-top:22px;
    border-top:1px solid var(--line);
  }

  article h2{
    font-size:22px;
  }

  article p{
    color:var(--muted);
    font-weight:450;
  }

  .markets{
    margin-top:42px;
    padding-top:24px;
    border-top:1px solid var(--line);
    display:flex;
    align-items:flex-end;
    justify-content:space-between;
    gap:20px;
  }

  .markets p{
    margin:8px 0 0;
    max-width:58ch;
    color:var(--muted);
    font-weight:450;
  }

  .marketLinks{
    display:flex;
    flex-wrap:wrap;
    justify-content:flex-end;
    gap:10px;
  }

  .marketLinks .btn{
    min-width:82px;
  }

  @media(max-width:760px){
    .details{
      grid-template-columns:1fr;
      gap:18px;
    }

    .markets{
      align-items:flex-start;
      flex-direction:column;
    }

    .marketLinks{
      justify-content:flex-start;
    }
  }
</style>
