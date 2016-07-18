import React from 'react';
import THREE from 'three';

const { PropTypes } = React;

class PickableMesh extends React.Component {
  static propTypes = {
    position: PropTypes.instanceOf(THREE.Vector3).isRequired,
    quaternion: PropTypes.instanceOf(THREE.Quaternion).isRequired,
    meshes: PropTypes.arrayOf(PropTypes.instanceOf(THREE.Mesh)).isRequired,
    bodyIndex: PropTypes.number.isRequired,

    onMouseDown: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const {
      mesh,
    } = this.refs;

    const {
      bodyIndex,
      meshes,
    } = this.props;

    mesh.userData._bodyIndex = bodyIndex;

    meshes.push(mesh);
  }

  componentWillUnmount() {
    const {
      mesh,
    } = this.refs;

    const {
      meshes,
    } = this.props;

    meshes.splice(meshes.indexOf(mesh), 1);
  }

  _onMouseDown = (event, intersection) => {
    event.preventDefault();

    this.props.onMouseDown(this.refs.mesh.userData._bodyIndex, intersection);
  };

  render() {
    const {
      position,
      quaternion,
    } = this.props;

    return (<mesh
      position={position}
      quaternion={quaternion}

      ref="mesh"

      castShadow

      onMouseDown={this._onMouseDown}
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

export default PickableMesh;
