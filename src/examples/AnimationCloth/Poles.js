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

    this.boxGeometry = new THREE.BoxGeometry(10, 10, 10);

    this.state = {
      poleMaterialColor: this.poleMaterial.color.getHex().toString(16),
      poleMaterialSpecular: this.poleMaterial.specular.getHex().toString(16),
      poleMaterialShininess: this.poleMaterial.shininess,
      sidePolePositions: [
        new THREE.Vector3(-125, -62, 0),
        new THREE.Vector3(125, -62, 0),
      ],
      boxPositions: [
        new THREE.Vector3(125, -250, 0),
        new THREE.Vector3(-125, -250, 0),
      ],
      topPolePosition: new THREE.Vector3(0, -250 + 750 / 2, 0),
    };
  }

  componentWillUnmount() {
    this.poleGeometry.dispose();
    delete this.poleGeometry;

    this.poleMaterial.dispose();
    delete this.poleMaterial;
  }

  render() {
    this.poleMaterial.color.set(Number.parseInt(this.state.poleMaterialColor, 16));
    this.poleMaterial.specular.set(Number.parseInt(this.state.poleMaterialSpecular, 16));
    this.poleMaterial.shininess = this.state.poleMaterialShininess;

    return (<object3D>
      {this.state.sidePolePositions.map((position, i) => {
        return (<mesh
          key={i}
          geometry={this.poleGeometry}
          material={this.poleMaterial}
          position={position}
          receiveShadow
          castShadow
        />);
      })}
      <mesh
        material={this.poleMaterial}
        position={this.state.topPolePosition}
        receiveShadow
        castShadow
      >
        <boxGeometry
          width={255}
          height={5}
          depth={5}
        />
      </mesh>
      {this.state.boxPositions.map((position, i) => {
        return (<mesh
          key={i}
          geometry={this.boxGeometry}
          material={this.poleMaterial}
          position={position}
          receiveShadow
          castShadow
        />);
      })}
    </object3D>);
  }
}

export default Poles;
