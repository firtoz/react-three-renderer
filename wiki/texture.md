> [Wiki](Home) » [[Internal Components]] » [[Textures]] » **texture**

# texture

Creates a [THREE.Texture](http://threejs.org/docs/#Reference/Textures/Texture)

## Attributes
### url
``` string ``` *``` required ```*: The URL to load the texture from.

Currently textures can be loaded from URLs only.

Used as the first parameter for [TextureLoader.load](http://threejs.org/docs/#Reference/Loaders/TextureLoader.load)

### repeat
``` THREE.Vector2 ```: Sets the [repeat property of the Texture](http://threejs.org/docs/#Reference/Textures/Texture.repeat).

Default: `(1, 1)`.

### offset
``` THREE.Vector2 ```: Sets the [offset property of the Texture](http://threejs.org/docs/#Reference/Textures/Texture.offset).

Default: `(0, 0)`.

### wrapS
``` one of [THREE.RepeatWrapping, THREE.ClampToEdgeWrapping, THREE.MirroredRepeatWrapping] ```

### wrapT
``` one of [THREE.RepeatWrapping, THREE.ClampToEdgeWrapping, THREE.MirroredRepeatWrapping] ```

### anisotropy
``` number ```

### crossOrigin
``` string ```: Sets the [crossOrigin property of the TextureLoader](http://threejs.org/docs/#Reference/Loaders/TextureLoader.crossOrigin).

### onLoad
``` function ```: Callback to be called when the texture was loaded.

### onProgress
``` function ```: Callback to be called while the texture is loading.

### onError
``` function ```: Callback to be called when the texture was not loaded.

### resourceId
``` string ```: The resource id of this object, only used if it is placed into [[resources]].

This component can be added into [&lt;resources/&gt;](resources)! See [[Resource Types]] for more information.

===

|**[View Source](../blob/master/src/lib/descriptors/Material/TextureDescriptor.js)**|
 ---|
