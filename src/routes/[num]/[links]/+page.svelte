<script lang="ts">
  import App from '$lib/components/App.svelte'

  import type { PageData } from './$types';
          
  export let data: PageData;
</script>

<div>
  <App numOfSpheres={data.num} showLinks={data.links} />
</div>

<style>
  :global(body) {
    margin: 0;
  }

  div {
    width: 100vw;
    height: 100vh;
    background: rgb(13, 19, 32);
    background: linear-gradient(180deg, rgba(13, 19, 32, 1) 0%, rgba(8, 12, 21, 1) 100%);
  }
</style>
