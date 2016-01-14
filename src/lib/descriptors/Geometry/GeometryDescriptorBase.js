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
      'default': false,
    });

    this.hasName();
  }

  setParent(geometry, parentObject3D) {
    invariant(parentObject3D instanceof THREE.Mesh
      || parentObject3D instanceof THREE.Points
      || parentObject3D instanceof THREE.Line, 'Parent is not a mesh');
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

    threeObject.userData._remountAfterPropsUpdate = false;

    super.applyInitialProps(threeObject, props);
  }

  unmount(geometry) {
    const parent = geometry.userData.markup.parentMarkup.threeObject;

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
    const ownerMesh = threeObject.userData.markup.parentMarkup.threeObject;
    threeObject.userData.events.emit('highlight', {
      uuid: threeObject.uuid,
      boundingBoxFunc: () => {
        const boundingBox = new THREE.Box3();

        boundingBox.setFromObject(ownerMesh);

        return [boundingBox];
      },
    });
  }

  getBoundingBoxes(threeObject) {
    const ownerMesh = threeObject.userData.markup.parentMarkup.threeObject;

    const boundingBox = new THREE.Box3();

    boundingBox.setFromObject(ownerMesh);

    return [boundingBox];
  }

  hideHighlight(threeObject) {
    threeObject.userData.events.emit('hideHighlight');
  }
}

module.exports = GeometryDescriptorBase;
