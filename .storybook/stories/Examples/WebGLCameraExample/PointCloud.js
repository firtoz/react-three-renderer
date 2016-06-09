import React from 'react';
import THREE from 'three';

class PointCloud extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.pointCloudVertices = [];

    for (let i = 0; i < 10000; i++) {
      const vertex = new THREE.Vector3();

      vertex.x = THREE.Math.randFloatSpread(2000);
      vertex.y = THREE.Math.randFloatSpread(2000);
      vertex.z = THREE.Math.randFloatSpread(2000);

      this.pointCloudVertices.push(vertex);
    }
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (<points>
      <geometry vertices={this.pointCloudVertices}/>
      <pointsMaterial
        color={0x888888}
      />
    </points>);
  }
}

export default PointCloud;
