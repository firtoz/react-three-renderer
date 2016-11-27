import React from 'react';

function SceneWrapper(props) {
  return (<props.React3
    width={800}
    height={600}
  >
    <scene>
      { props.children }
    </scene>
  </props.React3>);
}

SceneWrapper.propTypes = {
  children: React.PropTypes.any,
};

module.exports = SceneWrapper;
