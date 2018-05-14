import React, { Component } from 'react';
import './App.css';

export default class Score extends Component {
  render(){
    return (
      <div id="gameArea">
        <div id="wordArea">
          <div id="hostWord" style={{"text-align": "center", "white-space": "nowrap"}}>
            <span
              className="textFitted"
              style={{"display": "inline-block", "text-align": "center", "font-size": "300px"}}
            >
              78
            </span>
          </div>
        </div>
        <div id="playerScores">
          <div id="player1Score" className="playerScore">
            <span className="score" id="IPCd9e8ZoUmITwuYBlqS">
              0
            </span>
            <span className="playerName">anon</span>
          </div>
          <div id="player2Score" class="playerScore">
            <span className="playerName">anon</span>
            <span className="score" id="IPCd9e8ZoUmITwuYBlqS">
              0
            </span>
          </div>
          <div id="player3Score" class="playerScore">
            <span className="playerName">anon</span>
            <span className="score" id="IPCd9e8ZoUmITwuYBlqm">
              0
            </span>
          </div>
        </div>
      </div>
    );
  }
}
