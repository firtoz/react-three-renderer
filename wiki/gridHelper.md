> [Wiki](Home) » [[Internal Components]] » [[Objects]] » [[Helpers]] » **gridHelper**

# gridHelper

Creates a [THREE.GridHelper](https://threejs.org/docs/index.html#Reference/Extras.Helpers/GridHelper)

## Attributes

### size
``` number ``` *``` required ```*: The size of the grid

**Default**: `1`

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

If this property is set, [`THREE.Object3D#lookAt`](http://threejs.org/docs/#Reference/Core/Object3D.lookAt) will be called every time the value changes or the position of the object changes.

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

### step
``` number ```: The size of the step between 2 lines

**Default**: `1`

### colorCenterLine
``` one of types [THREE.Color, number, string] ```: The color of the centerline.

**Default**: `0x444444` [[images/0x444444.png]]

### colorGrid
``` one of types [THREE.Color, number, string] ```: The color of the lines of the grid.

**Default**: `0x888888` [[images/0x888888.png]]

===

|**[View Source](../blob/master/src/lib/descriptors/Object/Helper/GridHelperDescriptor.js)**|
 ---|
