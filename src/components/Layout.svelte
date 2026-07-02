<script>
  import { onDestroy } from 'svelte';
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

  function handleKeydown(e) {
    if (e.key === 'Escape' && open) close();
  }

  $: if (open && typeof document !== 'undefined') {
    document.body.classList.add('menu-open');
  } else if (typeof document !== 'undefined') {
    document.body.classList.remove('menu-open');
  }

  onDestroy(() => {
    document.body.classList.remove('menu-open');
  });
</script>

<svelte:window on:keydown={handleKeydown} />

<header class="mobileTop">
  <button class="mobileBrand" type="button" on:click={toggle} aria-label="Open menu" aria-expanded={open}>
    <div class="brandTitle">{title}</div>
    <div class="brandSub">
      {#each subtitle.split(' ') as word}
        <span>{word}</span>
      {/each}
    </div>
  </button>
</header>

<div class="shell">
  <aside class="sidebar">
    <div class="brand">
      <a class="brandLink" href="/" aria-label="Home">
        <div class="brandTitle">{title}</div>
        <div class="brandSub">
          {#each subtitle.split(' ') as word}
            <span>{word}</span>
          {/each}
        </div>
      </a>
    </div>

    <nav class="nav" aria-label="Primary">
      {#each nav as item}
        <a class:selected={active === item.href} href={item.href}>{item.label}</a>
      {/each}
    </nav>

    <div class="sidebarFoot">
      <div class="desktopTheme">
        <ThemeToggle />
      </div>
      <div class="social">
        {#if site.social?.facebook}<a href={site.social.facebook} target="_blank" rel="noreferrer" aria-label="Facebook">FB</a>{/if}
        {#if site.social?.instagram}<a href={site.social.instagram} target="_blank" rel="noreferrer" aria-label="Instagram">IG</a>{/if}
        {#if site.social?.youtube}<a href={site.social.youtube} target="_blank" rel="noreferrer" aria-label="YouTube">YT</a>{/if}
        {#if site.social?.imdb}<a href={site.social.imdb} target="_blank" rel="noreferrer" aria-label="IMDb">IMDb</a>{/if}
      </div>
      <div class="small"><a href="https://sanrokuku.com/" target="_blank" rel="noreferrer">Design by San Roku Ku</a></div>
    </div>
  </aside>

  {#if open}
    <div class="drawer" role="dialog" aria-modal="true" aria-label="Menu">
      <button class="drawerBackdrop" type="button" aria-label="Close menu" on:click={close}></button>
      <div class="drawerInner">
        <div class="drawerTop">
          <div class="drawerTheme">
            <ThemeToggle />
          </div>
          <button class="close" on:click={close} aria-label="Close">
            ✕
          </button>
        </div>
        <nav class="drawerNav" aria-label="Mobile">
          {#each nav as item}
            <a class:selected={active === item.href} href={item.href} on:click={close}>{item.label}</a>
          {/each}
        </nav>
        <div class="drawerFoot">
          <div class="social">
            {#if site.social?.facebook}<a href={site.social.facebook} target="_blank" rel="noreferrer" aria-label="Facebook">FB</a>{/if}
            {#if site.social?.instagram}<a href={site.social.instagram} target="_blank" rel="noreferrer" aria-label="Instagram">IG</a>{/if}
            {#if site.social?.youtube}<a href={site.social.youtube} target="_blank" rel="noreferrer" aria-label="YouTube">YT</a>{/if}
            {#if site.social?.imdb}<a href={site.social.imdb} target="_blank" rel="noreferrer" aria-label="IMDb">IMDb</a>{/if}
          </div>
          <div class="small"><a href="https://sanrokuku.com/" target="_blank" rel="noreferrer">Design by San Roku Ku</a></div>
        </div>
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
    align-content:start;
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

  .brandTitle{
    font-size:28px;
    font-weight:580;
    letter-spacing:-0.02em;
    line-height:1.05;
    text-transform:uppercase;
  }

  .brandSub{
    margin-top:6px;
    font-size:14px;
    font-weight:520;
    letter-spacing:0.14em;
    text-transform:uppercase;
    color:var(--muted);
  }

  .brandSub span{display:block;}

  @media (max-width: 1024px) and (min-width: 601px){
    .brandSub{font-size:12px; letter-spacing:0.1em; line-height:1.6;}
    .brandSub span{display:inline;}
    .brandSub span + span::before{content:" | "; margin:0 4px; opacity:0.5;}
  }

  @media (max-width: 600px){
    .brandSub{font-size:9px; letter-spacing:0.06em;}
    .brandSub span{display:block; text-align:center;}
  }

  @media (max-width: 1024px){
    .mobileBrand{padding-top:8px;}
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

  .sidebarFoot{
    margin-top:auto;
    padding-top:18px;
    border-top:1px solid var(--line);
  }

  .desktopTheme{
    margin-bottom:14px;
  }

  .desktopTheme :global(.toggle),
  .drawerTheme :global(.toggle){
    width:38px;
    height:38px;
    border:1px solid var(--line);
    background:transparent;
    box-shadow:none;
    font-size:18px;
  }

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

  .drawer{
    position:fixed;
    inset:0;
    height:100dvh;
    overflow:hidden;
    backdrop-filter:saturate(160%) blur(10px);
    z-index:50;
  }

  .drawerBackdrop{
    position:absolute;
    inset:0;
    border:0;
    padding:0;
    background:var(--overlay);
    cursor:default;
  }

  .drawerInner{
    position:relative;
    z-index:1;
    max-width:520px;
    padding:26px;
    height:100dvh;
    overflow:hidden;
    display:flex;
    flex-direction:column;
  }

  .drawerTop{
    display:flex;
    align-items:flex-start;
    justify-content:space-between;
    gap:20px;
  }

  .drawerTheme{display:none;}

  .close{
    width:46px;
    height:46px;
    border:0;
    background:transparent;
    border-radius:12px;
    display:grid;
    place-items:center;
    cursor:pointer;
    font-size:20px;
    color:var(--text);
  }

  .drawerNav{margin-top:24px; display:flex; flex-direction:column; gap:14px;}

  .drawerNav a{
    font-size:18px;
    font-weight:600;
    letter-spacing:0.06em;
    text-transform:uppercase;
  }

  .drawerNav a.selected{opacity:0.6;}

  .drawerFoot{margin-top:auto; padding-top:32px;}
  .drawerFoot .social{margin-bottom:12px;}

  :global(body.menu-open){
    overflow:hidden;
  }

  @media (max-width: 1024px){
    .shell{grid-template-columns: 1fr;}
    .sidebar{display:none;}
    .mobileTop{
      display:flex;
      justify-content:center;
      align-items:center;
      position:static;
      min-height:112px;
      padding:calc(env(safe-area-inset-top, 0px) + 18px) 18px 18px;
      box-sizing:border-box;
      background:var(--overlay);
      backdrop-filter:saturate(160%) blur(10px);
      border-bottom:1px solid var(--line);
      z-index:40;
    }
    .mobileBrand{
      border:0;
      padding:0;
      background:transparent;
      color:var(--text);
      font:inherit;
      text-align:center;
      cursor:pointer;
    }
    .mobileBrand .brandTitle{
      font-size:30px;
      font-weight:640;
      line-height:0.95;
      letter-spacing:0.02em;
    }
    .mobileBrand .brandSub{
      display:flex;
      justify-content:center;
      gap:6px;
      font-size:10px;
      letter-spacing:0.05em;
      line-height:1.4;
      white-space:nowrap;
    }
    .mobileBrand .brandSub span{
      display:inline;
      text-align:center;
    }
    .mobileBrand .brandSub span + span::before{
      content:"|";
      margin-right:6px;
      opacity:0.45;
    }
    .drawer{
      background:var(--bg);
      backdrop-filter:none;
    }
    .drawerBackdrop{
      background:var(--bg);
    }
    .drawerInner{
      max-width:none;
      width:100%;
      padding:calc(env(safe-area-inset-top, 0px) + 22px) 24px calc(env(safe-area-inset-bottom, 0px) + 28px);
      align-items:center;
      text-align:center;
    }
    .drawerTop{
      width:100%;
      align-items:center;
    }
    .drawerTheme{display:block;}
    .drawerNav{
      flex:1;
      justify-content:center;
      align-items:center;
      gap:18px;
      width:100%;
      margin:0;
      padding:18px 0;
    }
    .drawerNav a{
      font-size:clamp(28px, 10vw, 44px);
      font-weight:620;
      line-height:1;
      letter-spacing:0.02em;
      color:var(--text);
    }
    .drawerNav a.selected{
      opacity:1;
      color:var(--muted);
    }
    .drawerFoot{
      width:100%;
      margin-top:0;
      padding-top:0;
      border-top:1px solid var(--line);
      padding-top:18px;
    }
    .drawerFoot .social{
      justify-content:center;
      gap:16px;
      margin-bottom:12px;
    }
    .drawerFoot .small{
      text-align:center;
    }
    .main{padding:18px 18px 44px;}
  }
</style>
