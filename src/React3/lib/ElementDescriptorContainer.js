import React3Descriptor from './descriptors/React3Descriptor';
import Object3DDescriptor from './descriptors/Object/Object3DDescriptor';
import SceneDescriptor from './descriptors/Object/SceneDescriptor';
import OrthographicCameraDescriptor from './descriptors/Object/Camera/OrthographicCameraDescriptor';
import PerspectiveCameraDescriptor from './descriptors/Object/Camera/PerspectiveCameraDescriptor';
import CameraHelperDescriptor from './descriptors/Object/Helper/CameraHelperDescriptor';
import MeshDescriptor from './descriptors/Object/MeshDescriptor';
import PointCloudDescriptor from './descriptors/Object/PointCloudDescriptor';
import MeshBasicMaterialDescriptor from './descriptors/Material/MeshBasicMaterialDescriptor';
import MeshPhongMaterialDescriptor from './descriptors/Material/MeshPhongMaterialDescriptor';
import MeshLambertMaterialDescriptor from './descriptors/Material/MeshLambertMaterialDescriptor';
import PointCloudMaterialDescriptor from './descriptors/Material/PointCloudMaterialDescriptor';
import ViewportDescriptor from './descriptors/ViewportDescriptor';
import AmbientLightDescriptor from './descriptors/Light/AmbientLightDescriptor';
import DirectionalLightDescriptor from './descriptors/Light/DirectionalLightDescriptor';
import ShaderMaterialDescriptor from './descriptors/Material/ShaderMaterialDescriptor';
import TextureDescriptor from './descriptors/Material/TextureDescriptor';

import ResourcesDescriptor from './descriptors/Resource/ResourcesDescriptor';
import MaterialResourceDescriptor from './descriptors/Resource/MaterialResourceDescriptor';
import GeometryResourceDescriptor from './descriptors/Resource/GeometryResourceDescriptor';
import TextureResourceDescriptor from './descriptors/Resource/TextureResourceDescriptor';

import UniformsDescriptor from './descriptors/Material/UniformsDescriptor';
import UniformDescriptor from './descriptors/Material/UniformDescriptor';

import AxisHelperDescriptor from './descriptors/Object/Helper/AxisHelperDescriptor';
import ArrowHelperDescriptor from './descriptors/Object/Helper/ArrowHelperDescriptor';

import GeometryDescriptor from './descriptors/Geometry/GeometryDescriptor';
import BoxGeometryDescriptor from './descriptors/Geometry/BoxGeometryDescriptor';
import SphereGeometryDescriptor from './descriptors/Geometry/SphereGeometryDescriptor';
import ParametricGeometryDescriptor from './descriptors/Geometry/ParametricGeometryDescriptor';
import PlaneBufferGeometryDescriptor from './descriptors/Geometry/PlaneBufferGeometryDescriptor';
import IcosahedronGeometryDescriptor from './descriptors/Geometry/IcosahedronGeometryDescriptor';
import OctahedronGeometryDescriptor from './descriptors/Geometry/OctahedronGeometryDescriptor';
import TetrahedronGeometryDescriptor from './descriptors/Geometry/TetrahedronGeometryDescriptor';
import CircleGeometryDescriptor from './descriptors/Geometry/CircleGeometryDescriptor';
import RingGeometryDescriptor from './descriptors/Geometry/RingGeometryDescriptor';
import CylinderGeometryDescriptor from './descriptors/Geometry/CylinderGeometryDescriptor';
import LatheGeometryDescriptor from './descriptors/Geometry/LatheGeometryDescriptor';
import TorusGeometryDescriptor from './descriptors/Geometry/TorusGeometryDescriptor';
import TorusKnotGeometryDescriptor from './descriptors/Geometry/TorusKnotGeometryDescriptor';

class ElementDescriptorContainer {
  constructor(react3RendererInstance) {
    this.react3RendererInstance = react3RendererInstance;

    /**
     * @type {Object.<string, THREEElementDescriptor>}
     */
    this.descriptors = {
      react3: new React3Descriptor(react3RendererInstance),

      viewport: new ViewportDescriptor(react3RendererInstance),
      scene: new SceneDescriptor(react3RendererInstance),

      object3D: new Object3DDescriptor(react3RendererInstance),

      orthographicCamera: new OrthographicCameraDescriptor(react3RendererInstance),
      perspectiveCamera: new PerspectiveCameraDescriptor(react3RendererInstance),
      cameraHelper: new CameraHelperDescriptor(react3RendererInstance),

      mesh: new MeshDescriptor(react3RendererInstance),
      pointCloud: new PointCloudDescriptor(react3RendererInstance),

      meshBasicMaterial: new MeshBasicMaterialDescriptor(react3RendererInstance),
      meshPhongMaterial: new MeshPhongMaterialDescriptor(react3RendererInstance),
      meshLambertMaterial: new MeshLambertMaterialDescriptor(react3RendererInstance),
      pointCloudMaterial: new PointCloudMaterialDescriptor(react3RendererInstance),
      shaderMaterial: new ShaderMaterialDescriptor(react3RendererInstance),

      texture: new TextureDescriptor(react3RendererInstance),

      geometry: new GeometryDescriptor(react3RendererInstance),
      boxGeometry: new BoxGeometryDescriptor(react3RendererInstance),
      sphereGeometry: new SphereGeometryDescriptor(react3RendererInstance),
      parametricGeometry: new ParametricGeometryDescriptor(react3RendererInstance),
      planeBufferGeometry: new PlaneBufferGeometryDescriptor(react3RendererInstance),
      icosahedronGeometry: new IcosahedronGeometryDescriptor(react3RendererInstance),
      octahedronGeometry: new OctahedronGeometryDescriptor(react3RendererInstance),
      tetrahedronGeometry: new TetrahedronGeometryDescriptor(react3RendererInstance),
      circleGeometry: new CircleGeometryDescriptor(react3RendererInstance),
      ringGeometry: new RingGeometryDescriptor(react3RendererInstance),
      cylinderGeometry: new CylinderGeometryDescriptor(react3RendererInstance),
      latheGeometry: new LatheGeometryDescriptor(react3RendererInstance),
      torusGeometry: new TorusGeometryDescriptor(react3RendererInstance),
      torusKnotGeometry: new TorusKnotGeometryDescriptor(react3RendererInstance),

      ambientLight: new AmbientLightDescriptor(react3RendererInstance),
      directionalLight: new DirectionalLightDescriptor(react3RendererInstance),

      resources: new ResourcesDescriptor(react3RendererInstance),
      materialResource: new MaterialResourceDescriptor(react3RendererInstance),
      geometryResource: new GeometryResourceDescriptor(react3RendererInstance),
      textureResource: new TextureResourceDescriptor(react3RendererInstance),

      uniforms: new UniformsDescriptor(react3RendererInstance),
      uniform: new UniformDescriptor(react3RendererInstance),

      axisHelper: new AxisHelperDescriptor(react3RendererInstance),
      arrowHelper: new ArrowHelperDescriptor(react3RendererInstance),
    };
  }
}

export default ElementDescriptorContainer;
