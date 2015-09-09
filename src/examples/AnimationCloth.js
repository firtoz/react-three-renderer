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

/*

 const GRAVITY = 981 * 1.4; //
 const gravity = new THREE.Vector3(0, -GRAVITY, 0).multiplyScalar(MASS);


 const TIMESTEP = 18 / 1000;
 const TIMESTEP_SQ = TIMESTEP * TIMESTEP;

 const pins = [];

 const wind = true;
 // const windStrength = 2;
 const windForce = new THREE.Vector3(0, 0, 0);

 const ballPosition = new THREE.Vector3(0, -45, 0);

 const tmpForce = new THREE.Vector3();

 let lastTime;

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

 */
/*


 function simulate(time) {
 if (!lastTime) {
 lastTime = time;
 return;
 }

 let i, il, particles, particle, pt, constrains, constrain;

 // Aerodynamics forces
 if (wind) {
 let face, faces = clothGeometry.faces, normal;

 particles = cloth.particles;

 for (i = 0, il = faces.length; i < il; i++) {
 face = faces[i];
 normal = face.normal;

 tmpForce.copy(normal).normalize().multiplyScalar(normal.dot(windForce));
 particles[face.a].addForce(tmpForce);
 particles[face.b].addForce(tmpForce);
 particles[face.c].addForce(tmpForce);
 }
 }

 for (particles = cloth.particles, i = 0, il = particles.length
 ; i < il; i++) {
 particle = particles[i];
 particle.addForce(gravity);

 particle.integrate(TIMESTEP_SQ);
 }

 // Start Constrains

 constrains = cloth.constrains,
 il = constrains.length;
 for (i = 0; i < il; i++) {
 constrain = constrains[i];
 satisfyConstrains(constrain[0], constrain[1], constrain[2]);
 }

 // Ball Constrains


 ballPosition.z = -Math.sin(Date.now() / 600) * 90; //+ 40;
 ballPosition.x = Math.cos(Date.now() / 400) * 70

 if (sphere.visible)
 for (particles = cloth.particles, i = 0, il = particles.length
 ; i < il; i++) {
 particle = particles[i];
 pos = particle.position;
 diff.subVectors(pos, ballPosition);
 if (diff.length() < ballSize) {
 // collided
 diff.normalize().multiplyScalar(ballSize);
 pos.copy(ballPosition).add(diff);
 }
 }

 // Floor Constraints
 for (particles = cloth.particles, i = 0, il = particles.length
 ; i < il; i++) {
 particle = particles[i];
 pos = particle.position;
 if (pos.y < -250) {
 pos.y = -250;
 }
 }

 // Pin Constrains
 for (i = 0, il = pins.length; i < il; i++) {
 const xy = pins[i];
 const p = particles[xy];
 p.position.copy(p.original);
 p.previous.copy(p.original);
 }


 }

 */


class AnimationCloth extends ExampleBase {
  constructor(props, context) {
    super(props, context);

    this.state = {
      ...this.state,
      rotate: true,
      wind: true,
      sphere: true,
      pins: true,
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
    this.cameraPosition = new THREE.Vector3(0, 50, 1500);
    this.directionalLightPosition = new THREE.Vector3(50, 200, 100).multiplyScalar(1.3);

    this.clothTexture = THREE.ImageUtils.loadTexture('textures/patterns/circuit_pattern.png');
    this.clothTexture.wrapS = this.clothTexture.wrapT = THREE.RepeatWrapping;
    this.clothTexture.anisotropy = 16;

    this.arrowDirection = new THREE.Vector3(0, 1, 0);
    this.arrowOrigin = new THREE.Vector3(0, 0, 0);
    this.arrowLength = new THREE.Vector3(0, 1, 0);

    this.arrowPosition = new THREE.Vector3(-200, 0, -200);

    this.groundTexture = THREE.ImageUtils.loadTexture('textures/terrain/grasslight-big.jpg');
    this.groundTexture.wrapS = this.groundTexture.wrapT = THREE.RepeatWrapping;
    this.groundTexture.repeat.set(25, 25);
    this.groundTexture.anisotropy = 16;

    this.groundPosition = new THREE.Vector3(-250, 0, 0);
    this.groundRotation = new THREE.Euler(0, -Math.PI / 2, 0);

    this.uniforms = {
      texture: {type: "t", value: this.clothTexture},
    };
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
    this.setState({pins: !this.state.pins});
  };

  render() {
    const {
      width,
      height,
      } = this.state;

    const d = 300;

    return (<div>
      <Info
        toggleRotate={this._toggleRotate}
        toggleWind={this._toggleWind}
        toggleSphere={this._toggleSphere}
        togglePins={this._togglePins}/>
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
      >
        <scene fog={this.fog}>
          <perspectiveCamera
            name="mainCamera"
            fov={30}
            aspect={width / height}
            position={this.cameraPosition}
            near={1}
            far={10000}
          />
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
            shadowCameraBottom={d}
            shadowCameraFar={1000}
            shadowDarkness={0.5}
          />
          <mesh>
            <ClothGeometry
              cloth={this.cloth}
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
          <mesh
            castShadow={true}
            receiveShadow={true}
            visible={false}
          >
            <sphereGeometry
              radius={ballSize}
              widthSegments={20}
              heightSegments={20}
            />
            <meshPhongMaterial
              color={0xffffff}
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
        </scene>
      </React3>
    </div>);
  }
}

export default AnimationCloth;
