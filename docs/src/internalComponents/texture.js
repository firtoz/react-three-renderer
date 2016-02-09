import DocInfo from '../DocInfo';

class texture extends DocInfo {
  getIntro() {
    return 'Creates a [THREE.Texture](http://threejs.org/docs/#Reference/Textures/Texture)';
  }

  getDescription() {
    return ``;
  }

  getAttributesText() {
    return {
      repeat: 'Sets the [repeat property of the ' +
      'Texture](http://threejs.org/docs/#Reference/Textures/Texture.repeat).\n\n' +
      'Default: `(1, 1)`.',
      offset: 'Sets the [offset property of the ' +
      'Texture](http://threejs.org/docs/#Reference/Textures/Texture.offset).\n\n' +
      'Default: `(0, 0)`.',
      wrapS: '',
      wrapT: '',
      anisotropy: '',
      url: '',
      resourceId: '',
      crossOrigin: 'Sets the [crossOrigin property of the ' +
      'TextureLoader](http://threejs.org/docs/#Reference/Loaders/TextureLoader.crossOrigin).',
      onLoad: 'Callback to be called when the texture was loaded.',
      onProgress: 'Callback to be called while the texture is loading.',
      onError: 'Callback to be called when the texture was not loaded.',
    };
  }
}

module.exports = texture;
