> [Wiki](Home) » [[Internal Components]] » [[Materials]] » **shaderMaterial**

# shaderMaterial

Creates a [THREE.ShaderMaterial](http://threejs.org/docs/#Reference/Materials/ShaderMaterial)

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

### uniforms
``` any ```: The uniforms to be used for the shader.

See [THREE.ShaderMaterial#uniforms](http://threejs.org/docs/#Reference/Materials/ShaderMaterial.uniforms)

### wireframe
``` bool ```

### wireframeLinewidth
``` number ```

### resourceId
``` string ```: The resource id of this object, only used if it is placed into [[resources]].

## Children:
  * [[uniforms]]: A container for [THREE.ShaderMaterial#uniforms](http://threejs.org/docs/#Reference/Materials/ShaderMaterial.uniforms).

This component can be added into [&lt;resources/&gt;](resources)! See [[Resource Types]] for more information.

===

|**[View Source](../blob/master/src/lib/descriptors/Material/ShaderMaterialDescriptor.js)**|
 ---|
