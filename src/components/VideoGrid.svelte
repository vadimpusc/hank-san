<script>
  export let items = [];
  export let onPick = (item) => {};
</script>

<div class="grid" role="list">
  {#each items as item (item.slug)}
    <div class="gridItem" role="listitem">
      <button
        class="tile"
        type="button"
        on:click={() => onPick(item)}
        aria-label={item.title}
      >
        {#if item.thumbnail}
          <img src={item.thumbnail} alt={item.title} loading="lazy" />
        {:else}
          <div class="framePlaceholder" aria-hidden="true">
            <span>Coming Soon</span>
          </div>
        {/if}
        <div class="title-overlay">{item.title}</div>
      </button>
    </div>
  {/each}
</div>

<style>
  .grid{
    display:grid;
    grid-template-columns:repeat(3, 1fr);
    gap:6px;
  }

  .gridItem{min-width:0;}

  .tile{
    display:block;
    width:100%;
    height:100%;
    border:0;
    padding:0;
    background:transparent;
    cursor:pointer;
    border-radius:12px;
    overflow:hidden;
    position:relative;
    transform:translateZ(0);
  }

  .tile img,
  .framePlaceholder{
    width:100%;
    height:100%;
    aspect-ratio: 16/10;
  }

  .tile img{
    object-fit:cover;
  }

  .framePlaceholder{
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

  .tile img,
  .framePlaceholder{
    transition:transform 400ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  @media (min-width: 901px){
    .tile:hover img,
    .tile:hover .framePlaceholder{transform:scale(1.02);}
  }

  .title-overlay{
    position:absolute;
    bottom:0;
    left:0;
    right:0;
    padding:12px;
    background:linear-gradient(transparent, rgba(0,0,0,0.78));
    color:#fff;
    font-size:15px;
    font-weight:600;
    text-align:center;
    letter-spacing:0.06em;
    text-transform:uppercase;
  }

  @media (max-width: 900px){
    .grid{
      grid-template-columns:repeat(2,1fr);
      gap:8px;
    }
    .tile{border-radius:8px;}
    .title-overlay{
      padding:28px 7px 8px;
      font-size:11px;
      line-height:1.15;
      letter-spacing:0.04em;
      background:linear-gradient(transparent 0%, rgba(0,0,0,0.18) 34%, rgba(0,0,0,0.84) 100%);
    }
  }
</style>
