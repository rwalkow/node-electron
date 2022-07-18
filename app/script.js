import React, { useState } from 'react';
import { render } from 'react-dom';

const Container = props => {
  return (
    <div> {props.children} </div>
  );
};

const Header = () => {
  return (
    <h1>Protect your eyes</h1>
  );
};

const TopInformation = () => {
  return (
    <div>
      <p>According to optometrists in order to save your eyes, you should follow the 20/20/20. It means you should to rest your eyes every 20 minutes for 20 seconds by looking more than 20 feet away.</p>
      <p>This app will help you track your time and inform you when it's time to rest.</p>
    </div>
  );
};

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      status: 'off',
      time: '0',
      timer: 'null',
    };

    this.settings = {
      timeWork: 1200,
      timeRest: 20,
      soundBell: './sounds/bell.wav',
      imageWork: './images/Work.png',
      imageRest: './images/Rest.png',
    }
  }

  formatTime = (time) => {
    let minutes = Math.floor(time / 60);
    let seconds = time - minutes * 60;
    if (minutes < 10) minutes = '0' + minutes;
    if (seconds < 10) seconds = '0' + seconds;
    return minutes + ':' + seconds;
  }

  playBell = () => {
    const audioElement = new Audio(this.settings.soundBell);
    audioElement.play();
  };

  step = () => {
    const time = this.state.time;
    const status = this.state.status;

    if (time === 0) {
      if (status === 'work') {
        this.playBell();
        this.setState({status: 'rest',time: this.settings.timeRest});
      }
      if (status === 'rest') {
        this.playBell();
        this.setState({status: 'work',time: this.settings.timeWork});
      }
    };

    this.setState(state => ({time: state.time - 1 }))

  };

  startTimer = () => {
    this.setState({status: 'work',time: this.settings.timeWork,timer: setInterval(this.step, 1000)});
  };

  stopTimer = () => {
    this.setState({status: 'off',time: 0,timer: clearInterval(this.state.timer)});
  };

  closeApp = () => {
    window.close();
  };

  render() {
    const { status, time } = this.state;

    return (
      <Container>
        <Header />
        {(status === 'off') && <TopInformation />}
        {(status === 'work') && <img src={this.settings.imageWork} />}
        {(status === 'rest') && <img src={this.settings.imageRest} />}
        {(status !== 'off') && <div className="timer">{this.formatTime(time)}</div>}
        {(status === 'off') && <button className="btn" onClick={this.startTimer}>Start</button>}
        {(status !== 'off') && <button className="btn" onClick={this.stopTimer}>Stop</button>}
        <button onClick={this.closeApp} className="btn btn-close">X</button>
      </Container>
    )
  }
};

render(<App />, document.querySelector('#app'));
