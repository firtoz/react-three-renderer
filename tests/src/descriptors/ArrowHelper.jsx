import React from 'react';
import * as THREE from 'three';
import ReactDOM from 'react-dom';
import sinon from 'sinon';
import chai from 'chai';

module.exports = type => {
  const { expect } = chai;

  describe('ArrowHelperDescriptor', () => {
    const { testDiv, React3, mockConsole } = require('../utils/initContainer')(type);

    it('Should warn for missing properties from ArrowHelper', () => {
      mockConsole.expectDev('Warning: Failed prop type: ' +
        'The prop `origin` is marked as required in `arrowHelper`,' +
        ' but its value is `undefined`.\n' +
        '    in arrowHelper\n' +
        '    in scene\n' +
        '    in react3');
      mockConsole.expectDev('Warning: Failed prop type: ' +
        'The prop `dir` is marked as required in `arrowHelper`,' +
        ' but its value is `undefined`.\n' +
        '    in arrowHelper\n' +
        '    in scene\n' +
        '    in react3');

      expect(() => {
        ReactDOM.render(<React3
          width={800}
          height={600}
        >
          <scene>
            <arrowHelper />
          </scene>
        </React3>, testDiv);
      }).to.throw('Cannot read property \'x\' of undefined');
    });

    it('Should update origin correctly', () => {
      const arrowHelperRef = sinon.spy();

      mockConsole.expectThreeLog();

      ReactDOM.render(<React3
        width={800}
        height={600}
      >
        <scene>
          <arrowHelper
            ref={arrowHelperRef}
            origin={new THREE.Vector3(1, 2, 3)}
            dir={new THREE.Vector3(0, 1, 0)}
          />
        </scene>
      </React3>, testDiv);

      sinon.assert.calledOnce(arrowHelperRef);

      const arrowHelper = arrowHelperRef.lastCall.args[0];

      expect(arrowHelper.position.x,
        'Arrow helper position should equal the origin parameter').to.equal(1);
      expect(arrowHelper.position.y,
        'Arrow helper position should equal the origin parameter').to.equal(2);
      expect(arrowHelper.position.z,
        'Arrow helper position should equal the origin parameter').to.equal(3);

      ReactDOM.render(<React3
        width={800}
        height={600}
      >
        <scene>
          <arrowHelper
            ref={arrowHelperRef}
            origin={new THREE.Vector3(7, 8, 9)}
            dir={new THREE.Vector3(0, 1, 0)}
          />
        </scene>
      </React3>, testDiv);

      sinon.assert.calledOnce(arrowHelperRef);

      expect(arrowHelper.position.x,
        'Arrow helper position should update to new origin parameter').to.equal(7);
      expect(arrowHelper.position.y,
        'Arrow helper position should update to new origin parameter').to.equal(8);
      expect(arrowHelper.position.z,
        'Arrow helper position should update to new origin parameter').to.equal(9);
    });

    it('Should update direction correctly', () => {
      const arrowHelperRef = sinon.spy();

      mockConsole.expectThreeLog();

      ReactDOM.render(<React3
        width={800}
        height={600}
      >
        <scene>
          <arrowHelper
            ref={arrowHelperRef}
            origin={new THREE.Vector3(1, 2, 3)}
            dir={new THREE.Vector3(0, 1, 0)}
          />
        </scene>
      </React3>, testDiv);

      const arrowHelper = arrowHelperRef.lastCall.args[0];

      expect(arrowHelper.quaternion.x,
        'Arrow helper quaternion should be set using the dir parameter').to.equal(0);
      expect(arrowHelper.quaternion.y,
        'Arrow helper quaternion should be set using the dir parameter').to.equal(0);
      expect(arrowHelper.quaternion.z,
        'Arrow helper quaternion should be set using the dir parameter').to.equal(0);
      expect(arrowHelper.quaternion.w,
        'Arrow helper quaternion should be set using the dir parameter').to.equal(1);

      sinon.stub(arrowHelper, 'setDirection');

      ReactDOM.render(<React3
        width={800}
        height={600}
      >
        <scene>
          <arrowHelper
            ref={arrowHelperRef}
            origin={new THREE.Vector3(1, 2, 3)}
            dir={new THREE.Vector3(0, 0, 1)}
          />
        </scene>
      </React3>, testDiv);

      sinon.assert.calledOnce(arrowHelper.setDirection);

      let lastSetDirectionCallArgument = arrowHelper.setDirection.lastCall.args[0];

      expect(lastSetDirectionCallArgument.x,
        'Arrow helper `setDirection` should' +
        ' have been called with the right arguments (x)').to.equal(0);
      expect(lastSetDirectionCallArgument.y,
        'Arrow helper `setDirection` should' +
        ' have been called with the right arguments (y)').to.equal(0);
      expect(lastSetDirectionCallArgument.z,
        'Arrow helper `setDirection` should' +
        ' have been called with the right arguments (z)').to.equal(1);

      ReactDOM.render(<React3
        width={800}
        height={600}
      >
        <scene>
          <arrowHelper
            ref={arrowHelperRef}
            origin={new THREE.Vector3(1, 2, 3)}
            dir={new THREE.Vector3(1, 0, 0)}
          />
        </scene>
      </React3>, testDiv);

      expect(arrowHelper.setDirection.calledTwice);

      lastSetDirectionCallArgument = arrowHelper.setDirection.lastCall.args[0];

      expect(lastSetDirectionCallArgument.x,
        'Arrow helper `setDirection` should' +
        ' have been called with the right arguments (x)').to.equal(1);
      expect(lastSetDirectionCallArgument.y,
        'Arrow helper `setDirection` should' +
        ' have been called with the right arguments (y)').to.equal(0);
      expect(lastSetDirectionCallArgument.z,
        'Arrow helper `setDirection` should' +
        ' have been called with the right arguments (z)').to.equal(0);

      const finalDirArgument = new THREE.Vector3(3, 4, 5).normalize();

      ReactDOM.render(<React3
        width={800}
        height={600}
      >
        <scene>
          <arrowHelper
            ref={arrowHelperRef}
            origin={new THREE.Vector3(1, 2, 3)}
            dir={finalDirArgument}
          />
        </scene>
      </React3>, testDiv);

      expect(arrowHelper.setDirection.calledThrice);

      expect(arrowHelper.setDirection.lastCall.args[0],
        'Arrow helper `setDirection` should have been called with the passed parameter')
        .to.equal(finalDirArgument);
    });

    it('Should update lengths correctly', () => {
      const arrowHelperRef = sinon.spy();

      mockConsole.expectThreeLog();

      ReactDOM.render(<React3
        width={800}
        height={600}
      >
        <scene>
          <arrowHelper
            ref={arrowHelperRef}
            origin={new THREE.Vector3(1, 2, 3)}
            dir={new THREE.Vector3(0, 1, 0)}
          />
        </scene>
      </React3>, testDiv);

      const arrowHelper = arrowHelperRef.lastCall.args[0];

      sinon.stub(arrowHelper, 'setLength');

      ReactDOM.render(<React3
        width={800}
        height={600}
      >
        <scene>
          <arrowHelper
            ref={arrowHelperRef}
            origin={new THREE.Vector3(1, 2, 3)}
            dir={new THREE.Vector3(0, 1, 0)}
            length={1}
            headLength={2}
            headWidth={3}
          />
        </scene>
      </React3>, testDiv);

      sinon.assert.calledOnce(arrowHelper.setLength);

      let callArgs = arrowHelper.setLength.firstCall.args;
      expect(callArgs[0], 'length should be used as first argument to setLength').to.equal(1);
      expect(callArgs[1], 'headLength should be used as first argument to setLength').to.equal(2);
      expect(callArgs[2], 'headWidth should be used as first argument to setLength').to.equal(3);

      ReactDOM.render(<React3
        width={800}
        height={600}
      >
        <scene>
          <arrowHelper
            ref={arrowHelperRef}
            origin={new THREE.Vector3(1, 2, 3)}
            dir={new THREE.Vector3(0, 1, 0)}
            length={1}
            headLength={2}
            headWidth={3}
          />
        </scene>
      </React3>, testDiv);

      // should not be called again
      sinon.assert.calledOnce(arrowHelper.setLength);

      ReactDOM.render(<React3
        width={800}
        height={600}
      >
        <scene>
          <arrowHelper
            ref={arrowHelperRef}
            origin={new THREE.Vector3(1, 2, 3)}
            dir={new THREE.Vector3(0, 1, 0)}
            length={6}
            headLength={5}
            headWidth={4}
          />
        </scene>
      </React3>, testDiv);

      // should be called only twice even though only one parameter has changed
      sinon.assert.calledTwice(arrowHelper.setLength);

      callArgs = arrowHelper.setLength.lastCall.args;
      expect(callArgs[0], 'length should be used as first argument to setLength').to.equal(6);
      expect(callArgs[1], 'headLength should be used as first argument to setLength').to.equal(5);
      expect(callArgs[2], 'headWidth should be used as first argument to setLength').to.equal(4);
    });

    it('Should update color correctly', () => {
      const arrowHelperRef = sinon.spy();

      mockConsole.expectThreeLog();

      ReactDOM.render(<React3
        width={800}
        height={600}
      >
        <scene>
          <arrowHelper
            ref={arrowHelperRef}
            origin={new THREE.Vector3(1, 2, 3)}
            dir={new THREE.Vector3(0, 1, 0)}
          />
        </scene>
      </React3>, testDiv);

      const arrowHelper = arrowHelperRef.lastCall.args[0];

      sinon.stub(arrowHelper, 'setColor');

      let colorValue = new THREE.Color(0, 128, 255);

      ReactDOM.render(<React3
        width={800}
        height={600}
      >
        <scene>
          <arrowHelper
            ref={arrowHelperRef}
            origin={new THREE.Vector3(1, 2, 3)}
            dir={new THREE.Vector3(0, 1, 0)}
            color={colorValue}
          />
        </scene>
      </React3>, testDiv);

      sinon.assert.calledOnce(arrowHelper.setColor);

      expect(arrowHelper.setColor.lastCall.args[0],
        'setColor should be called with the correct arguments').to.equal(colorValue);

      colorValue = new THREE.Color(128, 255, 0);

      ReactDOM.render(<React3
        width={800}
        height={600}
      >
        <scene>
          <arrowHelper
            ref={arrowHelperRef}
            origin={new THREE.Vector3(1, 2, 3)}
            dir={new THREE.Vector3(0, 1, 0)}
            color={colorValue}
          />
        </scene>
      </React3>, testDiv);

      sinon.assert.calledTwice(arrowHelper.setColor);

      expect(arrowHelper.setColor.lastCall.args[0],
        'setColor should be called with the correct arguments').to.equal(colorValue);

      colorValue = 0xff00ff;

      ReactDOM.render(<React3
        width={800}
        height={600}
      >
        <scene>
          <arrowHelper
            ref={arrowHelperRef}
            origin={new THREE.Vector3(1, 2, 3)}
            dir={new THREE.Vector3(0, 1, 0)}
            color={colorValue}
          />
        </scene>
      </React3>, testDiv);

      sinon.assert.calledThrice(arrowHelper.setColor);

      expect(arrowHelper.setColor.lastCall.args[0],
        'setColor should be called with the correct arguments').to.equal(colorValue);

      ReactDOM.render(<React3
        width={800}
        height={600}
      >
        <scene>
          <arrowHelper
            ref={arrowHelperRef}
            origin={new THREE.Vector3(1, 2, 3)}
            dir={new THREE.Vector3(0, 1, 0)}
            color={colorValue}
          />
        </scene>
      </React3>, testDiv);

      // Should not have been called again since the input has not changed
      sinon.assert.calledThrice(arrowHelper.setColor);
    });
  });
};
