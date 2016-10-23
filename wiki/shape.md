> [Wiki](Home) » [[Internal Components]] » [[Shapes]] » **shape**

# shape

Creates a [THREE.Shape](http://threejs.org/docs/#Reference/Extras.Core/Shape)

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
  * [[moveTo]]: Calls [THREE.Path#moveTo](http://threejs.org/docs/#Reference/Extras.Core/Path.moveTo) on the parent shape
  * [[lineTo]]: Calls [THREE.Path#lineTo](http://threejs.org/docs/#Reference/Extras.Core/Path.lineTo) on the parent shape
  * [[bezierCurveTo]]: Calls [THREE.Path#bezierCurveTo](http://threejs.org/docs/#Reference/Extras.Core/Path.bezierCurveTo) on the parent shape
  * [[quadraticCurveTo]]: Calls [THREE.Path#quadraticCurveTo](http://threejs.org/docs/#Reference/Extras.Core/Path.quadraticCurveTo) on the parent shape
  * [[absArc]]: Calls [THREE.Path#absArc](http://threejs.org/docs/#Reference/Extras.Core/Path.absarc) on the parent shape
  * [[absEllipse]]: Calls [THREE.Path#absEllipse](http://threejs.org/docs/#Reference/Extras.Core/Path.absellipse) on the parent shape
  * [[splineThru]]: Calls [THREE.Path#splineThru](http://threejs.org/docs/#Reference/Extras.Core/Path.splineThru) on the parent shape
  * [[hole]]: Adds a hole into a parent shape, see [THREE.Shape#holes](http://threejs.org/docs/#Reference/Extras.Core/Shape.holes)

## Notes:

This component can be added into [&lt;resources/&gt;](resources)! See [[Resource Types]] for more information.

===

|**[View Source](../blob/master/src/lib/descriptors/Geometry/Shapes/ShapeDescriptor.js)**|
 ---|
