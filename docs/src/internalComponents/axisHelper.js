import object3D from './object3D';

class axisHelper extends object3D {
  getIntro() {
    return 'Creates a [THREE.AxisHelper](http://threejs.org/docs/#Reference/Extras.Helpers/AxisHelper)';
  }

  getDescription() {
    return ``;
  }

  getAttributesText() {
    return {
      ...super.getAttributesText(),
      size: '',
    };
  }
}

export default axisHelper;
