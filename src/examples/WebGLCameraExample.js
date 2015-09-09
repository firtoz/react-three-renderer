import React from 'react';
import THREE from 'three';

import React3 from '../React3/React3';

import Info from './WebGLCameraExample/Info';

import PointCloud from './WebGLCameraExample/PointCloud';

const perspectiveCameraName = 'perspectiveCamera';
const orthographicCameraName = 'orthographicCamera';
const mainCameraName = 'mainCamera';

class WebGLCameraExample extends React.Component {
  constructor(props, context) {
    super(props, context);

    const r = Date.now() * 0.0005;

    this.state = {
      width: window.innerWidth,
      height: window.innerHeight,
      meshPosition: new THREE.Vector3(Math.cos(r), Math.sin(r), Math.sin(r)).multiplyScalar(700),
      childPosition: new THREE.Vector3(70 * Math.cos(2 * r), 150, 70 * Math.sin(r)),
      activeCameraName: perspectiveCameraName,
    };
  }

  componentDidMount() {
    document.addEventListener('keydown', this._onKeyDown, false);

    window.addEventListener('resize', this._onWindowResize, false);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this._onKeyDown, false);

    window.removeEventListener('resize', this._onWindowResize, false);
  }

  _onWindowResize = () => {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  _onKeyDown = (event) => {
    switch (event.keyCode) {
    default:
      break;
    case 79: // O
      this.setState({
        activeCameraName: orthographicCameraName,
      });
      break;
    case 80: // P
      this.setState({
        activeCameraName: perspectiveCameraName,
      });

      break;
    }
  };

  _onAnimate = () => {
    const r = Date.now() * 0.0005;

    this.setState({
      r,
      meshPosition: new THREE.Vector3(Math.cos(r), Math.sin(r), Math.sin(r)).multiplyScalar(700),
      childPosition: new THREE.Vector3(70 * Math.cos(2 * r), 150, 70 * Math.sin(r)),
    });
  };

  render() {
    const {
      width,
      height,
      meshPosition,
      childPosition,
      r,
      } = this.state;

    const aspectRatio = 0.5 * width / height;

    return (<div>
      <Info/>
      <React3 width={width}
              height={height}
              antialias={true}
              onAnimate={this._onAnimate}>
        <viewport
          x={0}
          y={0}
          width={width / 2}
          height={height}
          cameraName={this.state.activeCameraName}/>
        <viewport
          x={width / 2}
          y={0}
          width={width / 2}
          height={height}
          cameraName={mainCameraName}/>
        <scene>
          <perspectiveCamera
            name={mainCameraName}
            fov={50}
            aspect={aspectRatio}
            near={1}
            far={10000}
            position={new THREE.Vector3(0, 0, 2500)}/>
          <object3D
            lookAt={meshPosition}>
            <perspectiveCamera
              name={perspectiveCameraName}
              fov={35 + 30 * Math.sin( 0.5 * r )}
              aspect={aspectRatio}
              near={150}
              far={meshPosition.length()}
              rotation={new THREE.Euler(0, Math.PI, 0)}/>
            <orthographicCamera
              name={orthographicCameraName}
              left={0.5 * width / -2}
              right={0.5 * width / 2}
              top={height / 2}
              bottom={height / -2}
              near={150}
              far={meshPosition.length()}
              rotation={new THREE.Euler(0, Math.PI, 0)}/>
            <mesh
              position={new THREE.Vector3(0, 0, 150)}>
              <sphereGeometry
                radius={5}
                widthSegments={16}
                heightSegments={8}/>
              <meshBasicMaterial
                color={0x0000ff}
                wireframe={true}/>
            </mesh>
          </object3D>
          <cameraHelper
            cameraName={this.state.activeCameraName}/>
          <object3D
            position={meshPosition}>
            <mesh>
              <sphereGeometry
                radius={100}
                widthSegments={16}
                heightSegments={8}/>
              <meshBasicMaterial
                color={0xffffff}
                wireframe={true}/>
            </mesh>
            <mesh
              position={childPosition}>
              <sphereGeometry
                radius={50}
                widthSegments={16}
                heightSegments={8}/>
              <meshBasicMaterial
                color={0x00ff00}
                wireframe={true}/>
            </mesh>
          </object3D>
          <PointCloud/>
        </scene>
      </React3>
    </div>);
  }
}

export default WebGLCameraExample;
