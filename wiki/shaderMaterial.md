> [Wiki](Home) » [[Internal Components]] » [[Materials]] » **shaderMaterial**

# shaderMaterial

Creates a [THREE.ShaderMaterial](http://threejs.org/docs/#Reference/Materials/ShaderMaterial)

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

### vertexColors
``` one of [THREE.NoColors, THREE.FaceColors, THREE.VertexColors] ```

**Default**: `THREE.NoColors`

### vertexShader
``` string ```: The vertex shader code.

### fragmentShader
``` string ```: The fragment shader code.

### uniforms
``` any ```: The uniforms to be used for the shader.

See [THREE.ShaderMaterial#uniforms](http://threejs.org/docs/#Reference/Materials/ShaderMaterial.uniforms)

### wireframe
``` bool ```

**Default**: `false`

### wireframeLinewidth
``` number ```

**Default**: `1`

### resourceId
``` string ```: The resource id of this object, only used if it is placed into [[resources]].

**Default**: `''`

## Children:
  * [[uniforms]]: A container for [THREE.ShaderMaterial#uniforms](http://threejs.org/docs/#Reference/Materials/ShaderMaterial.uniforms).

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

|**[View Source](../blob/master/src/lib/descriptors/Material/ShaderMaterialDescriptor.js)**|
 ---|
