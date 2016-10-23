> [Wiki](Home) » [[Internal Components]] » [[Geometries]] » **bufferGeometry**

# bufferGeometry

Creates a [THREE.BufferGeometry](http://threejs.org/docs/#Reference/Core/BufferGeometry)

## Attributes

### name
``` string ```

**Default**: `''`

### position
``` one of types [THREE.BufferAttribute, THREE.InterleavedBufferAttribute] ```

### normal
``` one of types [THREE.BufferAttribute, THREE.InterleavedBufferAttribute] ```

### color
``` one of types [THREE.BufferAttribute, THREE.InterleavedBufferAttribute] ```

### index
``` one of types [THREE.BufferAttribute, THREE.InterleavedBufferAttribute] ```

### resourceId
``` string ```: The resource id of this object, only used if it is placed into [[resources]].

**Default**: `''`

## Notes:

This component can be added into [&lt;resources/&gt;](resources)! See [[Resource Types]] for more information.

===

|**[View Source](../blob/master/src/lib/descriptors/Geometry/BufferGeometryDescriptor.js)**|
 ---|
