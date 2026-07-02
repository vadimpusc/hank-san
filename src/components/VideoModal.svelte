<script>
  import { onMount, onDestroy, tick } from 'svelte';
  import { embedUrl } from './video';

  export let item;
  export let open = false;
  export let onClose = () => {};

  let backdrop;

  function sameText(a, b) {
    return String(a || '').trim().toLowerCase() === String(b || '').trim().toLowerCase();
  }

  function formatCredit(credit, director) {
    if (sameText(credit, 'director')) return `Directed by ${director}`;
    return `${credit} ${director}`;
  }

  function uniqueMetadata(item) {
    if (!item) return [];

    const values = [];

    if (item.credit && item.director) {
      values.push(formatCredit(item.credit, item.director));
    } else {
      if (item.credit) values.push(item.credit);
      if (item.director) values.push(`dir. ${item.director}`);
    }

    if (item.client && !sameText(item.client, item.title)) values.push(item.client);
    if (item.prodCompany && !sameText(item.prodCompany, item.title) && !sameText(item.prodCompany, item.client)) {
      values.push(item.prodCompany);
    }
    if (item.year) values.push(item.year);
    if (item.genre) values.push(item.genre);

    const seen = new Set();
    return values.filter((value) => {
      const key = String(value).trim().toLowerCase();
      if (!key || seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }

  function close() {
    onClose();
  }

  function onKey(e) {
    if (e.key === 'Escape') close();
  }

  async function prepareModal() {
    await tick();
    if (!open) return;
    backdrop?.scrollTo({ top: 0 });
    document.body.classList.add('modal-open');
  }

  $: if (open) {
    prepareModal();
  } else if (typeof document !== 'undefined') {
    document.body.classList.remove('modal-open');
  }

  $: metadata = uniqueMetadata(item);

  onMount(() => {
    window.addEventListener('keydown', onKey);
  });

  onDestroy(() => {
    window.removeEventListener('keydown', onKey);
    document.body.classList.remove('modal-open');
  });
</script>

{#if open}
  <div bind:this={backdrop} class="backdrop" role="dialog" aria-modal="true" aria-label="Video">
    <button class="backdropDismiss" type="button" aria-label="Close video" on:click={close}></button>
    <div class="panel">
      <div class="top">
        <div class="meta">
          <div class="title">{item.title}</div>
          {#if metadata.length}
            <div class="sub">
              {#each metadata as value, index}
                {#if index > 0}<span class="dot">•</span>{/if}
                <span>{value}</span>
              {/each}
            </div>
          {/if}
        </div>
        <button class="x" on:click={close} aria-label="Close">Close</button>
      </div>

      <div class:noPoster={!item.poster} class="content">
        {#if item.poster}
          <div class="poster">
            <img src={item.poster} alt="{item.title} poster" />
          </div>
        {/if}
        <div class="frame">
          {#if item.id}
            <iframe
              src={embedUrl(item)}
              title={item.title}
              allow="autoplay; fullscreen; picture-in-picture"
              allowfullscreen
              loading="lazy"
            />
          {:else}
            <div class="placeholder" aria-label="No video available">
              <span>Coming Soon</span>
            </div>
          {/if}
        </div>
      </div>

      {#if item.description}
        <p class="desc">{item.description}</p>
      {/if}

      <div class="links">
        {#if item.imdb}<a class="btn" href={item.imdb} target="_blank" rel="noreferrer">IMDb</a>{/if}
        {#if item.link}<a class="btn" href={item.link} target="_blank" rel="noreferrer">More Details</a>{/if}
      </div>
    </div>
  </div>
{/if}

<style>
  .backdrop{
    position:fixed;
    inset:0;
    z-index:80;
    display:flex;
    align-items:flex-start;
    justify-content:center;
    padding:18px;
    overflow-y:auto;
    overscroll-behavior:contain;
    -webkit-overflow-scrolling:touch;
  }

  .backdropDismiss{
    position:fixed;
    inset:0;
    border:0;
    padding:0;
    background:rgba(0,0,0,0.45);
    cursor:default;
  }

  .panel{
    position:relative;
    z-index:1;
    width:min(90vw, 1400px);
    background:var(--panel);
    border-radius:18px;
    overflow:hidden;
    box-shadow:var(--shadow);
  }

  .top{
    display:flex;
    align-items:flex-start;
    justify-content:space-between;
    gap:24px;
    padding:24px 24px 16px;
  }

  .meta{min-width:0;}
  .title{
    font-weight:650;
    font-size:clamp(30px, 3vw, 52px);
    line-height:1.04;
    letter-spacing:0;
  }
  .sub{
    display:flex;
    flex-wrap:wrap;
    gap:0;
    margin-top:10px;
    color:var(--muted);
    font-size:14px;
    font-weight:500;
    line-height:1.45;
  }
  .dot{margin:0 6px;}

  .x{
    border:0;
    background:transparent;
    border-radius:999px;
    padding:10px 14px;
    font-weight:520;
    cursor:pointer;
    color:var(--text);
    text-decoration:underline;
    text-underline-offset:6px;
    text-decoration-thickness:1px;
  }

  .content{display:flex; gap:16px; padding:0 24px; align-items:center;}

  .content.noPoster{
    max-width:980px;
    margin:0 auto;
  }

  .poster{flex:0 0 28%;}
  .poster img{width:100%; border-radius:8px; object-fit:cover; aspect-ratio:2/3;}

  .frame{
    flex:1;
    position:relative;
    aspect-ratio:16/9;
    background:#000;
    border-radius:8px;
    overflow:hidden;
  }

  iframe{position:absolute; inset:0; width:100%; height:100%; border:0;}

  .placeholder{
    position:absolute;
    inset:0;
    display:flex;
    align-items:center;
    justify-content:center;
    background:
      linear-gradient(135deg, rgba(255,255,255,0.12), rgba(255,255,255,0) 44%),
      linear-gradient(180deg, #202020, #050505);
    color:rgba(255,255,255,0.68);
    font-size:12px;
    font-weight:650;
    letter-spacing:0.12em;
    text-transform:uppercase;
  }

  .desc{padding:18px 24px 12px; color:var(--muted); font-size:15px; margin:0;}

  .links{display:flex; gap:10px; padding:0 24px 24px;}

  .links .btn{
    min-width:118px;
  }

  :global(body.modal-open){
    overflow:hidden;
  }

  @media(max-width: 700px){
    .backdrop{
      display:block;
      padding:calc(env(safe-area-inset-top, 0px) + 12px) 12px calc(env(safe-area-inset-bottom, 0px) + 20px);
    }
    .panel{
      width:100%;
      border-radius:14px;
      overflow:visible;
    }
    .top{
      position:relative;
      display:block;
      padding:22px 48px 16px;
      text-align:center;
    }
    .title{
      font-size:clamp(28px, 9vw, 42px);
      line-height:1.05;
      font-weight:650;
    }
    .sub{
      justify-content:center;
      gap:2px 0;
      margin-top:10px;
      font-size:12px;
      line-height:1.45;
      text-transform:uppercase;
      letter-spacing:0.08em;
    }
    .x{
      position:absolute;
      top:10px;
      right:8px;
      padding:8px 10px;
      font-size:13px;
    }
    .links{
      justify-content:center;
      padding:2px 16px 22px;
    }
    .links .btn{
      flex:1 1 0;
      min-width:0;
      max-width:160px;
    }
    .content{flex-direction:column;}
    .content.noPoster{max-width:none;}
    .poster{flex:none; width:100%; margin-bottom:12px;}
    .poster img{aspect-ratio:2/3; width:100%;}
    .frame{flex:none;}
  }
</style>
