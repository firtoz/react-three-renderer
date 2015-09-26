import React from 'react';
import ReactDOM from 'react-dom';
import THREE from 'three';

import React3 from '../../React3/React3';

import ExampleBase from '../ExampleBase';

import Info from './Info';

import Cloth from './Cloth';
import StaticWorld from './StaticWorld';
import Sphere from './Sphere';

const ballSize = 60; // 40

const GRAVITY = 981 * 1.4; //
const gravity = new THREE.Vector3(0, -GRAVITY, 0).multiplyScalar(Cloth.MASS);

const TIMESTEP = 18 / 1000;
const TIMESTEP_SQ = TIMESTEP * TIMESTEP;

const diff = new THREE.Vector3();

import TrackballControls from '../../React3/ref/trackball';

function satisfyConstrains(p1, p2, distance) {
  diff.subVectors(p2.position, p1.position);
  const currentDist = diff.length();
  if (currentDist === 0) return; // prevents division by 0
  const correction = diff.multiplyScalar(1 - distance / currentDist);
  const correctionHalf = correction.multiplyScalar(0.5);
  p1.position.add(correctionHalf);
  p2.position.sub(correctionHalf);
}

const tmpForce = new THREE.Vector3();

class AnimationCloth extends ExampleBase {
  constructor(props, context) {
    super(props, context);

    this.state = {
      ...this.state,
      minTimePerFrame: 0,
      rotate: true,
      wind: true,
      sphere: false,
    };

    const xSegs = 10; //
    const ySegs = 10; //

    this.cloth = new Cloth(xSegs, ySegs);

    const pinsFormation = [];
    let pins = [6];

    pinsFormation.push(pins);

    pins = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    pinsFormation.push(pins);

    pins = [0];
    pinsFormation.push(pins);

    pins = []; // cut the rope ;)
    pinsFormation.push(pins);

    pins = [0, this.cloth.w]; // classic 2 pins
    pinsFormation.push(pins);

    pins = pinsFormation[1];

    this.pins = pins;
    this.pinsFormation = pinsFormation;

    this.fog = new THREE.Fog(0xcce0ff, 500, 10000);

    this.arrowDirection = new THREE.Vector3(0, 1, 0);
    this.arrowOrigin = new THREE.Vector3(0, 0, 0);
    this.arrowLength = new THREE.Vector3(0, 1, 0);

    this.arrowPosition = new THREE.Vector3(-200, 0, -200);


    this.windForce = new THREE.Vector3(0, 0, 0);

    this.state = {
      ...this.state,
      ballPosition: new THREE.Vector3(0, -45, 0),
      cameraPosition: new THREE.Vector3(0, 50, 1500),
    };

    this.scenePosition = new THREE.Vector3(0, 0, 0);
  }

  _toggleRotate = () => {
    this.setState({rotate: !this.state.rotate});
  };

  _toggleWind = () => {
    this.setState({wind: !this.state.wind});
  };

  _toggleSphere = () => {
    this.setState({sphere: !this.state.sphere});
  };

  _togglePins = () => {
    this.pins = this.pinsFormation[~~( Math.random() * this.pinsFormation.length )];
  };

  _simulate(time) {
    if (!this.lastTime) {
      this.lastTime = time;
      return;
    }

    let i;
    let il;
    let particles;
    let particle;
    let constrains;
    let constrain;

    const clothGeometry = React3.findTHREEObject(this._clothGeometry);

    const sphere = React3.findTHREEObject(this.refs.sphere);

    // Aerodynamics forces
    if (this.state.wind) {
      let face;
      const faces = clothGeometry.faces;
      let normal;

      particles = this.cloth.particles;

      for (i = 0, il = faces.length; i < il; i++) {
        face = faces[i];
        normal = face.normal;

        tmpForce.copy(normal).normalize().multiplyScalar(normal.dot(this.windForce));
        particles[face.a].addForce(tmpForce);
        particles[face.b].addForce(tmpForce);
        particles[face.c].addForce(tmpForce);
      }
    }

    for (particles = this.cloth.particles, i = 0, il = particles.length; i < il; i++) {
      particle = particles[i];
      particle.addForce(gravity);

      particle.integrate(TIMESTEP_SQ);
    }

    // Start Constrains

    constrains = this.cloth.constrains;
    il = constrains.length;

    for (i = 0; i < il; i++) {
      constrain = constrains[i];
      satisfyConstrains(constrain[0], constrain[1], constrain[2]);
    }

    const ballPosition = this.state.ballPosition.clone();

    // Ball Constrains
    ballPosition.z = -Math.sin(Date.now() / 600) * 90; // + 40;
    ballPosition.x = Math.cos(Date.now() / 400) * 70;

    if (sphere.visible) {
      for (particles = this.cloth.particles,
             i = 0,
             il = particles.length; i < il; i++) {
        particle = particles[i];
        const pos = particle.position;
        diff.subVectors(pos, ballPosition);
        if (diff.length() < ballSize) {
          // collided
          diff.normalize().multiplyScalar(ballSize);
          pos.copy(ballPosition).add(diff);
        }
      }
    }

    // Floor Constraints
    for (particles = this.cloth.particles, i = 0, il = particles.length
      ; i < il; i++) {
      particle = particles[i];
      const pos = particle.position;
      if (pos.y < -250) {
        pos.y = -250;
      }
    }

    // Pin Constrains
    for (i = 0, il = this.pins.length; i < il; i++) {
      const xy = this.pins[i];
      const p = particles[xy];
      p.position.copy(p.original);
      p.previous.copy(p.original);
    }

    this.setState({
      ballPosition,
    });
  }

