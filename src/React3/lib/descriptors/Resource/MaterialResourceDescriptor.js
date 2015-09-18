import ResourceDescriptorBase from './ResourceDescriptorBase';
import ResourceContainer from './../../Resources/ResourceReference';
import THREE from 'three';

import invariant from 'fbjs/lib/invariant';

class MaterialResourceDescriptor extends ResourceDescriptorBase {
  construct(props) {
    invariant(props.hasOwnProperty('resourceId'), 'A resource type must have a property named "resourceId"!');

    return new ResourceContainer(props.resourceId);
  }

  applyInitialProps(self, props) {
    super.applyInitialProps(self, props);

    if (props.hasOwnProperty('slot')) {
      self.userData._materialSlot = props.slot;
    } else {
      self.userData._materialSlot = 'material';
    }
  }

  setParent(self, parentObject3D) {
    invariant(parentObject3D instanceof THREE.Mesh || parentObject3D instanceof THREE.PointCloud, 'Parent is not a mesh');
    invariant(parentObject3D[self.userData._materialSlot] === undefined, 'Parent already has a ' + self.userData._materialSlot + ' defined');

    super.setParent(self, parentObject3D);
  }

  resourceUpdated(self, newResource, oldResource) {
    const parentObject = self.userData.parentMarkup && self.userData.parentMarkup.threeObject || undefined;

    if (parentObject) {
      const materialSlot = self.userData._materialSlot;
      if (newResource === null) {
        if (!parentObject.userData[`_nullMaterial_${materialSlot}`]) {
          parentObject.userData[`_nullMaterial_${materialSlot}`] = true;
          parentObject[materialSlot] = new THREE.MeshBasicMaterial({
            color: 0xffff00,
          });
        }
      } else {
        if (parentObject.userData[`_nullMaterial_${materialSlot}`]) {
          delete parentObject.userData[`_nullMaterial_${materialSlot}`];
          parentObject[materialSlot].dispose();
        }

        parentObject[materialSlot] = newResource;

        newResource.userData._references.push(parentObject);
      }

      if (oldResource) {
        const removalIndex = newResource.userData._references.indexOf(parentObject);

        invariant(removalIndex !== -1, 'Bad reference count for resource');

        newResource.userData._references.splice(removalIndex, 1);
      }
    }
  }
}

export default MaterialResourceDescriptor;
