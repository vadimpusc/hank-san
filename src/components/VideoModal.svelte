<script>
  import { onMount, onDestroy } from 'svelte';
  import { embedUrl } from './video';

  export let item;
  export let open = false;
  export let onClose = () => {};

  function close() {
    onClose();
  }

  function onKey(e) {
    if (e.key === 'Escape') close();
  }

  onMount(() => {
    window.addEventListener('keydown', onKey);
  });

  onDestroy(() => {
    window.removeEventListener('keydown', onKey);
  });
</script>

{#if open}
  <div class="backdrop" role="dialog" aria-modal="true" aria-label="Video" on:click={close}>
    <div class="panel" on:click|stopPropagation>
      <div class="top">
        <div class="meta">
          <div class="title">{item.title}</div>
          <div class="sub">
            {#if item.credit}<span>{item.credit}.</span>{/if}
            {#if item.director}<span>dir. {item.director}</span>{/if}
            {#if item.client}<span class="dot">•</span><span>{item.client}</span>{/if}
            {#if item.prodCompany}<span class="dot">•</span><span>{item.prodCompany}</span>{/if}
            {#if item.year}<span class="dot">•</span><span>{item.year}</span>{/if}
            {#if item.genre}<span class="dot">•</span><span>{item.genre}</span>{/if}
          </div>
        </div>
        <button class="x" on:click={close} aria-label="Close">Close</button>
      </div>

      <div class="content">
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
            <img class="placeholder" src="/stills/placeholder.jpg" alt="No video available" />
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
    background:rgba(0,0,0,0.45);
    z-index:80;
    display:flex;
    align-items:center;
    justify-content:center;
    padding:18px;
  }

  .panel{
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
    gap:16px;
    padding:16px 16px 10px;
  }

  .title{font-weight:620; font-size:22px;}
  .muted{color:var(--muted); font-weight:520;}
  .sub{margin-top:4px; color:var(--muted); font-size:13px; font-weight:500;}
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

  .content{display:flex; gap:16px; padding:0 16px; align-items:center;}

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

  .placeholder{width:100%; height:100%; object-fit:cover;}

  .desc{padding:14px 16px 12px; color:var(--muted); font-size:15px; margin:0;}

  .links{display:flex; gap:10px; padding:0 16px 18px;}

  @media(max-width: 700px){
    .content{flex-direction:column;}
    .poster{display:none;}
    .frame{flex:none;}
  }
</style>
