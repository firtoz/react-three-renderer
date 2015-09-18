import ResourceContainer from '../../Resources/Container';

function resource(descriptor) {
  class ResourceDescriptor extends descriptor {
    static displayName = `${descriptor.displayName || descriptor.name}`;

    applyInitialProps(self, props) {
      super.applyInitialProps(self, props);

      if (props.hasOwnProperty('resourceId')) {
        self.userData._resourceId = props.resourceId;
      }
    }

    setParent(self, parentObject3D) {
      if (parentObject3D instanceof ResourceContainer) {
        invariant(!!self.userData._resourceId, 'All resources inside <resources> should have the "resourceId" property.');
      } else {
        super.setParent(self, parentObject3D);
      }
    }

    highlight(self) {
      // disable for now
    }

    hideHighlight(self) {
      // disable for now
    }
  }

  return ResourceDescriptor;
}

export default resource;
