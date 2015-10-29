import DocInfo from '../DocInfo';

class module extends DocInfo {
  getIntro() {
    return '**experimental** Can inject a system that needs to perform actions every frame, e.g. input or physics.';
  }

  getDescription() {
    return ``;
  }

  getAttributesText() {
    return {
      descriptor: 'A class that extends ReactThreeRenderer.Module',
    };
  }
}

export default module;
