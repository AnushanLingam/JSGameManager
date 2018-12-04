# JSGameManager
A set of functions designed to make creating and managing a lobby system for web apps or games easily using Socket.IO. 

#### Requirements
* NPM and Node.JS
* Install the Socket.IO module using `install socket.io --save`

### Documentation
This documentation is for version 2.0 and up. Documentation of previous versions can be found [here.](https://github.com/AnushanLingam/JSGameManager/blob/24f8bfbf792889a93cc67caa5d088c9311ce3e4c/README.md)

Version 2.0 and up use ES6 classes to store and manage all data related to the games within the instance of GameManager compared to previous versions where the Games object had to be created manually and passed in with all actions.


#### Game Object
The Game object consists of the following properties by default:

`host` which contains the socket ID assigned by socketIO for the host of that lobby.

`room` which stores the string identifier for this game lobby.

Example: 
```javascript
let game = {
  host: X32BZ342313,
  room: "Lion" 
}  
```

#### Player Object
The player object consists of the following properties by default:

`username` is pretty self explanatory it stores the username of the connecting player.

`id` stores the socketIO assigned id associated with the player. This is what you use to access this specific player as the id is sent by socketIO on every message and its unique to each client.

`score` is again pretty simple. Its just provides a way to store the players score. Default value = 0.

Example
```javascript
let player = {
  username: "James",
  id: X32BZ342313,
  score: 0,
}
```

#### Usage

Firstly initialise the manager module and create a global object to store all active games:

```javascript
const {GameManager} = require("js-gamemanager");
var games = new GameManager();
```

The `addGame` function takes two arguments the socketID of the host and the room name they would like to create and adds them to the array of active games. It will also return a copy of the Game object that was created.

For example:
```javascript
var game = games.addGame(SOCKETID, "london");
/*
  game = {
    host: SOCKETID,
    room: "london"
  }
*/
```

The `checkUsername` function checks if username is taken for given room. It takes two arguments the room and the username and returns a boolean value.

For example:
```javascript
console.log(games.checkUsername("london", "James"));
// Will output true or false depending on whether the name is taken or not.
```
The `checkRoomName` function checks if a room name is already in use. It takes one argument the room name and returns a boolean value.

For example:
```javascript
console.log(games.checkRoomName("london"));
// Will output true or false depending on whether room is in use or not.
```

The `addPlayer` function takes three arguments the room name, username and socketID and adds that player to the list of active players and returns a copy of the created Player object.

For example:
```javascript
var player = games.addPlayer("london", "Tony", SOCKETID);
/*
  player = {
    username: "Tony",
    id: SOCKETID,
    room: "london",
    score: 0
  }
*/
```
The `isHostOrPlayer` function takes one argument the socketID and returns either "HOST" or "PLAYER".
For example:
```javascript
console.log(games.isHostOrPlayer(SOCKETID));
// returns "HOST" or "PLAYER"
```

The `removePlayer` function takes one argument the socketID and removes that player from the array of active players and returns a copy of that player.

For example:
```javascript
var removedPlayer = games.removePlayer(SOCKETID);
```

The `removeGame` function takes one argument the socketID of the host and removes the Game object created by that host from the array of active games and returns a copy of the removed Game object. Note: You can call the `removeFromRoom` function with the returned game.room as the argument to remove all players belonging to that room.

For example:
```javascript
var removedGame = games.removeGame(SOCKETID);
```
The `removeFromRoom` function takes one argument the room name and removes all players who belong to that room. Useful for handling host disconnecting from game. It returns an array of removed players so you can emit a custom disconnect message if required.

For example:
```javascript
var removedPlayers = games.removeFromRoom("london");
// Removes all players in room called "london"
```
The `getFromRoom` function is used the same way as the `removeFromRoom` function but instead of removing it just returns an array of players in that room.

For Example:
```javascript
var players = games.getFromRoom("london");
// Returns list of players
```

The `getPlayerBySocket` function takes one argument the socketID and returns the relevant player object if it exists. Mainly used internally by other GameManager functions but is available if needed.

For Example:
```javascript
var player = games.getPlayerBySocket(SOCKETID);
// returns relevant player
```
The `getGameByHost` function takes one argument a socketID of a host and it returns the relevant game object if it exists. Mainly used internally by other GameManager functions but available if needed.

For Example:
```javascript
var game = games.getGameByHost(SOCKETID);
// returns relevant game
```

The `getGamebyRoom` function takes one argument the room name and it returns the game object for that room if it exists. Mainly used internally by other GameManager functions but available if needed.

For example:
```javascript
var game = games.getGameByRoom(SOCKETID);
```