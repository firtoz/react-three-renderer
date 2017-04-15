'use strict';

var _React3Descriptor = require('./descriptors/React3Descriptor');

var _React3Descriptor2 = _interopRequireDefault(_React3Descriptor);

var _ModuleDescriptor = require('./descriptors/ModuleDescriptor');

var _ModuleDescriptor2 = _interopRequireDefault(_ModuleDescriptor);

var _ViewportDescriptor = require('./descriptors/ViewportDescriptor');

var _ViewportDescriptor2 = _interopRequireDefault(_ViewportDescriptor);

var _SceneDescriptor = require('./descriptors/Object/SceneDescriptor');

var _SceneDescriptor2 = _interopRequireDefault(_SceneDescriptor);

var _Object3DDescriptor = require('./descriptors/Object/Object3DDescriptor');

var _Object3DDescriptor2 = _interopRequireDefault(_Object3DDescriptor);

var _GroupDescriptor = require('./descriptors/Object/GroupDescriptor');

var _GroupDescriptor2 = _interopRequireDefault(_GroupDescriptor);

var _OrthographicCameraDescriptor = require('./descriptors/Object/Camera/OrthographicCameraDescriptor');

var _OrthographicCameraDescriptor2 = _interopRequireDefault(_OrthographicCameraDescriptor);

var _PerspectiveCameraDescriptor = require('./descriptors/Object/Camera/PerspectiveCameraDescriptor');

var _PerspectiveCameraDescriptor2 = _interopRequireDefault(_PerspectiveCameraDescriptor);

var _CubeCameraDescriptor = require('./descriptors/Object/Camera/CubeCameraDescriptor');

var _CubeCameraDescriptor2 = _interopRequireDefault(_CubeCameraDescriptor);

var _MeshDescriptor = require('./descriptors/Object/MeshDescriptor');

var _MeshDescriptor2 = _interopRequireDefault(_MeshDescriptor);

var _LineDescriptor = require('./descriptors/Object/LineDescriptor');

var _LineDescriptor2 = _interopRequireDefault(_LineDescriptor);

var _LineSegmentsDescriptor = require('./descriptors/Object/LineSegmentsDescriptor');

var _LineSegmentsDescriptor2 = _interopRequireDefault(_LineSegmentsDescriptor);

var _PointsDescriptor = require('./descriptors/Object/PointsDescriptor');

var _PointsDescriptor2 = _interopRequireDefault(_PointsDescriptor);

var _SpriteDescriptor = require('./descriptors/Object/SpriteDescriptor');

var _SpriteDescriptor2 = _interopRequireDefault(_SpriteDescriptor);

var _AmbientLightDescriptor = require('./descriptors/Light/AmbientLightDescriptor');

var _AmbientLightDescriptor2 = _interopRequireDefault(_AmbientLightDescriptor);

var _DirectionalLightDescriptor = require('./descriptors/Light/DirectionalLightDescriptor');

var _DirectionalLightDescriptor2 = _interopRequireDefault(_DirectionalLightDescriptor);

var _SpotLightDescriptor = require('./descriptors/Light/SpotLightDescriptor');

var _SpotLightDescriptor2 = _interopRequireDefault(_SpotLightDescriptor);

var _PointLightDescriptor = require('./descriptors/Light/PointLightDescriptor');

var _PointLightDescriptor2 = _interopRequireDefault(_PointLightDescriptor);

var _HemisphereLightDescriptor = require('./descriptors/Light/HemisphereLightDescriptor');

var _HemisphereLightDescriptor2 = _interopRequireDefault(_HemisphereLightDescriptor);

var _ResourcesDescriptor = require('./descriptors/Resource/ResourcesDescriptor');

var _ResourcesDescriptor2 = _interopRequireDefault(_ResourcesDescriptor);

var _GeometryResourceDescriptor = require('./descriptors/Resource/GeometryResourceDescriptor');

var _GeometryResourceDescriptor2 = _interopRequireDefault(_GeometryResourceDescriptor);

var _ShapeGeometryResourceDescriptor = require('./descriptors/Resource/ShapeGeometryResourceDescriptor');

var _ShapeGeometryResourceDescriptor2 = _interopRequireDefault(_ShapeGeometryResourceDescriptor);

var _TextureResourceDescriptor = require('./descriptors/Resource/TextureResourceDescriptor');

var _TextureResourceDescriptor2 = _interopRequireDefault(_TextureResourceDescriptor);

var _ShapeResourceDescriptor = require('./descriptors/Resource/ShapeResourceDescriptor');

var _ShapeResourceDescriptor2 = _interopRequireDefault(_ShapeResourceDescriptor);

