// see advanced.html :)

import React from 'react';
import React3Renderer from 'react-three-renderer/lib/React3Renderer';
import THREE from 'three';

// ^ Look mom, no react-dom!

const canvas = document.getElementById('canvas');

const react3Renderer = new React3Renderer();

const width = 800;
const height = 600;

const cameraPosition = new THREE.Vector3(0, 0, 5);

let cubeRotation = new THREE.Euler();

function onRecreateCanvas() {
  // no need to deal with this now, but here we'd need to create a new canvas and
  // re-render the scene there.
}

function animate() {
  cubeRotation = new THREE.Euler(
    cubeRotation.x + 0.1,
    cubeRotation.y + 0.1,
    0
  );

  react3Renderer.render(<react3
    width={width}
    height={height}

    onRecreateCanvas={onRecreateCanvas}

    context="3d"

    antialias
    mainCamera="camera"
  >
    <scene>
      <perspectiveCamera
        name="camera"
        fov={75}
        aspect={width / height}
        near={0.1}
        far={1000}

        position={cameraPosition}
      />
      <mesh
        rotation={cubeRotation}
      >
        <boxGeometry
          width={1}
          height={1}
          depth={1}
        />
        <meshBasicMaterial
          color={0xff0000}
        />
      </mesh>
    </scene>
  </react3>, canvas);

  requestAnimationFrame(animate);
}

animate();
