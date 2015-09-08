import React3Descriptor from './descriptors/React3Descriptor';
import Object3DDescriptor from './descriptors/Object3DDescriptor';
import SceneDescriptor from './descriptors/SceneDescriptor';
import OrthographicCameraDescriptor from './descriptors/OrthographicCameraDescriptor';
import PerspectiveCameraDescriptor from './descriptors/PerspectiveCameraDescriptor';
import CameraHelperDescriptor from './descriptors/CameraHelperDescriptor';
import MeshDescriptor from './descriptors/MeshDescriptor';
import PointCloudDescriptor from './descriptors/PointCloudDescriptor';
import MeshBasicMaterialDescriptor from './descriptors/MeshBasicMaterialDescriptor';
import PointCloudMaterialDescriptor from './descriptors/PointCloudMaterialDescriptor';
import GeometryDescriptor from './descriptors/GeometryDescriptor';
import BoxGeometryDescriptor from './descriptors/BoxGeometryDescriptor';
import SphereGeometryDescriptor from './descriptors/SphereGeometryDescriptor';
import ViewportDescriptor from './descriptors/ViewportDescriptor';

class ElementDescriptorContainer {
  constructor(react3Instance) {
    this.react3Instance = react3Instance;

    /**
     * @type {Object.<string, THREEElementDescriptor>}
     */
    this.descriptors = {
      react3: new React3Descriptor(react3Instance),

      viewport: new ViewportDescriptor(react3Instance),
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
