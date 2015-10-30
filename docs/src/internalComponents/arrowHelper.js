import object3D from './object3D';

class arrowHelper extends object3D {
  getIntro() {
    return 'Creates a [THREE.ArrowHelper](http://threejs.org/docs/#Reference/Extras.Helpers/ArrowHelper)';
  }

  getDescription() {
    return ``;
  }

  getAttributesText() {
    return {
      ...super.getAttributesText(),
      dir: '',
      origin: '',
      length: '',
      color: '',
      headLength: '',
      headWidth: '',
    };
  }
}

export default arrowHelper;
