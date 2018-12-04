class GameManager {
    constructor() {
        this.games = [];
        this.players = [];
    }

    addGame(hostID, roomName) {
        let game = {
            host: hostID,
            room: roomName,
        }
        this.games.push(game);
        return game
    };

    addPlayer(room, name, socketID) {
        var player = {
            username: name,
            id: socketID,
            room,
            score: 0
        };

        this.players.push(player);
        return player;
    };

    removeGame(socketID) {
        var game = this.getGameByHost(socketID);

        if(game) {
            this.games = this.games.filter((game) => {
                return game.host != socketID;
            });
        };

        return game;
    };

    removePlayer(socketID) {
        var player = this.getPlayerBySocket(socketID);

        if(player) {
            this.players = this.players.filter((player) => {
                return player.id != socketID;
            });
        };

        return player;
    };

    removeFromRoom(room) {
        var removedPlayers = [];

        this.players = this.players.filter((player) => {
            if(player.room === room) {
                removedPlayers.push(player);
            } else {
                return player;
            };
        });

        return removedPlayers;
    };

    getFromRoom(room) {

        var players = this.players.filter((player) => {
            return player.room === room;
        });

        return players;
    };

    isHostOrPlayer(socketID) {
        if(this.getGameByHost(socketID) != undefined) {
            return "HOST";
        } else if(this.getPlayerBySocket(socketID) != undefined) {
            return "PLAYER";
        } else return "NOTFOUND";

    };

    getGameByHost(hostID) {
        return this.games.filter((game) => {
            return game.host === hostID;
        })[0];
    };

    getGameByRoom(roomName) {
        return this.games.filter((game) => {
            return game.room === roomName;
        })[0];
    };

    getPlayerBySocket(socketID) {
        return this.players.filter((player) => {
            return player.id === socketID;
        })[0];
    };

    checkUsername(room, username) {
        var players = this.getFromRoom(room);
        var available = true;

        players.filter((player) => {
            if(player.username === username) {
                available = false;
            };
        });
        
        return available;
    };

    checkRoomName(room) {
        var game = this.getGameByRoom(room);

        if(game) {
            return false;
        } else {
            return true;
        };

    };
}

module.exports = {GameManager}