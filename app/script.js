import React from 'react';
import React, { useState } from 'react';

const Container = props => {
  return (
    <div> {props.children} </div>
  );
};

const Header = () => {
  return (
    <h1> Protect your eyes </h1>
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

const Timer = (props) => {
  return (
    <div className="timer">
      20:00
    </div>
  );
};

const Button = (props) => {
  return (
    <div>
      <button className="btn">{props.children}</button>
    </div>
  );
};

const ButtonClose = (props) => {
  return (
    <button className="btn btn-close">{props.children}</button>
  );
};

class App extends React.Component {

  state = {
    status: 'off',
    time: 0,
    timer: 'null',
  }

  closeApp = () => {
    console.log('close');
    window.close();
  }

  render() {
    return (
      <Container>
        <Header />
        <TopInformation />
        <img src="./images/work.png" />
        <img src="./images/rest.png" />
        <Timer />
        <Button>Start</Button>
        <Button>Stop</Button>
        <ButtonClose onClick={this.closeApp}>X</ButtonClose>
      </Container>
    )
  }
};

render(<App />, document.querySelector('#app'));
