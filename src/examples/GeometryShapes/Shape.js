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

  constructor(props, context) {
    super(props, context);

    const {
      rx,
      ry,
      rz,
      s,
      } = this.props;

    this.rotation = new THREE.Euler(rx, ry, rz);
    this.scale = new THREE.Vector3(s, s, s);
  }

  render() {
    const {
      resourceId,
      color,
      x,
      y,
      z,
      } = this.props;

    return (<group>
      <mesh
        position={new THREE.Vector3(x, y, z - 175)}
        rotation={this.rotation}
        scale={this.scale}
      >
        <shapeGeometryResource
          resourceId={resourceId}
          type="shape"
        />
        <meshPhongMaterial
          side={THREE.DoubleSide}
        >
          <textureResource
            resourceId="texture"
          />
        </meshPhongMaterial>
      </mesh>
      <mesh
        position={new THREE.Vector3(x, y, z - 125)}
        rotation={this.rotation}
        scale={this.scale}
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
        position={new THREE.Vector3(x, y, z - 75)}
        rotation={this.rotation}
        scale={this.scale}
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
        position={new THREE.Vector3(x, y, z - 25)}
        rotation={this.rotation}
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
      <line
        position={new THREE.Vector3(x, y, z + 75)}
        rotation={this.rotation}
      >
        <shapeGeometryResource
          resourceId={resourceId}
          type="spacedPoints"
        />
        <lineBasicMaterial
          color={color}
          // wireframe
        />
      </line>
    </group>);
  }
}

export default Shape;
