import React from 'react';
import ReactDOM from 'react-dom';
import chai from 'chai';
import sinon from 'sinon';
import THREE from 'three';

module.exports = type => {
  const { expect } = chai;

  describe('DirectionalLightDescriptor', () => {
    const { testDiv, React3, mockConsole, requireHelper } = require('../utils/initContainer')(type);

    describe('position', () => {
      it('sets default position at origin', () => {
        const directionalLightRef = sinon.spy();

        mockConsole.expectThreeLog();

        ReactDOM.render(<React3
          width={800}
          height={600}
        >
          <scene>
            <directionalLight
              ref={directionalLightRef}
            />
          </scene>
        </React3>, testDiv);

        const directionalLight = directionalLightRef.lastCall.args[0];

        expect(
          [
            directionalLight.position.x,
            directionalLight.position.y,
            directionalLight.position.z,
          ]
        ).to.deep.equal([
          0,
          0,
          0,
        ]);
      });
    });

    describe('shadow', () => {
      const DirectionalLightDescriptor = requireHelper('descriptors/Light/' +
        'DirectionalLightDescriptor');
      const LightDescriptorBase = requireHelper('descriptors/Light/LightDescriptorBase');

      class TestComponent extends React.Component {
        static propTypes = {
          done: React.PropTypes.func,
          lightProps: React.PropTypes.any,
          expectedCameraNear: React.PropTypes.number,
          expectedCameraFar: React.PropTypes.number,

          expectedCameraLeft: React.PropTypes.number,
          expectedCameraRight: React.PropTypes.number,
          expectedCameraTop: React.PropTypes.number,
          expectedCameraBottom: React.PropTypes.number,
        };

        static defaultProps = {
          expectedCameraNear: LightDescriptorBase.defaultShadowCameraNear,
          expectedCameraFar: LightDescriptorBase.defaultShadowCameraFar,

          expectedCameraLeft: DirectionalLightDescriptor.defaultShadowCameraLeft,
          expectedCameraRight: DirectionalLightDescriptor.defaultShadowCameraRight,
          expectedCameraTop: DirectionalLightDescriptor.defaultShadowCameraTop,
          expectedCameraBottom: DirectionalLightDescriptor.defaultShadowCameraBottom,
        };

        componentDidMount() {
          const {
            directionalLight,
          } = this.refs;

          const {
            expectedCameraNear,
            expectedCameraFar,

            expectedCameraLeft,
            expectedCameraRight,
            expectedCameraTop,
            expectedCameraBottom,
          } = this.props;

          expect(directionalLight.shadow.camera.near).to.be.equal(expectedCameraNear);
          expect(directionalLight.shadow.camera.far).to.be.equal(expectedCameraFar);

          expect(directionalLight.shadow.camera.left).to.be.equal(expectedCameraLeft);
          expect(directionalLight.shadow.camera.right).to.be.equal(expectedCameraRight);
          expect(directionalLight.shadow.camera.top).to.be.equal(expectedCameraTop);
          expect(directionalLight.shadow.camera.bottom).to.be.equal(expectedCameraBottom);

          this.props.done();
        }

        render() {
          const {
            lightProps,
          } = this.props;

          return (<React3
            width={800}
            height={600}
          >
            <scene>
              <directionalLight
                ref="directionalLight"
                {...lightProps}
              />
            </scene>
          </React3>);
        }
      }

      it('Should have correct default values for shadow camera', (done) => {
        mockConsole.expectThreeLog();

        ReactDOM.render((<TestComponent
          done={done}
          lightProps={{}}
        />), testDiv);
      });

      it('Should assign correct values for shadow camera', (done) => {
        mockConsole.expectThreeLog();

        ReactDOM.render((<TestComponent
          done={done}
          expectedCameraLeft={300}
          expectedCameraRight={400}
          expectedCameraTop={500}
          expectedCameraBottom={600}
          expectedCameraNear={7}
          expectedCameraFar={8}
          lightProps={{
            shadowCameraLeft: 300,
            shadowCameraRight: 400,
            shadowCameraTop: 500,
            shadowCameraBottom: 600,

            shadowCameraNear: 7,
            shadowCameraFar: 8,
          }}
        />), testDiv);
      });
    });

    describe('direction', () => {
      it('sets target position using rotation', () => {
        const directionalLightRef = sinon.spy();

        mockConsole.expectThreeLog();

        ReactDOM.render(<React3
          width={800}
          height={600}
        >
          <scene>
            <directionalLight
              ref={directionalLightRef}
              updatesRefreshAllMaterials
              rotation={new THREE.Euler(0, 0, 0)}
            />
          </scene>
        </React3>, testDiv);

        let directionalLight = directionalLightRef.lastCall.args[0];

        const twoDP = x => Math.round(x * 100) / 100;

        expect(
          [
            directionalLight.target.position.x,
            directionalLight.target.position.y,
            directionalLight.target.position.z,
          ].map(twoDP),
          'Target position should be set from light rotation').to.deep.equal(
          [
            0,
            0,
            1,
          ].map(twoDP),
        );

        ReactDOM.render(<React3
          width={800}
          height={600}
        >
          <scene>
            <directionalLight
              ref={directionalLightRef}
              updatesRefreshAllMaterials
              rotation={new THREE.Euler().setFromQuaternion(
                new THREE.Quaternion()
                  .setFromUnitVectors(
                    new THREE.Vector3(0, 0, 1),
                    new THREE.Vector3(1, 0, 0)
                  )
              )}
              key="2"
            />
          </scene>
        </React3>, testDiv);

        directionalLight = directionalLightRef.lastCall.args[0];

        expect(
          [
            directionalLight.target.position.x,
            directionalLight.target.position.y,
            directionalLight.target.position.z,
          ].map(twoDP),
          'Target position should be towards light rotation')
          .to.deep.equal(
          [
            1,
            0,
            0,
          ].map(twoDP),
        );
      });
      it('sets target position using quaternion', () => {
        const directionalLightRef = sinon.spy();

        mockConsole.expectThreeLog();

        ReactDOM.render(<React3
          width={800}
          height={600}
        >
          <scene>
            <directionalLight
              ref={directionalLightRef}
              updatesRefreshAllMaterials
              quaternion={new THREE.Quaternion()}
            />
          </scene>
        </React3>, testDiv);

        let directionalLight = directionalLightRef.lastCall.args[0];

        const twoDP = x => Math.round(x * 100) / 100;

        expect(
          [
            directionalLight.target.position.x,
            directionalLight.target.position.y,
            directionalLight.target.position.z,
          ].map(twoDP),
          'Target position should be set from light quaternion').to.deep.equal(
          [
            0,
            0,
            1,
          ].map(twoDP),
        );

        ReactDOM.render(<React3
          width={800}
          height={600}
        >
          <scene>
            <directionalLight
              ref={directionalLightRef}
              updatesRefreshAllMaterials
              quaternion={new THREE.Quaternion()
                .setFromUnitVectors(
                  new THREE.Vector3(0, 0, 1),
                  new THREE.Vector3(1, 0, 0)
                )}
              key="2"
            />
          </scene>
        </React3>, testDiv);

        directionalLight = directionalLightRef.lastCall.args[0];

        expect(
          [
            directionalLight.target.position.x,
            directionalLight.target.position.y,
            directionalLight.target.position.z,
          ].map(twoDP),
          'Target position should be towards light quaternion')
          .to.deep.equal(
          [
            1,
            0,
            0,
          ].map(twoDP),
        );
      });

      it('updates target position', () => {
        const directionalLightRef = sinon.spy();

        mockConsole.expectThreeLog();

        ReactDOM.render(<React3
          width={800}
          height={600}
        >
          <scene>
            <directionalLight
              ref={directionalLightRef}
              updatesRefreshAllMaterials
              rotation={new THREE.Euler(0, 0, 0)}
            />
          </scene>
        </React3>, testDiv);

        const directionalLight = directionalLightRef.lastCall.args[0];

        sinon.stub(directionalLight.target, 'updateMatrixWorld');

        const twoDP = x => Math.round(x * 100) / 100;

        ReactDOM.render(<React3
          width={800}
          height={600}
        >
          <scene>
            <directionalLight
              ref={directionalLightRef}
              updatesRefreshAllMaterials
              rotation={new THREE.Euler().setFromQuaternion(
                new THREE.Quaternion()
                  .setFromUnitVectors(
                    new THREE.Vector3(0, 0, 1),
                    new THREE.Vector3(1, 0, 0)
                  )
              )}
            />
          </scene>
        </React3>, testDiv);

        sinon.assert.calledOnce(directionalLightRef);
        sinon.assert.calledOnce(directionalLight.target.updateMatrixWorld);

        expect(
          [
            directionalLight.target.position.x,
            directionalLight.target.position.y,
            directionalLight.target.position.z,
          ].map(twoDP),
          'Target position should have been updated towards light rotation')
          .to.deep.equal(
          [
            1,
            0,
            0,
          ].map(twoDP),
        );

        ReactDOM.render(<React3
          width={800}
          height={600}
        >
          <scene>
            <directionalLight
              ref={directionalLightRef}
              updatesRefreshAllMaterials
              rotation={new THREE.Euler().setFromQuaternion(
                new THREE.Quaternion()
                  .setFromUnitVectors(
                    new THREE.Vector3(0, 0, 1),
                    new THREE.Vector3(0, 1, 0)
                  )
              )}
            />
          </scene>
        </React3>, testDiv);

        sinon.assert.calledOnce(directionalLightRef);
        sinon.assert.calledTwice(directionalLight.target.updateMatrixWorld);

        expect(
          [
            directionalLight.target.position.x,
            directionalLight.target.position.y,
            directionalLight.target.position.z,
          ].map(twoDP),
          'Target position should have been updated towards light rotation')
          .to.deep.equal(
          [
            0,
            1,
            0,
          ].map(twoDP),
        );

        ReactDOM.render(<React3
          width={800}
          height={600}
        >
          <scene>
            <directionalLight
              ref={directionalLightRef}
              updatesRefreshAllMaterials
              position={new THREE.Vector3(10, 20, 30)}
              rotation={new THREE.Euler().setFromQuaternion(
                new THREE.Quaternion()
                  .setFromUnitVectors(
                    new THREE.Vector3(0, 0, 1),
                    new THREE.Vector3(0, -1, 0)
                  )
              )}
            />
          </scene>
        </React3>, testDiv);

        sinon.assert.calledOnce(directionalLightRef);
        sinon.assert.calledThrice(directionalLight.target.updateMatrixWorld);

        expect(
          [
            directionalLight.target.position.x,
            directionalLight.target.position.y,
            directionalLight.target.position.z,
          ].map(twoDP),
          'Target position should have been updated towards light rotation after position update')
          .to.deep.equal(
          [
            10,
            19,
            30,
          ].map(twoDP),
        );

        ReactDOM.render(<React3
          width={800}
          height={600}
        >
          <scene>
            <directionalLight
              ref={directionalLightRef}
              updatesRefreshAllMaterials
              quaternion={new THREE.Quaternion()
                .setFromUnitVectors(
                  new THREE.Vector3(0, 0, 1),
                  new THREE.Vector3(0, 0, -1)
                )}
            />
          </scene>
        </React3>, testDiv);

        sinon.assert.calledOnce(directionalLightRef);
        expect(directionalLight.target.updateMatrixWorld.callCount,
          'updateMatrixWorld should have been called four times').to.equal(4);

        expect(
          [
            directionalLight.target.position.x,
            directionalLight.target.position.y,
            directionalLight.target.position.z,
          ].map(twoDP),
          'Target position should have been updated towards light rotation after position update')
          .to.deep.equal(
          [
            0,
            0,
            -1,
          ].map(twoDP),
        );

        ReactDOM.render(<React3
          width={800}
          height={600}
        >
          <scene>
            <directionalLight
              ref={directionalLightRef}
              updatesRefreshAllMaterials
              lookAt={new THREE.Vector3(1, 2, 3)}
            />
          </scene>
        </React3>, testDiv);

        sinon.assert.calledOnce(directionalLightRef);

        expect(directionalLight.target.updateMatrixWorld.callCount,
          'updateMatrixWorld call count').to.equal(5);

        let normalizedLookAtDirection = new THREE.Vector3(1, 2, 3).normalize();

        expect(
          [
            directionalLight.target.position.x,
            directionalLight.target.position.y,
            directionalLight.target.position.z,
          ].map(twoDP),
          'Target position should have been updated towards light rotation after position update')
          .to.deep.equal(
          [
            normalizedLookAtDirection.x,
            normalizedLookAtDirection.y,
            normalizedLookAtDirection.z,
          ].map(twoDP),
        );

        ReactDOM.render(<React3
          width={800}
          height={600}
        >
          <scene>
            <directionalLight
              ref={directionalLightRef}
              updatesRefreshAllMaterials
              position={new THREE.Vector3(50, 15, 92)}
              lookAt={new THREE.Vector3(1, 2, 3)}
            />
          </scene>
        </React3>, testDiv);

        sinon.assert.calledOnce(directionalLightRef);

        expect(directionalLight.target.updateMatrixWorld.callCount,
          'updateMatrixWorld call count').to.equal(6);

        normalizedLookAtDirection = new THREE.Vector3(50, 15, 92)
          .add(new THREE.Vector3(1, 2, 3) // lookAt
            .sub(new THREE.Vector3(50, 15, 92)).normalize());

        expect(
          [
            directionalLight.target.position.x,
            directionalLight.target.position.y,
            directionalLight.target.position.z,
          ].map(twoDP),
          'Target position should have been updated towards light rotation after position update')
          .to.deep.equal(
          [
            normalizedLookAtDirection.x,
            normalizedLookAtDirection.y,
            normalizedLookAtDirection.z,
          ].map(twoDP),
        );
      });
    });
  });
};
