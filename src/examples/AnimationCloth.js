import React from 'react';
import THREE from 'three';

import React3 from '../React3/React3';

import ExampleBase from './ExampleBase';

import Info from './AnimationCloth/Info';

import Cloth from './AnimationCloth/Cloth';
import ClothGeometry from './AnimationCloth/ClothGeometry';
import Poles from './AnimationCloth/Poles';

const fragmentShaderDepth = `
      uniform sampler2D texture;
			varying vec2 vUV;

			vec4 pack_depth( const in float depth ) {

				const vec4 bit_shift = vec4( 256.0 * 256.0 * 256.0, 256.0 * 256.0, 256.0, 1.0 );
				const vec4 bit_mask  = vec4( 0.0, 1.0 / 256.0, 1.0 / 256.0, 1.0 / 256.0 );
				vec4 res = fract( depth * bit_shift );
				res -= res.xxyz * bit_mask;
				return res;

			}

			void main() {

				vec4 pixel = texture2D( texture, vUV );

				if ( pixel.a < 0.5 ) discard;

				gl_FragData[ 0 ] = pack_depth( gl_FragCoord.z );

			}`;

const vertexShaderDepth = `
			varying vec2 vUV;

			void main() {

				vUV = 0.75 * uv;

				vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );

				gl_Position = projectionMatrix * mvPosition;

			}`;

const ballSize = 60; // 40

const GRAVITY = 981 * 1.4; //
const gravity = new THREE.Vector3(0, -GRAVITY, 0).multiplyScalar(Cloth.MASS);

const TIMESTEP = 18 / 1000;
const TIMESTEP_SQ = TIMESTEP * TIMESTEP;

const diff = new THREE.Vector3();

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

class StaticWorld extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.directionalLightPosition = new THREE.Vector3(50, 200, 100).multiplyScalar(1.3);

    this.clothTexture = THREE.ImageUtils.loadTexture('textures/patterns/circuit_pattern.png');
    this.clothTexture.wrapS = this.clothTexture.wrapT = THREE.RepeatWrapping;
    this.clothTexture.anisotropy = 16;

    this.uniforms = {
      texture: {type: 't', value: this.clothTexture},
    };

    this.groundPosition = new THREE.Vector3(0, -250, 0);
    this.groundRotation = new THREE.Euler(-Math.PI / 2, 0, 0);

    this.groundTexture = THREE.ImageUtils.loadTexture('textures/terrain/grasslight-big.jpg');
    this.groundTexture.wrapS = this.groundTexture.wrapT = THREE.RepeatWrapping;
    this.groundTexture.repeat.set(25, 25);
    this.groundTexture.anisotropy = 16;
  }

  render() {
    const d = 300;

    return (<object3D>
      <ambientLight
        color={0x666666}
      />
      <directionalLight
        color={0xdfebff}
        intensity={1.75}
        position={this.directionalLightPosition}
        castShadow={true}
        shadowMapWidth={1024}
        shadowMapHeight={1024}
        shadowCameraLeft={-d}
        shadowCameraRight={d}
        shadowCameraTop={d}
        shadowCameraBottom={-d}
        shadowCameraFar={1000}
        shadowDarkness={0.5}
      />
      <mesh
        castShadow={true}
        receiveShadow={true}
      >
        <ClothGeometry
          ref={this.props.clothRef}
          cloth={this.props.cloth}
        />
        <meshPhongMaterial
          alphaTest={0.5}
          color={0xffffff}
          specular={0x030303}
          emissive={0x111111}
          shininess={10}
          map={this.clothTexture}
          side={THREE.DoubleSide}
        />
        <shaderMaterial
          slot="customDepthMaterial"
          uniforms={this.uniforms}
          vertexShader={vertexShaderDepth}
          fragmentShader={fragmentShaderDepth}
        />
      </mesh>
      { /* <arrowHelper
       direction={this.arrowDirection}
       origin={this.arrowOrigin}
       length={this.arrowLength}
       color={0xff0000}
       position={this.arrowPosition}
       /> */ }
      <mesh
        position={this.groundPosition}
        rotation={this.groundRotation}
        receiveShadow={true}
      >
        <planeBufferGeometry
          width={20000}
          height={20000}
        />
        <meshPhongMaterial
          color={0xffffff}
          specular={0x111111}
          map={this.groundTexture}
        />
      </mesh>
      <Poles/>
    </object3D>);
  }
}

class Sphere extends React.Component {
  render() {
    return (<mesh
      castShadow={true}
      receiveShadow={true}
      visible={this.props.visible}
      position={this.props.position}
    >
      <sphereGeometry
        radius={ballSize}
        widthSegments={20}
        heightSegments={20}
      />
      <meshPhongMaterial
        color={0xffffff}
      />
    </mesh>);
  }
}

class AnimationCloth extends ExampleBase {
  constructor(props, context) {
    super(props, context);

    this.state = {
      ...this.state,
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
      paused: false,
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

    for (particles = this.cloth.particles, i = 0, il = particles.length
      ; i < il; i++) {
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

  _onAnimate = () => {
    if (this.state.paused) {
      return;
    }

    const time = Date.now();

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
      paused,
      } = this.state;

    return (<div>
      <Info
        toggleRotate={this._toggleRotate}
        toggleWind={this._toggleWind}
        toggleSphere={this._toggleSphere}
        togglePins={this._togglePins}
        pause={() => {
          this.setState({
            paused: !paused,
          });
        }}
        frame={() => {
          this.setState({
            paused: false,
          }, () => {
            this._onAnimate();
            this.setState({
              paused: true,
            });
          });
        }}/>
      <React3
        width={width}
        height={height}
        antialias={true}
        pixelRatio={window.devicePixelRatio}
        clearColor={this.fog.color}
        gammaInput={true}
        gammaOutput={true}
        shadowMapEnabled={true}
        mainCamera="mainCamera"
        onAnimate={this._onAnimate}
      >
        <scene fog={this.fog}>
          <perspectiveCamera
            name="mainCamera"
            fov={30}
            aspect={width / height}
            position={this.state.cameraPosition}
            near={1}
            far={10000}
            lookAt={this.scenePosition}
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
