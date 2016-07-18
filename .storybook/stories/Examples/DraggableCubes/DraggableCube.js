import React from 'react';
const { PropTypes } = React;

import THREE from 'three';
import PureRenderMixin from 'react/lib/ReactComponentWithPureRenderMixin';

import MouseInput from '../inputs/MouseInput';

// shared plane for dragging purposes
// it's good to share because you can drag only one cube at a time
const dragPlane = new THREE.Plane();

const backVector = new THREE.Vector3(0, 0, -1);

class DraggableCube extends React.Component {
  static propTypes = {
    initialPosition: PropTypes.instanceOf(THREE.Vector3).isRequired,

    mouseInput: PropTypes.instanceOf(MouseInput),
    camera: PropTypes.instanceOf(THREE.PerspectiveCamera),

    onCreate: PropTypes.func.isRequired,

    onMouseEnter: PropTypes.func.isRequired,
    onMouseLeave: PropTypes.func.isRequired,
    onDragStart: PropTypes.func.isRequired,
    onDragEnd: PropTypes.func.isRequired,

    cursor: PropTypes.any,
  };

  constructor(props, context) {
    super(props, context);

    this.rotation = new THREE.Euler(
      Math.random() * 2 * Math.PI,
      Math.random() * 2 * Math.PI,
      Math.random() * 2 * Math.PI
    );

    this.scale = new THREE.Vector3(
      Math.random() * 2 + 1,
      Math.random() * 2 + 1,
      Math.random() * 2 + 1
    );

    this.color = new THREE.Color(Math.random() * 0xffffff);

    const hsl = this.color.getHSL();

    hsl.s = Math.min(1, hsl.s * 1.1);
    hsl.l = Math.min(1, hsl.l * 1.1);

    const { h, s, l } = hsl;

    this.hoverColor = new THREE.Color().setHSL(h, s, l);
    this.pressedColor = 0xff0000;

    const {
      initialPosition,
    } = props;

    this.state = {
      hovered: false,
      pressed: false,
      position: initialPosition,
    };
  }

  shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate;

  componentWillUnmount() {
    document.removeEventListener('mouseup', this._onDocumentMouseUp);
  }

  _onMouseEnter = () => {
    this.setState({
      hovered: true,
    });

    const { onMouseEnter } = this.props;

    onMouseEnter();
  };

  _onMouseDown = (event, intersection) => {
    event.preventDefault();
    event.stopPropagation();

    const {
      position,
    } = this.state;

    const {
      onDragStart,
      camera,
    } = this.props;

    dragPlane.setFromNormalAndCoplanarPoint(backVector.clone()
      .applyQuaternion(camera.quaternion), intersection.point);

    this._offset = intersection.point.clone().sub(position);

    document.addEventListener('mouseup', this._onDocumentMouseUp);
    document.addEventListener('mousemove', this._onDocumentMouseMove);

    this.setState({
      pressed: true,
    });

    onDragStart();
  };

  _onDocumentMouseMove = (event) => {
    event.preventDefault();

    const {
      mouseInput,
    } = this.props;

    const ray:THREE.Ray = mouseInput.getCameraRay(new THREE
      .Vector2(event.clientX, event.clientY));

    const intersection = dragPlane.intersectLine(new THREE.Line3(
      ray.origin,
      ray.origin.clone()
        .add(ray.direction.clone().multiplyScalar(10000))
    ));

    if (intersection) {
      this.setState({
        position: intersection.sub(this._offset),
      });
    }
  };

  _onDocumentMouseUp = (event) => {
    event.preventDefault();

    document.removeEventListener('mouseup', this._onDocumentMouseUp);
    document.removeEventListener('mousemove', this._onDocumentMouseMove);

    const {
      onDragEnd,
    } = this.props;

    onDragEnd();

    this.setState({
      pressed: false,
    });
  };

  _onMouseLeave = () => {
    if (this.state.hovered) {
      this.setState({
        hovered: false,
      });
    }

    const {
      onMouseLeave,
    } = this.props;

    onMouseLeave();
  };

  _ref = (mesh) => {
    const {
      onCreate,
    } = this.props;

    onCreate(mesh);
  };

  render() {
    const {
      rotation,
      scale,
    } = this;

    const {
      cursor: {
        dragging,
      },
    } = this.props;

    const {
      hovered,
      pressed,
      position,
    } = this.state;

    let color;

    const hoverHighlight = (hovered && !dragging);
    if (pressed) {
      color = this.pressedColor;
    } else if (hoverHighlight) {
      color = this.hoverColor;
    } else {
      color = this.color;
    }

    return (<group
      position={position}
      rotation={rotation}
      scale={scale}
    >
      <mesh
        castShadow
        receiveShadow

        onMouseEnter={this._onMouseEnter}
        onMouseDown={this._onMouseDown}
        onMouseLeave={this._onMouseLeave}

        ref={this._ref}
      >
        <geometryResource
          resourceId="boxGeometry"
        />
        <meshLambertMaterial
          color={color}
        />
      </mesh>
      {hoverHighlight ? <mesh
        ignorePointerEvents
      >
        <geometryResource
          resourceId="boxGeometry"
        />
        <materialResource
          resourceId="highlightMaterial"
        />
      </mesh> : null}
    </group>);
  }
}

export default DraggableCube;
