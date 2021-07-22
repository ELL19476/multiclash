const { SIGINT } = require('constants');
const { response } = require('express');
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const { Room }  = require("./inc/room")(io);

var connectedBuilds = 0;
var rooms = [];

app.use(express.static('public'))
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

server.listen(3000, () => {
    console.log('listening on *:3000');
});

io.on('connection', (socket) => {

    // UNITY:
    socket.on("server:unity:start", () => {
        connectedBuilds++;
        let room = generateRoomCode(connectedBuilds);

        rooms.push(new Room(room, socket));

        socket.on("disconnect", () => {
            connectedBuilds--;
            rooms = rooms.filter((elem) => elem.room != room);
        })
    });
    // CLIENT:
    socket.on("server:client:start", (roomName, callback) => {
        room = rooms.find((r) => r.room == roomName);
        if(room != undefined) {
            room.addClient(socket, callback);
        }
        else {
            callback({status: 404,  message: "Room not found"});
        }
    });
});

function generateRoomCode(num) {
    var s = num+"";
    while (s.length < 4) s = "0" + s;
    return s;
}