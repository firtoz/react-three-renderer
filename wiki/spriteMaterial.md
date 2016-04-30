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

### transparent
``` bool ```

### alphaTest
``` number ```

### side
``` one of [THREE.FrontSide, THREE.BackSide, THREE.DoubleSide] ```

### opacity
``` number ```

### visible
``` bool ```

### color
``` one of types [THREE.Color, number, string] ```

### rotation
``` number ```

### fog
``` bool ```

### resourceId
``` string ```: The resource id of this object, only used if it is placed into [[resources]].

This component can be added into [&lt;resources/&gt;](resources)! See [[Resource Types]] for more information.

===

|**[View Source](../blob/master/src/lib/descriptors/Material/SpriteMaterialDescriptor.js)**|
 ---|
