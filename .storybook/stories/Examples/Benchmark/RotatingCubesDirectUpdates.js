import React from 'react';
import React3 from '../../../../';
import THREE from 'three';

import RotatingCube from './RotatingCube';
import RotatingCubes from './RotatingCubes';

class RotatingCubesDirectUpdates extends RotatingCubes {
  _getMeshStates() {
    const { bodies } = this;

    return bodies.map(({ position, quaternion, ref }) => ({
      position: new THREE.Vector3().copy(position),
      quaternion: new THREE.Quaternion().copy(quaternion),
      ref,
    }));
  }

  _bodyRef(index, body) {
    if (body === null) {
      // dismounted
      return;
    }

    this.bodies[index].body = React3.findTHREEObject(body);
  }

  _updateGraphics() {
    const { bodies } = this;

    for (let i = 0; i < bodies.length; ++i) {
      const body = bodies[i];

      if (body.body) {
        body.body.position.copy(body.position);
        body.body.quaternion.copy(body.quaternion);
      }
    }
  }

  _createBody(i) {
    return {
      ...super._createBody(),

      ref: this._bodyRef.bind(this, i),
    };
  }

  render() {
    const {
      width,
      height,
    } = this.props;

    const {
      meshStates,
    } = this.state;

    const d = 20;

    const cubeMeshes = meshStates.map(({ position, quaternion, ref }, i) => (<RotatingCube
      key={i}

      position={position}
      quaternion={quaternion}

      ref={ref}

      meshes={this.meshes}
    />));

    return (<div
      ref="container"
    >
      {this._getInputBox('Rotating Cubes - Direct Updates')}
      <React3
        antialias
        mainCamera="camera"
        width={width}
        height={height}

        onAnimate={this._onAnimate}

        clearColor={this.fog.color}

        gammaInput
        gammaOutput
        shadowMapEnabled
      >
        <resources>
          <boxGeometry
            resourceId="cubeGeo"

            width={0.5}
            height={0.5}
            depth={0.5}

            widthSegments={10}
            heightSegments={10}
          />
          <meshPhongMaterial
            resourceId="cubeMaterial"

            color={0x888888}
          />
        </resources>
        <scene
          ref="scene"
          fog={this.fog}
        >
          <perspectiveCamera
            name="camera"
            fov={30}
            aspect={width / height}
            near={0.5}
            far={10000}

            position={this.cameraPosition}
            quaternion={this.cameraQuaternion}

            ref="camera"
          />
          <ambientLight
            color={0x666666}
          />
          <directionalLight
            color={0xffffff}
            intensity={1.75}

            castShadow

            shadowMapWidth={1024}
            shadowMapHeight={1024}

            shadowCameraLeft={-d}
            shadowCameraRight={d}
            shadowCameraTop={d}
            shadowCameraBottom={-d}

            shadowCameraFar={3 * d}
            shadowCameraNear={d}

            position={this.lightPosition}
            lookAt={this.lightTarget}
          />
          <mesh
            castShadow
            receiveShadow

            quaternion={this.groundQuaternion}
          >
            <planeBufferGeometry
              width={100}
              height={100}
              widthSegments={1}
              heightSegments={1}
            />
            <meshLambertMaterial
              color={0x777777}
            />
          </mesh>
          {cubeMeshes}
        </scene>

      </React3>
    </div>);
  }
}

export default RotatingCubesDirectUpdates;
