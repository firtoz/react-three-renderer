> [Wiki](Home) » [[Internal Components]] » [[Geometries]] » **extrudeGeometry**

# extrudeGeometry

Creates a [THREE.ExtrudeGeometry](http://threejs.org/docs/#Reference/Extras.Geometries/ExtrudeGeometry)

In order to create shapes to extrude, place a [&lt;shape&gt;](shape)
 or a [&lt;shapeResource&gt;](shapeResource) within.

## Implementation details:
The geometry is wrapped within a [THREE.BufferGeometry](http://threejs.org/docs/#Reference/Extras.Geometries/BufferGeometry).

This is to prevent having to remount the component every time anything changes.
 

## Attributes
### dynamic
``` bool ```: See [THREE.Geometry#dynamic](http://threejs.org/docs/#Reference/Core/Geometry.dynamic).

Set to true if attribute buffers will need to change in runtime (using "dirty" flags).

Unless set to true internal typed arrays corresponding to buffers will be deleted once sent to GPU.

Defaults to true.

### name
``` string ```: Name for this geometry.

Default is an empty string.

### shapes
``` array of THREE.Shape ```

### settings
``` any ```

### amount
``` any ```

### bevelThickness
``` any ```

### bevelSize
``` any ```

### bevelSegments
``` any ```

### bevelEnabled
``` any ```

### curveSegments
``` any ```

### steps
``` any ```

### extrudePath
``` any ```

### UVGenerator
``` any ```

### frames
``` any ```

### resourceId
``` string ```: The resource id of this object, only used if it is placed into [[resources]].

This component can be added into [&lt;resources/&gt;](resources)! See [[Resource Types]] for more information.

===

|**[View Source](../blob/master/src/lib/descriptors/Geometry/ExtrudeGeometryDescriptor.js)**|
 ---|
