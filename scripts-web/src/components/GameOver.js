import React, { Component } from 'react';
import './App.css';

export default class GameOver extends Component {
  render(){
    return (
      <div id="gameArea">
        <div className="gameOver">Game Over!</div>
        <button id="btnPlayerRestart" className="btn btnGameOver">
          Start Again
        </button>
      </div>;
    );
  }
}
