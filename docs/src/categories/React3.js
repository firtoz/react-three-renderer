module.exports = {
  intro: ` ${'`'} require('react-three-renderer') ${'`'} - Module Entry Point`,
  fileIntro: `${'```'}js
import React3 from 'react-three-renderer';
${'```'}`,
  filename: 'Entry Point',
  description: `React3 is a regular React Component that places a canvas on the page.

When React3 is mounted, an instance of [[React3Renderer]] is used to render a
 [&lt;react3&gt;](react3) internal component into the canvas.

The react3 internal component repeatedly requests animation frames from the browser.

Every frame it re-renders the whole scene.

The attributes are passed on to the react3 internal component so that
 it can configure the renderer.`,
  copyAttributesFrom: 'react3',
  excludeAttributesFromCopying: {
    canvas: true,
    onRecreateCanvas: true,
  },
  subHeadings: {
    'Additional Attributes': {
      children: {
        canvasStyle: {
          description: '``` any ``` The style properties to be passed onto the canvas.',
        },
      },
    },
    'Static functions': {
      children: {
        'React3.findTHREEObject': {
          description: `Similar to [ReactDOM.findDOMNode](https://facebook.github.io/react/docs/top-level-api.html#reactdom.finddomnode).

Finds a THREE.js object from a mounted component.

You are encouraged to use [refs](https://facebook.github.io/react/docs/more-about-refs.html) instead.`,
        },
        'React3.eventDispatcher': {
          description: `**Advanced usage**. Used to dispatch events. Undocumented for now.`,
        },
      },
    },
  },
  sourceLink: '../blob/master/src/React3.js',
};
