<script>
  import Carousel from 'svelte-carousel'
  export let images;

  let carousel; // for calling methods of the carousel instance
  const handleNextClick = () => {
    carousel.goToNext()
  }
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

<button on:click={handleNextClick}>Next</button>