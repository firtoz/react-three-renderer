export default {
  'Internal Components': {
    getDescription() {
      return `These components can be used without needing to require any modules, e.g.

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
${'```'}`;
    },
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
