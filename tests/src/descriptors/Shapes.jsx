import React from 'react';
import * as THREE from 'three';
import ReactDOM from 'react-dom';
import sinon from 'sinon';
import chai from 'chai';

const { expect } = chai;

module.exports = (type) => {
  describe('Shapes', () => {
    const { testDiv, React3, mockConsole } = require('../utils/initContainer')(type);

    let shapeGeometryStub = null;

    class ShapeGeometryParametersStub {
      constructor(parametersSpy) {
        const params = {};

        let keySeed = 0;

        this.oldPrototype = THREE.ShapeGeometry.prototype;

        const newPrototype = Object.create(this.oldPrototype);

        Object.defineProperty(newPrototype, 'parameters', {
          get() {
            if (!this._key) {
              return {};
            }

            return params[this._key];
          },
          set(newParams) {
            if (!this._key) {
              this._key = keySeed;
              keySeed++;
            }

            params[this._key] = newParams;

            parametersSpy(newParams);
          },
        });

        THREE.ShapeGeometry.prototype = newPrototype;
      }

      restore() {
        THREE.ShapeGeometry.prototype = this.oldPrototype;
      }
    }

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

      const parametersSpy = sinon.spy();

      shapeGeometryStub = new ShapeGeometryParametersStub(parametersSpy);

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

      sinon.assert.calledOnce(parametersSpy);

      expect(parametersSpy.lastCall.args[0].shapes[0],
        'Shapes should be passed to the constructor of ShapeGeometry').to.equal(shapes[0]);
    });

    it('Should set shapes from children', () => {
      const rectLength = 120;
      const rectWidth = 40;

      const parametersSpy = sinon.spy();

      shapeGeometryStub = new ShapeGeometryParametersStub(parametersSpy);

      mockConsole.expectThreeLog();

      const shapeRef = sinon.spy();

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
      sinon.assert.calledOnce(parametersSpy);

      expect(parametersSpy.firstCall.args[0].shapes.length).to.equal(1);

      const shape = parametersSpy.firstCall.args[0].shapes[0];

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
      const parametersSpy = sinon.spy();

      shapeGeometryStub = new ShapeGeometryParametersStub(parametersSpy);

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
            />
            <meshBasicMaterial />
          </mesh>
        </scene>
      </React3>), testDiv);

      sinon.assert.calledOnce(parametersSpy);

      expect(parametersSpy.firstCall.args[0].curveSegments).to.equal(1);

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
            />
            <meshBasicMaterial />
          </mesh>
        </scene>
      </React3>), testDiv);

      sinon.assert.calledTwice(parametersSpy);

      expect(parametersSpy.lastCall.args[0].curveSegments).to.equal(3);
    });

    it('Should update shapes from children', () => {
      const rectLength = 120;
      const rectWidth = 40;

      const shapeRef = sinon.spy();
      const secondShapeRef = sinon.spy();

      const parametersSpy = sinon.spy();

      shapeGeometryStub = new ShapeGeometryParametersStub(parametersSpy);

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
      sinon.assert.calledOnce(parametersSpy);

      expect(parametersSpy.firstCall.args[0].shapes.length).to.equal(1);

      let shape = parametersSpy.firstCall.args[0].shapes[0];

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
