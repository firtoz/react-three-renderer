import Viewport from '../Viewport';

import THREEElementDescriptor from './THREEElementDescriptor';

class ViewportDescriptor extends THREEElementDescriptor {
  constructor(react3Instance) {
    super(react3Instance);

    this.useSimpleUpdates([
      'x',
      'y',
      'width',
      'height',
      'cameraName',
    ]);
  }

  useSimpleUpdates(names) {
    for (let i = 0; i < names.length; ++i) {
      const propName = names[i];
      this.propUpdates[propName] = this._updateSimple.bind(this, propName);
    }
  }

  _updateSimple(propName, self, propValue) {
    self[propName] = propValue;
  }

  construct(props) {
    return new Viewport(props);
  }

  unmount() {
    super.unmount(self);
  }

  setParent() {
    // no need to do anything, viewports are simple!
  }
}

export default ViewportDescriptor;
