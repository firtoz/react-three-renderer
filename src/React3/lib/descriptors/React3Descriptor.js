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

  applyInitialProps(threeObject, props) {
    super.applyInitialProps(threeObject, props);

    threeObject.initialize();
  }

// gets called every time there are children to be added
  // this can be called multiple times as more children are added.
  addChildren(threeObject, children) {
    threeObject.addChildren(children);
  }

  addChild(threeObject, child) {
    threeObject.addChildren([child]);
  }

  moveChild() {
    // do nothing
  }

  removeChild(threeObject, child) {
    threeObject.removeChild(child);
  }

  _updateWidth(threeObject, newWidth) {
    threeObject.updateWidth(newWidth);
  }

  _updateHeight(threeObject, newHeight) {
    threeObject.updateHeight(newHeight);
  }

  _updatePixelRatio(threeObject, newHeight) {
    threeObject.updatePixelRatio(newHeight);
  }

  unmount(threeObject) {
    threeObject.unmount();
    super.unmount(threeObject);
  }
}

export default React3Descriptor;
