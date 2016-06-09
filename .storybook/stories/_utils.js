import React from 'react';

export function nomargin(storyFn) {
  const style = {
    position: 'absolute',
    overflow: 'auto',
    top: 0, right: 0, bottom: 0, left: 0,
  };
  return <div style={style}>{storyFn()}</div>;
}
