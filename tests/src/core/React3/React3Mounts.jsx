import React from 'react';
import ReactDOM from 'react-dom';
import chai from 'chai';
import sinon from 'sinon';
import * as THREE from 'three';

module.exports = (type) => {
  const { testDiv, React3, mockConsole, requireHelper } = require('../../utils/initContainer')(type);

  const { expect } = chai;

  it('Mounts with prop warnings', () => {
    mockConsole.expectDev('Warning: Failed prop type: ' +
      'The prop `width` is marked as required in `React3`, but its value is `undefined`.\n' +
      '    in React3');
    mockConsole.expectDev('Warning: Failed prop type: ' +
      'The prop `height` is marked as required in `React3`, but its value is `undefined`.\n' +
      '    in React3');

    mockConsole.expectDev('Warning: Failed prop type: ' +
      'The prop `width` is marked as required in `react3`, but its value is `undefined`.\n' +
      '    in react3');
    mockConsole.expectDev('Warning: Failed prop type: ' +
      'The prop `height` is marked as required in `react3`, but its value is `undefined`.\n' +
      '    in react3');

    mockConsole.expectThreeLog();

    ReactDOM.render(<React3 />, testDiv);

    expect(testDiv.firstChild).to.be.an.instanceOf(HTMLCanvasElement);
  });

  it('Mounts without warnings', () => {
    const reactInstanceRef = sinon.spy();
    const canvasRef = sinon.spy();

    ReactDOM.render(<React3
      ref={reactInstanceRef}
      canvasRef={canvasRef}
      width={800}
      height={600}
    />, testDiv);

    mockConsole.expectThreeLog();

    expect(testDiv.firstChild).to.be.an.instanceOf(HTMLCanvasElement);
    const canvas = canvasRef.lastCall.args[0];
    expect(canvas).to.equal(testDiv.firstChild);

    expect(canvas.userData).to.exist();
  });

  it('Can mount multiple times', () => {
    ReactDOM.render(<div>
      <React3
        width={800}
        height={600}
      >
        <scene>
          <object3D />
        </scene>
      </React3>
      <React3
        width={800}
        height={600}
      >
        <scene>
          <group>
            <object3D />
          </group>
        </scene>
      </React3>
    </div>, testDiv);

    // twice, one for each renderer
    mockConsole.expectThreeLog();
    mockConsole.expectThreeLog();

    // add another object into the first scene and remove from the second

    ReactDOM.render(<div>
      <React3
        width={800}
        height={600}
      >
        <scene>
          <object3D />
          <object3D />
        </scene>
      </React3>
      <React3
        width={800}
        height={600}
      >
        <scene>
          <group />
        </scene>
      </React3>
    </div>, testDiv);

    // remove from the first renderer's scene

    ReactDOM.render(<div>
      <React3
        width={800}
        height={600}
      />
      <React3
        width={800}
        height={600}
      >
        <scene>
          <group />
        </scene>
      </React3>
    </div>, testDiv);

    // now remove from the second renderer's scene

    ReactDOM.render(<div>
      <React3
        width={800}
        height={600}
      />
      <React3
        width={800}
        height={600}
      >
        <scene />
      </React3>
    </div>, testDiv);
  });

  describe('manual rendering', () => {
    let canvas;
    let React3Renderer;

    const onRecreateCanvas = () => {
    };

    before(() => {
      canvas = document.createElement('canvas');
      React3Renderer = requireHelper('React3Renderer');

      testDiv.appendChild(canvas);
    });

    describe('react3', () => {
      let react3Renderer;
      before(() => {
        react3Renderer = new React3Renderer();
      });

      it('can be rendered into a canvas', () => {
        const react3Ref = sinon.spy();

        mockConsole.expectThreeLog();

        react3Renderer.render(
          (<react3
            context="3d"
            width={50}
            height={50}
            onRecreateCanvas={onRecreateCanvas}
            ref={react3Ref}
          />), canvas);

        expect(react3Ref.callCount).to.equal(1);
      });

      after(() => {
        react3Renderer.dispose();
      });
    });

    describe('objects', () => {
      let react3Renderer;

      beforeEach(() => {
        react3Renderer = new React3Renderer();
      });

      it('can be rendered into other objects', () => {
        const containerObject = new THREE.Object3D();

        const object3dRef = sinon.spy();

        react3Renderer.render((<object3D ref={object3dRef} />), containerObject);

        expect(object3dRef.callCount).to.equal(1);

        expect(object3dRef.lastCall.args[0], 'Object should be a child of the container')
          .to.equal(containerObject.children[0]);
      });

      it('can be rendered into deeper objects', () => {
        const containerObject = new THREE.Object3D();

        const object3dRef = sinon.spy();
        const secondObject3dRef = sinon.spy();

        react3Renderer.render((<object3D ref={object3dRef}>
          <object3D ref={secondObject3dRef} />
        </object3D>), containerObject);

        expect(object3dRef.callCount).to.equal(1);
        expect(secondObject3dRef.callCount).to.equal(1);

        expect(object3dRef.lastCall.args[0], 'Object should be a child of the container')
          .to.equal(containerObject.children[0]);

        expect(secondObject3dRef.lastCall.args[0], 'The second object should be a child of the first object')
          .to.equal(object3dRef.lastCall.args[0].children[0]);
      });

      it('can be unmounted from other objects', () => {
        const containerObject = new THREE.Object3D();

        const object3dRef = sinon.spy();

        react3Renderer.render((<object3D ref={object3dRef} />), containerObject);
        react3Renderer.unmountComponentAtNode(containerObject);

        expect(object3dRef.callCount).to.equal(2);
        expect(object3dRef.lastCall.args[0], 'Object should be removed from the container')
          .to.be.null();
        expect(containerObject.children.length).to.equal(0);
      });

      it('cannot be unmounted from non-root objects', () => {
        const containerObject = new THREE.Object3D();

        const object3dRef = sinon.spy();
        const secondObject3dRef = sinon.spy();

        react3Renderer.render((<object3D ref={object3dRef}>
          <object3D ref={secondObject3dRef} />
        </object3D>), containerObject);

        mockConsole.expectDev('Warning: unmountComponentAtNode(): The node you\'re' +
          ' attempting to unmount was rendered by React and is not a top-level container.' +
          ' You may have accidentally passed in a React root node instead of its container.');

        react3Renderer.unmountComponentAtNode(object3dRef.lastCall.args[0]);

        react3Renderer.unmountComponentAtNode(secondObject3dRef.lastCall.args[0]);
      });

      it('cannot be mounted if it does not extend object3d', () => {
        const containerObject = new THREE.Mesh();

        containerObject.geometry.dispose();
        containerObject.geometry = undefined;

        const geometryRef = sinon.spy();
        react3Renderer.render((<geometry
          ref={geometryRef}
          vertices={[]}
        />), containerObject);

        mockConsole.expectDev('Warning: This type (GeometryDescriptor) cannot be mounted as a root element.' +
          ' Please mount classes that derive from object3D or react3');
      });

      afterEach(() => {
        react3Renderer.dispose();
      });
    });

    after(() => {
      testDiv.removeChild(canvas);
    });
  });
};
