import React from 'react';

const { PropTypes } = React;

class Info extends React.Component {
  static propTypes = {
    onUpdateColorButtonPress: PropTypes.func.isRequired,
    onRenderButtonPress: PropTypes.func.isRequired,
    onManualButtonPress: PropTypes.func.isRequired,
    forceManual: PropTypes.bool,
    cubeColor: PropTypes.number.isRequired,
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      colorButtonPressed: false,
    };
  }

  _onColorButtonPress = () => {
    this.props.onUpdateColorButtonPress();

    this.setState({
      colorButtonPressed: true,
    });
  };

  _onTriggerPress = () => {
    this.setState({
      colorButtonPressed: false,
    });

    this.props.onRenderButtonPress();
  };

  _manualButtonPress = () => {
    this.setState({
      colorButtonPressed: false,
    });

    this.props.onManualButtonPress();
  };

  render() {
    const {
      forceManual,
      cubeColor,
    } = this.props;

    const {
      colorButtonPressed,
    } = this.state;

    const triggerButtonStyle = {};

    if (colorButtonPressed && forceManual) {
      triggerButtonStyle.fontWeight = 'bold';
    }

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
      <h2>Manual rendering</h2>
      If automatic rendering is off, the canvas will re-render only
      when you press the "Trigger render" button.<br/>
      This way you can save battery life
      or have finer controls for rendering.<br/>
      Check your CPU profiler with automatic rendering on/off :)<br/>
      <br/>
      <button onClick={this._onColorButtonPress}>Update cube color state</button>
      <span
        style={{
          width: 15,
          minHeight: 15,
          marginLeft: 5,
          display: 'inline-block',
          background: `rgb(
            ${(cubeColor >> 16 & 255)},
            ${(cubeColor >> 8 & 255)},
            ${(cubeColor & 255)})`,
        }}
      >&nbsp;</span>
      <br/>
      <button
        onClick={this._onTriggerPress}
        style={triggerButtonStyle}
        disabled={!forceManual}
      >{colorButtonPressed && forceManual ? 'TRIGGER RENDER' : 'Trigger render'}
      </button>
      <br/>
      <button onClick={this._manualButtonPress}>
        Turn automatic rendering {forceManual ? 'ON' : 'OFF'}
      </button>
    </div>);
  }
}

export default Info;
