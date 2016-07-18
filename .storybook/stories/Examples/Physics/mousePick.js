import React from 'react';
import React3 from '../../../../';
import THREE from 'three';
import CANNON from 'cannon/src/Cannon';

import MouseInput from '../inputs/MouseInput';

import ExampleBase from '../ExampleBase';

import Stats from 'stats.js';

import PickableMesh from './mousePick/PickableMesh';

const backVector = new THREE.Vector3(0, 0, -1);
const dragPlane = new THREE.Plane();

class PhysicsMousePick extends ExampleBase {
  constructor(props, context) {
    super(props, context);

    const N = 100;

    this._raycaster = new THREE.Raycaster();

    this.fog = new THREE.Fog(0x001525, 10, 40);

    const d = 20;

    this.lightPosition = new THREE.Vector3(d, d, d);
    this.lightTarget = new THREE.Vector3(0, 0, 0);
    this.groundQuaternion = new THREE.Quaternion()
      .setFromAxisAngle(new THREE.Vector3(1, 0, 0), -Math.PI / 2);
    this.cameraPosition = new THREE.Vector3(10, 2, 0);
    this.cameraQuaternion = new THREE.Quaternion()
      .setFromAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI / 2);

    const world = new CANNON.World();

    const bodies = [];
    const meshRefs = [];

    let constrainedBody;
    let pivot;

    const initCannon = () => {
      world.quatNormalizeSkip = 0;
      world.quatNormalizeFast = false;

      world.gravity.set(0, -10, 0);
      world.broadphase = new CANNON.NaiveBroadphase();

      const mass = 5;

      const boxShape = new CANNON.Box(new CANNON.Vec3(0.25, 0.25, 0.25));

      for (let i = 0; i < N; ++i) {
        const boxBody = new CANNON.Body({
          mass,
        });

        boxBody.addShape(boxShape);
        boxBody.position.set(
          -2.5 + Math.random() * 5,
          2.5 + Math.random() * 5,
          -2.5 + Math.random() * 5);
        world.addBody(boxBody);
        bodies.push(boxBody);

        meshRefs.push((mesh) => {
          if (mesh) {
            mesh.userData._bodyIndex = i;

            this.meshes.push(mesh);
          }
        });
      }

      const groundShape = new CANNON.Plane();
      const groundBody = new CANNON.Body({ mass: 0 });

      groundBody.addShape(groundShape);
      groundBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2);

      // WAIT A MINUTE I CAN CREATE A REACT RENDERER FOR CANNON
      // patience is a virtue
      // breathe in breathe out breathe in breathe out
      // let's finish this one first

      world.addBody(groundBody);

      const shape = new CANNON.Sphere(0.1);
      const jointBody = new CANNON.Body({ mass: 0 });
      jointBody.addShape(shape);
      jointBody.collisionFilterGroup = 0;
      jointBody.collisionFilterMask = 0;

      world.addBody(jointBody);

