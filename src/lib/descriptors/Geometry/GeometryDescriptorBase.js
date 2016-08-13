import THREE from 'three';

import invariant from 'fbjs/lib/invariant';
import PropTypes from 'react/lib/ReactPropTypes';

import THREEElementDescriptor from '../THREEElementDescriptor';
import resource from '../decorators/resource';
import propTypeInstanceOf from '../../utils/propTypeInstanceOf';

@resource
class GeometryDescriptorBase extends THREEElementDescriptor {
  constructor(react3RendererInstance) {
    super(react3RendererInstance);

    this.hasName();

    this.hasProp('vertices', {
      type: PropTypes.arrayOf(propTypeInstanceOf(THREE.Vector3)),
      update(threeObject, vertices, hasProp) {
        if (hasProp) {
          if (threeObject.vertices !== vertices) {
            threeObject.vertices = vertices;

            threeObject.verticesNeedUpdate = true;
          }
        }
      },
      updateInitial: true,
      default: [],
    });

    this.hasProp('colors', {
      type: PropTypes.arrayOf(propTypeInstanceOf(THREE.Color)),
      update(threeObject, colors, hasProp) {
        if (hasProp) {
          if (threeObject.colors !== colors) {
            threeObject.colors = colors;

            threeObject.colorsNeedUpdate = true;
          }
        }
      },
      updateInitial: true,
      default: [],
    });

    this.hasProp('faceVertexUvs', {
      type: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.arrayOf(THREE.Vector2))),
      update(threeObject, faceVertexUvs, hasProp) {
        if (hasProp) {
          if (threeObject.faceVertexUvs !== faceVertexUvs) {
            threeObject.faceVertexUvs = faceVertexUvs;

            threeObject.uvsNeedUpdate = true;
          }
        }
      },
      updateInitial: true,
      default: [],
    });

    this.hasProp('faces', {
      type: PropTypes.arrayOf(propTypeInstanceOf(THREE.Face3)),
      update(threeObject, faces, hasProp) {
        if (hasProp) {
          if (threeObject.faces !== faces) {
            threeObject.faces = faces;

            threeObject.verticesNeedUpdate = true;
            threeObject.elementsNeedUpdate = true;
          }
        }
      },
      updateInitial: true,
      default: [],
    });

    this.hasProp('dynamic', {
      type: PropTypes.bool,
      update(threeObject, dynamic) {
        threeObject.dynamic = !!dynamic;
      },
      default: false,
    });
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
