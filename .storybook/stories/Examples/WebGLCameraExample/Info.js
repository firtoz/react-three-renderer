import React from 'react';

const { PropTypes } = React;

class Info extends React.Component {
  static propTypes = {
    pause: PropTypes.func.isRequired,
    frame: PropTypes.func.isRequired,
  };

  render() {
    return (<div
      style={{
        position: 'absolute',
        textAlign: 'center',
        top: 0,
        width: '100%',
        padding: 5,
        color: 'white',
        zIndex: 100,
      }}
    >
      <a
        href="http://threejs.org"
        style={{
          color: '#0080ff',
        }}
      >three.js</a> - cameras<br/>
      <b
        style={{
          color: 'lightgreen',
        }}
      >O</b> orthographic &nbsp;
      <b
        style={{
          color: 'lightgreen',
        }}
      >P</b> perspective <br/>
      <button onClick={this.props.pause}>Pause</button>
      <button onClick={this.props.frame}>Frame</button>
    </div>);
  }
}

export default Info;
