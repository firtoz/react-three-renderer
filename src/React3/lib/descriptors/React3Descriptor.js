import React3DInstance from '../React3DInstance';
import invariant from 'fbjs/lib/invariant';
import THREE from 'three';

import THREEElementDescriptor from './THREEElementDescriptor';


function noop() {
}


class React3Descriptor extends THREEElementDescriptor {
  constructor(react3Instance) {
    super(react3Instance);

    this.propUpdates = {
      width: this._updateWidth,
      height: this._updateHeight,
      viewports: this._updateViewports,
      canvasStyle: noop,
    };
  }

  construct(props) {
    return new React3DInstance(props);
  }

  addChildren(self, children) {
    invariant(children.length === 1 && children[0] instanceof THREE.Scene, 'The react3 component should only have one scene as a child!');

    self.setScene(children[0]);
  }

  _updateWidth(self, newWidth) {
    self.updateWidth(newWidth);
  }

  _updateHeight(self, newHeight) {
    self.updateHeight(newHeight);
  }

  _updateViewports(self, newViewports) {
    self.updateViewports(newViewports);
  }

  unmount(self) {
    self.unmount();
  }
}

export default React3Descriptor;