var _GeometryDescriptor = require('./descriptors/Geometry/GeometryDescriptor');

var _GeometryDescriptor2 = _interopRequireDefault(_GeometryDescriptor);

var _BufferGeometryDescriptor = require('./descriptors/Geometry/BufferGeometryDescriptor');

var _BufferGeometryDescriptor2 = _interopRequireDefault(_BufferGeometryDescriptor);

var _BoxGeometryDescriptor = require('./descriptors/Geometry/BoxGeometryDescriptor');

var _BoxGeometryDescriptor2 = _interopRequireDefault(_BoxGeometryDescriptor);

var _SphereGeometryDescriptor = require('./descriptors/Geometry/SphereGeometryDescriptor');

var _SphereGeometryDescriptor2 = _interopRequireDefault(_SphereGeometryDescriptor);

var _ParametricGeometryDescriptor = require('./descriptors/Geometry/ParametricGeometryDescriptor');

var _ParametricGeometryDescriptor2 = _interopRequireDefault(_ParametricGeometryDescriptor);

var _PlaneBufferGeometryDescriptor = require('./descriptors/Geometry/PlaneBufferGeometryDescriptor');

var _PlaneBufferGeometryDescriptor2 = _interopRequireDefault(_PlaneBufferGeometryDescriptor);

var _PlaneGeometryDescriptor = require('./descriptors/Geometry/PlaneGeometryDescriptor');

var _PlaneGeometryDescriptor2 = _interopRequireDefault(_PlaneGeometryDescriptor);

var _PolyhedronGeometryDescriptor = require('./descriptors/Geometry/PolyhedronGeometryDescriptor');

var _PolyhedronGeometryDescriptor2 = _interopRequireDefault(_PolyhedronGeometryDescriptor);

var _IcosahedronGeometryDescriptor = require('./descriptors/Geometry/IcosahedronGeometryDescriptor');

var _IcosahedronGeometryDescriptor2 = _interopRequireDefault(_IcosahedronGeometryDescriptor);

var _OctahedronGeometryDescriptor = require('./descriptors/Geometry/OctahedronGeometryDescriptor');

var _OctahedronGeometryDescriptor2 = _interopRequireDefault(_OctahedronGeometryDescriptor);

var _TetrahedronGeometryDescriptor = require('./descriptors/Geometry/TetrahedronGeometryDescriptor');

var _TetrahedronGeometryDescriptor2 = _interopRequireDefault(_TetrahedronGeometryDescriptor);

var _CircleGeometryDescriptor = require('./descriptors/Geometry/CircleGeometryDescriptor');

var _CircleGeometryDescriptor2 = _interopRequireDefault(_CircleGeometryDescriptor);

var _CircleBufferGeometryDescriptor = require('./descriptors/Geometry/CircleBufferGeometryDescriptor');

var _CircleBufferGeometryDescriptor2 = _interopRequireDefault(_CircleBufferGeometryDescriptor);

var _RingGeometryDescriptor = require('./descriptors/Geometry/RingGeometryDescriptor');

var _RingGeometryDescriptor2 = _interopRequireDefault(_RingGeometryDescriptor);

var _CylinderGeometryDescriptor = require('./descriptors/Geometry/CylinderGeometryDescriptor');

var _CylinderGeometryDescriptor2 = _interopRequireDefault(_CylinderGeometryDescriptor);

var _LatheGeometryDescriptor = require('./descriptors/Geometry/LatheGeometryDescriptor');

var _LatheGeometryDescriptor2 = _interopRequireDefault(_LatheGeometryDescriptor);

var _TorusGeometryDescriptor = require('./descriptors/Geometry/TorusGeometryDescriptor');

var _TorusGeometryDescriptor2 = _interopRequireDefault(_TorusGeometryDescriptor);

var _TorusKnotGeometryDescriptor = require('./descriptors/Geometry/TorusKnotGeometryDescriptor');

var _TorusKnotGeometryDescriptor2 = _interopRequireDefault(_TorusKnotGeometryDescriptor);

var _ExtrudeGeometryDescriptor = require('./descriptors/Geometry/ExtrudeGeometryDescriptor');

var _ExtrudeGeometryDescriptor2 = _interopRequireDefault(_ExtrudeGeometryDescriptor);

var _TubeGeometryDescriptor = require('./descriptors/Geometry/TubeGeometryDescriptor');

var _TubeGeometryDescriptor2 = _interopRequireDefault(_TubeGeometryDescriptor);

var _DodecahedronGeometryDescriptor = require('./descriptors/Geometry/DodecahedronGeometryDescriptor');

