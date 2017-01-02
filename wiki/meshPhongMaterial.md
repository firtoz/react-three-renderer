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

### depthTest
``` bool ```

**Default**: `true`

### depthWrite
``` bool ```

**Default**: `true`

### blending
``` one of [THREE.NoBlending, THREE.NormalBlending, THREE.AdditiveBlending, THREE.SubtractiveBlending, THREE.MultiplyBlending, THREE.CustomBlending] ```

**Default**: `THREE.NormalBlending`

### depthFunc
``` one of [THREE.NeverDepth, THREE.AlwaysDepth, THREE.LessDepth, THREE.LessEqualDepth, THREE.EqualDepth, THREE.GreaterEqualDepth, THREE.GreaterDepth, THREE.NotEqualDepth] ```

**Default**: `THREE.LessEqualDepth`

### opacity
``` number ```

### visible
``` bool ```

**Default**: `true`

### map
``` THREE.Texture ```

### color
``` one of types [THREE.Color, number, string] ```

**Default**: `0xffffff` [[images/0xffffff.png]]

### specular
``` one of types [THREE.Color, number, string] ```

**Default**: `0x111111` [[images/0x111111.png]]

### emissive
``` one of types [THREE.Color, number, string] ```

**Default**: `0x000000` [[images/0x000000.png]]

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

### lightMapIntensity
``` number ```

**Default**: `1`

### aoMapIntensity
``` number ```

**Default**: `1`

### emissiveIntensity
``` number ```

**Default**: `1`

### bumpScale
``` number ```

**Default**: `1`

### displacementScale
``` number ```

**Default**: `1`

### reflectivity
``` number ```

**Default**: `1`

### displacementBias
``` number ```

**Default**: `0`

### refractionRatio
``` number ```

**Default**: `0.98`

### normalScale
``` THREE.Vector2 ```

**Default**: `new THREE.Vector2(1, 1)`

### shading
``` one of [THREE.FlatShading, THREE.SmoothShading] ```

**Default**: `THREE.SmoothShading`

### skinning
``` bool ```

**Default**: `false`

### morphTargets
``` bool ```

**Default**: `false`

### morphNormals
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

|**[View Source](../blob/master/src/lib/descriptors/Material/MeshPhongMaterialDescriptor.js)**|
 ---|
