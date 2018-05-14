import React, { Component } from 'react';
import './App.css';

export default class Join extends Component {
  render(){
    return (
      <div className="joinGameWrapper">
          <div className="info">
              <label for="inputPlayerName">Your Name:</label>
              <input id="inputPlayerName" type="text">
          </div>

          <div className="info">
              <label for="inputGameId">Game ID:</label>
              <input id="inputGameId" type="text">
          </div>

          <div className="info buttons">
              <button id="btnStart" className="btn">Start</button>
              <div id="playerWaitingMessage">Joined Game 70099. Please wait for game to begin.</div>
          </div>
      </div>
    );
  }
}
