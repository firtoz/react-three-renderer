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

### specular
``` one of types [THREE.Color, number, string] ```

### emissive
``` one of types [THREE.Color, number, string] ```

### wireframe
``` bool ```

### wireframeLinewidth
``` number ```

### shininess
``` number ```

### metal
``` bool ```

### lightMapIntensity
``` number ```

### aoMapIntensity
``` number ```

### emissiveIntensity
``` number ```

### bumpScale
``` number ```

### displacementScale
``` number ```

### reflectivity
``` number ```

### displacementBias
``` number ```

### refractionRatio
``` number ```

### normalScale
``` THREE.Vector2 ```

### shading
``` one of [THREE.FlatShading, THREE.SmoothShading] ```

### skinning
``` bool ```

### morphTargets
``` bool ```

### morphNormals
``` bool ```

### resourceId
``` string ```: The resource id of this object, only used if it is placed into [[resources]].

This component can be added into [&lt;resources/&gt;](resources)! See [[Resource Types]] for more information.

===

|**[View Source](../blob/master/src/lib/descriptors/Material/MeshPhongMaterialDescriptor.js)**|
 ---|
