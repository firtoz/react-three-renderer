> [Wiki](Home) » [[Internal Components]] » [[Objects]] » [[Cameras]] » **perspectiveCamera**

# perspectiveCamera

Creates a [THREE.PerspectiveCamera](http://threejs.org/docs/#Reference/Cameras/PerspectiveCamera)

Camera with perspective projection.

## Attributes

### name
``` string ```: The [name](http://threejs.org/docs/#Reference/Core/Object3D.name) property of the camera.

This gets used by [&lt;react3/&gt;](react3), [&lt;viewport/&gt;](viewport), or [&lt;cameraHelper&gt;](cameraHelper).

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

### fov
``` number ```: Camera frustum vertical field of view, from bottom to top of view, in degrees.

### aspect
``` number ```: Camera frustum aspect ratio, usually window width divided by window height.

### near
``` number ```: Camera frustum near plane.

### far
``` number ```: Camera frustum far plane.

===

|**[View Source](../blob/master/src/lib/descriptors/Object/Camera/PerspectiveCameraDescriptor.js)**|
 ---|
