<script>
  import { getThumbnail } from './video';

  export let items = [];
  export let onPick = (item) => {};
</script>

<div class="grid" role="list">
  {#each items as item (item.slug)}
    <button 
      class="tile" 
      type="button" 
      role="listitem" 
      on:click={() => onPick(item)}
      aria-label={item.title}
    >
      <img src={getThumbnail(item)} alt={item.title} loading="lazy" />
      <div class="title-overlay">{item.title}</div>
    </button>
  {/each}
</div>

<style>
  .grid{
    display:grid;
    grid-template-columns:repeat(3, 1fr);
    gap:6px;
  }

  .tile{
    border:0;
    padding:0;
    background:transparent;
    cursor:pointer;
    border-radius:12px;
    overflow:hidden;
    position:relative;
  }

  .tile img{
    width:100%;
    height:100%;
    aspect-ratio: 16/10;
    object-fit:cover;
    transition:transform 400ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  @media (min-width: 901px){
    .tile:hover img{transform:scale(1.02);}
  }

  .title-overlay{
    position:absolute;
    bottom:0;
    left:0;
    right:0;
    padding:12px;
    background:linear-gradient(transparent, rgba(0,0,0,0.8));
    color:#fff;
    font-size:15px;
    font-weight:600;
    text-align:center;
    letter-spacing:0.06em;
    text-transform:uppercase;
  }

  @media (max-width: 900px){
    .grid{grid-template-columns:repeat(2,1fr);}
  }

  @media (max-width: 600px){
    .grid{grid-template-columns:1fr;}
  }
</style>
