<script lang="ts">
  import { Canvas } from '@threlte/core'
  import Scene from '$lib/components/Scene.svelte'

  import type { PageData } from './$types';
          
  export let data: PageData;
  
</script>

  TEST: { data.num }
<!-- <Canvas> -->
<!--   <Scene num={100} showLinks={true}  /> -->
<!-- </Canvas> -->
