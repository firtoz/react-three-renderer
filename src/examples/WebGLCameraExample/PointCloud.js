import React from 'react';
import THREE from 'three.js';

class PointCloud extends React.Component {
  shouldComponentUpdate() {
    return false;
  }

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
