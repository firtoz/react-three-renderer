> [Wiki](Home) » [[Internal Components]] » [[Objects]] » [[Lights]] » **pointLight**

# pointLight

Creates a [THREE.PointLight](http://threejs.org/docs/#Reference/Lights/PointLight)

## Attributes

### name
``` string ```: Name for the 3D Object.

**Default**: `''`

### position
``` THREE.Vector3 ```: The position of the 3D object relative to the parent.

**Default**: `new THREE.Vector3()`

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
> `<pointLight/>` has been updated which triggered a refresh of all materials.
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
>    to `<pointLight/>` inside the `render()` of
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

### color
``` one of types [THREE.Color, number, string] ```: The light color.

**Default**: `0xffffff` ![0xffffff](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAAAklEQVR4AewaftIAAAAvSURBVJXBwQnAMAADsbPp/is7BPIunBRgCEX6eLbxJwlXkYpUpCIVqUhFCjCEIh1kwAUXig8DxQAAAABJRU5ErkJggg==)

### intensity
``` number ```

**Default**: `1`

### decay
``` number ```

**Default**: `1`

### distance
``` number ```

**Default**: `0`

### shadowCameraFov
``` number ```

**Default**: `90`

### shadowCameraAspect
``` number ```

**Default**: `1`

===

|**[View Source](../blob/master/src/lib/descriptors/Light/PointLightDescriptor.js)**|
 ---|
