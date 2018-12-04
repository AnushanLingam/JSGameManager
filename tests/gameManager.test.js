const expect = require("expect");
const {GameManager} = require("../gameManager");

var games = new GameManager()

describe("GameManager Class", () => {

    beforeEach(() => {
        var player1 = {
            username: "James",
            id: 1564,
            room: "tiger",
            score: 0
        };

        var player2 = {
            username: "Liam",
            id: 2445,
            room: "tiger",
            score: 0
        };

        var player3 = {
            username: "Anushan",
            id: 1111,
            room: "cat",
            score: 0
        };

       var game1 = {
           host: 1,
           room: "cat",
       };

        var game2 = {
            host: 2,
            room: "tiger",
        };

        var game3 = {
            host: 3,
            room: "lion",
        };

        games.games = [game1, game2, game3];
        games.players = [player1, player2, player3];

    });

    it("should add player to room", () => {
        var username = "Tony";
        var room = "tiger";
        var id = 6677;

        var player = games.addPlayer(room, username, id);

        expect(games.players.length).toBe(4);
        expect(player.username).toBe(username);
        expect(player.room).toBe(room);
        expect(player.id).toBe(id);
        
    });

    it("should remove a player", () => {
        var id = 1111;

        var player = games.removePlayer(id);
        
        expect(games.players.length).toBe(2);
        expect(player.id).toBe(id);
        expect(player.room).toBe("cat");
    });

    it("should remove all players in given room", () => {
        var room = "tiger";

        var players = games.removeFromRoom(room);

        expect(games.players.length).toBe(1);
        expect(players.length).toBe(2);
        expect(players[0].username).toBe("James");
        expect(players[1].username).toBe("Liam");
    });

    it("should get all players in given room", () => {
        var room = "tiger";

        let players = games.getFromRoom(room);

        expect(players[0].username).toBe("James");
        expect(players[1].username).toBe("Liam");
    });

    it("should get player by socket", () => {
        var socket = 2445;
        var player = games.getPlayerBySocket(socket);
        expect(player.id).toBe(socket);
        expect(player.username).toBe("Liam");
        expect(player.room).toBe("tiger");
    });

    it("should add a new game to array", () => {
        var host = 9898;
        var room = "chips";

        var game = games.addGame(host, room);

        expect(game.host).toBe(host);
        expect(game.room).toBe(room);
    });

    it("should remove a game", () => {
        var id = 2;

        let game = games.removeGame(id);

        expect(games.games.length).toBe(2);
        expect(game.host).toBe(id);
        expect(game.room).toBe("tiger");
    });

    it("should get a game by host ID", () => {
        var id = 3;

        var game = games.getGameByHost(id);

        expect(game.host).toBe(id);
        expect(game.room).toBe("lion");
    });

    it("should get a game by room", () => {
        var room = "cat";

        var game = games.getGameByRoom(room);

        expect(game.room).toBe(room);
        expect(game.host).toBe(1);
    });

    it("should check if ID is host or player (Player)", () => {
        var id = 1564

        var response = games.isHostOrPlayer(id);

        expect(response).toBe("PLAYER");
    });

    it("should check if ID is host or player (HOST)", () => {
        var id = 2

        var response = games.isHostOrPlayer(id);

        expect(response).toBe("HOST");
    });

    it("should check if username is available for a given room (FALSE)", () => {
        var username = "Anushan";

        var response = games.checkUsername("cat", username);

        expect(response).toBe(false);
    });

    it("should check if username is available for a given room (TRUE)", () => {
        var username = "Ryan";

        var response = games.checkUsername("cat", username);

        expect(response).toBe(true);
    });

    it("should check if room name is available (FALSE)", () => {
        var room = "tiger";

        let response = games.checkRoomName(room);

        expect(response).toBe(false);
    });

    it("should check if room name is available (TRUE)", () => {
        var room = "germany";

        let response = games.checkRoomName(room);

        expect(response).toBe(true);
    });
});