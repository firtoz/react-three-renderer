> [Wiki](Home) » [[Internal Components]] » [[Objects]] » [[Helpers]] » **arrowHelper**

# arrowHelper

Creates a [THREE.ArrowHelper](https://threejs.org/docs/#api/helpers/ArrowHelper)

An 3D arrow Object.

This creates an arrow starting in origin in the direction dir for a certain length.
 It is also possible to change color.

## Attributes

### name
``` string ```: Name for the 3D Object.

**Default**: `''`

### position
``` THREE.Vector3 ```: The position of the 3D object relative to the parent.

**Default**: `new THREE.Vector3()`

### rotation
``` THREE.Euler ```: The rotation of the 3D object relative to the parent, in euler form.

**Default**: `new THREE.Euler()`

### quaternion
``` THREE.Quaternion ```: The rotation of the 3D object relative to the parent, in quaternion form.

**Default**: `new THREE.Quaternion()`

### scale
``` THREE.Vector3 ```: The scale of the 3D object relative to the parent.

**Default**: `new THREE.Vector3(1, 1, 1)`

### lookAt
``` THREE.Vector3 ```: The target position for the 3D object to look at.

If this property is set, [`THREE.Object3D#lookAt`](https://threejs.org/docs/#api/core/Object3D.lookAt) will be called every time the value changes or the position of the object changes.

### matrix
``` THREE.Matrix4 ```

**Default**: `new THREE.Matrix4()`

### frustumCulled
``` bool ```: Whether the 3D object will be culled by the camera frustum or not.

**Default**: `true`

### visible
``` bool ```: Whether the 3D object will be visible or not.

**Default**: `true`

### renderOrder
``` number ```: The render order override for the 3D object.

### castShadow
``` bool ```: Whether the 3D object will cast shadows or not.

**Default**: `false`

### receiveShadow
``` bool ```: Whether the 3D object will receive shadows or not.
> **WARNING**: This will trigger a refresh for any materials the object is using.

> **WARNING**: If you use the same material for multiple objects and some of them receive shadows and some do not, it may cause adverse side effects. In that case, it is recommended to use different materials.

**Default**: `false`

### origin
``` THREE.Vector3 ``` *``` required ```*: The start position of the arrow.

**Default**: `new THREE.Vector3()`

### dir
``` THREE.Vector3 ``` *``` required ```*: direction from origin.

Must be a unit vector.

**Default**: `new THREE.Vector3(0, 0, 1)`

### color
``` one of types [THREE.Color, number, string] ```: The color that will be used for the arrow materials.

**Default**: `0xffff00` [[images/0xffff00.png]]

### length
``` number ```: The length of the arrow.

**Default**: `1`

### headLength
``` number ```: The length of the head of the arrow.

**Default**: `0.2 * length`

### headWidth
``` number ```: The length of the width of the arrow.

**Default**: `0.2 * headLength`

===

|**[View Source](../blob/master/src/lib/descriptors/Object/Helper/ArrowHelperDescriptor.js)**|
 ---|
