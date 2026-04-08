<script>
  import ThemeToggle from './ThemeToggle.svelte';
  import site from '../data/site.json';

  export let active = '';
  export let title = '';
  export let subtitle = '';

  let open = false;

  const nav = [
    { label: 'Selected Work', href: '/' },
    { label: 'About', href: '/about/' },
    { label: 'Narrative', href: '/narrative/' },
    { label: 'Commercial', href: '/commercial/' },
    { label: 'Contact', href: '/contact/' }
  ];

  function toggle() {
    open = !open;
  }

  function close() {
    open = false;
  }
</script>

<div class="shell">
  <div class="themeCorner" aria-hidden="false">
    <ThemeToggle />
  </div>

  <aside class="sidebar">
    <div class="brand">
      <a class="brandLink" href="/" aria-label="Home">
        <div class="brandTitle">{title}</div>
        <div class="brandSub">{subtitle}</div>
      </a>
    </div>

    <nav class="nav" aria-label="Primary">
      {#each nav as item}
        <a class:selected={active === item.href} href={item.href}>{item.label}</a>
      {/each}
    </nav>

    <div class="sidebarFoot">
      <div class="social">
        {#if site.social?.facebook}<a href={site.social.facebook} target="_blank" rel="noreferrer" aria-label="Facebook">FB</a>{/if}
        {#if site.social?.instagram}<a href={site.social.instagram} target="_blank" rel="noreferrer" aria-label="Instagram">IG</a>{/if}
        {#if site.social?.youtube}<a href={site.social.youtube} target="_blank" rel="noreferrer" aria-label="YouTube">YT</a>{/if}
        {#if site.social?.imdb}<a href={site.social.imdb} target="_blank" rel="noreferrer" aria-label="IMDb">IMDb</a>{/if}
      </div>
      <div class="small"><a href="https://sanrokuku.com/" target="_blank" rel="noreferrer">By San Roku Ku</a></div>
    </div>
  </aside>

  <header class="mobileTop">
    <a class="mobileBrand" href="/" aria-label="Home">
      <div class="brandTitle">{title}</div>
      <div class="brandSub">{subtitle}</div>
    </a>
    <button class="burger" on:click={toggle} aria-label="Menu" aria-expanded={open}>
      <span></span><span></span>
    </button>
  </header>

  {#if open}
    <div class="drawer" role="dialog" aria-modal="true" aria-label="Menu">
      <div class="drawerInner">
        <div class="drawerTop">
          <div>
            <div class="brandTitle">{title}</div>
            <div class="brandSub">{subtitle}</div>
          </div>
          <button class="close" on:click={close} aria-label="Close">
            Close
          </button>
        </div>
        <nav class="drawerNav" aria-label="Mobile">
          {#each nav as item}
            <a class:selected={active === item.href} href={item.href} on:click={close}>{item.label}</a>
          {/each}
        </nav>
      </div>
    </div>
  {/if}

  <main class="main">
    <slot />
  </main>
</div>

<style>
  .shell{
    display:grid;
    grid-template-columns: 300px 1fr;
    min-height:100vh;
  }

  .sidebar{
    padding:44px 38px;
    position:sticky;
    top:0;
    height:100vh;
    display:flex;
    flex-direction:column;
    gap:26px;
    background:var(--bg);
  }

  .themeCorner{
    position:fixed;
    top:18px;
    right:18px;
    z-index:60;
    background:transparent;
  }

  .brandTitle{
    font-size:28px;
    font-weight:580;
    letter-spacing:-0.02em;
    line-height:1.05;
  }

  .brandSub{
    margin-top:6px;
    font-size:14px;
    font-weight:520;
    letter-spacing:0.14em;
    text-transform:uppercase;
    color:var(--muted);
  }

  .brandLink{display:inline-block;}

  .nav{display:flex; flex-direction:column; gap:12px; padding-top:10px;}

  .nav a{
    font-size:15px;
    font-weight:520;
    letter-spacing:0.12em;
    text-transform:uppercase;
    color:var(--muted);
  }

  .nav a.selected{color:var(--text);}

  .sidebarFoot{margin-top:auto; padding-top:18px;}

  .social{display:flex; gap:10px; margin-bottom:8px;}
  .social a{
    font-size:11px;
    font-weight:600;
    letter-spacing:0.08em;
    text-transform:uppercase;
    color:var(--muted);
  }
  .social a:hover{color:var(--text);}

  .main{
    padding:46px 44px;
  }

  .mobileTop{display:none;}

  .burger{
    width:46px;
    height:46px;
    border:0;
    background:transparent;
    border-radius:12px;
    display:grid;
    place-items:center;
    padding:0;
    cursor:pointer;
  }

  .burger span{
    display:block;
    width:18px;
    height:2px;
    background:var(--text);
    border-radius:2px;
  }

  .burger span:last-child{margin-top:6px;}

  .drawer{
    position:fixed;
    inset:0;
    background:var(--overlay);
    backdrop-filter:saturate(160%) blur(10px);
    z-index:50;
  }

  .drawerInner{
    max-width:520px;
    padding:26px;
  }

  .drawerTop{display:flex; justify-content:space-between; align-items:flex-start; gap:20px;}

  .close{
    border:0;
    background:transparent;
    border-radius:999px;
    padding:10px 14px;
    font-weight:520;
    cursor:pointer;
    text-decoration:underline;
    text-underline-offset:6px;
    text-decoration-thickness:1px;
  }

  .drawerNav{margin-top:24px; display:flex; flex-direction:column; gap:14px;}

  .drawerNav a{
    font-size:18px;
    font-weight:600;
    letter-spacing:0.06em;
    text-transform:uppercase;
  }

  .drawerNav a.selected{opacity:0.6;}

  @media (max-width: 1024px){
    .shell{grid-template-columns: 1fr;}
    .sidebar{display:none;}
    .mobileTop{
      display:flex;
      justify-content:space-between;
      align-items:center;
      padding:18px 18px;
      position:sticky;
      top:0;
      background:var(--overlay);
      backdrop-filter:saturate(160%) blur(10px);
      z-index:40;
    }
    .mobileBrand .brandTitle{font-size:22px;}
    .mobileBrand .brandSub{font-size:12px;}
    .main{padding:22px 18px 44px;}

    .themeCorner{
      top:12px;
      right:12px;
    }
  }
</style>
