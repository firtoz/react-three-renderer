> [Wiki](Home) » [[Internal Components]] » [[Materials]] » **meshPhongMaterial**

# meshPhongMaterial

Creates a [THREE.MeshPhongMaterial](http://threejs.org/docs/#Reference/Materials/MeshPhongMaterial)

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

### specular
``` one of types [THREE.Color, number, string] ```

**Default**: `0x111111` ![0x111111](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAAAklEQVR4AewaftIAAAA2SURBVJXBwQnAMBADwbVwA9d/kSohIeC3yc4s4EEI0uaYGW7a8glSkIIUpCAFKUiboy1/BOkFpXwG6L1Z7e8AAAAASUVORK5CYII=)

### emissive
``` one of types [THREE.Color, number, string] ```

**Default**: `0x000000` ![0x000000](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAAAklEQVR4AewaftIAAAAkSURBVJXBAQEAMAzDIF7/nncNgYcTTDTRRBNNNNFEE0000UQfY7IBFwkI/wUAAAAASUVORK5CYII=)

### wireframe
``` bool ```

**Default**: `false`

### wireframeLinewidth
``` number ```

**Default**: `1`

### shininess
``` number ```

**Default**: `30`

### metal
``` bool ```

**Default**: `false`

### resourceId
``` string ```: The resource id of this object, only used if it is placed into [[resources]].

**Default**: `''`

This component can be added into [&lt;resources/&gt;](resources)! See [[Resource Types]] for more information.

===

|**[View Source](../blob/master/src/lib/descriptors/Material/MeshPhongMaterialDescriptor.js)**|
 ---|
