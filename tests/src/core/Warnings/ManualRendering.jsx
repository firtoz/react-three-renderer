import React from 'react';
import * as THREE from 'three';
import ReactDOM from 'react-dom';

import chai from 'chai';
import sinon from 'sinon';

const { expect } = chai;

module.exports = type => {
  const { testDiv, React3, mockConsole } = require('../../utils/initContainer')(type);

  it('Shows warnings when manual rendering is forced but no trigger property is set', () => {
    ReactDOM.render(<React3
      width={800}
      height={600}

      forceManualRender
    />, testDiv);

    mockConsole.expectDev('Warning: The `forceManualRender` property requires the ' +
      '`onManualRenderTriggerCreated` property to be set.');
    mockConsole.expectThreeLog();
  });

  it('Calls renderer function', () => {
    const onRendererUpdated = sinon.spy();

    ReactDOM.render(<React3
      width={800}
      height={600}

      onRendererUpdated={onRendererUpdated}
    />, testDiv);

    mockConsole.expectThreeLog();

    expect(onRendererUpdated.called).to.be.true();
    expect(onRendererUpdated.getCall(0).args.length).to.equal(1);
    expect(onRendererUpdated.getCall(0).args[0]).to.be.an.instanceof(THREE.WebGLRenderer);
  });

  it('Shows no warnings when manual rendering is forced and trigger property is set', () => {
    function manualTriggerCallback() {

    }

    ReactDOM.render(<React3
      width={800}
      height={600}

      forceManualRender
      onManualRenderTriggerCreated={manualTriggerCallback}
    />, testDiv);

    mockConsole.expectThreeLog();
  });

  it('Shows warnings when the onManualRenderTriggerCreated is removed', () => {
    ReactDOM.render(<React3
      width={800}
      height={600}

      forceManualRender
      onManualRenderTriggerCreated={sinon.spy()}
    />, testDiv);

    mockConsole.expectThreeLog();

    ReactDOM.render(<React3
      width={800}
      height={600}

      forceManualRender
    />, testDiv);

    mockConsole.expectDev('Warning: The `React3` component has `forceManualRender` property set, ' +
      'but not `onManualRenderTriggerCreated`. You will not be able to update the view.');

    ReactDOM.render(<React3
      width={1280}
      height={720}

      forceManualRender
    />, testDiv);

    // should not warn twice
  });

  it('Shows warnings when only forceManualRender is added', () => {
    ReactDOM.render(<React3
      width={800}
      height={600}
    />, testDiv);

    mockConsole.expectThreeLog();

    ReactDOM.render(<React3
      width={800}
      height={600}

      forceManualRender
    />, testDiv);

    mockConsole.expectDev('Warning: The `React3` component has `forceManualRender` property set, ' +
      'but not `onManualRenderTriggerCreated`. You will not be able to update the view.');

    // update w/h, should not warn again
    ReactDOM.render(<React3
      width={600}
      height={800}

      forceManualRender
    />, testDiv);
  });

  it('Shows no warnings when both forceManualRender ' +
    'and onManualRenderTriggerCreated are added', () => {
    ReactDOM.render(<React3
      width={800}
      height={600}
    />, testDiv);

    mockConsole.expectThreeLog();

    ReactDOM.render(<React3
      width={800}
      height={600}

      forceManualRender
      onManualRenderTriggerCreated={sinon.spy()}
    />, testDiv);
  });

  it('Fills in manual trigger with a function', done => {
    function manualTriggerCallback(func) {
      expect(func).to.be.a('function');
      expect(func.length).to.equal(1);

      done();
    }

    ReactDOM.render(<React3
      width={800}
      height={600}

      forceManualRender
      onManualRenderTriggerCreated={manualTriggerCallback}
    />, testDiv);

    mockConsole.expectThreeLog();
  });

  it('Does not call onAnimate if manual rendering is forced', done => {
    const onAnimate = sinon.spy();
    const manualTriggerCallback = sinon.spy();

    ReactDOM.render(<React3
      width={800}
      height={600}

      onAnimate={onAnimate}

      forceManualRender
      onManualRenderTriggerCreated={manualTriggerCallback}
    />, testDiv);

    mockConsole.expectThreeLog();

    setTimeout(() => {
      expect(onAnimate.called).to.be.false();
      expect(manualTriggerCallback.called).to.be.true();

      done();
    }, 500);
  });

  it('Does call onAnimate once per frame for manual rendering', done => {
    const onAnimate = sinon.spy();

    function manualTriggerCallback(trigger) {
      expect(onAnimate.called).to.be.false();

      trigger(true);

      expect(onAnimate.callCount).to.equal(1);

      trigger(true);

      expect(onAnimate.callCount).to.equal(2);

      trigger(true);

      expect(onAnimate.callCount).to.equal(3);

      trigger(true);

      expect(onAnimate.callCount).to.equal(4);

      trigger(true);

      expect(onAnimate.callCount).to.equal(5);

      done();
    }

    ReactDOM.render(<React3
      width={800}
      height={600}

      onAnimate={onAnimate}

      forceManualRender
      onManualRenderTriggerCreated={manualTriggerCallback}
    />, testDiv);

    mockConsole.expectThreeLog();
  });

  it('Manual rendering trigger with default arguments' +
    ' should only render within animation frame', done => {
    const onAnimate = sinon.spy();
    const onRendererUpdated = sinon.spy();

    let trigger = null;

    function manualTriggerCallback(_trigger) {
      expect(onRendererUpdated.called).to.be.false();

      // onRendererUpdated should be called after the component is mounted into the parent

      trigger = _trigger;
    }

    ReactDOM.render(<React3
      width={800}
      height={600}

      onAnimate={onAnimate}

      forceManualRender
      onManualRenderTriggerCreated={manualTriggerCallback}

      mainCamera="mainCamera"

      onRendererUpdated={onRendererUpdated}
    >
      <scene>
        <perspectiveCamera
          name="mainCamera"
        />
      </scene>
    </React3>, testDiv);

    expect(trigger).not.to.be.null();

    expect(onRendererUpdated.called).to.be.true();
    expect(onRendererUpdated.callCount).to.equal(1);

    const renderer = onRendererUpdated.getCall(0).args[0];

    const rendererRender = sinon.spy(renderer, 'render');

    expect(onAnimate.called).to.be.false();

    trigger(true);

    expect(onAnimate.called).to.be.true();
    expect(onAnimate.callCount).to.equal(1);

    expect(rendererRender.called).to.be.true();
    expect(rendererRender.callCount).to.equal(1);

    // these will activate rendering next frame
    trigger();
    trigger();
    trigger();

    // this should not have changed anything even through some props changed or were added
    ReactDOM.render(<React3
      width={800 * 2}
      height={600 * 2}

      onAnimate={onAnimate}

      forceManualRender
      onManualRenderTriggerCreated={manualTriggerCallback}

      mainCamera="mainCamera"

      onRendererUpdated={onRendererUpdated}
    >
      <scene>
        <perspectiveCamera
          position={new THREE.Vector3(0, 1, 2)}
          name="mainCamera"
        />
      </scene>
    </React3>, testDiv);

    expect(onAnimate.callCount).to.equal(1);
    expect(rendererRender.callCount).to.equal(1);

    requestAnimationFrame(() => {
      expect(onAnimate.callCount).to.equal(2);
      expect(rendererRender.callCount).to.equal(2);

      // rendering should not have happened in this frame
      requestAnimationFrame(() => {
        expect(onAnimate.callCount).to.equal(2);
        expect(rendererRender.callCount).to.equal(2);

        // nor this frame
        requestAnimationFrame(() => {
          expect(onAnimate.callCount).to.equal(2);
          expect(rendererRender.callCount).to.equal(2);

          trigger();
          trigger();
          trigger();
          trigger();
          trigger();
          trigger();

          // should have triggered only one frame
          requestAnimationFrame(() => {
            expect(onAnimate.callCount).to.equal(3);
            expect(rendererRender.callCount).to.equal(3);

            requestAnimationFrame(() => {
              expect(onAnimate.callCount).to.equal(3);
              expect(rendererRender.callCount).to.equal(3);

              done();
            });
          });
        });
      });
    });

    mockConsole.expectThreeLog();
  });
};
