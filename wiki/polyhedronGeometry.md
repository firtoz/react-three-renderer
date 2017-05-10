> [Wiki](Home) » [[Internal Components]] » [[Geometries]] » **polyhedronGeometry**

# polyhedronGeometry

Creates a [THREE.PolyhedronGeometry](https://threejs.org/docs/#api/geometries/PolyhedronGeometry)

## Attributes

### vertices
``` array of number ``` *``` required ```*

### radius
``` number ``` *``` required ```*

### detail
``` number ``` *``` required ```*

### indices
``` array of number ``` *``` required ```*

### name
``` string ```: Name for this geometry.

**Default**: `''`

### colors
``` array of THREE.Color ```: See [THREE.Geometry#colors](https://threejs.org/docs/#api/core/Geometry.colors).

**Default**: `[]`

### faceVertexUvs
``` array of (array of (array of THREE.Vector2)) ```: See [THREE.Geometry#faceVertexUvs](https://threejs.org/docs/#api/core/Geometry.faceVertexUvs).

**Default**: `[]`

### faces
``` array of THREE.Face3 ```: See [THREE.Geometry#faces](https://threejs.org/docs/#api/core/Geometry.faces).

**Default**: `[]`

### dynamic
``` bool ```: See [THREE.Geometry#dynamic](https://threejs.org/docs/#api/core/Geometry.dynamic).

Set to true if attribute buffers will need to change in runtime (using "dirty" flags).

Unless set to true internal typed arrays corresponding to buffers will be deleted
once sent to GPU.

**Default**: `false`

### resourceId
``` string ```: The resource id of this object, only used if it is placed into [[resources]].

**Default**: `''`

## Notes:

This component can be added into [&lt;resources/&gt;](resources)! See [[Resource Types]] for more information.

===

|**[View Source](../blob/master/src/lib/descriptors/Geometry/PolyhedronGeometryDescriptor.js)**|
 ---|
