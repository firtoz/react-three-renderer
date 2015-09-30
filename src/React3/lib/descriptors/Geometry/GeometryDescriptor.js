import THREE from 'three';
import GeometryDescriptorBase from './GeometryDescriptorBase';

import PropTypes from 'react/lib/ReactPropTypes';

class GeometryDescriptor extends GeometryDescriptorBase {
  constructor(react3RendererInstance) {
    super(react3RendererInstance);

    this.propTypes = {
      ...this.propTypes,

      vertices: PropTypes.arrayOf(PropTypes.instanceOf(THREE.Vector3)).isRequired,
      colors: PropTypes.arrayOf(PropTypes.instanceOf(THREE.Color)),
      faces: PropTypes.arrayOf(PropTypes.instanceOf(THREE.Face3)),
    };

    this.propUpdates = {
      ...this.propUpdates,

      vertices: this._updateVertices,
    };
  }


  construct(props) { // eslint-disable-line no-unused-vars
    return new THREE.Geometry();
  }

  /**
   * @param {THREE.Geometry} self
   * @param props
   */
  applyInitialProps(self, props) {
    super.applyInitialProps(self, props);

    this._updateVertices(self, props.vertices);
  }

  _updateVertices(self, vertices) {
    if (self.vertices !== vertices) {
      self.vertices = vertices;

      self.verticesNeedUpdate = true;
    }
  }
}

export default GeometryDescriptor;
