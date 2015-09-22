import React from 'react';

import THREE from 'three';

import React3 from '../../React3/React3';

import ExampleBase from '../ExampleBase';

class Geometries extends ExampleBase {
  constructor(props, context) {
    super(props, context);

    this.directionalLightPosition = new THREE.Vector3(0, 1, 0);

    this.objectPositions = [
      new THREE.Vector3(-400, 0, 200),
      new THREE.Vector3(-200, 0, 200),
      new THREE.Vector3(0, 0, 200),
      new THREE.Vector3(200, 0, 200),
      new THREE.Vector3(-400, 0, 0),
      new THREE.Vector3(-200, 0, 0),
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(200, 0, 0),
      new THREE.Vector3(400, 0, 0),

      new THREE.Vector3(-400, 0, -200),
      new THREE.Vector3(-200, 0, -200),
      new THREE.Vector3(0, 0, -200),
      new THREE.Vector3(200, 0, -200),
      new THREE.Vector3(400, 0, -200),
    ];

    this.lathePoints = [];

    for (let i = 0; i < 50; i++) {
      this.lathePoints.push(new THREE.Vector3(Math.sin(i * 0.2) * Math.sin(i * 0.1) * 15 + 50, 0, ( i - 5 ) * 2));
    }

    this.arrowDir = new THREE.Vector3(0, 1, 0);
    this.arrowOrigin = new THREE.Vector3(0, 0, 0);

    this.scenePosition = new THREE.Vector3(0, 0, 0);

    this.state = {
      ...this.state,
      timer: Date.now() * 0.0001,
    };
  }

  _onAnimate = () => {
    var timer = Date.now() * 0.0001;

    this.setState({
      timer,
    });
  };

  render() {
    const {
      width,
      height,
      timer,
      } = this.state;

    const objectRotation = new THREE.Euler(
      timer * 5,
      timer * 2.5,
      0
    );

    return (<div>
      <React3
        width={width}
        height={height}
        antialias
        pixelRatio={window.devicePixelRatio}
        mainCamera="mainCamera"
        onAnimate={this._onAnimate}>
        <resources>
          <texture
            resourceId="map"
            url="textures/UV_Grid_Sm.jpg"
            wrapS={THREE.RepeatWrapping}
            wrapT={THREE.RepeatWrapping}
            anisotropy={16}
          />
          <meshLambertMaterial
            resourceId="material"
            side={THREE.DoubleSide}
          >
            <textureResource
              resourceId="map"
            />
          </meshLambertMaterial>
        </resources>
        <scene>
          <perspectiveCamera
            fov={45}
            aspect={width / height}
            near={1}
            far={2000}
            lookAt={this.scenePosition}
            name="mainCamera"
            position={new THREE.Vector3(
              Math.cos(timer) * 800,
              400,
              Math.sin(timer) * 800
            )}
          />
          <ambientLight
            color={0x404040}
          />
          <directionalLight
            color={0xffffff}
            position={this.directionalLightPosition}
          />
          <mesh
            position={this.objectPositions[0]}
            rotation={objectRotation}
          >
            <sphereGeometry
              radius={75}
              widthSegments={20}
              heightSegments={10}
            />
            <materialResource
              resourceId="material"
            />
          </mesh>
          <mesh
            position={this.objectPositions[1]}
            rotation={objectRotation}
          >
            <icosahedronGeometry
              radius={75}
              detail={1}
            />
            <materialResource
              resourceId="material"
            />
          </mesh>
          <mesh
            position={this.objectPositions[2]}
            rotation={objectRotation}
          >
            <octahedronGeometry
              radius={75}
              detail={2}
            />
            <materialResource
              resourceId="material"
            />
          </mesh>
          <mesh
            position={this.objectPositions[3]}
            rotation={objectRotation}
          >
            <tetrahedronGeometry
              radius={75}
              detail={0}
            />
            <materialResource
              resourceId="material"
            />
          </mesh>
          <mesh
            position={this.objectPositions[4]}
            rotation={objectRotation}
          >
            <planeBufferGeometry
              width={100}
              height={100}
              widthSegments={4}
              heightSegments={4}
            />
            <materialResource
              resourceId="material"
            />
          </mesh>
          <mesh
            position={this.objectPositions[5]}
            rotation={objectRotation}
          >
            <boxGeometry
              width={100}
              height={100}
              depth={100}
              widthSegments={4}
              heightSegments={4}
              depthSegments={4}
            />
            <materialResource
              resourceId="material"
            />
          </mesh>
          <mesh
            position={this.objectPositions[6]}
            rotation={objectRotation}
          >
            <circleGeometry
              radius={50}
              segments={20}
              thetaStart={0}
              thetaLength={Math.PI * 2}
            />
            <materialResource
              resourceId="material"
            />
          </mesh>
          <mesh
            position={this.objectPositions[7]}
            rotation={objectRotation}
          >
            <ringGeometry
              innerRadius={10}
              outerRadius={50}
              thetaSegments={20}
              phiSegments={5}
              thetaStart={0}
              thetaLength={Math.PI * 2}
            />
            <materialResource
              resourceId="material"
            />
          </mesh>
          <mesh
            position={this.objectPositions[8]}
            rotation={objectRotation}
          >
            <cylinderGeometry
              radiusTop={25}
              radiusBottom={75}
              height={100}
              radialSegments={40}
              heightSegments={5}
            />
            <materialResource
              resourceId="material"
            />
          </mesh>
          <mesh
            position={this.objectPositions[9]}
            rotation={objectRotation}
          >
            <latheGeometry
              points={this.lathePoints}
              segments={20}
            />
            <materialResource
              resourceId="material"
            />
          </mesh>
          <mesh
            position={this.objectPositions[10]}
            rotation={objectRotation}
          >
            <torusGeometry
              radius={50}
              tube={20}
              radialSegments={20}
              tubularSegments={20}
            />
            <materialResource
              resourceId="material"
            />
          </mesh>
          <mesh
            position={this.objectPositions[11]}
            rotation={objectRotation}
          >
            <torusKnotGeometry
              radius={50}
              tube={10}
              radialSegments={50}
              tubularSegments={20}
            />
            <materialResource
              resourceId="material"
            />
          </mesh>
          <axisHelper
            position={this.objectPositions[12]}
            size={50}
            rotation={objectRotation}
          />
          <arrowHelper
            dir={this.arrowDir}
            origin={this.arrowOrigin}
            length={50}
            position={this.objectPositions[13]}
            rotation={objectRotation}
          />
        </scene>
      </React3>
    </div>);
  }
}

export default Geometries;
