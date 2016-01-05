import object3D from './object3D';

class axisHelper extends object3D {
  getIntro() {
    return 'Creates a [THREE.AxisHelper](http://threejs.org/docs/#Reference/Extras.Helpers/AxisHelper)';
  }

  getDescription() {
    return `An axis object to visualize the the 3 axes in a simple way.

The X axis is red. The Y axis is green. The Z axis is blue.`;
  }

  getAttributesText() {
    return {
      ...super.getAttributesText(),
      size: 'Define the size of the line representing the axes.',
    };
  }
}

module.exports = axisHelper;
