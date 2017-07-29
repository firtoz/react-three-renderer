import DocInfo from '../DocInfo';

class texture extends DocInfo {
  getIntro() {
    return 'Creates a [THREE.Texture](https://threejs.org/docs/#api/textures/Texture)';
  }

  getDescription() {
    return '';
  }

  getAttributesText() {
    return {
      repeat: 'Sets the [repeat property of the ' +
      'Texture](https://threejs.org/docs/#api/textures/Texture.repeat).\n\n' +
      'Default: `(1, 1)`.',
      offset: 'Sets the [offset property of the ' +
      'Texture](https://threejs.org/docs/#api/textures/Texture.offset).\n\n' +
      'Default: `(0, 0)`.',
      wrapS: '',
      wrapT: '',
      anisotropy: '',
      url: 'The URL to load the texture from.\n\n' +
      'Currently textures can be loaded from URLs only.\n\n' +
      'Used as the first parameter for ' +
      '[TextureLoader.load](https://threejs.org/docs/#api/loaders/TextureLoader.load)',
      resourceId: '',
      crossOrigin: 'Sets the [crossOrigin property of the ' +
      'TextureLoader](https://threejs.org/docs/#api/loaders/TextureLoader.crossOrigin).',
      onLoad: 'Callback to be called when the texture was loaded.',
      onProgress: 'Callback to be called while the texture is loading.',
      onError: 'Callback to be called when the texture was not loaded.',
    };
  }

  getFooter() {
    return `If you would like to assign this texture to a material, 
you can do this by declaring the texture within:

${'```'}jsx
<...material>
  <texture url={...} .../>
</...material>
${'```'}`;
  }
}

module.exports = texture;
