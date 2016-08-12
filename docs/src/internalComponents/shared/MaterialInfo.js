import DocInfo from '../../DocInfo';

class MaterialInfo extends DocInfo {
  getDescription() {
    return '';
  }

  getFooter() {
    return `If you would like to set a texture as a map for this material, 
you can do this by declaring the texture within:

${'```'}jsx
<...material>
    <texture url={...} .../>
</...material>
${'```'}`;
  }

  getAttributesText() {
    return {
      slot: `This decides which property of the mesh the material should be assigned to.

Defaults to \`material\`. Other example values:
- customDepthMaterial
- customDistanceMaterial
- and so on`,
      color: 'Geometry color',
    };
  }
}

module.exports = MaterialInfo;
