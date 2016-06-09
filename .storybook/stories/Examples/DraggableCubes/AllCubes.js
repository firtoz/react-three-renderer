import React from 'react';
import DraggableCube from './DraggableCube';
import THREE from 'three';

import PureRenderMixin from 'react/lib/ReactComponentWithPureRenderMixin';

const { PropTypes } = React;

import MouseInput from '../inputs/MouseInput';

class AllCubes extends React.Component {
  static propTypes = {
    mouseInput: PropTypes.instanceOf(MouseInput),
    camera: PropTypes.instanceOf(THREE.PerspectiveCamera),

    onCubesMounted: PropTypes.func.isRequired,
    onHoverStart: PropTypes.func.isRequired,
    onHoverEnd: PropTypes.func.isRequired,
    onDragStart: PropTypes.func.isRequired,
    onDragEnd: PropTypes.func.isRequired,

    cursor: PropTypes.any,
  };

  constructor(props, context) {
    super(props, context);

    const cubePositions = [];
    cubePositions.length = 200;

    for (let i = 0; i < 200; ++i) {
      cubePositions[i] = new THREE.Vector3(
        Math.random() * 1000 - 500,
        Math.random() * 600 - 300,
        Math.random() * 800 - 400
      );
    }

    const cubes = [];
    cubes.length = cubePositions.length;
    this.cubes = cubes;

    this.cubePositions = cubePositions;

    this._hoveredCubes = 0;
    this._draggingCubes = 0;
  }

  componentDidMount() {
    const {
      onCubesMounted,
    } = this.props;

    onCubesMounted(this.cubes);
  }

  shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate;

  _onCubeCreate = (index, cube) => {
    this.cubes[index] = cube;
  };

  _onCubeMouseEnter = () => {
    if (this._hoveredCubes === 0) {
      const {
        onHoverStart,
      } = this.props;

      onHoverStart();
    }

    this._hoveredCubes++;
  };

  _onCubeMouseLeave = () => {
    this._hoveredCubes--;

    if (this._hoveredCubes === 0) {
      const {
        onHoverEnd,
      } = this.props;

      onHoverEnd();
    }
  };

  _onCubeDragStart = () => {
    if (this._draggingCubes === 0) {
      const {
        onDragStart,
      } = this.props;

      onDragStart();
    }

    this._draggingCubes++;
  };

  _onCubeDragEnd = () => {
    this._draggingCubes--;

    if (this._draggingCubes === 0) {
      const {
        onDragEnd,
      } = this.props;

      onDragEnd();
    }
  };


  render() {
    const {
      mouseInput,
      camera,

      cursor,
    } = this.props;

    return (<group>
      {this.cubePositions.map((cubePosition, index) => {
        const onCreate = this._onCubeCreate.bind(this, index);
        return (<DraggableCube
          key={index}

          mouseInput={mouseInput}
          camera={camera}

          initialPosition={cubePosition}
          onCreate={onCreate}
          onMouseEnter={this._onCubeMouseEnter}
          onMouseLeave={this._onCubeMouseLeave}
          onDragStart={this._onCubeDragStart}
          onDragEnd={this._onCubeDragEnd}

          cursor={cursor}
        />);
      })}
    </group>);
  }
}

export default AllCubes;