var _DodecahedronGeometryDescriptor2 = _interopRequireDefault(_DodecahedronGeometryDescriptor);

var _TextGeometryDescriptor = require('./descriptors/Geometry/TextGeometryDescriptor');

var _TextGeometryDescriptor2 = _interopRequireDefault(_TextGeometryDescriptor);

var _ShapeGeometryDescriptor = require('./descriptors/Geometry/ShapeGeometryDescriptor');

var _ShapeGeometryDescriptor2 = _interopRequireDefault(_ShapeGeometryDescriptor);

var _ShapeDescriptor = require('./descriptors/Geometry/Shapes/ShapeDescriptor');

var _ShapeDescriptor2 = _interopRequireDefault(_ShapeDescriptor);

var _MoveToDescriptor = require('./descriptors/Geometry/Shapes/MoveToDescriptor');

var _MoveToDescriptor2 = _interopRequireDefault(_MoveToDescriptor);

var _LineToDescriptor = require('./descriptors/Geometry/Shapes/LineToDescriptor');

var _LineToDescriptor2 = _interopRequireDefault(_LineToDescriptor);

var _BezierCurveToDescriptor = require('./descriptors/Geometry/Shapes/BezierCurveToDescriptor');

var _BezierCurveToDescriptor2 = _interopRequireDefault(_BezierCurveToDescriptor);

var _QuadraticCurveToDescriptor = require('./descriptors/Geometry/Shapes/QuadraticCurveToDescriptor');

var _QuadraticCurveToDescriptor2 = _interopRequireDefault(_QuadraticCurveToDescriptor);

var _AbsArcDescriptor = require('./descriptors/Geometry/Shapes/AbsArcDescriptor');

var _AbsArcDescriptor2 = _interopRequireDefault(_AbsArcDescriptor);

var _AbsEllipseDescriptor = require('./descriptors/Geometry/Shapes/AbsEllipseDescriptor');

var _AbsEllipseDescriptor2 = _interopRequireDefault(_AbsEllipseDescriptor);

var _HoleDescriptor = require('./descriptors/Geometry/Shapes/HoleDescriptor');

var _HoleDescriptor2 = _interopRequireDefault(_HoleDescriptor);

var _SplineThruDescriptor = require('./descriptors/Geometry/Shapes/SplineThruDescriptor');

var _SplineThruDescriptor2 = _interopRequireDefault(_SplineThruDescriptor);

var _PointsMaterialDescriptor = require('./descriptors/Material/PointsMaterialDescriptor');

var _PointsMaterialDescriptor2 = _interopRequireDefault(_PointsMaterialDescriptor);

var _MeshBasicMaterialDescriptor = require('./descriptors/Material/MeshBasicMaterialDescriptor');

var _MeshBasicMaterialDescriptor2 = _interopRequireDefault(_MeshBasicMaterialDescriptor);

var _MeshPhongMaterialDescriptor = require('./descriptors/Material/MeshPhongMaterialDescriptor');

var _MeshPhongMaterialDescriptor2 = _interopRequireDefault(_MeshPhongMaterialDescriptor);

var _MeshLambertMaterialDescriptor = require('./descriptors/Material/MeshLambertMaterialDescriptor');

var _MeshLambertMaterialDescriptor2 = _interopRequireDefault(_MeshLambertMaterialDescriptor);

var _MeshStandardMaterialDescriptor = require('./descriptors/Material/MeshStandardMaterialDescriptor');

var _MeshStandardMaterialDescriptor2 = _interopRequireDefault(_MeshStandardMaterialDescriptor);

var _ShaderMaterialDescriptor = require('./descriptors/Material/ShaderMaterialDescriptor');

var _ShaderMaterialDescriptor2 = _interopRequireDefault(_ShaderMaterialDescriptor);

var _RawShaderMaterialDescriptor = require('./descriptors/Material/RawShaderMaterialDescriptor');

var _RawShaderMaterialDescriptor2 = _interopRequireDefault(_RawShaderMaterialDescriptor);

var _TextureDescriptor = require('./descriptors/Material/TextureDescriptor');

var _TextureDescriptor2 = _interopRequireDefault(_TextureDescriptor);

var _MaterialResourceDescriptor = require('./descriptors/Resource/MaterialResourceDescriptor');

var _MaterialResourceDescriptor2 = _interopRequireDefault(_MaterialResourceDescriptor);

var _UniformsDescriptor = require('./descriptors/Material/UniformsDescriptor');

var _UniformsDescriptor2 = _interopRequireDefault(_UniformsDescriptor);

var _UniformDescriptor = require('./descriptors/Material/UniformDescriptor');

