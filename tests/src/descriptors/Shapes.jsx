import React from 'react';
import * as THREE from 'three';
import ReactDOM from 'react-dom';
import sinon from 'sinon';
import chai from 'chai';

const { expect } = chai;

module.exports = type => {
  describe('Shapes', () => {
    const { testDiv, React3, mockConsole } = require('../utils/initContainer')(type);

    let shapeGeometryStub = null;

    afterEach(() => {
      if (shapeGeometryStub) {
        shapeGeometryStub.restore();
        shapeGeometryStub = null;
      }
    });

    it('Should set shapes from props', () => {
      const rectLength = 120;
      const rectWidth = 40;

      const rectShape = new THREE.Shape();
      rectShape.moveTo(0, 0);
      rectShape.lineTo(0, rectWidth);
      rectShape.lineTo(rectLength, rectWidth);
      rectShape.lineTo(rectLength, 0);
      rectShape.lineTo(0, 0);

      const shapes = [
        rectShape,
      ];

      const OriginalShapeGeometry = THREE.ShapeGeometry;

      const spy = sinon.spy();

      class ShapeGeometryMock extends OriginalShapeGeometry {
        constructor(inputShapes, options) {
          super(inputShapes, options);

          spy(inputShapes, options);
        }
      }

      shapeGeometryStub = sinon.stub(THREE, 'ShapeGeometry', ShapeGeometryMock);
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
          <mesh>
            <shapeGeometry
              shapes={shapes}
            />
            <meshBasicMaterial />
          </mesh>
        </scene>
      </React3>), testDiv);

      sinon.assert.calledOnce(spy);

      expect(spy.lastCall.args[0][0],
        'Shapes should be passed to the constructor of ShapeGeometry').to.equal(shapes[0]);
    });

    it('Should set shapes from children', () => {
      const rectLength = 120;
      const rectWidth = 40;

      const OriginalShapeGeometry = THREE.ShapeGeometry;

      const shapeGeometrySpy = sinon.spy();
      const shapeRef = sinon.spy();

      class ShapeGeometryMock extends OriginalShapeGeometry {
        constructor(shapes, options) {
          super(shapes, options);

          shapeGeometrySpy(shapes, options);
        }
      }

      shapeGeometryStub = sinon.stub(THREE, 'ShapeGeometry', ShapeGeometryMock);
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
          <mesh>
            <shapeGeometry>
              <shape ref={shapeRef}>
                <moveTo
                  x={0}
                  y={0}
                />
                <lineTo
                  x={0}
                  y={rectWidth}
                />
                <lineTo
                  x={rectLength}
                  y={rectWidth}
                />
                <lineTo
                  x={rectLength}
                  y={0}
                />
                <lineTo
                  x={0}
                  y={0}
                />
              </shape>
            </shapeGeometry>
            <meshBasicMaterial />
          </mesh>
        </scene>
      </React3>), testDiv);

      // the constructor gets called only once and should have the shape in it
      sinon.assert.calledOnce(shapeGeometrySpy);

      expect(shapeGeometrySpy.firstCall.args[0].length).to.equal(1);

      const shape = shapeGeometrySpy.firstCall.args[0][0];

      expect(shapeRef.lastCall.args[0]).to.equal(shape);

      expect(shape.curves.length).to.equal(4);

      expect(shape.curves[0].v1.x).to.equal(0);
      expect(shape.curves[0].v1.y).to.equal(0);

      expect(shape.curves[0].v2.x).to.equal(0);
      expect(shape.curves[0].v2.y).to.equal(rectWidth);


      expect(shape.curves[1].v1.x).to.equal(0);
      expect(shape.curves[1].v1.y).to.equal(rectWidth);

      expect(shape.curves[1].v2.x).to.equal(rectLength);
      expect(shape.curves[1].v2.y).to.equal(rectWidth);


      expect(shape.curves[2].v1.x).to.equal(rectLength);
      expect(shape.curves[2].v1.y).to.equal(rectWidth);

      expect(shape.curves[2].v2.x).to.equal(rectLength);
      expect(shape.curves[2].v2.y).to.equal(0);


      expect(shape.curves[3].v1.x).to.equal(rectLength);
      expect(shape.curves[3].v1.y).to.equal(0);

      expect(shape.curves[3].v2.x).to.equal(0);
      expect(shape.curves[3].v2.y).to.equal(0);
    });

    it('Should set options from props', () => {
      const OriginalShapeGeometry = THREE.ShapeGeometry;

      const spy = sinon.spy();

      class ShapeGeometryMock extends OriginalShapeGeometry {
        constructor(shapes, options) {
          super(shapes, options);

          spy(shapes, options);
        }
      }

      shapeGeometryStub = sinon.stub(THREE, 'ShapeGeometry', ShapeGeometryMock);
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
          <mesh>
            <shapeGeometry
              curveSegments={1}
              material={2}
            />
            <meshBasicMaterial />
          </mesh>
        </scene>
      </React3>), testDiv);

      sinon.assert.calledOnce(spy);

      expect(spy.firstCall.args[1].curveSegments).to.equal(1);
      expect(spy.firstCall.args[1].material).to.equal(2);

      ReactDOM.render((<React3
        width={800}
        height={600}
        mainCamera="mainCamera"
        forceManualRender
        onManualRenderTriggerCreated={() => {
        }}
      >
        <scene>
          <mesh>
            <shapeGeometry
              curveSegments={3}
              material={4}
            />
            <meshBasicMaterial />
          </mesh>
        </scene>
      </React3>), testDiv);

      sinon.assert.calledTwice(spy);

      expect(spy.lastCall.args[1].curveSegments).to.equal(3);
      expect(spy.lastCall.args[1].material).to.equal(4);
    });

    it('Should update shapes from children', () => {
      const rectLength = 120;
      const rectWidth = 40;

      const OriginalShapeGeometry = THREE.ShapeGeometry;

      const shapeGeometrySpy = sinon.spy();
      const shapeRef = sinon.spy();
      const secondShapeRef = sinon.spy();

      class ShapeGeometryMock extends OriginalShapeGeometry {
        constructor(shapes, options) {
          super(shapes, options);

          shapeGeometrySpy(shapes, options);
        }
      }

      shapeGeometryStub = sinon.stub(THREE, 'ShapeGeometry', ShapeGeometryMock);
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
          <mesh>
            <shapeGeometry>
              <shape ref={shapeRef} key="a">
                <moveTo
                  x={0}
                  y={0}
                />
                <lineTo
                  x={0}
                  y={rectWidth}
                />
                <lineTo
                  x={rectLength}
                  y={rectWidth}
                />
                <lineTo
                  x={rectLength}
                  y={0}
                />
                <lineTo
                  x={0}
                  y={0}
                />
              </shape>
            </shapeGeometry>
            <meshBasicMaterial />
          </mesh>
        </scene>
      </React3>), testDiv);

      // the constructor gets called only once and should have the shape in it
      sinon.assert.calledOnce(shapeGeometrySpy);

      expect(shapeGeometrySpy.firstCall.args[0].length).to.equal(1);

      let shape = shapeGeometrySpy.firstCall.args[0][0];

      expect(shapeRef.lastCall.args[0]).to.equal(shape);

      ReactDOM.render((<React3
        width={800}
        height={600}
        mainCamera="mainCamera"
        forceManualRender
        onManualRenderTriggerCreated={() => {
        }}
      >
        <scene>
          <mesh>
            <shapeGeometry>
              <shape ref={shapeRef} key="a">
                <moveTo
                  x={0}
                  y={0}
                />
                <lineTo
                  x={10}
                  y={10 + (rectWidth * 5)}
                />
                <lineTo
                  x={10 + (rectLength * 10)}
                  y={10 + rectWidth}
                />
              </shape>
              <shape ref={secondShapeRef} key="b">
                <moveTo
                  x={10}
                  y={10}
                />
                <lineTo
                  x={10}
                  y={10 + (rectWidth * 5)}
                />
                <lineTo
                  x={10 + (rectLength * 10)}
                  y={10 + rectWidth}
                />
                <lineTo
                  x={10 + rectLength}
                  y={10}
                />
                <lineTo
                  x={10}
                  y={10}
                />
              </shape>
            </shapeGeometry>
            <meshBasicMaterial />
          </mesh>
        </scene>
      </React3>), testDiv);

      expect(shapeRef.callCount).to.equal(3); // mount, unmount, ref cleanup, and remount
      expect(shapeRef.getCall(0).args[0]).not.to.be.null();
      expect(shapeRef.getCall(1).args[0]).to.be.null();

      shape = shapeRef.getCall(2).args[0];

      expect(shape).not.to.be.null();
      expect(shape.curves.length).to.equal(2);

      expect(shape.curves[0].v1.x).to.equal(0);
      expect(shape.curves[0].v1.y).to.equal(0);

      expect(shape.curves[0].v2.x).to.equal(10);
      expect(shape.curves[0].v2.y).to.equal(10 + (rectWidth * 5));

      expect(secondShapeRef.callCount).to.equal(2); // mount, remount

      ReactDOM.render((<React3
        width={800}
        height={600}
        mainCamera="mainCamera"
        forceManualRender
        onManualRenderTriggerCreated={() => {
        }}
      >
        <scene>
          <mesh>
            <shapeGeometry>
              <shape ref={secondShapeRef} key="b">
                <moveTo
                  x={10}
                  y={10}
                />
                <lineTo
                  x={10}
                  y={10 + (rectWidth * 5)}
                />
                <lineTo
                  x={10 + (rectLength * 10)}
                  y={10 + rectWidth}
                />
                <lineTo
                  x={10 + rectLength}
                  y={10}
                />
                <lineTo
                  x={10}
                  y={10}
                />
              </shape>
              <shape ref={shapeRef} key="a">
                <moveTo
                  x={0}
                  y={0}
                />
                <lineTo
                  x={0}
                  y={rectWidth * 5}
                />
                <lineTo
                  x={rectLength * 10}
                  y={rectWidth}
                />
                <lineTo
                  x={rectLength}
                  y={0}
                />
                <lineTo
                  x={0}
                  y={0}
                />
              </shape>
            </shapeGeometry>
            <meshBasicMaterial />
          </mesh>
        </scene>
      </React3>), testDiv);

      expect(shapeRef.callCount).to.equal(5); // ref cleanup, remount
      expect(shapeRef.getCall(3).args[0]).to.be.null();
      expect(shapeRef.getCall(4).args[0]).not.to.be.null();

      shape = shapeRef.getCall(4).args[0];

      expect(shape).not.to.be.null();
      expect(shape.curves.length).to.equal(4);

      expect(shape.curves[0].v1.x).to.equal(0);
      expect(shape.curves[0].v1.y).to.equal(0);

      expect(shape.curves[0].v2.x).to.equal(0);
      expect(shape.curves[0].v2.y).to.equal(rectWidth * 5);

      expect(shape.curves[1].v2.x).to.equal(rectLength * 10);
      expect(shape.curves[1].v2.y).to.equal(rectWidth);

      expect(shape.curves[2].v2.x).to.equal(rectLength);
      expect(shape.curves[2].v2.y).to.equal(0);

      expect(shape.curves[3].v2.x).to.equal(0);
      expect(shape.curves[3].v2.y).to.equal(0);

      expect(secondShapeRef.callCount).to.equal(4); // ref cleanup, remount
      expect(secondShapeRef.getCall(2).args[0]).to.be.null();
      expect(secondShapeRef.getCall(3).args[0]).not.to.be.null();
    });
  });
};
