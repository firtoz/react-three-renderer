import React from 'react';
import THREE from 'three';
import PropTypes from 'react/lib/ReactPropTypes';

const extrudeSettings = {
  amount: 8,
  bevelEnabled: true,
  bevelSegments: 2,
  steps: 2,
  bevelSize: 1,
  bevelThickness: 1,
};

class Shape extends React.Component {
  static propTypes = {
    resourceId: PropTypes.string.isRequired,
    color: PropTypes.any.isRequired,
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    z: PropTypes.number.isRequired,
    rx: PropTypes.number.isRequired,
    ry: PropTypes.number.isRequired,
    rz: PropTypes.number.isRequired,
    s: PropTypes.number.isRequired,
  };

  render() {
    const {
      rx,
      ry,
      rz,
      s,
      resourceId,
      color,
      x,
      y,
      z,
      } = this.props;

    const rotation = new THREE.Euler(rx, ry, rz);
    const scale = new THREE.Vector3(s, s, s);

    return (<group>
      <mesh
        // flat shape with texture
        position={new THREE.Vector3(x, y, z - 175)}
        rotation={rotation}
        scale={scale}
      >
        <shapeGeometryResource
          resourceId={resourceId}
          type="shape"
        />
        <materialResource
          resourceId="phongMaterial"
        />
      </mesh>
      <mesh
        // flat shape
        position={new THREE.Vector3(x, y, z - 125)}
        rotation={rotation}
        scale={scale}
      >
        <shapeGeometryResource
          resourceId={resourceId}
          type="shape"
        />
        <meshPhongMaterial
          color={color}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh
        // 3d shape
        position={new THREE.Vector3(x, y, z - 75)}
        rotation={rotation}
        scale={scale}
      >
        <extrudeGeometry
          settings={extrudeSettings}
        >
          <shapeResource
            resourceId={resourceId}
          />
        </extrudeGeometry>
        <meshPhongMaterial
          color={color}
        />
      </mesh>
      <line
        // solid line
        position={new THREE.Vector3(x, y, z - 25)}
        rotation={rotation}
      >
        <shapeGeometryResource
          resourceId={resourceId}
          type="points"
        />
        <lineBasicMaterial
          color={color}
          // wireframe
        />
      </line>
      <points
        // vertices from real points
        position={new THREE.Vector3(x, y, z + 25)}
        rotation={rotation}
      >
        <shapeGeometryResource
          resourceId={resourceId}
          type="points"
        />
        <pointsMaterial
          color={color}
          size={4}
          // wireframe
        />
      </points>
      <line
        // line from equidistance sampled points
        position={new THREE.Vector3(x, y, z + 75)}
        rotation={rotation}
      >
        <shapeGeometryResource
          resourceId={resourceId}
          type="spacedPoints"
          divisions={50}
        />
        <lineBasicMaterial
          color={color}
          linewidth={3}
          // wireframe
        />
      </line>
      <points
        // equidistance sampled points
        position={new THREE.Vector3(x, y, z + 125)}
        rotation={rotation}
      >
        <shapeGeometryResource
          resourceId={resourceId}
          type="spacedPoints"
          divisions={50}
        />
        <pointsMaterial
          color={color}
          size={4}
          // wireframe
        />
      </points>
    </group>);
  }
}

export default Shape;
