/* eslint no-unused-expressions: 0 */

import React from 'react';
import THREE from 'three';
import ReactDOM from 'react-dom';
import assert from 'assert';
import sinon from 'sinon';
import chai from 'chai';

const { expect } = chai;

let imageLoaderLoadStub;
let imageLoaderInstances = [];

const WANTED_URL = 'http://lorempixel.com/1/1/';

function ImageLoaderMock() {
  this.load = sinon.spy();
  this.setCrossOrigin = sinon.spy();
  this.setPath = sinon.spy();

  imageLoaderInstances.push(this);
}

module.exports = type => {
  describe('TextureDescriptor', () => {
    const { testDiv, React3, mockConsole } = require('../utils/initContainer')(type);

    afterEach(() => {
      if (imageLoaderLoadStub) {
        imageLoaderLoadStub.restore();
        imageLoaderLoadStub = null;
      }

      imageLoaderInstances = [];
    });

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
        url="/base/assets/images/rgbw.png"
        done={done}
        onError={textureLoadFail}
      />), testDiv);

      mockConsole.expectThreeLog();
    });

    it('Should call image loader with the URL and no cross origin', () => {
      imageLoaderLoadStub = sinon.stub(THREE, 'ImageLoader', ImageLoaderMock);

      mockConsole.expectThreeLog();

      ReactDOM.render((<TestComponent
        url={WANTED_URL}
      />), testDiv);

      // image loader instance should have been created
      expect(imageLoaderInstances.length).to.equal(1);

      const imageLoaderInstance = imageLoaderInstances[0];

      sinon.assert.calledOnce(imageLoaderInstance.load);

      sinon.assert.calledWith(imageLoaderInstance.load, WANTED_URL);

      sinon.assert.calledOnce(imageLoaderInstance.setCrossOrigin);

      sinon.assert.calledWith(imageLoaderInstance.setCrossOrigin, undefined);
    });

    it('Should set cross origin property for image loader', () => {
      imageLoaderLoadStub = sinon.stub(THREE, 'ImageLoader', ImageLoaderMock);

      mockConsole.expectThreeLog();

      ReactDOM.render((<React3
        width={800}
        height={600}
        mainCamera="mainCamera"
        forceManualRender
        onManualRenderTriggerCreated={() => {}}
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

      // image loader instance should have been created
      expect(imageLoaderInstances.length).to.equal(1);

      const imageLoaderInstance = imageLoaderInstances[0];

      sinon.assert.calledOnce(imageLoaderInstance.load);

      sinon.assert.calledWith(imageLoaderInstance.load, WANTED_URL);

      sinon.assert.calledOnce(imageLoaderInstance.setCrossOrigin);

      sinon.assert.calledWith(imageLoaderInstance.setCrossOrigin, '');
    });

    it('Should update the provided parent slot', () => {
      imageLoaderLoadStub = sinon.stub(THREE, 'ImageLoader', ImageLoaderMock);

      mockConsole.expectThreeLog();
      let materialThreeObject;

      ReactDOM.render((<React3
        width={800}
        height={600}
        mainCamera="mainCamera"
        forceManualRender
        onManualRenderTriggerCreated={() => {}}
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
              ref={threeObject => (materialThreeObject = threeObject)}
              color={0xff0000}
            >
              <texture
                url={WANTED_URL}
                crossOrigin=""
                slot="bumpMap"
              />
            </meshBasicMaterial>
          </mesh>
        </scene>
      </React3>), testDiv);

      expect(materialThreeObject.bumpMap).to.exist;
    });

    it('Should be possible to have multiple textures in one material', () => {
      imageLoaderLoadStub = sinon.stub(THREE, 'ImageLoader', ImageLoaderMock);

      mockConsole.expectThreeLog();
      let materialThreeObject;

      ReactDOM.render((<React3
        width={800}
        height={600}
        mainCamera="mainCamera"
        forceManualRender
        onManualRenderTriggerCreated={() => {}}
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
              ref={threeObject => (materialThreeObject = threeObject)}
              color={0xff0000}
            >
              <texture
                url={WANTED_URL}
                crossOrigin=""
              />
              <texture
                url={WANTED_URL}
                crossOrigin=""
                slot="bumpMap"
              />
            </meshBasicMaterial>
          </mesh>
        </scene>
      </React3>), testDiv);

      expect(materialThreeObject.map).to.exist;
      expect(materialThreeObject.bumpMap).to.exist;
    });
  });
};
