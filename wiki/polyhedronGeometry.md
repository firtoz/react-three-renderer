> [Wiki](Home) » [[Internal Components]] » [[Geometries]] » **polyhedronGeometry**

# polyhedronGeometry

Creates a [THREE.PolyhedronGeometry](http://threejs.org/docs/#Reference/Extras.Geometries/PolyhedronGeometry)

## Attributes
### radius
``` number ``` *``` required ```*

### detail
``` number ``` *``` required ```*

### vertices
``` array of number ``` *``` required ```*

### indices
``` array of number ``` *``` required ```*

### dynamic
``` bool ```: See [THREE.Geometry#dynamic](http://threejs.org/docs/#Reference/Core/Geometry.dynamic).

Set to true if attribute buffers will need to change in runtime (using "dirty" flags).

Unless set to true internal typed arrays corresponding to buffers will be deleted once sent to GPU.

Defaults to true.

### name
``` string ```: Name for this geometry.

Default is an empty string.

### resourceId
``` string ```: The resource id of this object, only used if it is placed into [[resources]].

This component can be added into [&lt;resources/&gt;](resources)! See [[Resource Types]] for more information.

===

|**[View Source](../blob/master/src/lib/descriptors/Geometry/PolyhedronGeometryDescriptor.js)**|
 ---|
