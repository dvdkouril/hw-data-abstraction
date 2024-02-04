<script lang="ts">
  import { Canvas } from '@threlte/core'
  import Scene from './Scene.svelte'

  export let numOfSpheres: number = 10;
  export let showLinks: boolean = true;
</script>

<Canvas>
  <Scene num={numOfSpheres} {showLinks}  />
</Canvas>
