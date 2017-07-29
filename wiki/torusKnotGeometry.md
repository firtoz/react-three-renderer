> [Wiki](Home) » [[Internal Components]] » [[Geometries]] » **torusKnotGeometry**

# torusKnotGeometry

Creates a [THREE.TorusKnotGeometry](https://threejs.org/docs/#api/geometries/TorusKnotGeometry)

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

### radius
``` number ```

**Default**: `100`

### tube
``` number ```

**Default**: `40`

### tubularSegments
``` number ```

**Default**: `64`

### radialSegments
``` number ```

**Default**: `8`

### p
``` number ```: determines, how many times the geometry winds around its axis of rotational symmetry.

**Default**: `2`

### q
``` number ```: determines, how many times the geometry winds around a circle in the interior of the torus.

**Default**: `3`

### heightScale
``` number ```

### resourceId
``` string ```: The resource id of this object, only used if it is placed into [[resources]].

**Default**: `''`

## Notes:

This component can be added into [&lt;resources/&gt;](resources)! See [[Resource Types]] for more information.

===

|**[View Source](../blob/master/src/lib/descriptors/Geometry/TorusKnotGeometryDescriptor.js)**|
 ---|
