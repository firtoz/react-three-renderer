import React from 'react';
import ReactDOM from 'react-dom';
import sinon from 'sinon';

import { expect } from 'chai';

module.exports = (type) => {
  describe('Common-Props', () => {
    const { testDiv, React3, mockConsole } = require('../utils/initContainer')(type);

    it('should set name property for entities', (done) => {
      mockConsole.expectThreeLog();

      // the entities should be constructed from leaves to ancestors, and then siblings
      // ( 1 -> 2 -> 3 -> 4 ) in reverse, ( 5 -> 6 ) in reverse
      mockConsole.expect('mesh-four');
      mockConsole.expect('obj-A-three');
      mockConsole.expect('group-B-two');
      mockConsole.expect('group-A-one');
      mockConsole.expect('obj-B-six');
      mockConsole.expect('group-C-five');

      mockConsole.once('empty', done);

      const nameRef = hint => (entity) => {
        if (!entity) {
          return;
        }

        console.log(`${hint}-${entity.name}`); // eslint-disable-line no-console
      };

      ReactDOM.render((<React3
        width={800}
        height={600}
        mainCamera="mainCamera"
      >
        <scene>
          <group
            name="one"
            ref={nameRef('group-A')}
          >
            <group
              name="two"
              ref={nameRef('group-B')}
            >
              <object3D
                name="three"
                ref={nameRef('obj-A')}
              >
                <mesh
                  name="four"
                  ref={nameRef('mesh')}
                >
                  <planeBufferGeometry
                    width={5}
                    height={5}
                  />
                  <meshBasicMaterial
                    color={0xff0000}
                  />
                </mesh>
              </object3D>
            </group>
          </group>
          <group
            name="five"
            ref={nameRef('group-C')}
          >
            <object3D
              name="six"
              ref={nameRef('obj-B')}
            />
          </group>
        </scene>
      </React3>), testDiv);
    });

    it('should not trigger remount on initial props updates', () => {
      const polyhedronGeometryRef = sinon.spy();

      ReactDOM.render((<React3
        width={800}
        height={600}
        mainCamera="mainCamera"
      >
        <scene>
          <mesh>
            <polyhedronGeometry
              ref={polyhedronGeometryRef}
              vertices={[
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8,
                9,
              ]}
              indices={[
                0,
                1,
                2,
              ]}
              detail={2}
              radius={5}
            />
            <meshBasicMaterial color={0x00ff00} />
          </mesh>
        </scene>
      </React3>), testDiv);

      mockConsole.expectThreeLog();

      sinon.assert.calledOnce(polyhedronGeometryRef);

      expect(polyhedronGeometryRef.lastCall.args[0].parameters.vertices.length,
        'Should use the correct vertices property on first call').to.equal(9);
      expect(polyhedronGeometryRef.lastCall.args[0].parameters.vertices[0],
        'Should use the correct values for vertices on first call').to.equal(1);

      ReactDOM.render((<React3
        width={800}
        height={600}
        mainCamera="mainCamera"
      >
        <scene>
          <mesh>
            <polyhedronGeometry
              ref={polyhedronGeometryRef}

              vertices={[
                10,
                20,
                30,
                4,
                5,
                6,
                7,
                8,
                9,
              ]}
              indices={[
                0,
                1,
                2,
              ]}
              detail={2}
              radius={5}
            />
            <meshBasicMaterial color={0x00ff00} />
          </mesh>
        </scene>
      </React3>), testDiv);

      // it should now call the constructor again because it's using
      // a different array for vertices and indices
      sinon.assert.calledTwice(polyhedronGeometryRef);

      expect(polyhedronGeometryRef.lastCall.args[0].parameters.vertices.length,
        'Should use the correct vertices property on last call').to.equal(9);
      expect(polyhedronGeometryRef.lastCall.args[0].parameters.vertices[0],
        'Should use the correct values for vertices on last call').to.equal(10);
      expect(polyhedronGeometryRef.lastCall.args[0].parameters.vertices[1],
        'Should use the correct values for vertices on last call').to.equal(20);
    });
  });
};
