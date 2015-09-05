import React from 'react';
import THREE from 'three';

class WebGLCameraExample extends React.Component {
  constructor(props, context) {
    super(props, context);

    console.log("constructor?");

    const r = Date.now() * 0.0005;

    this.state = {
      width: window.innerWidth,
      height: window.innerHeight,
      cameraHelpers: [],
      perspectiveCamera: null,
      orthographicCamera: null,
      meshPosition: new THREE.Vector3(Math.cos(r), Math.sin(r), Math.sin(r)).multiplyScalar(700),
    };

    this.pointCloudVertices = [];

    for (let i = 0; i < 10000; i++) {
      const vertex = new THREE.Vector3();

      vertex.x = THREE.Math.randFloatSpread(2000);
      vertex.y = THREE.Math.randFloatSpread(2000);
      vertex.z = THREE.Math.randFloatSpread(2000);

      this.pointCloudVertices.push(vertex);
    }
  }

  componentDidMount() {
    const {
      camera,
      cameraPerspective,
      cameraOrthographic,
      } = this.refs;

    this.setState({
      camera,
      activeCamera: cameraPerspective,
      cameraPerspective,
      cameraOrthographic,
    }, () => {
      // helpers will be mounted now!
      this.setState({
        activeHelper: this.refs.cameraPerspectiveHelper,
      });
    });

    this._onAnimate();
  }

  _onAnimate() {
    // this.refs.meshContainer
    this.refs.cameraRig.lookAt(this.state.meshPosition);
  }

  render() {
    const {width, height} = this.state;
    const aspectRatio = 0.5 * width / height;

    const cameraHelpers = [];

    if (this.state.cameraPerspective) {
      cameraHelpers.push(<cameraHelper
        key="perspective"
        ref="cameraPerspectiveHelper"
        camera={this.state.cameraPerspective}
      />);
    }

    if (this.state.cameraOrthographic) {
      cameraHelpers.push(<cameraHelper
        key="orthographic"
        ref="cameraOrthographicHelper"
        camera={this.state.cameraOrthographic}
      />);
    }

    const viewports = [];

    return (<object3D onAnimate={this._onAnimate}>
      <perspectiveCamera
        fov={50}
        aspect={aspectRatio}
        ref="camera"
        name="mainCamera"
        near={1}
        far={10000}
        position={new THREE.Vector3(0, 0, 2500)}
      />
      {viewports}
      {cameraHelpers}
      <object3D ref="cameraRig">
        <perspectiveCamera
          ref="cameraPerspective"
          fov={50}
          aspect={aspectRatio}
          near={150}
          far={1000}
          rotation={new THREE.Euler(0, Math.PI, 0)}
        />
        <orthographicCamera
          ref="cameraOrthographic"
          left={0.5 * width / -2}
          right={0.5 * width / 2}
          top={height / 2}
          bottom={height / -2}
          near={150}
          far={1000}
          rotation={new THREE.Euler(0, Math.PI, 0)}
        />
        <mesh>
          <sphereGeometry
            radius={5}
            widthSegments={16}
            heightSegments={8}/>
          <meshBasicMaterial
            color={0x0000ff}
            wireframe={true}
          />
        </mesh>
      </object3D>
      <object3D
        ref="meshContainer"
        position={this.state.meshPosition}
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
        <mesh>
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
    </object3D>);
  }
}

export default WebGLCameraExample;
