import React, { Component } from 'react';
import './App.css';

export default class Result extends Component {
  render(){
    return (
      <div id="gameArea">
        <div id="wordArea">
          <div id="hostWord" style={{"text-align": "center", "white-space": "nowrap"}}>
            <span
              className="textFitted"
              style={{"display": "inline-block", "text-align": "center", "font-size": "96px"}}
            >
              ak Wins!!
            </span>
          </div>
        </div>
        <div id="playerScores">
          <div id="player1Score" className="playerScore">
            <span className="score" id="jmkipoxMDKygCn_O8kUj">
              -28
            </span>
            <span className="playerName">ak</span>
          </div>
          <div id="player2Score" className="playerScore">
            <span className="playerName">ak</span>
            <span className="score" id="jmkipoxMDKygCn_O8kUj">
              0
            </span>
          </div>
        </div>
      </div>
    );
  }
}
