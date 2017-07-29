> [Wiki](Home) » [[Internal Components]] » [[Objects]] » **scene**

# scene

Creates a [THREE.Scene](https://threejs.org/docs/#api/scenes/Scene)

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

### fog
``` one of types [THREE.Fog, THREE.FogExp2] ```: The [fog](https://threejs.org/docs/#api/scenes/Scene.fog) variable for the scene.

Use a [THREE.Fog](https://threejs.org/docs/#api/scenes/Fog) for linear fog, or a [THREE.FogExp2](https://threejs.org/docs/#api/scenes/FogExp2) for exponential fog.

===

|**[View Source](../blob/master/src/lib/descriptors/Object/SceneDescriptor.js)**|
 ---|
