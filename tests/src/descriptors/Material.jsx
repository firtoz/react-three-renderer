import React from 'react';
import * as THREE from 'three';
import ReactDOM from 'react-dom';
import sinon from 'sinon';
import chai from 'chai';

module.exports = (type) => {
  const { expect } = chai;

  describe('MaterialDescriptor', () => {
    const { testDiv, React3, mockConsole } = require('../utils/initContainer')(type);

    it('Should have same defaults as the material constructors', () => {
      const materialRef = sinon.spy();

      // warmup

      ReactDOM.render((<React3
        width={800}
        height={600}
        mainCamera="mainCamera"
      >
        <scene>
          <mesh>
            <boxGeometry
              width={2}
              height={2}
              depth={2}
            />
          </mesh>
        </scene>
      </React3>), testDiv);

      mockConsole.expectThreeLog();

      [
        'LineBasicMaterial',
        'LineDashedMaterial',
        'MeshBasicMaterial',
        'MeshDepthMaterial',
        'MeshLambertMaterial',
        'MeshPhongMaterial',
        'MeshStandardMaterial',
        'PointsMaterial',
        'ShaderMaterial',
        'SpriteMaterial',
        'RawShaderMaterial',
        // 'MeshPhysicalMaterial', // TODO
      ].forEach((materialType) => {
        const r3rDescriptorName = `${materialType.replace(/^\w/, l => l.toLowerCase())}`;

        const material = new THREE[materialType]();

        ReactDOM.render((<React3
          width={800}
          height={600}
          mainCamera="mainCamera"
        >
          <scene>
            <mesh>
              <boxGeometry
                width={2}
                height={2}
                depth={2}
              />
              {React.createElement(r3rDescriptorName, {
                ref: materialRef,
              })}
            </mesh>
          </scene>
        </React3>), testDiv);

        const r3rMaterial = materialRef.lastCall.args[0];

        const materialKeys = Object.keys(material);

        const failures = [];

        materialKeys.forEach((key) => {
          if (key === 'uuid' || key === 'userData') {
            // these should be different
            return;
          }

          try {
            expect(r3rMaterial[key]).to.deep.equal(material[key]);
          } catch (e) {
            failures.push({
              key,
              expected: material[key],
              actual: r3rMaterial[key],
              error: e,
            });
          }
        });

        if (failures.length > 0) {
          // console.error('Failures', failures);

          const allFailureMessages = `[\n${failures.map(failure => `'${failure.key}': '${failure.error.message}'`).join(',\n\t')}\n]`;

          throw new Error(`Mismatching keys for ${materialType}: ${allFailureMessages}`);
        }
      });
    });

    it('Should be able to reference texture children', () => {
      const materialRef = sinon.spy();
      const textureRef = sinon.spy();

      ReactDOM.render((<React3
        width={800}
        height={600}
        mainCamera="mainCamera"
      >
        <scene>
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
                ref={textureRef}
                url="/base/assets/images/rgbw.png"
              />
            </meshBasicMaterial>
          </mesh>
        </scene>
      </React3>), testDiv);

      mockConsole.expectThreeLog();

      expect(materialRef.lastCall.args[0].map,
        'The texture should have been assigned to the material'
      ).to.equal(textureRef.lastCall.args[0]);
    });

    it('Should be able to reference map property', () => {
      const materialRef = sinon.spy();

      const texture = new THREE.Texture();

      ReactDOM.render((<React3
        width={800}
        height={600}
        mainCamera="mainCamera"
      >
        <scene>
          <mesh>
            <boxGeometry
              width={2}
              height={2}
              depth={2}
            />
            <meshBasicMaterial
              ref={materialRef}
              color={0xff0000}
              map={texture}
            />
          </mesh>
        </scene>
      </React3>), testDiv);

      mockConsole.expectThreeLog();

      expect(materialRef.lastCall.args[0].map,
        'The texture should have been assigned to the material'
      ).to.equal(texture);
    });

    it('Should give an error when it has both the property and the child', () => {
      const materialRef = sinon.spy();
      const textureRef = sinon.spy();

      const texture = new THREE.Texture();

      ReactDOM.render((<React3
        width={800}
        height={600}
        mainCamera="mainCamera"
      >
        <scene>
          <mesh>
            <boxGeometry
              width={2}
              height={2}
              depth={2}
            />
            <meshBasicMaterial
              ref={materialRef}
              color={0xff0000}
              map={texture}
            >
              <texture
                ref={textureRef}
                url="/base/assets/images/rgbw.png"
              />
            </meshBasicMaterial>
          </mesh>
        </scene>
      </React3>), testDiv);

      mockConsole.expectDev('Warning: The material already has a \'map\' property' +
        ' but a texture is being added as a child. The child will override the property.');

      mockConsole.expectThreeLog();

      expect(materialRef.lastCall.args[0].map,
        'The texture child should have been assigned to the material'
      ).to.equal(textureRef.lastCall.args[0]);
    });

    it('Should overwrite the property when a child is added', () => {
      const materialRef = sinon.spy();
      const textureRef = sinon.spy();

      const texture = new THREE.Texture();

      mockConsole.expectThreeLog();

      ReactDOM.render((<React3
        width={800}
        height={600}
        mainCamera="mainCamera"
      >
        <scene>
          <mesh>
            <boxGeometry
              width={2}
              height={2}
              depth={2}
            />
            <meshBasicMaterial
              ref={materialRef}
              color={0xff0000}
              map={texture}
            />
          </mesh>
        </scene>
      </React3>), testDiv);

      expect(materialRef.lastCall.args[0].map,
        'The texture property should have been assigned to the material'
      ).to.equal(texture);

      ReactDOM.render((<React3
        width={800}
        height={600}
        mainCamera="mainCamera"
      >
        <scene>
          <mesh>
            <boxGeometry
              width={2}
              height={2}
              depth={2}
            />
            <meshBasicMaterial
              ref={materialRef}
              color={0xff0000}
              map={texture}
            >
              <texture
                ref={textureRef}
                url="/base/assets/images/rgbw.png"
              />
            </meshBasicMaterial>
          </mesh>
        </scene>
      </React3>), testDiv);

      mockConsole.expectDev('Warning: The material already has a \'map\' property' +
        ' but a texture is being added as a child. The child will override the property.');

      expect(materialRef.lastCall.args[0].map,
        'The texture child should have been assigned to the material'
      ).to.equal(textureRef.lastCall.args[0]);

      ReactDOM.render((<React3
        width={800}
        height={600}
        mainCamera="mainCamera"
      >
        <scene>
          <mesh>
            <boxGeometry
              width={2}
              height={2}
              depth={2}
            />
            <meshBasicMaterial
              ref={materialRef}
              color={0xff0000}
              map={texture}
            />
          </mesh>
        </scene>
      </React3>), testDiv);

      expect(materialRef.lastCall.args[0].map,
        'The texture property should have been assigned to the material'
      ).to.equal(texture);

      ReactDOM.render((<React3
        width={800}
        height={600}
        mainCamera="mainCamera"
      >
        <scene>
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
                ref={textureRef}
                url="/base/assets/images/rgbw.png"
              />
            </meshBasicMaterial>
          </mesh>
        </scene>
      </React3>), testDiv);

      expect(materialRef.lastCall.args[0].map,
        'The texture child should not have been changed when the property is removed'
      ).to.equal(textureRef.lastCall.args[0]);

      const secondTexture = new THREE.Texture();

      mockConsole.expectDev('Warning: The material already has a texture assigned to it' +
        ' as a child; therefore the \'map\' property will have no effect');

      ReactDOM.render((<React3
        width={800}
        height={600}
        mainCamera="mainCamera"
      >
        <scene>
          <mesh>
            <boxGeometry
              width={2}
              height={2}
              depth={2}
            />
            <meshBasicMaterial
              ref={materialRef}
              color={0xff0000}
              map={secondTexture}
            >
              <texture
                ref={textureRef}
                url="/base/assets/images/rgbw.png"
              />
            </meshBasicMaterial>
          </mesh>
        </scene>
      </React3>), testDiv);

      expect(materialRef.lastCall.args[0].map,
        'The texture child should not have been changed when the property is re-added'
      ).to.equal(textureRef.lastCall.args[0]);

      ReactDOM.render((<React3
        width={800}
        height={600}
        mainCamera="mainCamera"
      >
        <scene>
          <mesh>
            <boxGeometry
              width={2}
              height={2}
              depth={2}
            />
            <meshBasicMaterial
              ref={materialRef}
              color={0xff0000}
              map={secondTexture}
            />
          </mesh>
        </scene>
      </React3>), testDiv);

      expect(materialRef.lastCall.args[0].map,
        'The texture child should have been reverted to the second texture'
      ).to.equal(secondTexture);
    });

    it('Should not give an error when it has different map properties and children', () => {
      const materialRef = sinon.spy();
      const textureRef = sinon.spy();

      const texture = new THREE.Texture();

      ReactDOM.render((<React3
        width={800}
        height={600}
        mainCamera="mainCamera"
      >
        <scene>
          <mesh>
            <boxGeometry
              width={2}
              height={2}
              depth={2}
            />
            <meshBasicMaterial
              ref={materialRef}
              color={0xff0000}
              map={texture}
            >
              <texture
                ref={textureRef}
                slot="alphaMap"
                url="/base/assets/images/rgbw.png"
              />
            </meshBasicMaterial>
          </mesh>
        </scene>
      </React3>), testDiv);

      mockConsole.expectThreeLog();

      expect(materialRef.lastCall.args[0].map,
        'The texture property should have been assigned material'
      ).to.equal(texture);

      expect(materialRef.lastCall.args[0].alphaMap,
        'The texture child should have been assigned as the alphaMap to the material'
      ).to.equal(textureRef.lastCall.args[0]);
    });

    it('Should give an error when a texture\'s slot changes to one already filled by a property', () => {
      const materialRef = sinon.spy();
      const textureRef = sinon.spy();

      const texture = new THREE.Texture();

      ReactDOM.render((<React3
        width={800}
        height={600}
        mainCamera="mainCamera"
      >
        <scene>
          <mesh>
            <boxGeometry
              width={2}
              height={2}
              depth={2}
            />
            <meshBasicMaterial
              ref={materialRef}
              color={0xff0000}
              map={texture}
            >
              <texture
                ref={textureRef}
                slot="alphaMap"
                url="/base/assets/images/rgbw.png"
              />
            </meshBasicMaterial>
          </mesh>
        </scene>
      </React3>), testDiv);

      mockConsole.expectThreeLog();

      expect(materialRef.lastCall.args[0].map,
        'The texture property should have been assigned material'
      ).to.equal(texture);

      expect(materialRef.lastCall.args[0].alphaMap,
        'The texture child should have been assigned as the alphaMap to the material'
      ).to.equal(textureRef.lastCall.args[0]);

      // set child to map slot
      ReactDOM.render((<React3
        width={800}
        height={600}
        mainCamera="mainCamera"
      >
        <scene>
          <mesh>
            <boxGeometry
              width={2}
              height={2}
              depth={2}
            />
            <meshBasicMaterial
              ref={materialRef}
              color={0xff0000}
              map={texture}
            >
              <texture
                ref={textureRef}
                url="/base/assets/images/rgbw.png"
              />
            </meshBasicMaterial>
          </mesh>
        </scene>
      </React3>), testDiv);

      mockConsole.expectDev('Warning: The material already has a \'map\' property' +
        ' but a texture is being added as a child. The child will override the property.');

      expect(materialRef.lastCall.args[0].alphaMap,
        'The texture child should have been unassigned from the material\'s alphaMap slot'
      ).to.be.null();

      expect(materialRef.lastCall.args[0].map,
        'The texture child should have been assigned as the map to the material'
      ).to.equal(textureRef.lastCall.args[0]);
    });
  });
};
