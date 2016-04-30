> [Wiki](Home) » [[Internal Components]] » [[Objects]] » [[Helpers]] » **arrowHelper**

# arrowHelper

Creates a [THREE.ArrowHelper](http://threejs.org/docs/#Reference/Extras.Helpers/ArrowHelper)

An 3D arrow Object.

This creates an arrow starting in origin in the direction dir for a certain length.
 It is also possible to change color.

## Attributes
### name
``` string ```: Name for the 3D Object.

### position
``` THREE.Vector3 ```: The position of the 3D object relative to the parent.

### rotation
``` THREE.Euler ```: The rotation of the 3D object relative to the parent, in euler form.

### quaternion
``` THREE.Quaternion ```: The rotation of the 3D object relative to the parent, in quaternion form.

### scale
``` THREE.Vector3 ```: The scale of the 3D object relative to the parent.

### lookAt
``` THREE.Vector3 ```: The target position for the 3D object to look at.

This calls [THREE.Object3D#lookAt](http://threejs.org/docs/#Reference/Core/Object3D.lookAt) every time the value changes or the position of the object changes.

### frustumCulled
``` bool ```: Whether the 3D object will be culled by the camera frustum or not.

### visible
``` bool ```: Whether the 3D object will be visible or not.

### renderOrder
``` number ```: The render order override for the 3D object.

### castShadow
``` bool ```: Whether the 3D object will cast shadows or not.

### receiveShadow
``` bool ```: Whether the 3D object will receive shadows or not.
> **WARNING**: This will trigger a refresh for any materials the object is using.

> **WARNING**: If you use the same material for multiple objects and some of them receive shadows and some do not, it may cause adverse side effects. In that case, it is recommended to use different materials.

### dir
``` THREE.Vector3 ```: direction from origin.

Must be a unit vector.

### origin
``` THREE.Vector3 ```: The start position of the arrow.

### length
``` number ```: The length of the arrow.

### color
``` number ```: hexadecimal value to define color e.g.: ` 0xffff00 `

### headLength
``` number ```: The length of the head of the arrow

### headWidth
``` number ```: The length of the width of the arrow

===

|**[View Source](../blob/master/src/lib/descriptors/Object/Helper/ArrowHelperDescriptor.js)**|
 ---|
