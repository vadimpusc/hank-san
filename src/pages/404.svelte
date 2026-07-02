<script>
  import Layout from '../components/Layout.svelte';
  import site from '../data/site.json';
</script>

<Layout active="/404/" title={site.name} subtitle={site.tagline}>
  <div class="notFound">
    <h1>404</h1>
    <p class="message">That page isn't here.</p>
    <p class="hint">Start with the selected work, or get in touch if you were looking for a reel or project link.</p>
    <div class="actions">
      <a class="btn" href="/">Selected Work</a>
      <a class="btn secondary" href="/contact/">Contact</a>
    </div>
  </div>
</Layout>

<style>
  .notFound{
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    text-align:center;
    min-height:60vh;
  }

  h1{
    font-size:120px;
    font-weight:700;
    line-height:1;
    margin:0;
    letter-spacing:-0.04em;
  }

  .message{
    font-size:24px;
    font-weight:600;
    margin:16px 0 8px;
  }

  .hint{
    color:var(--muted);
    margin-bottom:32px;
  }

  .actions{
    display:flex;
    flex-wrap:wrap;
    justify-content:center;
    gap:10px;
  }

  .actions .btn{min-width:138px;}
</style>
