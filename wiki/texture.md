> [Wiki](Home) » [[Internal Components]] » [[Textures]] » **texture**

# texture

Creates a [THREE.Texture](http://threejs.org/docs/#Reference/Textures/Texture)

## Attributes

### url
``` string ``` *``` required ```*: The URL to load the texture from.

Currently textures can be loaded from URLs only.

Used as the first parameter for [TextureLoader.load](http://threejs.org/docs/#Reference/Loaders/TextureLoader.load)

**Default**: `''`

### repeat
``` THREE.Vector2 ```: Sets the [repeat property of the Texture](http://threejs.org/docs/#Reference/Textures/Texture.repeat).

Default: `(1, 1)`.

**Default**: `new THREE.Vector2(1, 1)`

### offset
``` THREE.Vector2 ```: Sets the [offset property of the Texture](http://threejs.org/docs/#Reference/Textures/Texture.offset).

Default: `(0, 0)`.

**Default**: `new THREE.Vector2(0, 0)`

### wrapS
``` one of [THREE.RepeatWrapping, THREE.ClampToEdgeWrapping, THREE.MirroredRepeatWrapping] ```

**Default**: `THREE.ClampToEdgeWrapping`

### wrapT
``` one of [THREE.RepeatWrapping, THREE.ClampToEdgeWrapping, THREE.MirroredRepeatWrapping] ```

**Default**: `THREE.ClampToEdgeWrapping`

### anisotropy
``` number ```

**Default**: `1`

### crossOrigin
``` string ```: Sets the [crossOrigin property of the TextureLoader](http://threejs.org/docs/#Reference/Loaders/TextureLoader.crossOrigin).

### onLoad
``` function ```: Callback to be called when the texture was loaded.

### onProgress
``` function ```: Callback to be called while the texture is loading.

### onError
``` function ```: Callback to be called when the texture was not loaded.

### magFilter
``` one of [THREE.LinearFilter, THREE.NearestFilter] ```

**Default**: `THREE.LinearFilter`

### minFilter
``` one of [THREE.LinearMipMapLinearFilter, THREE.NearestFilter, THREE.NearestMipMapNearestFilter, THREE.NearestMipMapLinearFilter, THREE.LinearFilter, THREE.LinearMipMapNearestFilter] ```

**Default**: `THREE.LinearMipMapLinearFilter`

### resourceId
``` string ```: The resource id of this object, only used if it is placed into [[resources]].

**Default**: `''`

This component can be added into [&lt;resources/&gt;](resources)! See [[Resource Types]] for more information.

===

|**[View Source](../blob/master/src/lib/descriptors/Material/TextureDescriptor.js)**|
 ---|
