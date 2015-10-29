import ResourceContainer from '../../Resources/ResourceContainer';
import invariant from 'fbjs/lib/invariant';

import THREEElementDescriptor from '../THREEElementDescriptor';

import PropTypes from 'react/lib/ReactPropTypes';

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

    // used for docs
    isResource = true;

    constructor(react3RendererInstance) {
      super(react3RendererInstance);

      this.hasProp('resourceId', {
        type: PropTypes.string,
        updateInitial: true,
        initialOnly: true,
        update: (threeObject, resourceId, hasProp) => {
          if (hasProp) {
            threeObject.userData._resourceId = resourceId;

            if (!threeObject.userData._hasReferences) {
              threeObject.userData._hasReferences = true;
              threeObject.userData._references = [];
            }
          }
        },
        default: '',
      });
    }

    applyInitialProps(threeObject, props) {
      super.applyInitialProps(threeObject, props);
    }

    setParent(threeObject, parentObject3D) {
      if (parentObject3D instanceof ResourceContainer) {
        if (process.env.NODE_ENV !== 'production') {
          invariant(!!threeObject.userData._resourceId, 'All resources inside <resources> should have the "resourceId" property.');
        } else {
          invariant(!!threeObject.userData._resourceId);
        }

        // still let it be mounted to root
        THREEElementDescriptor.prototype.setParent.call(this, threeObject, parentObject3D);
      } else {
        super.setParent(threeObject, parentObject3D);
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
                invariant(boxesForReference.length > 0, 'No boxes found for resource.');
              } else {
                invariant(boxesForReference.length > 0);
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