      this.jointBody = jointBody;
    };

    initCannon();

    const timeStep = 1 / 60;
    const updatePhysics = () => {
      // Step the physics world
      world.step(timeStep);
    };

    const _getMeshStates = () => bodies
      .map(({ position, quaternion }, bodyIndex) => ({
        position: new THREE.Vector3().copy(position),
        quaternion: new THREE.Quaternion().copy(quaternion),
        ref: meshRefs[bodyIndex],
      }));

    this._onAnimate = () => {
      updatePhysics();

      this.setState({
        meshStates: _getMeshStates(),
      });

      this.stats.update();
    };

    this._addMouseConstraint = ({ x, y, z }, bodyIndex) => {
      // The cannon body constrained by the mouse joint
      constrainedBody = bodies[bodyIndex];
      // Vector to the clicked point, relative to the body
      const v1 = new CANNON.Vec3(x, y, z).vsub(constrainedBody.position);
      // Apply anti-quaternion to vector to transform it into the local body coordinate system
      const antiRot = constrainedBody.quaternion.inverse();
      pivot = antiRot.vmult(v1); // pivot is not in local body coordinates
      // Move the cannon click marker particle to the click position
      this.jointBody.position.set(x, y, z);
      // Create a new constraint
      // The pivot for the jointBody is zero
      this.mouseConstraint = new CANNON
        .PointToPointConstraint(
        constrainedBody,
        pivot,
        this.jointBody,
        new CANNON.Vec3(0, 0, 0)
      );
      // Add the t to world
      world.addConstraint(this.mouseConstraint);

      this.world = world;
    };

    this.state = {
      clickMarkerVisible: false,
      clickMarkerPosition: new THREE.Vector3(),

      meshStates: _getMeshStates(),
    };

    this.meshes = [];
  }

  _setClickMarker(x, y, z) {
    return {
      clickMarkerPosition: new THREE.Vector3(x, y, z),
      clickMarkerVisible: true,
    };
  }

  componentDidMount() {
    const {
      mouseInput,
      container,
    } = this.refs;

    this.stats = new Stats();

    this.stats.domElement.style.position = 'absolute';
    this.stats.domElement.style.top = '0px';

    container.appendChild(this.stats.domElement);

    if (!mouseInput.isReady()) {
      const {
        scene,
        camera,
      } = this.refs;

      mouseInput.ready(scene, container, camera);
      mouseInput.restrictIntersections(this.meshes);
      mouseInput.setActive(false);
    }
  }

  componentDidUpdate(newProps) {
    const {
      mouseInput,
    } = this.refs;

    const {
      width,
      height,
    } = this.props;

    if (width !== newProps.width || height !== newProps.height) {
      mouseInput.containerResized();
    }
  }

  componentWillUnmount() {
    delete this.world;
    delete this.stats;
  }

  _onMeshMouseDown = (bodyIndex, intersection) => {
    const {
      camera,
    } = this.refs;

    const pos = intersection.point;

    this.setState({
      // Set marker on contact point
      ...this._setClickMarker(pos.x, pos.y, pos.z),
    });

    dragPlane.setFromNormalAndCoplanarPoint(backVector.clone()
      .applyQuaternion(camera.quaternion), pos);

    this._addMouseConstraint(pos, bodyIndex);

    window.addEventListener('mousemove', this._onMouseMove, false);
    window.addEventListener('mouseup', this._onMouseUp, false);
  };

  _onMouseUp = () => {
    window.removeEventListener('mousemove', this._onMouseMove, false);
    window.removeEventListener('mouseup', this._onMouseUp, false);

    this.setState({
      clickMarkerVisible: false,
    });

    this.world.removeConstraint(this.mouseConstraint);
    this.mouseConstraint = false;
  };

  _onMouseMove = (event) => {
    const {
      mouseInput,
    } = this.refs;

    const ray:THREE.Ray = mouseInput.getCameraRay(new THREE.Vector2(event.clientX, event.clientY));

    const pos = dragPlane.intersectLine(
      new THREE.Line3(ray.origin, ray.origin
        .clone()
        .add(ray.direction
          .clone()
          .multiplyScalar(10000))));

    if (pos) {
      this.setState({
        ... this._setClickMarker(pos.x, pos.y, pos.z),
      });

      // Move the joint body to a new position
      this.jointBody.position.set(pos.x, pos.y, pos.z);
      this.mouseConstraint.update();
    }
  };

  render() {
    const {
      width,
      height,
    } = this.props;

    const {
      clickMarkerVisible,
      clickMarkerPosition,

      meshStates,
    } = this.state;

    const d = 20;

    const cubeMeshes = meshStates.map(({ position, quaternion }, i) =>
      (<PickableMesh
        key={i}

        position={position}
        quaternion={quaternion}

        bodyIndex={i}

        meshes={this.meshes}

        onMouseDown={this._onMeshMouseDown}
      />));

    return (<div
      ref="container"
    >
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
        <module
          ref="mouseInput"
          descriptor={MouseInput}
        />
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
          <mesh // click marker
            visible={clickMarkerVisible}

            position={clickMarkerPosition}
          >
            <sphereGeometry
              radius={0.2}
              widthSegments={8}
              heightSegments={8}
            />
            <meshLambertMaterial
              color={0x772211}
            />
          </mesh>
        </scene>

      </React3>
    </div>);
  }
}

export default PhysicsMousePick;
