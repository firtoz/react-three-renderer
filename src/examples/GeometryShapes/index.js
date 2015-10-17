import React from 'react';

import THREE from 'three';

import React3 from '../../React3/React3';

import ExampleBase from '../ExampleBase';

import Resources from './Resources';

import Shapes from './Shapes';

class GeometryShapes extends ExampleBase {
  constructor(props, context) {
    super(props, context);

    this.cameraPosition = new THREE.Vector3(0, 150, 500);
    this.groupPosition = new THREE.Vector3(0, 50, 0);


    this.targetRotationOnMouseDown = 0;

    this.mouseX = 0;
    this.mouseXOnMouseDown = 0;
    this.targetRotation = 0;

    this.state = {
      ...this.state,
      groupRotation: new THREE.Euler(0, 0, 0),
    };
  }

  componentDidMount() {
    super.componentDidMount();

    document.addEventListener('mousedown', this._onDocumentMouseDown, false);
    document.addEventListener('touchstart', this._onDocumentTouchStart, false);
    document.addEventListener('touchmove', this._onDocumentTouchMove, false);
  }

  componentWillUnmount() {
    super.componentWillUnmount();

    document.removeEventListener('mousedown', this._onDocumentMouseDown, false);
    document.removeEventListener('touchstart', this._onDocumentTouchStart, false);
    document.removeEventListener('touchmove', this._onDocumentTouchMove, false);
    document.removeEventListener('touchmove', this._onDocumentMouseMove, false);
    document.removeEventListener('touchmove', this._onDocumentMouseUp, false);
    document.removeEventListener('touchmove', this._onDocumentMouseOut, false);
  }

  _onDocumentMouseDown = (event) => {
    event.preventDefault();

    document.addEventListener('mousemove', this._onDocumentMouseMove, false);
    document.addEventListener('mouseup', this._onDocumentMouseUp, false);
    document.addEventListener('mouseout', this._onDocumentMouseOut, false);

    const {
      width,
      } = this.state;

    const windowHalfX = width / 2;

    this.mouseXOnMouseDown = event.clientX - windowHalfX;
    this.targetRotationOnMouseDown = this.targetRotation;
  };

  _onDocumentMouseMove = (event) => {
    const {
      width,
      } = this.state;

    const windowHalfX = width / 2;

    this.mouseX = event.clientX - windowHalfX;
    this.targetRotation = this.targetRotationOnMouseDown +
      ( this.mouseX - this.mouseXOnMouseDown ) * 0.02;
  };

  _onDocumentMouseUp = () => {
    document.removeEventListener('mousemove', this._onDocumentMouseMove, false);
    document.removeEventListener('mouseup', this._onDocumentMouseUp, false);
    document.removeEventListener('mouseout', this._onDocumentMouseOut, false);
  };

  _onDocumentMouseOut = () => {
    document.removeEventListener('mousemove', this._onDocumentMouseMove, false);
    document.removeEventListener('mouseup', this._onDocumentMouseUp, false);
    document.removeEventListener('mouseout', this._onDocumentMouseOut, false);
  };

  _onDocumentTouchStart = (event) => {
    if (event.touches.length === 1) {
      event.preventDefault();

      const {
        width,
        } = this.state;

      const windowHalfX = width / 2;

      this.mouseXOnMouseDown = event.touches[0].pageX - windowHalfX;
      this.targetRotationOnMouseDown = this.targetRotation;
    }
  };

  _onDocumentTouchMove = (event) => {
    if (event.touches.length === 1) {
      event.preventDefault();

      const {
        width,
        } = this.state;

      const windowHalfX = width / 2;

      this.mouseX = event.touches[0].pageX - windowHalfX;
      this.targetRotation = this.targetRotationOnMouseDown +
        ( this.mouseX - this.mouseXOnMouseDown ) * 0.05;
    }
  };

  _onAnimate = () => {
    this._onAnimateInternal();
  };

  _onAnimateInternal() {
    const groupRotationY = this.state.groupRotation.y;

    if (Math.abs(groupRotationY - this.targetRotation) > 0.0001) {
      this.setState({
        groupRotation: new THREE.Euler(0, groupRotationY +
          ( this.targetRotation - groupRotationY ) * 0.05, 0),
      });
    }
  }

  render() {
    const {
      width,
      height,
      groupRotation,
      } = this.state;

    return (<div>
      <React3
        width={width}
        height={height}
        antialias
        pixelRatio={window.devicePixelRatio}
        mainCamera="mainCamera"
        clearColor={0xf0f0f0}
        onAnimate={this._onAnimate}
      >
        <scene>
          <perspectiveCamera
            name="mainCamera"
            fov={50}
            aspect={width / height}
            near={1}
            far={1000}

            position={this.cameraPosition}
          >
            <pointLight
              color={0xffffff}
              intensity={0.8}
            />
          </perspectiveCamera>
          <Resources/>
          <group
            position={this.groupPosition}
            rotation={groupRotation}
          >
            <Shapes/>
          </group>
        </scene>
      </React3>
    </div>);
  }
}

export default GeometryShapes;
