> [Wiki](Home) » [[Internal Components]] » [[Objects]] » [[Lights]] » **directionalLight**

# directionalLight

Creates a [THREE.DirectionalLight](http://threejs.org/docs/#Reference/Lights/DirectionalLight)

## Attributes
### name
``` string ```: Name for the 3D Object.

### scale
``` THREE.Vector3 ```: The scale of the 3D object relative to the parent.

### frustumCulled
``` bool ```: Whether the 3D object will be culled by the camera frustum or not.

### visible
``` bool ```: Whether the 3D object will be visible or not.

### renderOrder
``` number ```: The render order override for the 3D object.

### castShadow
``` bool ```: Whether the light will cast shadows or not.

**WARNING**: changing this property after the scene has been constructed is expensive! See [updatesRefreshAllMaterials](#updatesRefreshAllMaterials).

### receiveShadow
``` bool ```: Whether the 3D object will receive shadows or not.
> **WARNING**: This will trigger a refresh for any materials the object is using.

> **WARNING**: If you use the same material for multiple objects and some of them receive shadows and some do not, it may cause adverse side effects. In that case, it is recommended to use different materials.

### updatesRefreshAllMaterials
``` bool ```: Acknowledges and silences the remount warning message.

It is expensive to add or remove lights from the scene, because all materials need to be refreshed to take the new number of lights into account.
Additionally, toggling `castShadow` on a light will trigger a material refresh as well.

In the development environment, a warning message is logged if this happens.

It is generally recommended not to add or remove lights after a scene is constructed, but if you know what you are doing you can ignore the warnings by setting the  'updatesRefreshAllMaterials' attribute to true.

Example warning message:
> `<directionalLight/>` has been updated which triggered a refresh of all materials.
>  This is a potentially expensive operation.
>  This can happen when you add or remove a light, or add or remove any component
>  before any lights without keys e.g.
> ```html
>  <object3d>
>    {/* new or removed component here */}
>    <ambientLight/>
>  </object3d>
>  ```
>  or update some properties of lights.
>
>  If you would like to add components you should either add the components
>  after the lights (recommended), e.g.
> ```html
>  <object3d>
>    <ambientLight/>
>    {/* new or removed component here */}
>  </object3d>
> ```
> or add a 'key' property to the lights e.g.
> ```html
>  <object3d>
>    {/* new or removed component here */}
>    <ambientLight key="light"/>
>  </object3d>
> ```
>  If you have modified a light's properties e.g. toggled castShadow,
 the materials need to be rebuilt as well.
>  To acknowledge and remove this message, please add the
 '`updatesRefreshAllMaterials`' property.
>    to `<directionalLight/>` inside the `render()` of
 the component.
>  For more information, visit
 [https://github.com/mrdoob/threejs/wiki/Updates/](https://github.com/mrdoob/threejs/wiki/Updates/).
      

### shadowBias
``` number ```

### shadowDarkness
``` number ```

### shadowMapWidth
``` number ```

### shadowMapHeight
``` number ```

### shadowCameraNear
``` number ```

### shadowCameraFar
``` number ```

### intensity
``` number ```

### shadowCameraLeft
``` number ```

### shadowCameraBottom
``` number ```

### shadowCameraRight
``` number ```

### shadowCameraTop
``` number ```

### color
``` one of types [THREE.Color, number, string] ```: The light color.

### position
``` THREE.Vector3 ```: The position of the 3D object relative to the parent.

Additionally, updating this property will trigger an update for the light target position.

### rotation
``` THREE.Euler ```: The rotation of the 3D object relative to the parent, in euler form.

Additionally, updating this property will trigger an update for the light target position.

### quaternion
``` THREE.Quaternion ```: The rotation of the 3D object relative to the parent, in quaternion form.

Additionally, updating this property will trigger an update for the light target position.

### lookAt
``` THREE.Vector3 ```: The target position for the 3D object to look at.

This calls [THREE.Object3D#lookAt](http://threejs.org/docs/#Reference/Core/Object3D.lookAt) every time the value changes or the position of the object changes.

Additionally, updating this property will trigger an update for the light target position.

===

|**[View Source](../blob/master/src/lib/descriptors/Light/DirectionalLightDescriptor.js)**|
 ---|
