> [Wiki](Home) » [[Internal Components]] » [[Materials]] » **meshDepthMaterial**

# meshDepthMaterial

Creates a [THREE.MeshDepthMaterial](http://threejs.org/docs/#Reference/Materials/MeshDepthMaterial)

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

### wireframe
``` bool ```

### wireframeLinewidth
``` number ```

### resourceId
``` string ```: The resource id of this object, only used if it is placed into [[resources]].

This component can be added into [&lt;resources/&gt;](resources)! See [[Resource Types]] for more information.

===

|**[View Source](../blob/master/src/lib/descriptors/Material/MeshDepthMaterialDescriptor.js)**|
 ---|
