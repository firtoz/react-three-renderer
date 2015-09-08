import React3DInstance from '../React3DInstance';

import THREEElementDescriptor from './THREEElementDescriptor';

class React3Descriptor extends THREEElementDescriptor {
  constructor(react3Instance) {
    super(react3Instance);

    this.propUpdates = {
      width: this._updateWidth,
      height: this._updateHeight,
      viewports: this._updateViewports,
    };
  }

  construct(props) {
    return new React3DInstance(props);
  }

  // gets called every time there are children to be added
  // this can be called multiple times as more children are added.
  addChildren(self, children) {
    self.addChildren(children);
  }

  moveChild() {
    // do nothing
  }

  removeChild(self, child) {
    debugger;
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
