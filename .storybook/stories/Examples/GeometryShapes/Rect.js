import React from 'react';
import PropTypes from 'react/lib/ReactPropTypes';

function Rect(props) {
  const {
    width,
    length,
    resourceId,
  } = props;

  return (<shape resourceId={resourceId}>
    <moveTo
      x={0}
      y={0}
    />
    <lineTo
      x={0}
      y={width}
    />
    <lineTo
      x={length}
      y={width}
    />
    <lineTo
      x={length}
      y={0}
    />
    <lineTo
      x={0}
      y={0}
    />
  </shape>);
}

Rect.propTypes = {
  width: PropTypes.number.isRequired,
  length: PropTypes.number.isRequired,
  resourceId: PropTypes.string.isRequired,
};

export default Rect;
