<script lang="ts">
  import { T, useThrelte } from '@threlte/core'
  import { ContactShadows, Float, Grid, OrbitControls } from '@threlte/extras'
  import { Vector3, Euler, Quaternion, Color } from 'three';

  const { scene } = useThrelte();
  scene.background = new Color("#ffffff");

  // $: spherePositions = generateRandomSpheres(1000, 5);
  // const NUM = 1000;
  const NUM = 10;
  const RADIUS = 6;
  const showLinks = true;
  $: spherePositions = generateRandomPointsInSphere(NUM, RADIUS);
  $: tubes = computeTubes(spherePositions);


  export const getRotationFromTwoPositions = (from: Vector3, to: Vector3) => {
      const fromCopy = new Vector3(from.x, from.y, from.z);
      const toCopy = new Vector3(to.x, to.y, to.z);
      const q = new Quaternion();
      const u = new Vector3(0, 1, 0);
      const v = toCopy.sub(fromCopy).normalize();

      q.setFromUnitVectors(u, v);

      const eulers = new Euler();
      return eulers.setFromQuaternion(q);
  }

  export const computeTubes = (bins: { x: number; y: number; z: number }[]) => {
    const t: {position: Vector3, rotation: Euler, scale: number}[] = [];
    for (let i = 0; i < bins.length - 1; i++) {
        const first = new Vector3(bins[i].x, bins[i].y, bins[i].z);
        const second = new Vector3(
            bins[i + 1].x,
            bins[i + 1].y,
            bins[i + 1].z
        );

        //~ position between the two bins
        const pos = new Vector3();
        pos.subVectors(second, first);
        pos.divideScalar(2);
        pos.addVectors(first, pos);
        const tubePosition = pos;
        //~ rotation
        const tubeRotation = getRotationFromTwoPositions(first, second);
        //~ tube length
        const betweenVec = new Vector3();
        betweenVec.subVectors(second, first);
        const tubeScale = betweenVec.length();

        t.push({
            position: tubePosition,
            rotation: tubeRotation,
            scale: tubeScale,
        });
    }

    // console.log(t);
    return t;
};

  const generateRandomPointsInSphere = (n: number, radius: number) => {
    const arr: Vector3[] = [];

    for (let i = 0; i < n; i++) {
      //~ v2
      // const phi = 2 * Math.PI * Math.random();
      // const costheta = 2 * Math.random() - 1;
      // const theta = Math.acos(costheta);
      //
      // const randX = radius * Math.sin(theta) * Math.cos(phi);
      // const randY = radius * Math.sin(theta) * Math.sin(phi);
      // const randZ = radius * Math.cos(theta);
      // //~ v1
      const power = 2;
      const r = radius * Math.random() ** (1/power);
      const theta = 2 * Math.PI * Math.random();
      const phi = Math.acos(2 * Math.random() - 1);
      const randX = r * Math.sin(phi) * Math.cos(theta);
      const randY = r * Math.sin(phi) * Math.sin(theta);
      const randZ = r * Math.cos(phi);
      const randomPos = new Vector3(randX, randY, randZ);
      arr.push(randomPos);
    }

    return arr;
  };

  const generateRandomSpheres = (n: number, domain: number) => {
    const arr: Vector3[] = [];

    for (let i = 0; i < n; i++) {
      const randX = Math.random() * 2 * domain - domain;
      const randY = Math.random() * 2 * domain - domain;
      const randZ = Math.random() * 2 * domain - domain;
      const randomPos = new Vector3(randX, randY, randZ);
      arr.push(randomPos);
    }

    return arr;
  };
</script>

<T.PerspectiveCamera
  makeDefault
  position={[-10, 10, 80]}
  fov={15}
>
  <OrbitControls
    enableZoom={true}
    enableDamping
    target.y={1.5}
  />
  <!-- <OrbitControls -->
  <!--   autoRotate -->
  <!--   enableZoom={true} -->
  <!--   enableDamping -->
  <!--   autoRotateSpeed={0.5} -->
  <!--   target.y={1.5} -->
  <!-- /> -->
</T.PerspectiveCamera>

<T.DirectionalLight
  intensity={0.8}
  position.x={5}
  position.y={10}
  position.z={80}
/>
<T.AmbientLight intensity={0.2} />

{#each spherePositions as pos }
  <T.Mesh
    position.x={pos.x}
    position.y={pos.y}
    position.z={pos.z}
  >
    <T.SphereGeometry args={[0.1]} />
    <T.MeshStandardMaterial color="#ffffff" />
  </T.Mesh>
{/each}


{#if showLinks }
  {#each tubes as tube }
    <T.Mesh
      position.x={tube.position.x}
      position.y={tube.position.y}
      position.z={tube.position.z}
      rotation={[tube.rotation.x, tube.rotation.y, tube.rotation.z, tube.rotation.order]}
      scale.y={tube.scale}
    >
      <T.CylinderGeometry args={[0.01, 0.01, 1.0, 6, 1]} />
      <T.MeshStandardMaterial color="#ffffff" />
    </T.Mesh>
  {/each}
{/if}
