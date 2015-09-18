import React from 'react';

import THREE from 'three';

class Poles extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.poleGeometry = new THREE.BoxGeometry(5, 375, 5);
    this.boxGeometry = new THREE.BoxGeometry(10, 10, 10);

    this.state = {
      poleMaterialColor: new Number(0xffffff).toString(16),
      poleMaterialSpecular: new Number(0x111111).toString(16),
      poleMaterialShininess: 100,
      sidePolePositions: [
        new THREE.Vector3(-125, -62, 0),
        new THREE.Vector3(125, -62, 0),
      ],
      boxPositions: [
        new THREE.Vector3(125, -250, 0),
        new THREE.Vector3(-125, -250, 0),
      ],
      topPolePosition: new THREE.Vector3(0, -250 + 750 / 2, 0),
      subResource: true,
    };
  }

  componentWillUnmount() {
    this.poleGeometry.dispose();
    delete this.poleGeometry;
  }

  render() {
    return (<object3D>
      <resources>
        <boxGeometry
          resourceId="poleGeometry"
          width={5}
          height={375}
          depth={5}/>
        <meshPhongMaterial
          resourceId="poleMaterial"
          color={Number.parseInt(this.state.poleMaterialColor, 16)}
          specular={Number.parseInt(this.state.poleMaterialSpecular, 16)}
          shininess={this.state.poleMaterialShininess}
        />
      </resources>
      {this.state.sidePolePositions.map((position, i) => {
        return (<mesh
          key={i}
          geometry={this.poleGeometry}
          position={position}
          receiveShadow
          castShadow
        >
          <materialResource
            resourceId="poleMaterial"
          />
        </mesh>);
      })}
      <mesh
        position={this.state.topPolePosition}
        receiveShadow
        castShadow
      >
        <boxGeometry
          width={255}
          height={5}
          depth={5}
        />
        <materialResource
          resourceId="poleMaterial"
        />
      </mesh>
      <object3D>
        <resources>
          {this.state.subResource ? <meshPhongMaterial
            resourceId="poleMaterial"
            color={0x00ff00}
            specular={0x111111}
            shininess={100}
          /> : null}
        </resources>
        {this.state.boxPositions.map((position, i) => {
          return (<mesh
            key={i}
            geometry={this.boxGeometry}
            position={position}
            receiveShadow
            castShadow
          >
            <materialResource
              resourceId="poleMaterial"
            />
          </mesh>);
        })}
      </object3D>
    </object3D>);
  }
}

export default Poles;
