module.exports = {
  description: `These components can be used without needing to require any modules, e.g.

${'```'}js
import React from 'react';

class SomeClass extends React.Component{
  render() {
    return(
      <group>
        <mesh>
          <boxGeometry/>
          <meshBasicMaterial/>
        </mesh>
      </group>
    );
  }
}
${'```'}`,
};
