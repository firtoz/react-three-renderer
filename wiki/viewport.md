> [Wiki](Home) » [[Internal Components]] » [[Views]] » **viewport**

# viewport

See [THREE.WebGLRenderer.setViewport](http://threejs.org/docs/#Reference/Renderers/WebGLRenderer.setViewport)

It can only be placed into the [root component](React3).

If the [mainCamera](react3#maincamera) property of the root component is
not set, then the scene will be rendered into the viewports.

## Attributes
### x
``` number ``` *``` required ```*: The x (px) position of the viewport in the canvas

### y
``` number ``` *``` required ```*: The y (px) position of the viewport in the canvas

### width
``` number ``` *``` required ```*: The width (px) of the viewport in the canvas

### height
``` number ``` *``` required ```*: The height (px) of the viewport in the canvas

### cameraName
``` string ``` *``` required ```*: The name of the camera to render

===

|**[View Source](../blob/master/src/lib/descriptors/ViewportDescriptor.js)**|
 ---|
