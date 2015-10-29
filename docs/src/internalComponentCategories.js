export default {
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
  Resources: {
    intro: 'Allows you to reuse entities, these help save a lot of memory',
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
};
