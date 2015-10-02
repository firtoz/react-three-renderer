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
   * @param {THREE.Geometry} threeObject
   * @param props
   */
  applyInitialProps(threeObject, props) {
    super.applyInitialProps(threeObject, props);

    this._updateVertices(threeObject, props.vertices);
  }

  _updateVertices(threeObject, vertices) {
    if (threeObject.vertices !== vertices) {
      threeObject.vertices = vertices;

      threeObject.verticesNeedUpdate = true;
    }
  }
}

export default GeometryDescriptor;
