import DocInfo from '../DocInfo';

class geometryResource extends DocInfo {
  getIntro() {
    return 'Reference to a geometry resource.';
  }

  getDescription() {
    return ``;
  }

  getAttributesText() {
    return {
      resourceId: 'The resourceId for the [geometry](Geometries).',
    };
  }
}

export default geometryResource;
