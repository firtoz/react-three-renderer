import THREE from 'three';
import GeometryDescriptorBase from './GeometryDescriptorBase';

import React from 'react';
const {PropTypes} = React;

class GeometryDescriptor extends GeometryDescriptorBase {
  constructor(react3RendererInstance) {
    super(react3RendererInstance);

    this.propTypes = {
      ...this.propTypes,

      vertices: PropTypes.arrayOf(PropTypes.instanceOf(THREE.Vector3)).isRequired,
      colors: PropTypes.arrayOf(PropTypes.instanceOf(THREE.Color)),
      faces: PropTypes.arrayOf(PropTypes.instanceOf(THREE.Face3)),
      dynamic: PropTypes.arrayOf(PropTypes.bool),
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
    if (vertices !== self.vertices) {
      self.vertices = vertices;

      self.verticesNeedUpdate = true;
    }
  }
}

export default GeometryDescriptor;
