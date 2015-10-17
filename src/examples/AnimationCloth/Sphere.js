import React from 'react';

import THREE from 'three.js';

import PureRenderMixin from 'react/lib/ReactComponentWithPureRenderMixin';

const { PropTypes } = React;

const ballSize = 60; // 40

class Sphere extends React.Component {
  static propTypes = {
    visible: PropTypes.bool.isRequired,
    position: PropTypes.instanceOf(THREE.Vector3).isRequired,
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      color: 'ffffff',
    };
  }

  shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate;

  render() {
    const {
      visible,
      position,
      } = this.props;

    return (<mesh
      castShadow
      receiveShadow
      visible={visible}
      position={position}
    >
      <sphereGeometry
        radius={ballSize}
        widthSegments={20}
        heightSegments={20}
      />
      <meshPhongMaterial
        color={Number.parseInt(this.state.color, 16)}
      />
    </mesh>);
  }
}

export default Sphere;
