import THREE from 'three';
import THREEElementDescriptor from '../THREEElementDescriptor';

import invariant from 'fbjs/lib/invariant';

import resource from '../decorators/resource';

import PropTypes from 'react/lib/ReactPropTypes';

@resource
class GeometryDescriptorBase extends THREEElementDescriptor {
  constructor(react3RendererInstance) {
    super(react3RendererInstance);

    this.hasProp('dynamic', {
      type: PropTypes.bool,
      update(threeObject, dynamic) {
        threeObject.dynamic = !!dynamic;
      },
      default: false,
    });

    this.hasName();
  }

  setParent(geometry, parentObject3D) {
    invariant(parentObject3D instanceof THREE.Mesh || parentObject3D instanceof THREE.Points, 'Parent is not a mesh');
    invariant(parentObject3D.geometry === undefined, 'Parent already has a geometry');

    super.setParent(geometry, parentObject3D);

    parentObject3D.geometry = geometry;
  }

  applyInitialProps(threeObject, props) {
    // ensure the userData is created
    threeObject.userData = {
      ...threeObject.userData,
    };

    if (props.hasOwnProperty('dynamic')) {
      threeObject.dynamic = !!props.dynamic;
    }

    threeObject.userData._remountGeometry = false;

    super.applyInitialProps(threeObject, props);
  }

  unmount(geometry) {
    const parent = geometry.userData.parentMarkup.threeObject;

    // could either be a resource description or an actual geometry
    if (parent instanceof THREE.Mesh || parent instanceof THREE.Points) {
      if (parent.geometry === geometry) {
        parent.geometry = undefined;
      }
    }

    geometry.dispose();

    super.unmount(geometry);
  }

  highlight(threeObject) {
    const ownerMesh = threeObject.userData.parentMarkup.threeObject;
    threeObject.userData.events.emit('highlight', {
      uuid: threeObject.uuid,
      boundingBoxFunc: () => {
        const boundingBox = new THREE.Box3();

        boundingBox.setFromObject(ownerMesh);

        return [boundingBox];
      },
    });
  }

  hideHighlight(threeObject) {
    threeObject.userData.events.emit('hideHighlight');
  }

  remountInsteadOfUpdating(threeObject) {
    threeObject.userData._remountGeometry = true;
  }

  beginPropertyUpdates(threeObject) {
    super.beginPropertyUpdates(threeObject);

    threeObject.userData._remountGeometry = false;
  }

  completePropertyUpdates(threeObject) {
    super.completePropertyUpdates(threeObject);

    if (threeObject.userData._remountGeometry) {
      threeObject.userData._remountGeometry = false;

      const ownInternal = threeObject.userData.react3internalComponent;

      ownInternal._forceRemountOfComponent = true;
    }
  }
}

export default GeometryDescriptorBase;
