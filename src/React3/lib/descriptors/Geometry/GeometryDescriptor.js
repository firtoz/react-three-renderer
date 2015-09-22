import THREE from 'three';
import GeometryDescriptorBase from './GeometryDescriptorBase';

class GeometryDescriptor extends GeometryDescriptorBase {
  construct(props) {
    return new THREE.Geometry();
  }

  /**
   *
   * @param {THREE.Geometry} self
   * @param props
   */
  applyInitialProps(self, props) {
    super.applyInitialProps(self, props);

    if (props.vertices !== self.vertices) {
      self.vertices = props.vertices;

      self.verticesNeedUpdate = true;
    }
  }
}

export default GeometryDescriptor;
