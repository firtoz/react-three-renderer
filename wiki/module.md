> [Wiki](Home) » [[Internal Components]] » [[Advanced]] » **module**

# module

**experimental** Can inject a system that needs to perform actions every frame, e.g. input or physics.

## Attributes

### descriptor
``` subclass of ReactThreeRenderer.Module ``` *``` required ```*: A class that extends ReactThreeRenderer.Module.

It must expose an `update()` function which will be called every frame.

===

|**[View Source](../blob/master/src/lib/descriptors/ModuleDescriptor.js)**|
 ---|
