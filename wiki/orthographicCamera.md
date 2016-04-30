> [Wiki](Home) » [[Internal Components]] » [[Objects]] » [[Cameras]] » **orthographicCamera**

# orthographicCamera

Creates a [THREE.OrthographicCamera](http://threejs.org/docs/#Reference/Cameras/OrthographicCamera)

## Attributes
### left
``` number ``` *``` required ```*

### right
``` number ``` *``` required ```*

### top
``` number ``` *``` required ```*

### bottom
``` number ``` *``` required ```*

### name
``` string ```: The [name](http://threejs.org/docs/#Reference/Core/Object3D.name) property of the camera.

This gets used by [&lt;react3/&gt;](react3), [&lt;viewport/&gt;](viewport), or [&lt;cameraHelper&gt;](cameraHelper).

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

### near
``` number ```

### far
``` number ```

===

|**[View Source](../blob/master/src/lib/descriptors/Object/Camera/OrthographicCameraDescriptor.js)**|
 ---|