var _UniformDescriptor2 = _interopRequireDefault(_UniformDescriptor);

var _LineBasicMaterialDescriptor = require('./descriptors/Material/LineBasicMaterialDescriptor');

var _LineBasicMaterialDescriptor2 = _interopRequireDefault(_LineBasicMaterialDescriptor);

var _LineDashedMaterialDescriptor = require('./descriptors/Material/LineDashedMaterialDescriptor');

var _LineDashedMaterialDescriptor2 = _interopRequireDefault(_LineDashedMaterialDescriptor);

var _MeshDepthMaterialDescriptor = require('./descriptors/Material/MeshDepthMaterialDescriptor');

var _MeshDepthMaterialDescriptor2 = _interopRequireDefault(_MeshDepthMaterialDescriptor);

var _MeshNormalMaterialDescriptor = require('./descriptors/Material/MeshNormalMaterialDescriptor');

var _MeshNormalMaterialDescriptor2 = _interopRequireDefault(_MeshNormalMaterialDescriptor);

var _SpriteMaterialDescriptor = require('./descriptors/Material/SpriteMaterialDescriptor');

var _SpriteMaterialDescriptor2 = _interopRequireDefault(_SpriteMaterialDescriptor);

var _CameraHelperDescriptor = require('./descriptors/Object/Helper/CameraHelperDescriptor');

var _CameraHelperDescriptor2 = _interopRequireDefault(_CameraHelperDescriptor);

var _AxisHelperDescriptor = require('./descriptors/Object/Helper/AxisHelperDescriptor');

var _AxisHelperDescriptor2 = _interopRequireDefault(_AxisHelperDescriptor);

var _ArrowHelperDescriptor = require('./descriptors/Object/Helper/ArrowHelperDescriptor');

var _ArrowHelperDescriptor2 = _interopRequireDefault(_ArrowHelperDescriptor);

var _GridHelperDescriptor = require('./descriptors/Object/Helper/GridHelperDescriptor');

