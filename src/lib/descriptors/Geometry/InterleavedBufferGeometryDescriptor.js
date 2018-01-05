import * as THREE from 'three';
import PropTypes from 'prop-types';

import GeometryDescriptorBase from './GeometryDescriptorBase';

class InterleavedBufferGeometryDescriptor extends GeometryDescriptorBase {
  constructor(react3RendererInstance) {
    super(react3RendererInstance);
    const self = this;
    this.hasProp('vbo', {
      type: PropTypes.instanceOf(Float32Array),
      update(threeObject, vbo) {
        console.debug('update vbo');
        self.vbo = vbo;
      },
      updateInitial: true,
      default: new Float32Array(),
    });
    this.hasProp('count', {
      type: PropTypes.number,
      update(threeObject, count) {
        console.debug('update count');
        self.count = count;
      },
      updateInitial: true,
      default: 0,
    });
    this.hasProp('offset', {
      type: PropTypes.number,
      update(threeObject, offset) {
        console.debug('update offset');
        self.offset = offset;
      },
      updateInitial: true,
      default: 0,
    });
    this.hasProp('indexCount', {
      type: PropTypes.number,
      update(threeObject, indexCount) {
        console.debug('update index count');
        self.indexCount = indexCount;
      },
      updateInitial: true,
      default: 0,
    });
    this.hasProp('groupCount', {
      type: PropTypes.number,
      update(threeObject, groupCount) {
        console.debug('update group count');
        self.groupCount = groupCount;
      },
      updateInitial: true,
      default: 0,
    });
  }

  construct() {
    console.debug('construct buffer geometry');
    return new THREE.BufferGeometry();
  }

  applyInitialProps(threeObject, props) {
    console.debug('applying initial props');
    super.applyInitialProps(threeObject, props);
    this.names = [];
    this.vbo = props.vbo;
    this.count = props.count;
    this.offset = props.offset;
    this.indexCount = props.indexCount;
    this.groupCount = props.groupCount;
  }

  recalculate(threeObject) {
    console.debug('recalculating interleaved buffer geometry');
    this.attrOffset = this.offset;

    // setup index, if necessary
    threeObject.index = null;
    threeObject.clearGroups();
    if (this.indexCount) {
      let index = new Uint32Array(this.vbo, this.offset, this.indexCount);
      this.attrOffset += 4 * this.indexCount;
      threeObject.setIndex(new THREE.BufferAttribute(index, 1));
    } else if (this.groupCount) {
      let index = new Uint32Array(this.count);
      for (let i = 0; i < this.count; i++) {
        index[i] = i;
      }
      threeObject.setIndex(new THREE.BufferAttribute(index, 1));
      let groups = new Uint32Array(this.vbo, this.offset, this.groupCount);
      let ix = 0;
      Array.from(groups).forEach(i => {
        if (i == 0) {
          return false;
        }
        threeObject.addGroup(ix, i - ix);
        ix = i;
      });
      threeObject.addGroup(ix, this.count - ix);
      this.attrOffset += 4 * this.groupCount;
    }

    // attribute data
    this.names.forEach(name => threeObject.removeAttribute(name));
    this.names = [];
    let stride = 0;
    this.children.forEach(child => {
      stride += child.size;
    });
    let fv = new Float32Array(this.vbo, this.attrOffset, stride * this.count);
    let fbuf = new THREE.InterleavedBuffer(fv, stride);
    let attr_offset = 0;
    let names = [];
    this.children.forEach(child => {
      let bufattr = new THREE.InterleavedBufferAttribute(fbuf, child.size, attr_offset);
      attr_offset += child.size;
      threeObject.addAttribute(child.key, bufattr);
      names.push(child.key);
    });
    this.names = names;
  }

  completePropertyUpdates(threeObject) {
    console.debug('completePropertyUpdates for interleaved buffer geometry');
    this.recalculate(threeObject);
  }

  completeChildUpdates(threeObject) {
    console.debug('completeChildUpdates for interleaved buffer geometry');
    this.recalculate(threeObject);
  }

  addChildren(threeObject, children) {
    console.debug('addChildren');
    this.children = this.children.concat(children);
  }

  addChild(threeObject, child, mountIndex) {
    console.debug('addChild');
    this.children.splice(mountIndex, 0, child);
  }

  removeChild(threeObject, child) {
    console.debug('removeChild');
    this.children = this.children.filter(x => {
      return x != child;
    });
  }

  moveChild(threeObject, childObject, toIndex) {
    console.debug('moveChild');
    let idx = this.children.indexOf(childObject);
    if (idx != -1) {
      this.children.splice(toIndex, 0, this.children.splice(idx, 1)[0]);
    }
  }

}

module.exports = InterleavedBufferGeometryDescriptor;
