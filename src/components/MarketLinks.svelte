<script>
  import { marketList } from '../data/markets';

  export let title = 'Production Markets';
  export let intro = 'Available for productions in Japan, the UK, and international projects with US partners.';
</script>

<section class="markets">
  <div>
    <div class="kicker">{title}</div>
    <p>{intro}</p>
  </div>
  <div class="marketLinks">
    {#each marketList as market}
      <a class="btn secondary" href={market.path}>{market.label}</a>
    {/each}
  </div>
</section>

<style>
  .markets{
    margin-top:28px;
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
    gap:10px;
    justify-content:flex-end;
  }

  .marketLinks .btn{
    min-width:82px;
  }

  @media(max-width: 760px){
    .markets{
      align-items:flex-start;
      flex-direction:column;
    }

    .marketLinks{
      justify-content:flex-start;
    }
  }
</style>
