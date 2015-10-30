export default {
  React3: {
    intro: ` ${'`'} require('react-three-renderer') ${'`'} - Module Entry Point`,
    fileIntro: `${'```'}js
import React3 from 'react-three-renderer';
${'```'}`,
    filename: 'Entry Point',
    description: `React3 is a regular React Component that places a canvas on the page.

When React3 is mounted, an instance of [[React3Renderer]] is used to render a [&lt;react3&gt;](react3) internal component into the canvas.

The react3 internal component repeatedly requests animation frames from the browser.

Every frame it re-renders the whole scene.

The attributes are passed on to the react3 internal component so that it can configure the renderer.`,
    copyAttributesFrom: 'react3',
    excludeAttributesFromCopying: {
      canvas: true,
      onRecreateCanvas: true,
    },
    subHeadings: {
      'Additional Attributes': {
        canvasStyle: {
          description: '``` any ``` The style properties to be passed onto the canvas.',
        },
      },
      'Static functions': {
        'React3.findTHREEObject': {
          description: `Similar to [ReactDOM.findDOMNode](https://facebook.github.io/react/docs/top-level-api.html#reactdom.finddomnode).

Finds a THREE.js object from a mounted component.

You are encouraged to use [refs](https://facebook.github.io/react/docs/more-about-refs.html) instead.`
        },
        'React3.eventDispatcher': {
          description: `**Advanced usage**. Used to dispatch events. Undocumented for now.`,
        },
      },
    },
    sourceLink: '../blob/master/src/React3.js',
  },
  'Internal Components': {
    description: `These components can be used without needing to require any modules, e.g.

${'```'}js
import React from 'react';

class SomeClass extends React.Component{
  render() {
    return(
      <group>
        <mesh>
          <boxGeometry/>
          <meshBasicMaterial/>
        </mesh>
      </group>
    );
  }
}
${'```'}`,
    children: {
      Views: {
        children: {
          viewport: true,
        },
      },
      Objects: {
        intro: 'Entities that can be added into a [[scene]]',
        children: {
          scene: true,
          object3D: true,
          group: true,
          Cameras: {
            children: {
              orthographicCamera: true,
              perspectiveCamera: true,
              cubeCamera: true,
            },
          },
          Meshes: {
            children: {
              mesh: true,
              line: true,
              points: true,
            },
            TODO: [
              'Bone',
              'LensFlare',
              'LineSegments',
              'LOD',
              'MorphAnimMesh',
              'SkinnedMesh',
              'Skeleton',
              'Sprite',
            ],
          },
          Lights: {
            children: {
              ambientLight: true,
              directionalLight: true,
              spotLight: true,
              pointLight: true,
            },
            TODO: [
              'HemisphereLight',
              'Light',
            ],
          },
          Helpers: {
            children: {
              cameraHelper: true,
              axisHelper: true,
              arrowHelper: true,
            },
            TODO: [
              'BoundingBoxHelper',
              'BoxHelper',
              'DirectionalLightHelper',
              'EdgesHelper',
              'FaceNormalsHelper',
              'GridHelper',
              'HemisphereLightHelper',
              'PointLightHelper',
              'SpotLightHelper',
              'VertexNormalsHelper',
              'WireframeHelper',
            ],
          },
        },
      },
      Materials: {
        children: {
          meshBasicMaterial: true,
          meshPhongMaterial: true,
          meshLambertMaterial: true,
          meshDepthMaterial: true,
          meshNormalMaterial: true,
          pointsMaterial: true,
          lineBasicMaterial: true,
          lineDashedMaterial: true,
          spriteMaterial: true,
          shaderMaterial: {
            children: {
              uniforms: true,
              uniform: true,
            },
          },
        },
        TODO: [
          'Material',
          'MeshFaceMaterial',
          'RawShaderMaterial',
          'SpriteCanvasMaterial',
          'SpriteMaterial',
        ],
      },
      Textures: {
        children: {
          texture: true,
        },
        TODO: [
          'CubeTexture',
          'CompressedTexture',
          'DataTexture',
        ],
      },
      Geometries: {
        children: {
          geometry: true,
          boxGeometry: true,
          sphereGeometry: true,
          parametricGeometry: true,
          planeBufferGeometry: true,
          icosahedronGeometry: true,
          octahedronGeometry: true,
          tetrahedronGeometry: true,
          circleGeometry: true,
          circleBufferGeometry: true,
          ringGeometry: true,
          cylinderGeometry: true,
          latheGeometry: true,
          torusGeometry: true,
          torusKnotGeometry: true,
          extrudeGeometry: true,
        },
        TODO: [
          'CubeGeometry',
          'DodecahedronGeometry',
          'PlaneGeometry',
          'PolyhedronGeometry',
          'ShapeGeometry',
          'TextGeometry',
          'TubeGeometry',
        ],
      },
      Shapes: {
        children: {
          shape: {
            children: {
              moveTo: true,
              lineTo: true,
              bezierCurveTo: true,
              quadraticCurveTo: true,
              absArc: true,
              absEllipse: true,
              splineThru: true,
              hole: true,
            },
          },
        },
        TODO: [
          'Curve',
          'CurvePath',
          'Gyroscope',
          'Path',
        ],
      },
      'Resource Types': {
        intro: 'Allows you to reuse entities, these help save a lot of memory',
        getDescription() {
          return `## Usage

Place [&lt;resources&gt;&lt;/resources&gt;](resources); anywhere inside [&lt;React3/&gt;](Entry-Point), or any of its children.

> The preferred place is before any other component, since it's expensive to replace, but it's up to you.

Then you can place these components inside:

${this.resourceTypes
            .map(({name, intro}) => {
              let item = `* [[${name}]]`;

              if (intro && intro.length > 0) {
                item += `: ${intro}.`;
              }

              return item;
            }).join('\n')}

`;
        },
        resourceTypes: [],
        children: {
          resources: true,
          materialResource: true,
          textureResource: true,
          geometryResource: true,
          shapeResource: true,
          shapeGeometryResource: true,
        },
      },
      Advanced: {
        intro: 'If you feel like having custom experiences, this one is for you',
        children: {
          react3: true,
          module: true,
        },
      },
    },
  },
};
