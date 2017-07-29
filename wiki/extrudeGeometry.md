> [Wiki](Home) » [[Internal Components]] » [[Geometries]] » **extrudeGeometry**

# extrudeGeometry

Creates a [THREE.ExtrudeGeometry](https://threejs.org/docs/#api/geometries/ExtrudeGeometry)

In order to create shapes to extrude, place a [&lt;shape&gt;](shape)
 or a [&lt;shapeResource&gt;](shapeResource) within.

## Implementation details:
The geometry is wrapped within a [THREE.BufferGeometry](https://threejs.org/docs/#api/core/BufferGeometry).

This is to prevent having to remount the component every time anything changes.
 

## Attributes

### name
``` string ```: Name for this geometry.

**Default**: `''`

### vertices
``` array of THREE.Vector3 ```: See [THREE.Geometry#vertices](https://threejs.org/docs/#api/core/Geometry.vertices).

**Default**: `[]`

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

### shapes
``` array of THREE.Shape ```: Array of shapes, or a single shape THREE.Shape

**Default**: `[]`

### curveSegments
``` number ```: Default is 12 (not used in three.js at the moment)

### settings
``` any ```

### UVGenerator
```
shape of 
{
	generateTopUV: function,
	generateSideWallUV: function
}
```
A UV generator, defaults to ExtrudeGeometry's WorldUVGenerator

### steps
``` number ```

### amount
``` number ```

### bevelThickness
``` number ```

### bevelSize
``` number ```

### bevelSegments
``` number ```

### extrudeMaterial
``` number ```

### bevelEnabled
``` bool ```

### extrudePath
``` THREE.CurvePath ```

### frames
```
shape of 
{
	tangents: array of THREE.Vector3,
	normals: array of THREE.Vector3,
	binormals: array of THREE.Vector3
}
```

### resourceId
``` string ```: The resource id of this object, only used if it is placed into [[resources]].

**Default**: `''`

## Notes:

This component can be added into [&lt;resources/&gt;](resources)! See [[Resource Types]] for more information.

===

|**[View Source](../blob/master/src/lib/descriptors/Geometry/ExtrudeGeometryDescriptor.js)**|
 ---|
