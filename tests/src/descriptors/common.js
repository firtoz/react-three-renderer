import React from 'react';
import ReactDOM from 'react-dom';

module.exports = type => {
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

      const nameRef = (hint) => (entity) => {
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
  });
};
