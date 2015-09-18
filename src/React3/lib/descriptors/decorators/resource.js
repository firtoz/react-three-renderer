import ResourceContainer from '../../Resources/Container';
import invariant from 'fbjs/lib/invariant';

import THREE from 'three';

function resource(descriptor) {
  class ResourceDescriptor extends descriptor {
    static displayName = `${descriptor.displayName || descriptor.name}`;

    applyInitialProps(self, props) {
      super.applyInitialProps(self, props);

      if (props.hasOwnProperty('resourceId')) {
        self.userData._resourceId = props.resourceId;
        self.userData._references = [];
      }
    }

    setParent(self, parentObject3D) {
      if (parentObject3D instanceof ResourceContainer) {
        invariant(!!self.userData._resourceId, 'All resources inside <resources> should have the "resourceId" property.');
      } else {
        super.setParent(self, parentObject3D);
      }
    }

    highlight(threeObject) {
      if (!!threeObject.userData._resourceId) {
        threeObject.userData.events.emit('highlight', {
          uuid: threeObject.uuid,
          boundingBoxFunc: () => {
            return threeObject.userData._references.map(objectWithReference => {
              const boundingBox = new THREE.Box3();

              boundingBox.setFromObject(objectWithReference);

              return boundingBox;
            });
          },
        });
      } else {
        return super.highlight(threeObject);
      }
    }

    hideHighlight(threeObject) {
      if (!!threeObject.userData._resourceId) {
        threeObject.userData.events.emit('hideHighlight');
      } else {
        return super.hideHighlight(threeObject);
      }
    }
  }

  return ResourceDescriptor;
}

export default resource;
