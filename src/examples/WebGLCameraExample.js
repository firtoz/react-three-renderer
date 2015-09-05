import React from 'react';
import THREE from 'three';

import React3 from '../React3/React3';

class Info extends React.Component {
  render() {
    return (<div style={{
      position: 'absolute',
      top: 0,
      width: '100%',
      padding: 5,
      zIndex: 100,
    }}>
      <a href="http://threejs.org" style={{
        color: '#0080ff',
      }}>three.js</a> - cameras<br/>
      <b style={{
        color: 'lightgreen',
      }}>O</b> orthographic <b style={{
        color: 'lightgreen',
      }}>P</b> perspective
    </div>);
  }
}

class WebGLCameraExample extends React.Component {
  constructor(props, context) {
    super(props, context);

    const r = Date.now() * 0.0005;

    this.pointCloudVertices = [];

    for (let i = 0; i < 10000; i++) {
      const vertex = new THREE.Vector3();

      vertex.x = THREE.Math.randFloatSpread(2000);
      vertex.y = THREE.Math.randFloatSpread(2000);
      vertex.z = THREE.Math.randFloatSpread(2000);

      this.pointCloudVertices.push(vertex);
    }

    this.state = {
      width: window.innerWidth,
      height: window.innerHeight,
      cameraHelpers: [],
      perspectiveCamera: null,
      orthographicCamera: null,
      currentCamera: null,
      meshPosition: new THREE.Vector3(Math.cos(r), Math.sin(r), Math.sin(r)).multiplyScalar(700),
      childPosition: new THREE.Vector3(70 * Math.cos(2 * r), 150, 70 * Math.sin(r)),
      testObjects: [],
      active: true,
    };
  }

  componentDidMount() {
    const {
      width,
      height,
      } = this.state;

    this.setState({
      activeCamera: 'perspective',
    }, () => {
      // helpers will be mounted now!
      this.setState({
        viewports: [
          {
            x: 0,
            y: 0,
            width: width / 2,
            height: height,
            cameraName: 'perspectiveCamera',
            onBeforeRender: () => {
              this.setState({
                currentCamera: 'perspective',
              });
            },
          },
          {
            x: width / 2,
            y: 0,
            width: width / 2,
            height: height,
            cameraName: 'mainCamera',
            onBeforeRender: () => {
              this.setState({
                currentCamera: 'main',
              });
            },
          },
        ],
      });
    });

    document.addEventListener('keydown', this._onKeyDown, false);
  }

  _onKeyDown = (event) => {
    const {
      width,
      height,
      } = this.state;

    switch (event.keyCode) {
    default:
      break;
    case 76: // l?
      this.setState({
        active: !this.state.active,
      });
      break;
    case 77: // m?
      this.setState({
        testObjects: this.state.testObjects.slice(0, -1),
      });
      break;
    case 78: // n?
      this.setState({
        testObjects: this.state.testObjects.concat({}),
      });
      break;
    case 79: // O
      this.setState({
        activeCamera: 'orthographic',
        viewports: [
          {
            x: 0,
            y: 0,
            width: width / 2,
            height: height,
            cameraName: 'orthographicCamera',
            onBeforeRender: () => {
              this.setState({
                currentCamera: 'orthographic',
              });
            },
          },
          {
            x: width / 2,
            y: 0,
            width: width / 2,
            height: height,
            cameraName: 'mainCamera',
            onBeforeRender: () => {
              this.setState({
                currentCamera: 'main',
              });
            },
          },
        ],
      });
      break;
    case 80: // P
      this.setState({
        activeCamera: 'perspective',
        viewports: [
          {
            x: 0,
            y: 0,
            width: width / 2,
            height: height,
            cameraName: 'perspectiveCamera',
            onBeforeRender: () => {
              this.setState({
                currentCamera: 'perspective',
              });
            },
          },
          {
            x: width / 2,
            y: 0,
            width: width / 2,
            height: height,
            cameraName: 'mainCamera',
            onBeforeRender: () => {
              this.setState({
                currentCamera: 'main',
              });
            },
          },
        ],
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
      viewports,
      meshPosition,
      childPosition,
      r,
      } = this.state;


    const cameraHelpers = [];
    const aspectRatio = 0.5 * width / height;

    const cameraComponent = (<perspectiveCamera
      name="mainCamera"
      fov={50}
      aspect={aspectRatio}
      near={1}
      far={10000}
      position={new THREE.Vector3(0, 0, 2500)}
    />);

    const cameraPerspectiveComponent = (<perspectiveCamera
      name="perspectiveCamera"
      fov={35 + 30 * Math.sin( 0.5 * r )}
      aspect={aspectRatio}
      near={150}
      far={meshPosition.length()}
      rotation={new THREE.Euler(0, Math.PI, 0)}
    />);

    //if (cameraPerspective) {
    //  const visible = activeCamera !== 'orthographic' && currentCamera !== 'perspective';
    //
    //  cameraHelpers.push(<cameraHelper
    //    key="perspective"
    //    ref="cameraPerspectiveHelper"
    //    camera={cameraPerspective}
    //    autoUpdate={true}
    //    visible={visible}
    //  />);
    //}

    const cameraOrthographicComponent = (<orthographicCamera
      name="orthographicCamera"
      left={0.5 * width / -2}
      right={0.5 * width / 2}
      top={height / 2}
      bottom={height / -2}
      near={150}
      far={meshPosition.length()}
      rotation={new THREE.Euler(0, Math.PI, 0)}
    />);

    //if (cameraOrthographic) {
    //  const visible = activeCamera !== 'perspective' && currentCamera !== 'orthographic';
    //
    //  cameraHelpers.push(<cameraHelper
    //    key="orthographic"
    //    ref="cameraOrthographicHelper"
    //    camera={cameraOrthographic}
    //    autoUpdate={true}
    //    visible={visible}
    //  />);
    //}

    const cameraRig = (<object3D
      lookAt={meshPosition}>
      {cameraPerspectiveComponent}
      {cameraOrthographicComponent}
      <mesh
        position={new THREE.Vector3(0, 0, 150)}>
        <sphereGeometry
          radius={5}
          widthSegments={16}
          heightSegments={8}/>
        <meshBasicMaterial
          color={0x0000ff}
          wireframe={true}
        />
      </mesh>
    </object3D>);


    return (<div>
      <Info/>
      {this.state.active ? <React3 width={width}
                                   height={height}
                                   viewports={viewports}
                                   antialias={true}
                                   onAnimate={this._onAnimate}>
        <object3D>
          {cameraComponent}
          {cameraHelpers}
          {cameraRig}
          <object3D
            position={meshPosition}
          >
            <mesh>
              <sphereGeometry
                radius={100}
                widthSegments={16}
                heightSegments={8}/>
              <meshBasicMaterial
                color={0xffffff}
                wireframe={true}
              />
            </mesh>
            <mesh
              position={childPosition}>
              <sphereGeometry
                radius={50}
                widthSegments={16}
                heightSegments={8}/>
              <meshBasicMaterial
                color={0x00ff00}
                wireframe={true}
              />
            </mesh>
          </object3D>
          <pointCloud>
            <geometry vertices={this.pointCloudVertices}/>
            <pointCloudMaterial color={0x888888}/>
          </pointCloud>
        </object3D>
        {this.state.testObjects.map((testObject, i) => {
          return <object3D key={i}/>;
        })}
      </React3> : null }
    </div>);
  }
}

export default WebGLCameraExample;
