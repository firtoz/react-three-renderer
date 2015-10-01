import React3DInstance from '../React3DInstance';

import THREEElementDescriptor from './THREEElementDescriptor';

import THREE from 'three';

import PropTypes from 'react/lib/ReactPropTypes';

class React3Descriptor extends THREEElementDescriptor {
  constructor(react3RendererInstance) {
    super(react3RendererInstance);

    this.propTypes = {
      ...this.propTypes,

      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired,
      gammaInput: PropTypes.bool,
      gammaOutput: PropTypes.bool,
      context: PropTypes.string.isRequired,
      canvasStyle: PropTypes.any,
      mainCamera: PropTypes.string,
      canvas: PropTypes.instanceOf(HTMLCanvasElement),
      onAnimate: PropTypes.func,
      antialias: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.number,
      ]).isRequired,
      pixelRatio: PropTypes.number,
      clearColor: PropTypes.instanceOf(THREE.Color),
      shadowMapEnabled: PropTypes.bool,
      shadowMapType: PropTypes.bool,
      shadowMapCullFace: PropTypes.bool,
      shadowMapDebug: PropTypes.bool,
    };

    this.propUpdates = {
      ...this.propUpdates,

      width: this._updateWidth,
      height: this._updateHeight,
      pixelRatio: this._updatePixelRatio,
    };
  }

  construct(props) {
    return new React3DInstance(props, this.react3RendererInstance);
  }

  applyInitialProps(self, props) {
    super.applyInitialProps(self, props);

    self.initialize();
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
    self.removeChild(child);
  }

  _updateWidth(self, newWidth) {
    self.updateWidth(newWidth);
  }

  _updateHeight(self, newHeight) {
    self.updateHeight(newHeight);
  }

  _updatePixelRatio(self, newHeight) {
    self.updatePixelRatio(newHeight);
  }

  unmount(self) {
    self.unmount();
    super.unmount(self);
  }
}

export default React3Descriptor;
