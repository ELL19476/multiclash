using System.Collections;
using System.Collections.Generic;
using System.Net.Sockets;
using UnityEngine;
using SocketIOClient;
using System.Threading.Tasks;
using System;
using System.Threading;

public class Test : MonoBehaviour
{
    const int PORT = 3000;
    // EVENTS:
    readonly Dictionary<string, string> RECIVE = new Dictionary<string, string>{ { "START", "unity:start" }, { "PLACE", "unity:board:onplace" } };
    readonly Dictionary<string, string> EMIT = new Dictionary<string, string> { { "START", "server:unity:start" }, { "UPDATEBOARD", "server:unity:board:update" }, { "PLACE", "unity:board:onplace" } };

    SocketIO server;

    BoardGeneration board;

    void Start()
    {
        board = FindObjectOfType<BoardGeneration>();
        board.onGenerateBoard += UpdateBoardSize;
            Task t = Main();
    }

    private void UpdateBoardSize()
    {
        Update();
        async void Update()
        {
            await server.EmitAsync(EMIT["UPDATEBOARD"], new { x = board.sizeX, y = board.sizeY });
            // DONE
        }
    }

    async Task Main()
    {
        server = new SocketIO("http://localhost:" + PORT + "/", new SocketIOOptions
        {
            EIO = 4
        });

        server.On(RECIVE["START"], response =>
        {
            string room = response.GetValue<string>();
            print("Room: " + room);
        });
        server.On(RECIVE["PLACE"], async response =>
        {
            var coordinates = response.GetValue<PlaceResponse>(0);
            var color = response.GetValue<string>(1);
            await response.CallbackAsync(new { status = 200 });

            // Have to do it over variable because cant access "UNITY" in other thread...
            lock(board.placeCoordinates)
            {
                board.placeCoordinates = Tuple.Create(coordinates.x, coordinates.y);
            }
            lock(board.color)
            {
                board.color = color;
            }
        });
        server.OnConnected += async (sender, e) =>
        {
            await server.EmitAsync(EMIT["START"]);
            await server.EmitAsync(EMIT["UPDATEBOARD"], new { x = board.sizeX, y = board.sizeY });
        };
        await server.ConnectAsync();
    }

    private async void OnDestroy()
    {
        board.onGenerateBoard -= UpdateBoardSize;
        await server.DisconnectAsync();
    }
}
class PlaceResponse
{
    public int x { get; set; }
    public int y { get; set; }  
}