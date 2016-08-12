import DocInfo from '../DocInfo';

class textureResource extends DocInfo {
  getIntro() {
    return 'Reference to a texture resource';
  }

  getDescription() {
    return '';
  }

  getAttributesText() {
    return {
      resourceId: '',
    };
  }

  getFooter() {
    return `If you would like to assign this texture resource to a material, 
you can do this by declaring the texture within:

${'```'}jsx
<...material>
  <texture url={...} .../>
</...material>
${'```'}`;
  }
}

module.exports = textureResource;
