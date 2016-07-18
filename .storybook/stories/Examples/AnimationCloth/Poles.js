import React from 'react';

import THREE from 'three';

import PureRenderMixin from 'react/lib/ReactComponentWithPureRenderMixin';

class Poles extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      poleMaterialColor: Number(0xffffff).toString(16),
      poleMaterialSpecular: Number(0x111111).toString(16),
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
      subResource: false,
    };
  }

  shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate;

  render() {
    return (<object3D>
      <resources>
        <boxGeometry
          resourceId="poleGeometry"
          width={5}
          height={375}
          depth={5}
        />
        <boxGeometry
          resourceId="boxGeometry"
          width={10}
          height={10}
          depth={10}
        />
        <meshPhongMaterial
          resourceId="poleMaterial"
          color={Number.parseInt(this.state.poleMaterialColor, 16)}
          specular={Number.parseInt(this.state.poleMaterialSpecular, 16)}
          shininess={this.state.poleMaterialShininess}
        />
      </resources>
      {this.state.sidePolePositions.map((position, i) =>
        (<mesh
          key={i}
          position={position}
          receiveShadow
          castShadow
        >
          <geometryResource
            resourceId="poleGeometry"
          />
          <materialResource
            resourceId="poleMaterial"
          />
        </mesh>))}
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
        { this.state.subResource ? <resources>
          {this.state.subResource ? <meshPhongMaterial
            resourceId="poleMaterial"
            color={0x00ff00}
            specular={0x111111}
            shininess={100}
          /> : null}
          {
            <sphereGeometry
              resourceId="boxGeometry"
              radius={20}
            /> }
        </resources> : null }
        {this.state.boxPositions.map((position, i) =>
          (<mesh
            key={i}
            position={position}
            receiveShadow
            castShadow
          >
            <geometryResource
              resourceId="boxGeometry"
            />
            <materialResource
              resourceId="poleMaterial"
            />
          </mesh>))}
      </object3D>
    </object3D>);
  }
}

export default Poles;
