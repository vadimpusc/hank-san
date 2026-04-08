<script>
  import { onMount, onDestroy } from 'svelte';
  import { embedUrl } from './video';

  export let items = [];

  let shuffled = [];
  let selectedIndex = null;

  function shuffle() {
    shuffled = [...items].sort(() => Math.random() - 0.5);
  }

  onMount(() => {
    shuffle();
    window.addEventListener('keydown', onKey);
  });

  onDestroy(() => {
    window.removeEventListener('keydown', onKey);
  });

  function open(index) {
    selectedIndex = index;
  }

  function close() {
    selectedIndex = null;
  }

  function prev() {
    if (selectedIndex === null) return;
    selectedIndex = selectedIndex === 0 ? shuffled.length - 1 : selectedIndex - 1;
  }

  function next() {
    if (selectedIndex === null) return;
    selectedIndex = selectedIndex === shuffled.length - 1 ? 0 : selectedIndex + 1;
  }

  function watch(e) {
    e.stopPropagation();
    window.open(`/watch/?v=${selected.slug}`, '_blank');
  }

  function onKey(e) {
    if (selectedIndex === null) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') prev();
    if (e.key === 'ArrowRight') next();
  }

  $: selected = selectedIndex !== null ? shuffled[selectedIndex] : null;
  $: canWatch = selected && selected.id;
</script>

<div class="grid">
  {#each shuffled as photo, i}
    <button class="tile" type="button" on:click={() => open(i)} aria-label="View {photo.alt || 'photo'}">
      <img src={photo.src} alt={photo.alt || 'Photo'} loading="lazy" />
    </button>
  {/each}
</div>

{#if selected !== null}
  <div class="modal" role="dialog" aria-modal="true" aria-label="Photo" on:click={close}>
    <button class="nav prev" on:click|stopPropagation={prev} aria-label="Previous">‹</button>
    <div class="modalContent" on:click|stopPropagation>
      <img src={selected.src} alt={selected.alt || 'Photo'} />
      {#if canWatch}
        <div class="actions">
          <div class="videoTitle">{selected.title}</div>
          <button class="watch" on:click={watch}>Watch Video</button>
        </div>
      {/if}
    </div>
    <button class="nav next" on:click|stopPropagation={next} aria-label="Next">›</button>
    <button class="close" on:click={close} aria-label="Close">Close</button>
  </div>
{/if}

<style>
  .grid{
    display:grid;
    grid-template-columns:repeat(3, 1fr);
    gap:6px;
  }

  .tile{
    margin:0;
    padding:0;
    border:0;
    border-radius:12px;
    overflow:hidden;
    cursor:pointer;
    background:transparent;
  }

  img{width:100%; height:100%; aspect-ratio: 16/9; object-fit:cover;}

  .modal{
    position:fixed;
    inset:0;
    background:rgba(0,0,0,0.9);
    z-index:80;
    display:flex;
    align-items:center;
    justify-content:center;
    padding:18px;
  }

  .modalContent{max-width:100%; max-height:100%; position:relative;}
  .modalContent img{max-width:100%; max-height:calc(100vh - 120px); border-radius:8px;}

  .actions{position:absolute; bottom:20px; left:50%; transform:translateX(-50%); text-align:center;}
  .videoTitle{color:#fff; font-size:16px; font-weight:600; margin-bottom:10px;}

  .watch{
    background:#fff;
    color:#000;
    border:0;
    border-radius:999px;
    padding:12px 24px;
    font-weight:600;
    cursor:pointer;
    opacity:0.9;
    transition:opacity 150ms;
  }
  .watch:hover{opacity:1;}

  .nav{
    position:absolute;
    top:50%;
    transform:translateY(-50%);
    background:transparent;
    border:0;
    color:#fff;
    font-size:48px;
    font-weight:300;
    cursor:pointer;
    padding:20px;
    opacity:0.7;
    transition:opacity 150ms;
  }
  .nav:hover{opacity:1;}
  .prev{left:10px;}
  .next{right:10px;}

  .close{
    position:absolute;
    top:18px;
    right:18px;
    border:0;
    background:transparent;
    border-radius:999px;
    padding:10px 14px;
    font-weight:520;
    cursor:pointer;
    color:#fff;
    text-decoration:underline;
    text-underline-offset:6px;
  }

  @media(max-width:900px){
    .grid{grid-template-columns:repeat(2,1fr);}
  }
  @media(max-width:600px){
    .grid{grid-template-columns:1fr;}
  }
</style>
