import DocInfo from '../DocInfo';

class shapeGeometryResource extends DocInfo {
  getIntro() {
    return 'Creates a geometry using a [shape resource](shape)';
  }

  getDescription() {
    return `Have the [resourceId](#resourceid) property point to a [shape resource](shape),
    then this component will create a geometry using that shape.`;
  }

  getAttributesText() {
    return {
      resourceId: '',
      type: 'The shape type.',
      divisions: 'Number of divisions for the shape.',
    };
  }
}

module.exports = shapeGeometryResource;
