import React from 'react';
import THREE from 'three';
import ClothGeometry from './ClothGeometry';
import Poles from './Poles';
import Cloth from './Cloth';

const { PropTypes } = React;

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

class StaticWorld extends React.Component {
  static propTypes = {
    clothRef: PropTypes.func.isRequired,
    cloth: PropTypes.instanceOf(Cloth).isRequired,
  };

  constructor(props, context) {
    super(props, context);

    this.directionalLightPosition = new THREE.Vector3(50, 200, 100).multiplyScalar(1.3);


    this.groundPosition = new THREE.Vector3(0, -250, 0);
    this.groundRotation = new THREE.Euler(-Math.PI / 2, 0, 0);

    this.groundTexture = THREE.ImageUtils.loadTexture('textures/terrain/grasslight-big.jpg');
    this.groundTexture.wrapS = this.groundTexture.wrapT = THREE.RepeatWrapping;
    this.groundTexture.repeat.set(25, 25);
    this.groundTexture.anisotropy = 16;

    this.state = {
      textureLoaded: false,
    };
  }

  render() {
    const d = 300;

    return (<object3D>
      <resources>
        <texture
          url="textures/patterns/circuit_pattern.png"
          wrapS={THREE.RepeatWrapping}
          wrapT={THREE.RepeatWrapping}
          anisotropy={16}
          resourceId="clothTexture"
        />
      </resources>
      <ambientLight
        color={0x666666}
      />
      <directionalLight
        color={0xdfebff}
        intensity={1.75}
        position={this.directionalLightPosition}
        castShadow
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
        castShadow
        receiveShadow
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
          side={THREE.DoubleSide}
        >
          <textureResource
            resourceId="clothTexture"
          />
        </meshPhongMaterial>
        {this.state.textureLoaded ? <shaderMaterial
          slot="customDepthMaterial"
          vertexShader={vertexShaderDepth}
          fragmentShader={fragmentShaderDepth}
        >
          <uniforms>
            <uniform
              name="texture"
              type="t"
            >
              <textureResource
                resourceId="clothTexture"
              />
            </uniform>
          </uniforms>
        </shaderMaterial> : null}
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
        receiveShadow
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

export default StaticWorld;
