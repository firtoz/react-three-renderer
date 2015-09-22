import React3Descriptor from './descriptors/React3Descriptor';
import Object3DDescriptor from './descriptors/Object3DDescriptor';
import SceneDescriptor from './descriptors/SceneDescriptor';
import OrthographicCameraDescriptor from './descriptors/OrthographicCameraDescriptor';
import PerspectiveCameraDescriptor from './descriptors/PerspectiveCameraDescriptor';
import CameraHelperDescriptor from './descriptors/CameraHelperDescriptor';
import MeshDescriptor from './descriptors/MeshDescriptor';
import PointCloudDescriptor from './descriptors/PointCloudDescriptor';
import MeshBasicMaterialDescriptor from './descriptors/MeshBasicMaterialDescriptor';
import MeshPhongMaterialDescriptor from './descriptors/MeshPhongMaterialDescriptor';
import MeshLambertMaterialDescriptor from './descriptors/MeshLambertMaterialDescriptor';
import PointCloudMaterialDescriptor from './descriptors/PointCloudMaterialDescriptor';
import ViewportDescriptor from './descriptors/ViewportDescriptor';
import AmbientLightDescriptor from './descriptors/AmbientLightDescriptor';
import DirectionalLightDescriptor from './descriptors/DirectionalLightDescriptor';
import ShaderMaterialDescriptor from './descriptors/ShaderMaterialDescriptor';
import TextureDescriptor from './descriptors/TextureDescriptor';

import ResourcesDescriptor from './descriptors/Resource/ResourcesDescriptor';
import MaterialResourceDescriptor from './descriptors/Resource/MaterialResourceDescriptor';
import GeometryResourceDescriptor from './descriptors/Resource/GeometryResourceDescriptor';
import TextureResourceDescriptor from './descriptors/Resource/TextureResourceDescriptor';

import UniformsDescriptor from './descriptors/UniformsDescriptor';
import UniformDescriptor from './descriptors/UniformDescriptor';

import AxisHelperDescriptor from './descriptors/AxisHelperDescriptor';
import ArrowHelperDescriptor from './descriptors/ArrowHelperDescriptor';

import GeometryDescriptor from './descriptors/GeometryDescriptor';
import BoxGeometryDescriptor from './descriptors/BoxGeometryDescriptor';
import SphereGeometryDescriptor from './descriptors/SphereGeometryDescriptor';
import ParametricGeometryDescriptor from './descriptors/ParametricGeometryDescriptor';
import PlaneBufferGeometryDescriptor from './descriptors/PlaneBufferGeometryDescriptor';
import IcosahedronGeometryDescriptor from './descriptors/IcosahedronGeometryDescriptor';
import OctahedronGeometryDescriptor from './descriptors/OctahedronGeometryDescriptor';
import TetrahedronGeometryDescriptor from './descriptors/TetrahedronGeometryDescriptor';
import CircleGeometryDescriptor from './descriptors/CircleGeometryDescriptor';
import RingGeometryDescriptor from './descriptors/RingGeometryDescriptor';
import CylinderGeometryDescriptor from './descriptors/CylinderGeometryDescriptor';
import LatheGeometryDescriptor from './descriptors/LatheGeometryDescriptor';
import TorusGeometryDescriptor from './descriptors/TorusGeometryDescriptor';
import TorusKnotGeometryDescriptor from './descriptors/TorusKnotGeometryDescriptor';

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
