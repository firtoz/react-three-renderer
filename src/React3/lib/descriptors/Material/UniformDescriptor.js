import THREE from 'three';

import THREEElementDescriptor from './../THREEElementDescriptor';

import Uniform from '../../Uniform';
import UniformContainer from '../../UniformContainer';
import ResourceReference from '../../Resources/ResourceReference';

import invariant from 'fbjs/lib/invariant';

class UniformDescriptor extends THREEElementDescriptor {
    constructor(react3Instance) {
        super(react3Instance);

        this.registerSimpleProperties([
            'type',
        ]);

        this.propUpdates = {
            ...this.propUpdates,
            'value': this._setValue,
        };
    }

    _setValue(self, newVale) {
        self.setValue(newVale);
    }

    construct() {
        return new Uniform();
    }

    applyInitialProps(self, props) {
        super.applyInitialProps(self, props);

        invariant(props.hasOwnProperty('name'), 'The <uniform/> should have a \'name\' property');
        self.name = props.name;
        self.value = props.value;
    }

    setParent(self:Uniform, parentObject3D) {
        invariant(parentObject3D instanceof UniformContainer, 'Parent is not a Uniform Container (<uniforms/>)');

        const name = self.name;

        invariant(parentObject3D[name] === undefined, 'Parent already has uniforms');

        super.setParent(self, parentObject3D);

        parentObject3D.uniforms[name] = {
            type:  self.type,
            value: self.value,
        };

        self.userData._onValueChanged = (newValue) => {
            parentObject3D.uniforms[name].value = newValue;
        };

        self.userData.events.on('valueChanged', self.userData._onValueChanged);
    }

    addChildren(self, children) {
        invariant(children.filter(this._invalidChild).length === 0, 'Mesh children can only be materials or geometries!');
    }

    invalidChildInternal(child) {
        const invalid = !(child instanceof THREE.Texture || child instanceof ResourceReference );

        if (invalid) {
            debugger;
        }

        return invalid;
    }

    _invalidChild = child => {
        return this.invalidChildInternal(child);
    };

    unmount() {
        self.userData.events.removeListener('valueChanged', self.userData._onValueChanged);

        delete self.userData._onValueChanged;

        super.unmount(self);
    }

    highlight(threeObject) {
        const parent = threeObject.userData.parentMarkup.threeObject;
        parent.userData._descriptor.highlight(parent);
    }

    getBoundingBoxes(threeObject) {
        const parent = threeObject.userData.parentMarkup.threeObject;
        return parent.userData._descriptor.getBoundingBoxes(parent);
    }

    hideHighlight(threeObject) {
        const parent = threeObject.userData.parentMarkup.threeObject;
        parent.userData._descriptor.hideHighlight(parent);
    }
}

export default UniformDescriptor;
