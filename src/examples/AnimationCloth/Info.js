import React from 'react';

const {PropTypes} = React;

class Info extends React.Component {
  static propTypes = {
    toggleWind: PropTypes.func.isRequired,
    toggleSphere: PropTypes.func.isRequired,
    togglePins: PropTypes.func.isRequired,
    toggleRotate: PropTypes.func.isRequired,
    onFrameChange: PropTypes.func.isRequired,
    minTimePerFrame: PropTypes.number.isRequired,
    rotating: PropTypes.bool.isRequired,
    winding: PropTypes.bool.isRequired,
    balling: PropTypes.bool.isRequired,
  };

  render() {
    const linkStyle = {
      textDecoration: 'underline',
      cursor: 'pointer',
    };

    const {
      toggleRotate,
      toggleWind,
      toggleSphere,
      togglePins,
      minTimePerFrame,
      onFrameChange,
      rotating,
      winding,
      balling,
      } = this.props;

    return (<div style={{
      textAlign: 'center',
      padding: 10,
      zIndex: 10,
      width: '100%',
      position: 'absolute',
      color: '#000',
    }}>
      <a href="http://threejs.org" style={{
        color: '#0080ff',
      }}>three.js</a> - Simple Cloth Simulation<br/>
      Verlet integration with Constrains relaxation<br/>
      Toggle: <a onClick={toggleRotate} style={linkStyle}>Camera{rotating ? '*' : null}</a> |
      <span> <a onClick={toggleWind} style={linkStyle}>Wind{winding ? '*' : null}</a></span> |
      <span> <a onClick={toggleSphere} style={linkStyle}>Ball{balling ? '*' : null}</a></span> |
      <span> <a onClick={togglePins} style={linkStyle}>Pins</a></span> |
      <span> Time between frames (ms): <input
        onChange={onFrameChange}
        value={minTimePerFrame}
        type="number"
        style={{width: 40}}
        min="0"/> </span>
      <br/>
      <span>Note: add some delay between frames if you would like to inspect the scene through React/Addons, because updating every frame kills the addon.</span>
    </div>);
  }
}

export default Info;
