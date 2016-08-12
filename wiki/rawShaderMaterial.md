> [Wiki](Home) » [[Internal Components]] » [[Materials]] » **rawShaderMaterial**

# rawShaderMaterial

Creates a [THREE.RawShaderMaterial](http://threejs.org/docs/#Reference/Materials/RawShaderMaterial).

This is very similar to [[ShaderMaterial]], except that
the vertex and fragment shader code will be exactly copied without any modifications.

## Attributes

### vertexShader
``` string ``` *``` required ```*: The vertex shader code.

### fragmentShader
``` string ``` *``` required ```*: The fragment shader code.

### slot
``` string ```: This decides which property of the mesh the material should be assigned to.

Defaults to `material`. Other example values:
- customDepthMaterial
- customDistanceMaterial
- and so on

**Default**: `'material'`

### transparent
``` bool ```

### side
``` one of [THREE.FrontSide, THREE.BackSide, THREE.DoubleSide] ```

**Default**: `THREE.FrontSide`

### opacity
``` number ```

### visible
``` bool ```

**Default**: `true`

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

|**[View Source](../blob/master/src/lib/descriptors/Material/RawShaderMaterialDescriptor.js)**|
 ---|
