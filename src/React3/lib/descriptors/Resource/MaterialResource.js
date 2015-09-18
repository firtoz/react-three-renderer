import Resource from 'Resource';
import ResourceContainer from './../../Resources/ResourceReference';

class MaterialResource extends Resource {
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

    super.setParent(self, parentObject);
  }

  resourceUpdated(self) {

  }
}

export default MaterialResource;
