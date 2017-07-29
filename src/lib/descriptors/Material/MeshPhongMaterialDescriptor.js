import * as THREE from 'three';

import PropTypes from 'prop-types';

import MaterialDescriptorBase from './MaterialDescriptorBase';
import propTypeInstanceOf from '../../utils/propTypeInstanceOf';

class MeshPhongMaterialDescriptor extends MaterialDescriptorBase {
  constructor(react3RendererInstance) {
    super(react3RendererInstance);

    this.hasColor();
    this.hasColor('specular', 0x111111);
    this.hasColor('emissive', 0x000000);
    this.hasWireframe();

    this.hasProp('shininess', {
      type: PropTypes.number,
      simple: true,
      default: 30,
    });

    this.hasProp('metal', {
      type: PropTypes.bool,
      update: (threeObject, metal) => {
        threeObject.metal = metal;
        threeObject.needsUpdate = true;
      },
      default: false,
    });

    [
      'lightMapIntensity',
      'aoMapIntensity',
      'emissiveIntensity',
      'bumpScale',
      'displacementScale',
      'reflectivity',
    ]
      .forEach((propName) => {
        this.hasProp(propName, {
          type: PropTypes.number,
          update(threeObject, propValue) {
            threeObject[propName] = propValue;
            threeObject.needsUpdate = true;
          },
          default: 1,
        });
      });

    [
      'displacementBias',
    ]
      .forEach((propName) => {
        this.hasProp(propName, {
          type: PropTypes.number,
          update(threeObject, propValue) {
            threeObject[propName] = propValue;
            threeObject.needsUpdate = true;
          },
          default: 0,
        });
      });

    [
      'refractionRatio',
    ]
      .forEach((propName) => {
        this.hasProp(propName, {
          type: PropTypes.number,
          update(threeObject, propValue) {
            threeObject[propName] = propValue;
            threeObject.needsUpdate = true;
          },
          default: 0.98,
        });
      });

    this.hasProp('normalScale', {
      type: propTypeInstanceOf(THREE.Vector2),
      update(threeObject, normalScale) {
        threeObject.normalScale.copy(normalScale);
        threeObject.needsUpdate = true;
      },
      default: new THREE.Vector2(1, 1),
    });

    this.hasProp('shading', {
      type: PropTypes.oneOf([THREE.FlatShading, THREE.SmoothShading]),
      update(threeObject, shading) {
        threeObject.shading = shading;
        threeObject.needsUpdate = true;
      },
      default: THREE.SmoothShading,
    });

    [
      'skinning',
      'morphTargets',
      'morphNormals',
    ].forEach((propName) => {
      this.hasProp(propName, {
        type: PropTypes.bool,
        update(threeObject, propValue) {
          threeObject[propName] = propValue;
          threeObject.needsUpdate = true;
        },
        default: false,
      });
    });

    this.hasMap();
    this.hasMap('lightMap');
    this.hasMap('aoMap');
    this.hasMap('emissiveMap');
    this.hasMap('bumpMap');
    this.hasMap('normalMap');
    this.hasMap('displacementMap');
    this.hasMap('specularMap');
    this.hasMap('alphaMap');
    this.hasMap('envMap');
  }

  getMaterialDescription(props) {
    const materialDescription = super.getMaterialDescription(props);

    [
      'shininess',

      'lightMapIntensity',
      'aoMapIntensity',
      'emissiveIntensity',
      'bumpScale',
      'displacementScale',
      'reflectivity',

      'displacementBias',

      'refractionRatio',

      'normalScale',

      'shading',

      'skinning',
      'morphTargets',
      'morphNormals',
    ].forEach((propName) => {
      if (props.hasOwnProperty(propName)) {
        materialDescription[propName] = props[propName];
      }
    });

    return materialDescription;
  }

  construct(props) {
    const materialDescription = this.getMaterialDescription(props);

    return new THREE.MeshPhongMaterial(materialDescription);
  }
}

module.exports = MeshPhongMaterialDescriptor;
