import React from 'react';
import React3 from '../../../../';
import THREE from 'three';
import CANNON from 'cannon/src/Cannon';

import Stats from 'stats.js';

import ExampleBase from '../ExampleBase';

class Physics extends ExampleBase {
  constructor(props, context) {
    super(props, context);

    const world = new CANNON.World();
    this.world = world;
    world.gravity.set(0, 0, 0);
    world.broadphase = new CANNON.NaiveBroadphase();
    world.solver.iterations = 10;
    const shape = new CANNON.Box(new CANNON.Vec3(1, 1, 1));
    const mass = 1;
    const body = new CANNON.Body({
      mass,
    });
    body.addShape(shape);
    body.angularVelocity.set(0, 10, 0);
    body.angularDamping = 0.5;
    world.addBody(body);

    this._onMouseDown = () => {
      body.angularVelocity.y += 5;
    };

    this.cameraPosition = new THREE.Vector3(0, 0, 5);

    const timeStep = 1 / 60;

    const updatePhysics = () => {
      // Step the physics world
      world.step(timeStep);
      // Copy coordinates from Cannon.js to Three.js

      this.setState({
        // need to call new THREE.* in order to ensure an update goes through
        meshPosition: new THREE.Vector3().copy(body.position),
        meshQuaternion: new THREE.Quaternion().copy(body.quaternion),
      });
    };

    this._onAnimate = () => {
      updatePhysics();

      this.stats.update();
    };

    this.state = {
      meshPosition: new THREE.Vector3(),
      meshQuaternion: new THREE.Quaternion(),
    };
  }

  componentWillUnmount() {
    delete this.world;

    delete this.stats;
  }

  componentDidMount() {
    const {
      container,
      } = this.refs;

    this.stats = new Stats();

    this.stats.domElement.style.position = 'absolute';
    this.stats.domElement.style.top = '0px';

    container.appendChild(this.stats.domElement);
  }

  render() {
    const {
      width,
      height,
      } = this.props;

    const {
      meshPosition,
      meshQuaternion,
      } = this.state;

    return (<div
      ref="container"

      onMouseDown={this._onMouseDown}
    ><React3
      antialias
      mainCamera="camera"
      width={width}
      height={height}

      onAnimate={this._onAnimate}
    >
      <scene>
        <perspectiveCamera
          name="camera"
          fov={75}
          aspect={width / height}
          near={1}
          far={100}

          position={this.cameraPosition}
        />
        <mesh
          position={meshPosition}
          quaternion={meshQuaternion}
        >
          <boxGeometry
            width={2}
            height={2}
            depth={2}
          />
          <meshBasicMaterial
            color={0x00ff00}
            wireframe
          />
        </mesh>
      </scene>
    </React3>
    </div>);
  }
}

export default Physics;
