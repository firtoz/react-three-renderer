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

  construct(props) {
    return new Viewport(props);
  }

  unmount() {
    super.unmount(self);
  }

  setParent(self, parentObject3D) {
    super.setParent(self, parentObject3D);
  }
}

export default ViewportDescriptor;