  componentDidMount() {
    super.componentDidMount();
    const controls = new TrackballControls(this.refs.mainCamera, ReactDOM.findDOMNode(this.refs.react3));
    controls.rotateSpeed = 1.0;
    controls.zoomSpeed = 1.2;
    controls.panSpeed = 0.8;

    controls.noZoom = false;
    controls.noPan = false;

    controls.staticMoving = true;
    controls.dynamicDampingFactor = 0.3;

    controls.addEventListener('change', () => {
      this.setState({
        cameraPosition: this.refs.mainCamera.position,
      });
    });

    this.controls = controls;
  }

  _onAnimate = () => {
    this.controls.update();

    const {
      minTimePerFrame,
      } = this.state;

    let time;

    if (minTimePerFrame > 0) {
      time = Math.round(Date.now() / minTimePerFrame) * minTimePerFrame;
    } else {
      time = Date.now();
    }

    if (time === this.state.time) {
      return;
    }

    const windStrength = Math.cos(time / 7000) * 20 + 40;
    this.windForce.set(Math.sin(time / 2000), Math.cos(time / 3000), Math.sin(time / 1000)).normalize().multiplyScalar(windStrength);

    this._simulate(time);

    const clothGeometry = React3.findTHREEObject(this._clothGeometry);

    // render

    const timer = time * 0.0002;

    const p = this.cloth.particles;

    let il;
    let i;
    for (i = 0, il = p.length; i < il; ++i) {
      clothGeometry.vertices[i].copy(p[i].position);
    }

    clothGeometry.computeFaceNormals();
    clothGeometry.computeVertexNormals();

    clothGeometry.normalsNeedUpdate = true;
    clothGeometry.verticesNeedUpdate = true;

    const newState = {
      time: time,
      spherePosition: this.ballPosition,
    };

    if (this.state.rotate) {
      newState.cameraPosition = new THREE.Vector3(Math.cos(timer) * 1500, this.state.cameraPosition.y, Math.sin(timer) * 1500);
    }

    this.setState(newState);
  };

  _clothRef = (ref) => {
    this._clothGeometry = ref;
  };

  render() {
    const {
      width,
      height,
      minTimePerFrame,
      } = this.state;

    return (<div>
      <Info
        toggleRotate={this._toggleRotate}
        toggleWind={this._toggleWind}
        toggleSphere={this._toggleSphere}
        togglePins={this._togglePins}
        rotating={this.state.rotate}
        winding={this.state.wind}
        balling={this.state.sphere}
        onFrameChange={(event) => {
          this.setState({
            minTimePerFrame: +event.target.value,
          });
        }}
        minTimePerFrame={minTimePerFrame}/>
      <React3
        ref="react3"
        width={width}
        height={height}
        antialias
        pixelRatio={window.devicePixelRatio}
        clearColor={this.fog.color}
        gammaInput
        gammaOutput
        shadowMapEnabled
        mainCamera="mainCamera"
        onAnimate={this._onAnimate}
      >
        <scene fog={this.fog}>
          <perspectiveCamera
            name="mainCamera"
            fov={30}
            aspect={width / height}
            ref="mainCamera"
            position={this.state.cameraPosition}
            near={1}
            far={10000}
            lookAt={this.state.rotate ? this.scenePosition : null}
          />
          <StaticWorld
            clothRef={this._clothRef}
            cloth={this.cloth}
          />
          <Sphere
            ref="sphere"
            visible={this.state.sphere}
            position={this.state.ballPosition}
          />
        </scene>
      </React3>
    </div>);
  }
}

export default AnimationCloth;
