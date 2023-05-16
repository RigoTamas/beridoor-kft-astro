<script>
  import Carousel from 'svelte-carousel'
  export let images;

  let carousel; // for calling methods of the carousel instance
</script>

<Carousel
  autoplay
  autoplayDuration={5000}
  autoplayProgressVisible
  pauseOnFocus
  bind:this={carousel}
>
  {#each images as { src, alt }}
        <img {src} {alt} />
  {/each}
</Carousel>
