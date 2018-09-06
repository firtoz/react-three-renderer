import * as THREE from 'three';
import PropTypes from 'prop-types';

import warning from 'fbjs/lib/warning';
import invariant from 'fbjs/lib/invariant';

import THREEElementDescriptor from './THREEElementDescriptor';
import React3DInstance from '../React3Instance';
import propTypeInstanceOf from '../utils/propTypeInstanceOf';

const propProxy = {
  gammaInput: {
    type: PropTypes.bool,
    default: false,
  },
  gammaOutput: {
    type: PropTypes.bool,
    default: false,
  },
  sortObjects: {
    type: PropTypes.bool,
    default: true,
  },
  context: {
    type: PropTypes.oneOf([
      '2d',
      '3d',
    ]).isRequired,
    default: '3d',
  },
  mainCamera: {
    type: PropTypes.string,
    default: undefined,
  },
  onAnimate: {
    type: PropTypes.func,
    default: undefined,
  },
  clearColor: {
    type: PropTypes.oneOfType([
      propTypeInstanceOf(THREE.Color),
      PropTypes.number,
      PropTypes.string,
    ]),
    default: 0x000000,
  },
  clearAlpha: {
    type: PropTypes.number,
    default: undefined,
  },
  alpha: {
    type: PropTypes.bool,
    default: false,
  },
  shadowMapEnabled: {
    type: PropTypes.bool,
    default: false,
  },
  shadowMapType: {
    type: PropTypes.oneOf([
      THREE.BasicShadowMap,
      THREE.PCFShadowMap,
      THREE.PCFSoftShadowMap,
    ]),
    default: THREE.PCFShadowMap,
  },
  shadowMapCullFace: {
    type: PropTypes.oneOf([
      THREE.CullFaceNone,
      THREE.CullFaceBack,
      THREE.CullFaceFront,
      THREE.CullFaceFrontBack,
    ]),
    default: THREE.CullFaceFront,
  },
  shadowMapDebug: {
    type: PropTypes.bool,
    default: false,
  },
  onRecreateCanvas: {
    type: PropTypes.func.isRequired,
    default: undefined,
  },
  pixelRatio: {
    type: PropTypes.number,
    default: 1,
  },
  width: {
    type: PropTypes.number.isRequired,
    default: 1,
  },
  height: {
    type: PropTypes.number.isRequired,
    default: 1,
  },
  precision: {
    type: PropTypes.oneOf([
      'highp',
      'mediump',
      'lowp',
    ]),
    default: 'highp',
  },
  premultipliedAlpha: {
    type: PropTypes.bool,
    default: true,
  },
  antialias: {
    type: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.number,
    ]),
    default: false,
  },
  stencil: {
    type: PropTypes.bool,
    default: true,
  },
  preserveDrawingBuffer: {
    type: PropTypes.bool,
    default: false,
  },
  depth: {
    type: PropTypes.bool,
    default: true,
  },
  logarithmicDepthBuffer: {
    type: PropTypes.bool,
    default: false,
  },
  onRendererUpdated: {
    type: PropTypes.func,
    default: undefined,
  },
  forceManualRender: {
    type: PropTypes.bool,
    default: false,
  },
  onManualRenderTriggerCreated: {
    type: PropTypes.func,
    default: undefined,
  },
  customRenderer: {
    type: PropTypes.func,
    default: undefined,
  },
  customRender: {
    type: PropTypes.func,
    default: undefined,
  },
};

class React3Descriptor extends THREEElementDescriptor {
  constructor(react3RendererInstance) {
    super(react3RendererInstance);

    Object.keys(propProxy).forEach((propName) => {
      const info = propProxy[propName];
      const propNameFirstLetterCapital = propName[0].toUpperCase() + propName.substr(1);

      const updateFunctionName = `update${propNameFirstLetterCapital}`;

      if (process.env.NODE_ENV !== 'production') {
        warning(React3DInstance.prototype.hasOwnProperty(updateFunctionName),
          'Missing function %s in React3DInstance class.', updateFunctionName);
      }

      const propInfo = {
        type: info.type,
        update(threeObject, newValue) {
          threeObject[updateFunctionName](newValue);
        },
      };

      if (info.hasOwnProperty('default')) {
        propInfo.default = info.default;
      }

      this.hasProp(propName, propInfo);
    });
  }

  completePropertyUpdates(threeObject) {
    if (process.env.NODE_ENV !== 'production') {
      if (!threeObject._warnedAboutManualRendering) {
        if (threeObject._forceManualRender && !threeObject._manualRenderTriggerCallback) {
          threeObject._warnedAboutManualRendering = true;
          warning(false,
            'The `React3` component has `forceManualRender` property set, but not' +
            ' `onManualRenderTriggerCreated`. You will not be able to update the view.');
        }
      }
    }
  }

  setParent(threeObject, parentObject3D) {
    invariant(parentObject3D instanceof HTMLCanvasElement,
      'The `react3` element can only be rendered into a canvas.');

    super.setParent(threeObject, parentObject3D);

    threeObject.updateCanvas(parentObject3D);
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

  _updateOnRecreateCanvas(threeObject, callback) {
    threeObject.updateOnRecreateCanvas(callback);
  }

  _updateHeight(threeObject, newHeight) {
    threeObject.updateHeight(newHeight);
  }

  unmount(threeObject) {
    // call super unmount first so react3instance can clean itself up
    super.unmount(threeObject);

    threeObject.unmount();
  }

  componentWillUnmount(threeObject) {
    threeObject.willUnmount();

    return super.componentWillUnmount(threeObject);
  }
}

module.exports = React3Descriptor;
