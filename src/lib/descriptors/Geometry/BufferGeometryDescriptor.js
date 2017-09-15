import * as THREE from 'three';
import PropTypes from 'prop-types';

import GeometryDescriptorBase from './GeometryDescriptorBase';
import propTypeInstanceOf from '../../utils/propTypeInstanceOf';

class BufferGeometryDescriptor extends GeometryDescriptorBase {
  constructor(react3RendererInstance) {
    super(react3RendererInstance);

    [
      'vertices',
      'colors',
      'faceVertexUvs',
      'faces',
      'dynamic',
    ].forEach((propName) => {
      this.removeProp(propName);
    });

    [
      'position',
      'normal',
      'color',
      'uv',
    ].forEach((attributeName) => {
      this.hasProp(attributeName, {
        type: PropTypes.oneOfType([
          propTypeInstanceOf(THREE.BufferAttribute),
          propTypeInstanceOf(THREE.InterleavedBufferAttribute),
        ]),
        update(threeObject, attributeValue) {
          if (attributeValue) {
            threeObject.addAttribute(attributeName, attributeValue);
          } else {
            threeObject.removeAttribute(attributeName);
          }
        },
        updateInitial: true,
        default: undefined,
      });
    });

    this.hasProp('index', {
      type: PropTypes.oneOfType([
        propTypeInstanceOf(THREE.BufferAttribute),
        propTypeInstanceOf(THREE.InterleavedBufferAttribute),
      ]),
      update(threeObject, attributeValue) {
        threeObject.setIndex(attributeValue);
      },
      updateInitial: true,
      default: undefined,
    });

    this.hasProp('groups', {
      type: PropTypes.oneOfType([
        propTypeInstanceOf(Array),
      ]),
      update(threeObject, groupArray) {
        groupArray.forEach((group) => {
          threeObject.addGroup(group.start, group.count, group.materialIndex);
        });
      },
      updateInitial: true,
      default: undefined,
    });
  }

  construct() {
    return new THREE.BufferGeometry();
  }
}

module.exports = BufferGeometryDescriptor;
