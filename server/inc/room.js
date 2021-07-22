var events = require('events');

module.exports = (io) => {
    const colors = ["red", "green", "yellow", "blue"];

    const Room = function(room, unitySocket) {    
        // properties
        this.room = room;
        this.unity = new Unity(unitySocket, undefined);
        this.unitySocket = unitySocket;
        this.roomSize = 0;
        this.quit = new events.EventEmitter(); 
        
        // methods
        this.addClient = function(client, callback) {    
            // if room is full reject connection
            if(this.roomSize > 3) {
                callback({status: 403, message: "Room is full."});
                return;
            }    
            // join this room
            client.join(room);
            this.roomSize++;

            // send board size to client, if set
            if(this.unity.boardSize != undefined) {
                client.emit("client:board:update", this.unity.boardSize);
            }
            // on place, send message to all clients
            client.on("server:client:board:onplace", (coordinates, color, clientCallback) => {
                unitySocket.emit("unity:board:onplace", coordinates, color, (response) => {
                    clientCallback(response);
                });
                unitySocket.to(room).emit("client:board:onplace", coordinates, color);
            });
            // decrease room size on disconnect
            client.on("disconnect", () => {
                this.roomSize--;
            });

            // assign color to client
            callback({status: 200, color: colors[this.roomSize - 1]});

            // detach all listeners on quit:
            this.quit.on("quit", () => {
                client.removeAllListeners();
            });
        }
    
        // construction
        unitySocket.join(room);
        unitySocket.emit("unity:start", room);

        // on update board size
        unitySocket.on("server:unity:board:update", (size) => {
            this.unity.boardSize = size;
            unitySocket.to(room).emit("client:board:update", size);
        });
        // on disconnect unity
        unitySocket.on("disconnect", () => {
            // broadcast a disconnect message
            unitySocket.to(room).emit("client:quit");
            // all connected clients should leave room as well now
            io.socketsLeave(room);
            // detach all listeners
            this.quit.emit('quit');
            // delete properties
            delete this.unity;
            delete this.unitySocket;
            delete this.room;
        })        
    };
    
    var Unity = function(socket, boardSize) {
        this.socket = socket;
        this.boardSize = boardSize;
    };

    return { Room };
}