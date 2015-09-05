import THREE from 'three';
import GeometryDescriptorBase from './GeometryDescriptorBase';
import invariant from 'fbjs/lib/invariant';

class BoxGeometryDescriptor extends GeometryDescriptorBase {
  constructor(react3Instance) {
    super(react3Instance);

    this.propUpdates = {
      ...this.propUpdates,
      'width': this._updateWidth,
      'height': this._updateHeight,
      'depth': this._updateDepth,
    };
  }

  construct(props) {
    return new THREE.BoxGeometry(props.width, props.height, props.depth);
  }

  _updateWidth = () => {
    invariant(false, 'Please do not modify the width property of the boxGeometry component.');
  };

  _updateHeight = () => {
    invariant(false, 'Please do not modify the height property of the boxGeometry component.');
  };

  _updateDepth = () => {
    invariant(false, 'Please do not modify the depth property of the boxGeometry component.');
  };
}

export default BoxGeometryDescriptor;
