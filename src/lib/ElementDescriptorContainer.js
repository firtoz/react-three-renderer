import React3Descriptor from './descriptors/React3Descriptor';

import ModuleDescriptor from './descriptors/ModuleDescriptor';

import ViewportDescriptor from './descriptors/ViewportDescriptor';
import SceneDescriptor from './descriptors/Object/SceneDescriptor';

import Object3DDescriptor from './descriptors/Object/Object3DDescriptor';
import GroupDescriptor from './descriptors/Object/GroupDescriptor';

import OrthographicCameraDescriptor from './descriptors/Object/Camera/OrthographicCameraDescriptor';
import PerspectiveCameraDescriptor from './descriptors/Object/Camera/PerspectiveCameraDescriptor';
import CubeCameraDescriptor from './descriptors/Object/Camera/CubeCameraDescriptor';

import MeshDescriptor from './descriptors/Object/MeshDescriptor';
import LineDescriptor from './descriptors/Object/LineDescriptor';
import LineSegmentsDescriptor from './descriptors/Object/LineSegmentsDescriptor';
import PointsDescriptor from './descriptors/Object/PointsDescriptor';
import SpriteDescriptor from './descriptors/Object/SpriteDescriptor';

import AmbientLightDescriptor from './descriptors/Light/AmbientLightDescriptor';
import DirectionalLightDescriptor from './descriptors/Light/DirectionalLightDescriptor';
import SpotLightDescriptor from './descriptors/Light/SpotLightDescriptor';
import PointLightDescriptor from './descriptors/Light/PointLightDescriptor';
import HemisphereLightDescriptor from './descriptors/Light/HemisphereLightDescriptor';

import ResourcesDescriptor from './descriptors/Resource/ResourcesDescriptor';
import GeometryResourceDescriptor from './descriptors/Resource/GeometryResourceDescriptor';
import ShapeGeometryResourceDescriptor from
  './descriptors/Resource/ShapeGeometryResourceDescriptor';
import TextureResourceDescriptor from './descriptors/Resource/TextureResourceDescriptor';
import ShapeResourceDescriptor from './descriptors/Resource/ShapeResourceDescriptor';

import GeometryDescriptor from './descriptors/Geometry/GeometryDescriptor';
import BoxGeometryDescriptor from './descriptors/Geometry/BoxGeometryDescriptor';
import SphereGeometryDescriptor from './descriptors/Geometry/SphereGeometryDescriptor';
import ParametricGeometryDescriptor from './descriptors/Geometry/ParametricGeometryDescriptor';
import PlaneBufferGeometryDescriptor from './descriptors/Geometry/PlaneBufferGeometryDescriptor';
import PlaneGeometryDescriptor from './descriptors/Geometry/PlaneGeometryDescriptor';
import PolyhedronGeometryDescriptor from './descriptors/Geometry/PolyhedronGeometryDescriptor';
import IcosahedronGeometryDescriptor from './descriptors/Geometry/IcosahedronGeometryDescriptor';
import OctahedronGeometryDescriptor from './descriptors/Geometry/OctahedronGeometryDescriptor';
import TetrahedronGeometryDescriptor from './descriptors/Geometry/TetrahedronGeometryDescriptor';
import CircleGeometryDescriptor from './descriptors/Geometry/CircleGeometryDescriptor';
import CircleBufferGeometryDescriptor from './descriptors/Geometry/CircleBufferGeometryDescriptor';
import RingGeometryDescriptor from './descriptors/Geometry/RingGeometryDescriptor';
import CylinderGeometryDescriptor from './descriptors/Geometry/CylinderGeometryDescriptor';
import LatheGeometryDescriptor from './descriptors/Geometry/LatheGeometryDescriptor';
import TorusGeometryDescriptor from './descriptors/Geometry/TorusGeometryDescriptor';
import TorusKnotGeometryDescriptor from './descriptors/Geometry/TorusKnotGeometryDescriptor';
import ExtrudeGeometryDescriptor from './descriptors/Geometry/ExtrudeGeometryDescriptor';
import TubeGeometryDescriptor from './descriptors/Geometry/TubeGeometryDescriptor';
import DodecahedronGeometryDescriptor from './descriptors/Geometry/DodecahedronGeometryDescriptor';
import TextGeometryDescriptor from './descriptors/Geometry/TextGeometryDescriptor';

