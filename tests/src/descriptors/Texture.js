import React from 'react';
import THREE from 'three';
import ReactDOM from 'react-dom';
import assert from 'assert';

const WANTED_URL = 'https://avatars0.githubusercontent.com/u/860717?v=3&s=32';

module.exports = type => {
  describe('TextureDescriptor', () => {
    const { testDiv, React3, mockConsole } = require('../utils/initContainer')(type);

    function ignoreExtensionWarnings(extensions) {
      mockConsole.revert();

      // need to do this to prevent logging during tests if the extensions don't exist
      extensions.get('EXT_texture_filter_anisotropic');
      extensions.get('OES_texture_float_linear');
      extensions.get('OES_texture_half_float_linear');
      extensions.get('WEBGL_compressed_texture_pvrtc');
      extensions.get('OES_texture_half_float');
      extensions.get('WEBGL_compressed_texture_s3tc');
      extensions.get('WEBGL_compressed_texture_etc1');
      extensions.get('EXT_blend_minmax');

      mockConsole.apply();
    }

    class TestComponent extends React.Component {
      static propTypes = {
        url: React.PropTypes.string,
        done: React.PropTypes.func,
        onError: React.PropTypes.func,
      };

      _onTextureLoad = () => {
        if (this.props.done) {
          this.props.done();
        }
      };

      _onTextureError = () => {
        if (this.props.onError) {
          this.props.onError();
        }
      };

      render() {
        return (<React3
          width={800}
          height={600}
        >
          <resources>
            <texture
              url={this.props.url}
              onLoad={this._onTextureLoad}
              onError={this._onTextureError}
              resourceId="textureRes"
            />
          </resources>
        </React3>);
      }
    }

    it('Should give an error for inexistent files', (done) => {
      const onError = () => {
        done();
      };

      mockConsole.expect('THREE.WebGLRenderer	74');

      ReactDOM.render((<TestComponent
        url="./bad.png"
        onError={onError}
      />), testDiv);
    });

    const textureLoadFail = () => {
      assert.fail(false, false, 'Texture should have loaded');
    };

    it('Should succeed for existing files', (done) => {
      ReactDOM.render((<TestComponent
        url="/base/assets/images/rgbw.png"
        done={done}
        onError={textureLoadFail}
      />), testDiv);

      mockConsole.expect('THREE.WebGLRenderer	74');
    });

    it('Should succeed to load online files', function _(done) {
      this.timeout(5000);

      mockConsole.expect('THREE.WebGLRenderer	74');

      ReactDOM.render((<TestComponent
        url={WANTED_URL}
        done={done}
        onError={textureLoadFail}
      />), testDiv);
    });

    it('Should fail for rendering cross origin images if crossOrigin is not set', function _(done) {
      this.timeout(5000);

      const onSceneCreate = (scene) => {
        if (!scene) {
          return;
        }

        const extensions = scene.userData.markup._rootInstance._renderer.extensions;

        ignoreExtensionWarnings(extensions);
      };

      mockConsole.expect('THREE.WebGLRenderer	74');

      ReactDOM.render((<React3
        width={800}
        height={600}
        mainCamera="mainCamera"
      >
        <scene
          ref={onSceneCreate}
        >
          <perspectiveCamera
            position={new THREE.Vector3(0, 0, 5)}
            fov={75}
            aspect={800 / 600}
            near={0.1}
            far={1000}
            name="mainCamera"
          />
          <mesh>
            <boxGeometry
              width={2}
              height={2}
              depth={2}
            />
            <meshBasicMaterial
              color={0xff0000}
            >
              <texture
                url={WANTED_URL}
                onError={textureLoadFail}
              />
            </meshBasicMaterial>
          </mesh>
        </scene>
      </React3>), testDiv);

      mockConsole.expect(`SecurityError: Failed to execute 'texImage2D'` +
        ` on 'WebGLRenderingContext': ` +
        `The cross-origin image at ${WANTED_URL}` +
        ` may not be loaded.`);

      mockConsole.once('empty', () => {
        done();
      });
    });

    it('Should not fail for rendering cross origin images if crossOrigin is set', function _(done) {
      this.timeout(5000);

      mockConsole.expect('THREE.WebGLRenderer	74');

      const onSceneCreate = (scene) => {
        if (!scene) {
          return;
        }

        const extensions = scene.userData.markup._rootInstance._renderer.extensions;

        ignoreExtensionWarnings(extensions);

        mockConsole.expect('texture has loaded');
        mockConsole.expect('fin');
      };

      const textureLoaded = () => {
        mockConsole.log('texture has loaded');

        // wait a second before being done
        setTimeout(() => {
          mockConsole.log('fin');

          done();
        }, 1000);
      };

      ReactDOM.render((<React3
        width={800}
        height={600}
        mainCamera="mainCamera"
      >
        <scene
          ref={onSceneCreate}
        >
          <perspectiveCamera
            position={new THREE.Vector3(0, 0, 5)}
            fov={75}
            aspect={800 / 600}
            near={0.1}
            far={1000}
            name="mainCamera"
          />
          <mesh>
            <boxGeometry
              width={2}
              height={2}
              depth={2}
            />
            <meshBasicMaterial
              color={0xff0000}
            >
              <texture
                url={WANTED_URL}
                crossOrigin=""
                onLoad={textureLoaded}
                onError={textureLoadFail}
              />
            </meshBasicMaterial>
          </mesh>
        </scene>
      </React3>), testDiv);
    });
  });
};
