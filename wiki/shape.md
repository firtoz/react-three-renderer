> [Wiki](Home) » [[Internal Components]] » [[Shapes]] » **shape**

# shape

Creates a [THREE.Shape](https://threejs.org/docs/#api/extras/core/Shape)

Place this within [[&lt;extrudeGeometry&gt;|extrudeGeometry]],
    [[&lt;shapeGeometry&gt;|shapeGeometry]],
    or [[&lt;resources&gt;|resources]].

## Attributes

### points
``` array of THREE.Vector2 ```

**Default**: `[]`

### resourceId
``` string ```: The resource id of this object, only used if it is placed into [[resources]].

**Default**: `''`

## Children:
  * [[moveTo]]: Calls [THREE.Path#moveTo](https://threejs.org/docs/#api/extras/core/Path.moveTo) on the parent shape
  * [[lineTo]]: Calls [THREE.Path#lineTo](https://threejs.org/docs/#api/extras/core/Path.lineTo) on the parent shape
  * [[bezierCurveTo]]: Calls [THREE.Path#bezierCurveTo](https://threejs.org/docs/#api/extras/core/Path.bezierCurveTo) on the parent shape
  * [[quadraticCurveTo]]: Calls [THREE.Path#quadraticCurveTo](https://threejs.org/docs/#api/extras/core/Path.quadraticCurveTo) on the parent shape
  * [[absArc]]: Calls [THREE.Path#absArc](https://threejs.org/docs/#api/extras/core/Path.absarc) on the parent shape
  * [[absEllipse]]: Calls [THREE.Path#absEllipse](https://threejs.org/docs/#api/extras/core/Path.absellipse) on the parent shape
  * [[splineThru]]: Calls [THREE.Path#splineThru](https://threejs.org/docs/#api/extras/core/Path.splineThru) on the parent shape
  * [[hole]]: Adds a hole into a parent shape, see [THREE.Shape#holes](https://threejs.org/docs/#api/extras/core/Shape.holes)

## Notes:

This component can be added into [&lt;resources/&gt;](resources)! See [[Resource Types]] for more information.

===

|**[View Source](../blob/master/src/lib/descriptors/Geometry/Shapes/ShapeDescriptor.js)**|
 ---|
