import ResourceContainer from '../../Resources/ResourceContainer';
import invariant from 'fbjs/lib/invariant';

import THREEElementDescriptor from '../THREEElementDescriptor';

import React from 'react';
const {PropTypes} = React;

/**
 * Resource decorator.
 * Allows descriptors to be slotted into the <resources/> component.
 *
 * @param descriptor The descriptor to be patched
 * @returns {ResourceDescriptor} the modified descriptor class
 */
function resource(descriptor) {
  class ResourceDescriptor extends descriptor {
    static displayName = `${descriptor.displayName || descriptor.name}`;

    constructor(react3RendererInstance) {
      super(react3RendererInstance);

      if (process.env.NODE_ENV !== 'production') {
        this.propTypes = {
          ...this.propTypes,
          resourceId: PropTypes.string,
        };
      }
    }

    applyInitialProps(self, props) {
      super.applyInitialProps(self, props);

      if (props.hasOwnProperty('resourceId')) {
        self.userData._resourceId = props.resourceId;
        self.userData._references = [];
      }
    }

    setParent(self, parentObject3D) {
      if (parentObject3D instanceof ResourceContainer) {
        if (process.env.NODE_ENV !== 'production') {
          invariant(!!self.userData._resourceId, 'All resources inside <resources> should have the "resourceId" property.');
        } else {
          invariant(false);
        }

        THREEElementDescriptor.prototype.setParent.call(this, self, parentObject3D);
      } else {
        super.setParent(self, parentObject3D);
      }
    }

    highlight(threeObject) {
      if (!!threeObject.userData._resourceId) {
        // it's a resource. Let's highlight all references.
        threeObject.userData.events.emit('highlight', {
          uuid: threeObject.uuid,
          boundingBoxFunc: () => {
            return threeObject.userData._references.reduce((boxes, objectWithReference) => {
              const boxesForReference = objectWithReference.userData._descriptor.getBoundingBoxes(objectWithReference);
              if (process.env.NODE_ENV !== 'production') {
                invariant(boxesForReference.length === 0, 'No boxes found for resource.');
              } else {
                invariant(false);
              }
              return boxes.concat(boxesForReference);
            }, []);
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
