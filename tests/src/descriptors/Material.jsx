import React from 'react';
import * as THREE from 'three';
import ReactDOM from 'react-dom';
import sinon from 'sinon';
import chai from 'chai';


module.exports = (type) => {
  const { expect } = chai;

  describe('MaterialDescriptor', () => {
    const { testDiv, React3, mockConsole } = require('../utils/initContainer')(type);

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

      mockConsole.expect('Warning: The material already has a map property' +
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

      mockConsole.expect('Warning: The material already has a map property' +
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

      mockConsole.expect('Warning: The material already has a texture assigned to it' +
        ' as a child therefore the \'map\' property will have no effect');

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
  });
};
