import React from 'react';
import * as THREE from 'three';
import ReactDOM from 'react-dom';
import assert from 'assert';
import sinon from 'sinon';
import chai from 'chai';

const WANTED_URL = 'http://lorempixel.com/1/1/';
const LOCAL_URL = '/base/assets/images/rgbw.png';

module.exports = (type) => {
  const { expect } = chai;

  describe('TextureDescriptor', () => {
    const { testDiv, React3, mockConsole } = require('../utils/initContainer')(type);

    class TestComponent extends React.Component {
      static propTypes = {
        url: React.PropTypes.string,
        done: React.PropTypes.func,
        onError: React.PropTypes.func,
      };

      static defaultProps = {
        url: undefined,
        done: undefined,
        onError: undefined,
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

      mockConsole.expectThreeLog();

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
        url={LOCAL_URL}
        done={done}
        onError={textureLoadFail}
      />), testDiv);

      mockConsole.expectThreeLog();
    });

    describe('Cross Origin', () => {
      const loadSpy = sinon.spy(function load() {
        /* eslint-disable no-console */
        let crossOrigin = this.crossOrigin;
        if (crossOrigin !== undefined) {
          crossOrigin = `'${crossOrigin}'`;
        }

        console.log('Cross origin (set: ' +
          `${this.hasOwnProperty('crossOrigin')}): ${crossOrigin}`);
        /* eslint-enable */

        return new THREE.Texture();
      });

      afterEach(() => {
        loadSpy.reset();
      });

      it('Should call image loader with the URL and no cross origin', () => {
        const loadStub = sinon.stub(THREE.TextureLoader.prototype, 'load', loadSpy);

        try {
          mockConsole.expect('Cross origin (set: false): undefined');

          mockConsole.expectThreeLog();

          ReactDOM.render((<TestComponent
            url={WANTED_URL}
          />), testDiv);

          sinon.assert.calledOnce(loadSpy);

          sinon.assert.calledWith(loadSpy, WANTED_URL);
        } finally {
          loadStub.restore();
        }
      });

      it('Should set cross origin property for image loader', () => {
        const loadStub = sinon.stub(THREE.TextureLoader.prototype, 'load', loadSpy);

        try {
          mockConsole.expect('Cross origin (set: true): \'\'');

          mockConsole.expectThreeLog();

          ReactDOM.render((<React3
            width={800}
            height={600}
            mainCamera="mainCamera"
            forceManualRender
            onManualRenderTriggerCreated={() => {
            }}
          >
            <scene>
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
                  />
                </meshBasicMaterial>
              </mesh>
            </scene>
          </React3>), testDiv);

          sinon.assert.calledOnce(loadSpy);

          sinon.assert.calledWith(loadSpy, WANTED_URL);
        } finally {
          loadStub.restore();
        }
      });
    });

    it('Should update the provided parent slot', () => {
      const materialRef = sinon.spy();
      const textureRef = sinon.spy();

      mockConsole.expectThreeLog();

      ReactDOM.render((<React3
        width={800}
        height={600}
        mainCamera="mainCamera"
        forceManualRender
        onManualRenderTriggerCreated={() => {
        }}
      >
        <scene>
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
              ref={materialRef}
              color={0xff0000}
            >
              <texture
                url={LOCAL_URL}
                ref={textureRef}
                slot="alphaMap"
              />
            </meshBasicMaterial>
          </mesh>
        </scene>
      </React3>), testDiv);

      expect(materialRef.lastCall.args[0].alphaMap).to.equal(textureRef.lastCall.args[0]);
    });

    it('Should be possible to have multiple textures in one material', () => {
      const materialRef = sinon.spy();
      const mapTextureRef = sinon.spy();
      const alphaMapTextureRef = sinon.spy();

      mockConsole.expectThreeLog();

      ReactDOM.render((<React3
        width={800}
        height={600}
        mainCamera="mainCamera"
        forceManualRender
        onManualRenderTriggerCreated={() => {
        }}
      >
        <scene>
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
              ref={materialRef}
              color={0xff0000}
            >
              <texture
                url={LOCAL_URL}
                ref={mapTextureRef}
              />
              <texture
                url={LOCAL_URL}
                slot="alphaMap"
                ref={alphaMapTextureRef}
              />
            </meshBasicMaterial>
          </mesh>
        </scene>
      </React3>), testDiv);

      expect(materialRef.lastCall.args[0].map).to.equal(mapTextureRef.lastCall.args[0]);
      expect(materialRef.lastCall.args[0].alphaMap).to.equal(alphaMapTextureRef.lastCall.args[0]);
    });

    it('Should be possible to have swap slots of textures', () => {
      const materialRef = sinon.spy();
      const firstTextureRef = sinon.spy();
      const secondTextureRef = sinon.spy();

      mockConsole.expectThreeLog();

      ReactDOM.render((<React3
        width={800}
        height={600}
        mainCamera="mainCamera"
        forceManualRender
        onManualRenderTriggerCreated={() => {
        }}
      >
        <scene>
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
              ref={materialRef}
              color={0xff0000}
            >
              <texture
                url={LOCAL_URL}
                ref={firstTextureRef}
              />
              <texture
                url={LOCAL_URL}
                slot="alphaMap"
                ref={secondTextureRef}
              />
            </meshBasicMaterial>
          </mesh>
        </scene>
      </React3>), testDiv);

      expect(materialRef.lastCall.args[0].map).to.equal(firstTextureRef.lastCall.args[0]);
      expect(materialRef.lastCall.args[0].alphaMap).to.equal(secondTextureRef.lastCall.args[0]);

      ReactDOM.render((<React3
        width={800}
        height={600}
        mainCamera="mainCamera"
        forceManualRender
        onManualRenderTriggerCreated={() => {
        }}
      >
        <scene>
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
              ref={materialRef}
              color={0xff0000}
            >
              <texture
                url={LOCAL_URL}
                slot="alphaMap"
                ref={firstTextureRef}
              />
              <texture
                url={LOCAL_URL}
                ref={secondTextureRef}
              />
            </meshBasicMaterial>
          </mesh>
        </scene>
      </React3>), testDiv);

      expect(materialRef.lastCall.args[0].map).to.equal(secondTextureRef.lastCall.args[0]);
      expect(materialRef.lastCall.args[0].alphaMap).to.equal(firstTextureRef.lastCall.args[0]);
    });

    it('Should be possible to change a slot of a texture', () => {
      const materialRef = sinon.spy();
      const mapTextureRef = sinon.spy();

      mockConsole.expectThreeLog();

      ReactDOM.render((<React3
        width={800}
        height={600}
        mainCamera="mainCamera"
        forceManualRender
        onManualRenderTriggerCreated={() => {
        }}
      >
        <scene>
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
              ref={materialRef}
              color={0xff0000}
            >
              <texture
                url={LOCAL_URL}
                ref={mapTextureRef}
              />
            </meshBasicMaterial>
          </mesh>
        </scene>
      </React3>), testDiv);

      expect(materialRef.lastCall.args[0].map).to.equal(mapTextureRef.lastCall.args[0]);

      ReactDOM.render((<React3
        width={800}
        height={600}
        mainCamera="mainCamera"
        forceManualRender
        onManualRenderTriggerCreated={() => {
        }}
      >
        <scene>
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
              ref={materialRef}
              color={0xff0000}
            >
              <texture
                url={LOCAL_URL}
                ref={mapTextureRef}
                slot="alphaMap"
              />
            </meshBasicMaterial>
          </mesh>
        </scene>
      </React3>), testDiv);

      expect(materialRef.lastCall.args[0].map).to.equal(null);
      expect(materialRef.lastCall.args[0].alphaMap).to.equal(mapTextureRef.lastCall.args[0]);
    });
  });
};
