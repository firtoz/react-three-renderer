import React3Descriptor from './lib/descriptors/React3Descriptor';
import Object3DDescriptor from './lib/descriptors/Object3DDescriptor';
import SceneDescriptor from './lib/descriptors/SceneDescriptor';
import OrthographicCameraDescriptor from './lib/descriptors/OrthographicCameraDescriptor';
import PerspectiveCameraDescriptor from './lib/descriptors/PerspectiveCameraDescriptor';
import CameraHelperDescriptor from './lib/descriptors/CameraHelperDescriptor';
import MeshDescriptor from './lib/descriptors/MeshDescriptor';
import PointCloudDescriptor from './lib/descriptors/PointCloudDescriptor';
import MeshBasicMaterialDescriptor from './lib/descriptors/MeshBasicMaterialDescriptor';
import PointCloudMaterialDescriptor from './lib/descriptors/PointCloudMaterialDescriptor';
import GeometryDescriptor from './lib/descriptors/GeometryDescriptor';
import BoxGeometryDescriptor from './lib/descriptors/BoxGeometryDescriptor';
import SphereGeometryDescriptor from './lib/descriptors/SphereGeometryDescriptor';

class ElementDescriptorContainer {
  constructor(react3Instance) {
    this.react3Instance = react3Instance;

    /**
     * @type {Object.<string, THREEElementDescriptor>}
     */
    this.descriptors = {
      react3: new React3Descriptor(react3Instance),
      scene: new SceneDescriptor(react3Instance),

      object3D: new Object3DDescriptor(react3Instance),

      orthographicCamera: new OrthographicCameraDescriptor(react3Instance),
      perspectiveCamera: new PerspectiveCameraDescriptor(react3Instance),
      cameraHelper: new CameraHelperDescriptor(react3Instance),

      mesh: new MeshDescriptor(react3Instance),
      pointCloud: new PointCloudDescriptor(react3Instance),

      meshBasicMaterial: new MeshBasicMaterialDescriptor(react3Instance),
      pointCloudMaterial: new PointCloudMaterialDescriptor(react3Instance),

      geometry: new GeometryDescriptor(react3Instance),
      boxGeometry: new BoxGeometryDescriptor(react3Instance),
      sphereGeometry: new SphereGeometryDescriptor(react3Instance),
    };
  }
}

export default ElementDescriptorContainer;
