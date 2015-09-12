import React from 'react';

const ballSize = 60; // 40

function Sphere(props) {
  return (<mesh
    castShadow={true}
    receiveShadow={true}
    visible={props.visible}
    position={props.position}
  >
    <sphereGeometry
      radius={ballSize}
      widthSegments={20}
      heightSegments={20}
    />
    <meshPhongMaterial
      color={0xffffff}
    />
  </mesh>);
}

export default Sphere;
