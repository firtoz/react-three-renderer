import object3D from './object3D';

class arrowHelper extends object3D {
  getIntro() {
    return 'Creates a [THREE.ArrowHelper](http://threejs.org/docs/#Reference/Extras.Helpers/ArrowHelper)';
  }

  getDescription() {
    return `An 3D arrow Object.

This creates an arrow starting in origin in the direction dir for a certain length. It is also possible to change color.`;
  }

  getAttributesText() {
    return {
      ...super.getAttributesText(),
      dir: 'direction from origin.\n\n' +
      'Must be a unit vector.',
      origin: 'The start position of the arrow.',
      length: 'The length of the arrow.',
      color: 'hexadecimal value to define color e.g.: ` 0xffff00 `',
      headLength: 'The length of the head of the arrow',
      headWidth: 'The length of the width of the arrow',
    };
  }
}

export default arrowHelper;