import ShapeDescriptor from './descriptors/Geometry/Shapes/ShapeDescriptor';
import MoveToDescriptor from './descriptors/Geometry/Shapes/MoveToDescriptor';
import LineToDescriptor from './descriptors/Geometry/Shapes/LineToDescriptor';
import BezierCurveToDescriptor from './descriptors/Geometry/Shapes/BezierCurveToDescriptor';
import QuadraticCurveToDescriptor from './descriptors/Geometry/Shapes/QuadraticCurveToDescriptor';
import AbsArcDescriptor from './descriptors/Geometry/Shapes/AbsArcDescriptor';
import AbsEllipseDescriptor from './descriptors/Geometry/Shapes/AbsEllipseDescriptor';
import HoleDescriptor from './descriptors/Geometry/Shapes/HoleDescriptor';
import SplineThruDescriptor from './descriptors/Geometry/Shapes/SplineThruDescriptor';

import PointsMaterialDescriptor from './descriptors/Material/PointsMaterialDescriptor';
import MeshBasicMaterialDescriptor from './descriptors/Material/MeshBasicMaterialDescriptor';
import MeshPhongMaterialDescriptor from './descriptors/Material/MeshPhongMaterialDescriptor';
import MeshLambertMaterialDescriptor from './descriptors/Material/MeshLambertMaterialDescriptor';
import ShaderMaterialDescriptor from './descriptors/Material/ShaderMaterialDescriptor';
import RawShaderMaterialDescriptor from './descriptors/Material/RawShaderMaterialDescriptor';
import TextureDescriptor from './descriptors/Material/TextureDescriptor';
import MaterialResourceDescriptor from './descriptors/Resource/MaterialResourceDescriptor';
import UniformsDescriptor from './descriptors/Material/UniformsDescriptor';
import UniformDescriptor from './descriptors/Material/UniformDescriptor';
import LineBasicMaterialDescriptor from './descriptors/Material/LineBasicMaterialDescriptor';
import LineDashedMaterialDescriptor from './descriptors/Material/LineDashedMaterialDescriptor';
import MeshDepthMaterialDescriptor from './descriptors/Material/MeshDepthMaterialDescriptor';
import MeshNormalMaterialDescriptor from './descriptors/Material/MeshNormalMaterialDescriptor';
import SpriteMaterialDescriptor from './descriptors/Material/SpriteMaterialDescriptor';

import CameraHelperDescriptor from './descriptors/Object/Helper/CameraHelperDescriptor';
import AxisHelperDescriptor from './descriptors/Object/Helper/AxisHelperDescriptor';
import ArrowHelperDescriptor from './descriptors/Object/Helper/ArrowHelperDescriptor';
import GridHelperDescriptor from './descriptors/Object/Helper/GridHelperDescriptor';