var _GridHelperDescriptor2 = _interopRequireDefault(_GridHelperDescriptor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ElementDescriptorContainer = function ElementDescriptorContainer(react3RendererInstance) {
  _classCallCheck(this, ElementDescriptorContainer);

  this.react3RendererInstance = react3RendererInstance;

  /**
   * @type {Object.<string, THREEElementDescriptor>}
   */
  this.descriptors = {
    react3: new _React3Descriptor2.default(react3RendererInstance),

    module: new _ModuleDescriptor2.default(react3RendererInstance),

    viewport: new _ViewportDescriptor2.default(react3RendererInstance),
    scene: new _SceneDescriptor2.default(react3RendererInstance),

    object3D: new _Object3DDescriptor2.default(react3RendererInstance),
    group: new _GroupDescriptor2.default(react3RendererInstance),

    orthographicCamera: new _OrthographicCameraDescriptor2.default(react3RendererInstance),
    perspectiveCamera: new _PerspectiveCameraDescriptor2.default(react3RendererInstance),
    cubeCamera: new _CubeCameraDescriptor2.default(react3RendererInstance),

    mesh: new _MeshDescriptor2.default(react3RendererInstance),
    line: new _LineDescriptor2.default(react3RendererInstance),
    lineSegments: new _LineSegmentsDescriptor2.default(react3RendererInstance),
    points: new _PointsDescriptor2.default(react3RendererInstance),
    sprite: new _SpriteDescriptor2.default(react3RendererInstance),

    meshBasicMaterial: new _MeshBasicMaterialDescriptor2.default(react3RendererInstance),
    meshPhongMaterial: new _MeshPhongMaterialDescriptor2.default(react3RendererInstance),
    meshLambertMaterial: new _MeshLambertMaterialDescriptor2.default(react3RendererInstance),
    meshStandardMaterial: new _MeshStandardMaterialDescriptor2.default(react3RendererInstance),
    pointsMaterial: new _PointsMaterialDescriptor2.default(react3RendererInstance),
    shaderMaterial: new _ShaderMaterialDescriptor2.default(react3RendererInstance),
    rawShaderMaterial: new _RawShaderMaterialDescriptor2.default(react3RendererInstance),
    lineBasicMaterial: new _LineBasicMaterialDescriptor2.default(react3RendererInstance),
    lineDashedMaterial: new _LineDashedMaterialDescriptor2.default(react3RendererInstance),
    meshDepthMaterial: new _MeshDepthMaterialDescriptor2.default(react3RendererInstance),
    meshNormalMaterial: new _MeshNormalMaterialDescriptor2.default(react3RendererInstance),
    spriteMaterial: new _SpriteMaterialDescriptor2.default(react3RendererInstance),

    texture: new _TextureDescriptor2.default(react3RendererInstance),

    geometry: new _GeometryDescriptor2.default(react3RendererInstance),
    bufferGeometry: new _BufferGeometryDescriptor2.default(react3RendererInstance),
    boxGeometry: new _BoxGeometryDescriptor2.default(react3RendererInstance),
    sphereGeometry: new _SphereGeometryDescriptor2.default(react3RendererInstance),
    parametricGeometry: new _ParametricGeometryDescriptor2.default(react3RendererInstance),
    planeBufferGeometry: new _PlaneBufferGeometryDescriptor2.default(react3RendererInstance),
    planeGeometry: new _PlaneGeometryDescriptor2.default(react3RendererInstance),
    polyhedronGeometry: new _PolyhedronGeometryDescriptor2.default(react3RendererInstance),
    icosahedronGeometry: new _IcosahedronGeometryDescriptor2.default(react3RendererInstance),
    octahedronGeometry: new _OctahedronGeometryDescriptor2.default(react3RendererInstance),
    tetrahedronGeometry: new _TetrahedronGeometryDescriptor2.default(react3RendererInstance),
    circleGeometry: new _CircleGeometryDescriptor2.default(react3RendererInstance),
    circleBufferGeometry: new _CircleBufferGeometryDescriptor2.default(react3RendererInstance),
    ringGeometry: new _RingGeometryDescriptor2.default(react3RendererInstance),
    cylinderGeometry: new _CylinderGeometryDescriptor2.default(react3RendererInstance),
    latheGeometry: new _LatheGeometryDescriptor2.default(react3RendererInstance),
    torusGeometry: new _TorusGeometryDescriptor2.default(react3RendererInstance),
    torusKnotGeometry: new _TorusKnotGeometryDescriptor2.default(react3RendererInstance),
    extrudeGeometry: new _ExtrudeGeometryDescriptor2.default(react3RendererInstance),
    tubeGeometry: new _TubeGeometryDescriptor2.default(react3RendererInstance),
    dodecahedronGeometry: new _DodecahedronGeometryDescriptor2.default(react3RendererInstance),
    textGeometry: new _TextGeometryDescriptor2.default(react3RendererInstance),
    shapeGeometry: new _ShapeGeometryDescriptor2.default(react3RendererInstance),

    shape: new _ShapeDescriptor2.default(react3RendererInstance),
    moveTo: new _MoveToDescriptor2.default(react3RendererInstance),
    lineTo: new _LineToDescriptor2.default(react3RendererInstance),
    bezierCurveTo: new _BezierCurveToDescriptor2.default(react3RendererInstance),
    quadraticCurveTo: new _QuadraticCurveToDescriptor2.default(react3RendererInstance),
    absArc: new _AbsArcDescriptor2.default(react3RendererInstance),
    absEllipse: new _AbsEllipseDescriptor2.default(react3RendererInstance),
    hole: new _HoleDescriptor2.default(react3RendererInstance),
    splineThru: new _SplineThruDescriptor2.default(react3RendererInstance),

    ambientLight: new _AmbientLightDescriptor2.default(react3RendererInstance),
    directionalLight: new _DirectionalLightDescriptor2.default(react3RendererInstance),
    spotLight: new _SpotLightDescriptor2.default(react3RendererInstance),
    pointLight: new _PointLightDescriptor2.default(react3RendererInstance),
    hemisphereLight: new _HemisphereLightDescriptor2.default(react3RendererInstance),

    resources: new _ResourcesDescriptor2.default(react3RendererInstance),
    materialResource: new _MaterialResourceDescriptor2.default(react3RendererInstance),
    geometryResource: new _GeometryResourceDescriptor2.default(react3RendererInstance),
    shapeGeometryResource: new _ShapeGeometryResourceDescriptor2.default(react3RendererInstance),
    textureResource: new _TextureResourceDescriptor2.default(react3RendererInstance),
    shapeResource: new _ShapeResourceDescriptor2.default(react3RendererInstance),

    uniforms: new _UniformsDescriptor2.default(react3RendererInstance),
    uniform: new _UniformDescriptor2.default(react3RendererInstance),

    cameraHelper: new _CameraHelperDescriptor2.default(react3RendererInstance),
    axisHelper: new _AxisHelperDescriptor2.default(react3RendererInstance),
    arrowHelper: new _ArrowHelperDescriptor2.default(react3RendererInstance),
    gridHelper: new _GridHelperDescriptor2.default(react3RendererInstance)
  };
};

module.exports = ElementDescriptorContainer;