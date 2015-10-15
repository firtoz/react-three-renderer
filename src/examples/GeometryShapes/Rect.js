import React from 'react';
import PropTypes from 'react/lib/ReactPropTypes';

class Rect extends React.Component {
  static propTypes = {
    width: PropTypes.number.isRequired,
    length: PropTypes.number.isRequired,
    resourceId: PropTypes.string.isRequired,
  };

  render() {
    const {
      width,
      length,
      resourceId,
      } = this.props;

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
}

export default Rect;
