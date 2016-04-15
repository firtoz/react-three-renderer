import THREE from 'three';
import Object3DDescriptor from '../Object3DDescriptor';

import PropTypes from 'react/lib/ReactPropTypes';

class GridHelperDescriptor extends Object3DDescriptor {
  constructor(react3Instance) {
    super(react3Instance);

    this.hasProp('size', {
      type: PropTypes.number,
      update: this.triggerRemount,
      default: 10,
    });

    this.hasProp('step', {
      type: PropTypes.number,
      update: this.triggerRemount,
      default: 1,
    });

    this.hasProp('colorCenterLine', {
      type: PropTypes.number,
      update: (grid, color) => {
        grid.setColors(color, grid.color2);
      },
      updateInitial: true,
      default: 0x444444,
    });

    this.hasProp('colorGrid', {
      type: PropTypes.number,
      update: (grid, color) => {
        grid.setColors(grid.color1, color);
      },
      updateInitial: true,
      default: 0x888888,
    });
  }

  applyInitialProps(threeObject:THREE.Object3D, props) {
    super.applyInitialProps(threeObject, props);
  }

  construct(props) {
    const {
      size,
      step,
      } = props;
    return new THREE.GridHelper(size, step);
  }

  unmount(threeObject) {
    threeObject.geometry.dispose();
    threeObject.material.dispose();

    super.unmount(threeObject);
  }
}

module.exports = GridHelperDescriptor;
