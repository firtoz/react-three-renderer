import React from 'react';

import THREE from 'three';

class Poles extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.poleGeometry = new THREE.BoxGeometry(5, 375, 5);
    this.poleMaterial = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      specular: 0x111111,
      shininess: 100,
    });

    this.sidePolePositions = [
      new THREE.Vector3(-125, -62, 0),
      new THREE.Vector3(125, -62, 0),
    ];

    this.topPolePosition = new THREE.Vector3(0, -250 + 750 / 2, 0);

    this.boxGeometry = new THREE.BoxGeometry(10, 10, 10);

    this.lastPolePosition = new THREE.Vector3(-250, -125);

    this.boxPositions = [
      new THREE.Vector3(125, -250, 0),
      new THREE.Vector3(-125, -250, 0),
    ];
  }

  componentWillUnmount() {
    this.poleGeometry.dispose();
    delete this.poleGeometry;

    this.poleMaterial.dispose();
    delete this.poleMaterial;
  }

  render() {
    return (<object3D>
      {this.sidePolePositions.map((position, i) => {
        return (<mesh
          key={i}
          geometry={this.poleGeometry}
          material={this.poleMaterial}
          position={position}
          receiveShadow={true}
          castShadow={true}
        />);
      })}
      <mesh
        material={this.poleMaterial}
        position={this.topPolePosition}
        receiveShadow={true}
        castShadow={true}
      >
        <boxGeometry
          width={255}
          height={5}
          depth={5}
        />
      </mesh>
      {this.boxPositions.map((position, i) => {
        return (<mesh
          key={i}
          geometry={this.boxGeometry}
          material={this.poleMaterial}
          position={position}
          receiveShadow={true}
          castShadow={true}
        />);
      })}
    </object3D>);
  }
}

export default Poles;
