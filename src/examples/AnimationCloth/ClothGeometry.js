import React from 'react';

const {PropTypes} = React;

import Cloth from './Cloth';

import PureRenderMixin from 'react/lib/ReactComponentWithPureRenderMixin';

class ClothGeometry extends React.Component {
  static propTypes = {
    cloth: PropTypes.instanceOf(Cloth).isRequired,
  };

  shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate;

  componentDidMount() {
    const geometry = this.refs.geometry;

    geometry.computeFaceNormals();
  }

  render() {
    const {
      cloth,
      } = this.props;

    return (<parametricGeometry
      ref={'geometry'}
      parametricFunction={Cloth.clothFunction}
      slices={cloth.w}
      stacks={cloth.h}
      dynamic={true}
    />);
  }
}

export default ClothGeometry;
