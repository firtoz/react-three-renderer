> [Wiki](Home) » [[Internal Components]] » [[Materials]] » **spriteMaterial**

# spriteMaterial

Creates a [THREE.SpriteMaterial](http://threejs.org/docs/#Reference/Materials/SpriteMaterial)

## Attributes

### slot
``` string ```: This decides which property of the mesh the material should be assigned to.

Defaults to `material`. Other example values:
- customDepthMaterial
- customDistanceMaterial
- and so on

**Default**: `'material'`

### transparent
``` bool ```

### alphaTest
``` number ```

**Default**: `0`

### side
``` one of [THREE.FrontSide, THREE.BackSide, THREE.DoubleSide] ```

**Default**: `THREE.FrontSide`

### opacity
``` number ```

### visible
``` bool ```

**Default**: `true`

### color
``` one of types [THREE.Color, number, string] ```

**Default**: `0xffffff` ![0xffffff](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAAAklEQVR4AewaftIAAAAvSURBVJXBwQnAMAADsbPp/is7BPIunBRgCEX6eLbxJwlXkYpUpCIVqUhFCjCEIh1kwAUXig8DxQAAAABJRU5ErkJggg==)

### rotation
``` number ```

**Default**: `0`

### fog
``` bool ```

**Default**: `false`

### resourceId
``` string ```: The resource id of this object, only used if it is placed into [[resources]].

**Default**: `''`

## Notes:

If you would like to set a texture as a map for this material, 
you can do this by declaring the texture within:

```jsx
<...material>
    <texture url={...} .../>
</...material>
```

This component can be added into [&lt;resources/&gt;](resources)! See [[Resource Types]] for more information.

===

|**[View Source](../blob/master/src/lib/descriptors/Material/SpriteMaterialDescriptor.js)**|
 ---|
