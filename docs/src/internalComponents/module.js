import DocInfo from '../DocInfo';

class Module extends DocInfo {
  getIntro() {
    return '**experimental** Can inject a system that needs to perform actions every frame, ' +
      'e.g. input or physics.';
  }

  getDescription() {
    return ``;
  }

  getAttributesText() {
    return {
      descriptor: `A class that extends ReactThreeRenderer.Module.

It must expose an \`update()\` function which will be called every frame.`,
    };
  }
}

module.exports = Module;
