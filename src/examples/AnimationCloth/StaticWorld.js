import React from 'react';
import THREE from 'three.js';
import ClothGeometry from './ClothGeometry';
import Poles from './Poles';
import Cloth from './Cloth';

import PureRenderMixin from 'react/lib/ReactComponentWithPureRenderMixin';

const { PropTypes } = React;

import fragmentShaderDepth from 'raw!./shaders/depth.frag';
import vertexShaderDepth from 'raw!./shaders/depth.vert';

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
    this.groundRepeat = new THREE.Vector2(25, 25);

    this.state = {
      ambientLightColor: '666666',
      directionalLightColor: 'dfebff',
      fragmentShaderDepth,
      vertexShaderDepth,
    };

    // check if HMR is enabled
    if (module.hot) {
      // accept update of dependency
      module.hot.accept('raw!./shaders/depth.frag', () => {
        this.setState({
          fragmentShaderDepth: require('raw!./shaders/depth.frag'),
        });
      });

      module.hot.accept('raw!./shaders/depth.vert', () => {
        this.setState({
          vertexShaderDepth: require('raw!./shaders/depth.vert'),
        });
      });
    }
  }

  shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate;

  render() {
    const shadowCameraSize = 300;

    const {
      ambientLightColor,
      directionalLightColor,
      fragmentShaderDepth: frag,
      vertexShaderDepth: vert,
      } = this.state;

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
        color={Number.parseInt(ambientLightColor, 16)}
      />
      <directionalLight
        color={Number.parseInt(directionalLightColor, 16)}
        intensity={1.75}
        position={this.directionalLightPosition}
        castShadow
        shadowMapWidth={1024}
        shadowMapHeight={1024}
        shadowCameraLeft={-shadowCameraSize}
        shadowCameraRight={shadowCameraSize}
        shadowCameraTop={shadowCameraSize}
        shadowCameraBottom={-shadowCameraSize}
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
        <shaderMaterial
          slot="customDepthMaterial"
          fragmentShader={frag}
          vertexShader={vert}
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
        </shaderMaterial>
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
        >
          <texture
            url="textures/terrain/grasslight-big.jpg"
            wrapS={THREE.RepeatWrapping}
            wrapT={THREE.RepeatWrapping}
            repeat={this.groundRepeat}
            anisotropy={16}
          />
        </meshPhongMaterial>
      </mesh>
      <Poles/>
    </object3D>);
  }
}

export default StaticWorld;
