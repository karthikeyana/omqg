import React, { Component } from 'react';
import './App.css';

export default class Create extends Component {
  render(){
    return (
      <div id="gameArea">
            <div className="createGameWrapper">
                <div className="info">Open this site on your mobile device:</div>
                <div id="gameURL" className="infoBig" style={{"text-align": "center", "white-space": "nowrap"}}><span className="textFitted" style={{"display": "inline-block", "text-align": "center", "font-size": "130px"}}>http://localhost:8080/</span></div>
                <div className="info">Then click <strong>JOIN</strong> and <br> enter the following Game ID:</div>
                <div id="spanNewGameCode" className="gameId">81993</div>
                <div id="playersWaiting"></div>
            </div>
        </div>
    );
  }
}
