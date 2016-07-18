import React from 'react';
import THREE from 'three';

const { PropTypes } = React;

const meshScale = new THREE.Vector3(1, 1, 1).multiplyScalar(0.5);

class RotatingCube extends React.Component {
  static propTypes = {
    position: PropTypes.instanceOf(THREE.Vector3).isRequired,
    quaternion: PropTypes.instanceOf(THREE.Quaternion).isRequired,
  };

  render() {
    const {
      position,
      quaternion,
    } = this.props;

    return (<mesh
      position={position}
      quaternion={quaternion}
      scale={meshScale}

      castShadow
    >
      <geometryResource
        resourceId="cubeGeo"
      />
      <materialResource
        resourceId="cubeMaterial"
      />
    </mesh>);
  }
}

export default RotatingCube;
