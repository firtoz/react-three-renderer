import React from 'react';

import React3 from '../../React3/React3';

class BufferGeometry extends React.Component {
  render() {
    const {
      width,
      height,
      } = this.state;

    const aspect = width / height;

    return (<div>
      <React3>
        <scene>
          <perspectiveCamera
            fov={27}
            aspect={aspect}
          />
        </scene>
      </React3>
    </div>);
  }
}

export default BufferGeometry;
