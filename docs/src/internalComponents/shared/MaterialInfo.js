import DocInfo from '../../DocInfo';

class MaterialInfo extends DocInfo {
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
