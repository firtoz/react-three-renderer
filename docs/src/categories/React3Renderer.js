export default {
  intro: 'Equivalent to [react-dom](https://www.npmjs.com/package/react-dom).',
  description: 'For example usage see [React3](Entry-Point).',
  subHeadings: {
    API: {
      children: {
        'React3Renderer': {
          description: `Static functions on React3Renderer.

* React3Renderer.findTHREEObject(component): equivalent to [ReactDOM.findDOMNode](https://facebook.github.io/react/docs/top-level-api.html#reactdom.finddomnode).

  If this component has been mounted, this returns the corresponding THREE.js object.
`,
        },
        'new React3Renderer()': {
          description: `Creates a new instance of React3Renderer.

It allows you to have multiple renderers being used without worrying about conflicts.

This behaviour may change in the future.

Example:

${'```'}js
import React3Renderer from 'react-three-renderer/lib/React3Renderer';

const react3Renderer = new React3Renderer();

const canvas = document.getElementById('canvas');

const width = 800;
const height = 600;

const cameraPosition = new THREE.Vector3(0, 0, 5);

function onRecreateCanvas() {
  // no need to deal with this now, but here we'd need to create a new canvas and
  // re-render the scene there.
}

react3Renderer.render(<react3
    canvas={canvas}

    width={width}
    height={height}

    onRecreateCanvas={onRecreateCanvas}

    context="3d"

    antialias
    mainCamera="camera"
  >
    <scene>
      <perspectiveCamera
        name="camera"
        fov={75}
        aspect={width / height}
        near={0.1}
        far={1000}

        position={cameraPosition}
      />
      <mesh>
        <boxGeometry
          width={1}
          height={1}
          depth={1}
        />
        <meshBasicMaterial
          color={0xff0000}
        />
      </mesh>
    </scene>
  </react3>);
${'```'}

* react3Renderer.render(react3):

  Renders a [react3](react3) component into a canvas.

* react3Renderer.dispose

  Cleanup function. Call this if you want to get rid of everything done by react3Renderer.

  After calling this function you should not use this instance, instead create a new React3Renderer().
`,
        },
      },
    },
  },
  sourceLink: '../blob/master/src/React3Renderer.js',
};
