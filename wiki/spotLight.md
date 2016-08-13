> [Wiki](Home) » [[Internal Components]] » [[Objects]] » [[Lights]] » **spotLight**

# spotLight

Creates a [THREE.SpotLight](http://threejs.org/docs/#Reference/Lights/SpotLight)

## Attributes

### name
``` string ```: Name for the 3D Object.

**Default**: `''`

### scale
``` THREE.Vector3 ```: The scale of the 3D object relative to the parent.

**Default**: `new THREE.Vector3(1, 1, 1)`

### frustumCulled
``` bool ```: Whether the 3D object will be culled by the camera frustum or not.

**Default**: `true`

### visible
``` bool ```: Whether the 3D object will be visible or not.

**Default**: `true`

### renderOrder
``` number ```: The render order override for the 3D object.

### castShadow
``` bool ```: Whether the light will cast shadows or not.

**WARNING**: changing this property after the scene has been constructed is expensive! See [updatesRefreshAllMaterials](#updatesRefreshAllMaterials).

**Default**: `false`

### updatesRefreshAllMaterials
``` bool ```: Acknowledges and silences the remount warning message.

It is expensive to add or remove lights from the scene, because all materials need to be refreshed to take the new number of lights into account.
Additionally, toggling `castShadow` on a light will trigger a material refresh as well.

In the development environment, a warning message is logged if this happens.

It is generally recommended not to add or remove lights after a scene is constructed, but if you know what you are doing you can ignore the warnings by setting the  'updatesRefreshAllMaterials' attribute to true.

Example warning message:
> `<spotLight/>` has been updated which triggered a refresh of all materials.
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
>    to `<spotLight/>` inside the `render()` of
 the component.
>  For more information, visit
 [https://github.com/mrdoob/three.js/wiki/updates](https://github.com/mrdoob/three.js/wiki/updates).
      

**Default**: `false`

### shadowBias
``` number ```

**Default**: `0`

### shadowDarkness
``` number ```

**Default**: `0.5`

### shadowMapWidth
``` number ```

**Default**: `512`

### shadowMapHeight
``` number ```

**Default**: `512`

### shadowCameraNear
``` number ```

**Default**: `0.5`

### shadowCameraFar
``` number ```

**Default**: `500`

### intensity
``` number ```

**Default**: `1`

### distance
``` number ```

**Default**: `0`

### angle
``` number ```

**Default**: `1.0471975511965976`

### exponent
``` number ```

**Default**: `10`

### decay
``` number ```

**Default**: `1`

### penumbra
``` number ```

**Default**: `0`

### shadowCameraFov
``` number ```

**Default**: `50`

### color
``` one of types [THREE.Color, number, string] ```: The light color.

**Default**: `0xffffff` [[images/0xffffff.png]]

### position
``` THREE.Vector3 ```: The position of the 3D object relative to the parent.

Additionally, updating this property will trigger an update for the light target position.

**Default**: `new THREE.Vector3()`

### rotation
``` THREE.Euler ```: The rotation of the 3D object relative to the parent, in euler form.

Additionally, updating this property will trigger an update for the light target position.

**Default**: `new THREE.Euler()`

### quaternion
``` THREE.Quaternion ```: The rotation of the 3D object relative to the parent, in quaternion form.

Additionally, updating this property will trigger an update for the light target position.

**Default**: `new THREE.Quaternion()`

### lookAt
``` THREE.Vector3 ```: The target position for the 3D object to look at.

If this property is set, [`THREE.Object3D#lookAt`](http://threejs.org/docs/#Reference/Core/Object3D.lookAt) will be called every time the value changes or the position of the object changes.

Additionally, updating this property will trigger an update for the light target position.

===

|**[View Source](../blob/master/src/lib/descriptors/Light/SpotLightDescriptor.js)**|
 ---|