class ElementDescriptorContainer {
  constructor(react3RendererInstance) {
    this.react3RendererInstance = react3RendererInstance;

    /**
     * @type {Object.<string, THREEElementDescriptor>}
     */
    this.descriptors = {
      react3: new React3Descriptor(react3RendererInstance),

      module: new ModuleDescriptor(react3RendererInstance),

      viewport: new ViewportDescriptor(react3RendererInstance),
      scene: new SceneDescriptor(react3RendererInstance),

      object3D: new Object3DDescriptor(react3RendererInstance),
      group: new GroupDescriptor(react3RendererInstance),

      orthographicCamera: new OrthographicCameraDescriptor(react3RendererInstance),
      perspectiveCamera: new PerspectiveCameraDescriptor(react3RendererInstance),
      cubeCamera: new CubeCameraDescriptor(react3RendererInstance),

      mesh: new MeshDescriptor(react3RendererInstance),
      line: new LineDescriptor(react3RendererInstance),
      lineSegments: new LineSegmentsDescriptor(react3RendererInstance),
      points: new PointsDescriptor(react3RendererInstance),
      sprite: new SpriteDescriptor(react3RendererInstance),

      meshBasicMaterial: new MeshBasicMaterialDescriptor(react3RendererInstance),
      meshPhongMaterial: new MeshPhongMaterialDescriptor(react3RendererInstance),
      meshLambertMaterial: new MeshLambertMaterialDescriptor(react3RendererInstance),
      pointsMaterial: new PointsMaterialDescriptor(react3RendererInstance),
      shaderMaterial: new ShaderMaterialDescriptor(react3RendererInstance),
      rawShaderMaterial: new RawShaderMaterialDescriptor(react3RendererInstance),
      lineBasicMaterial: new LineBasicMaterialDescriptor(react3RendererInstance),
      lineDashedMaterial: new LineDashedMaterialDescriptor(react3RendererInstance),
      meshDepthMaterial: new MeshDepthMaterialDescriptor(react3RendererInstance),
      meshNormalMaterial: new MeshNormalMaterialDescriptor(react3RendererInstance),
      spriteMaterial: new SpriteMaterialDescriptor(react3RendererInstance),

      texture: new TextureDescriptor(react3RendererInstance),

      geometry: new GeometryDescriptor(react3RendererInstance),
      boxGeometry: new BoxGeometryDescriptor(react3RendererInstance),
      sphereGeometry: new SphereGeometryDescriptor(react3RendererInstance),
      parametricGeometry: new ParametricGeometryDescriptor(react3RendererInstance),
      planeBufferGeometry: new PlaneBufferGeometryDescriptor(react3RendererInstance),
      planeGeometry: new PlaneGeometryDescriptor(react3RendererInstance),
      polyhedronGeometry: new PolyhedronGeometryDescriptor(react3RendererInstance),
      icosahedronGeometry: new IcosahedronGeometryDescriptor(react3RendererInstance),
      octahedronGeometry: new OctahedronGeometryDescriptor(react3RendererInstance),
      tetrahedronGeometry: new TetrahedronGeometryDescriptor(react3RendererInstance),
      circleGeometry: new CircleGeometryDescriptor(react3RendererInstance),
      circleBufferGeometry: new CircleBufferGeometryDescriptor(react3RendererInstance),
      ringGeometry: new RingGeometryDescriptor(react3RendererInstance),
      cylinderGeometry: new CylinderGeometryDescriptor(react3RendererInstance),
      latheGeometry: new LatheGeometryDescriptor(react3RendererInstance),
      torusGeometry: new TorusGeometryDescriptor(react3RendererInstance),
      torusKnotGeometry: new TorusKnotGeometryDescriptor(react3RendererInstance),
      extrudeGeometry: new ExtrudeGeometryDescriptor(react3RendererInstance),
      tubeGeometry: new TubeGeometryDescriptor(react3RendererInstance),
      dodecahedronGeometry: new DodecahedronGeometryDescriptor(react3RendererInstance),
      textGeometry: new TextGeometryDescriptor(react3RendererInstance),

      shape: new ShapeDescriptor(react3RendererInstance),
      moveTo: new MoveToDescriptor(react3RendererInstance),
      lineTo: new LineToDescriptor(react3RendererInstance),
      bezierCurveTo: new BezierCurveToDescriptor(react3RendererInstance),
      quadraticCurveTo: new QuadraticCurveToDescriptor(react3RendererInstance),
      absArc: new AbsArcDescriptor(react3RendererInstance),
      absEllipse: new AbsEllipseDescriptor(react3RendererInstance),
      hole: new HoleDescriptor(react3RendererInstance),
      splineThru: new SplineThruDescriptor(react3RendererInstance),

      ambientLight: new AmbientLightDescriptor(react3RendererInstance),
      directionalLight: new DirectionalLightDescriptor(react3RendererInstance),
      spotLight: new SpotLightDescriptor(react3RendererInstance),
      pointLight: new PointLightDescriptor(react3RendererInstance),
      hemisphereLight: new HemisphereLightDescriptor(react3RendererInstance),
      resources: new ResourcesDescriptor(react3RendererInstance),
      materialResource: new MaterialResourceDescriptor(react3RendererInstance),
      geometryResource: new GeometryResourceDescriptor(react3RendererInstance),
      shapeGeometryResource: new ShapeGeometryResourceDescriptor(react3RendererInstance),
      textureResource: new TextureResourceDescriptor(react3RendererInstance),
      shapeResource: new ShapeResourceDescriptor(react3RendererInstance),

      uniforms: new UniformsDescriptor(react3RendererInstance),
      uniform: new UniformDescriptor(react3RendererInstance),

      cameraHelper: new CameraHelperDescriptor(react3RendererInstance),
      axisHelper: new AxisHelperDescriptor(react3RendererInstance),
      arrowHelper: new ArrowHelperDescriptor(react3RendererInstance),
      gridHelper: new GridHelperDescriptor(react3RendererInstance),
    };
  }
}

module.exports = ElementDescriptorContainer;
