<script>
  import Layout from '../components/Layout.svelte';
  import site from '../data/site.json';
</script>

<Layout active="/404/" title={site.name} subtitle={site.tagline}>
  <div class="notFound">
    <h1>404</h1>
    <p class="message">Page not found</p>
    <p class="hint">The page you're looking for doesn't exist or has been moved.</p>
    <a class="btn" href="/">Back to Home</a>
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

  .btn{
    display:inline-block;
    padding:14px 28px;
    background:var(--text);
    color:var(--bg);
    border-radius:12px;
    text-decoration:none;
    font-weight:600;
    transition:opacity 0.2s;
  }

  .btn:hover{opacity:0.85;}
</style>