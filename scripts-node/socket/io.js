var io;
var gameSocket;

export default function(sio, socket) {
  io = sio;
  gameSocket = socket;
  gameSocket.emit('connected', { message: 'You are connected!' });
  gameSocket.on('hostCreateNewGame', hostCreateNewGame);
  gameSocket.on('hostRoomFull', hostPrepareGame);
  gameSocket.on('hostCountdownFinished', hostStartGame);
  gameSocket.on('hostNextRound', hostNextRound);
  gameSocket.on('playerJoinGame', playerJoinGame);
  gameSocket.on('playerAnswer', playerAnswer);
  gameSocket.on('playerRestart', playerRestart);
};

function hostCreateNewGame() {
  var thisGameId = (Math.random() * 100000) | 0;
  this.emit('newGameCreated', { gameId: thisGameId, mySocketId: this.id });
  this.join(thisGameId.toString());
}

function hostPrepareGame(gameId) {
  var sock = this;
  var data = {
    mySocketId: sock.id,
    gameId: gameId
  };
  io.sockets.in(data.gameId).emit('beginNewGame', data);
}

function hostStartGame(gameId) {
  console.log('Game Started.');
  sendWord(0, gameId);
}

function hostNextRound(data) {
  if (data.round < wordPool.length) {
    sendWord(data.round, data.gameId);
  } else {
    io.sockets.in(data.gameId).emit('gameOver', data);
  }
}
function playerJoinGame(data) {
  var sock = this;
  var room = gameSocket.manager.rooms['/' + data.gameId];
  if (room != undefined) {
    data.mySocketId = sock.id;
    sock.join(data.gameId);
    io.sockets.in(data.gameId).emit('playerJoinedRoom', data);
  } else {
    this.emit('error', { message: 'This room does not exist.' });
  }
}

function playerAnswer(data) {
  io.sockets.in(data.gameId).emit('hostCheckAnswer', data);
}

function playerRestart(data) {
  data.playerId = this.id;
  io.sockets.in(data.gameId).emit('playerJoinedRoom', data);
}
function sendWord(wordPoolIndex, gameId) {
  var data = getWordData(wordPoolIndex);
  io.sockets.in(data.gameId).emit('newWordData', data);
}

function getWordData(i) {
  var words = shuffle(wordPool[i].words);
  var decoys = shuffle(wordPool[i].decoys).slice(0, 5);
  var rnd = Math.floor(Math.random() * 5);
  decoys.splice(rnd, 0, words[1]);
  var wordData = {
    round: i,
    word: words[0],
    answer: words[1],
    list: decoys
  };
  return wordData;
}

function shuffle(array) {
  var currentIndex = array.length;
  var temporaryValue;
  var randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

var wordPool = [
  {
    words: ['How to print string in javascript?'],
    decoys: ['console.log', 'print', 'system.out.print', 'printf']
  },

  {
    words: ['Who is the symbal of carban?'],
    decoys: ['C4', 'Carban', 'C', 'C*']
  },

  {
    words: ['What is tamilnadu regional language?'],
    decoys: ['tamil', 'english', 'hindi', 'kanada']
  },

  {
    words: ['Where is sify company Administrative office?'],
    decoys: ['India', 'England', 'USA', 'SriLanga']
  },

  {
    words: ['Who is missile man of india?'],
    decoys: ['APJ.AbdulKalam', 'C.V.Raman', 'Rajini', 'Satish Dhawan']
  }
];
