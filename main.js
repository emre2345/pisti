"use strict";
///////////////////////////////////////////////////////////////////////////////////////////////////////
//
// Welcome to your first Cloud Script revision!
//
// Cloud Script runs in the PlayFab cloud and has full access to the PlayFab Game Server API 
// (https://api.playfab.com/Documentation/Server), and it runs in the context of a securely
// authenticated player, so you can use it to implement logic for your game that is safe from
// client-side exploits. 
//
// Cloud Script functions can also make web requests to external HTTP
// endpoints, such as a database or private API for your title, which makes them a flexible
// way to integrate with your existing backend systems.
//
// There are several different options for calling Cloud Script functions:
//
// 1) Your game client calls them directly using the "ExecuteCloudScript" API,
// passing in the function name and arguments in the request and receiving the 
// function return result in the response.
// (https://api.playfab.com/Documentation/Client/method/ExecuteCloudScript)
// 
// 2) You create PlayStream event actions that call them when a particular 
// event occurs, passing in the event and associated player profile data.
// (https://api.playfab.com/playstream/docs)
// 
// 3) For titles using the Photon Add-on (https://playfab.com/marketplace/photon/),
// Photon room events trigger webhooks which call corresponding Cloud Script functions.
// 
// The following examples demonstrate all three options.
//
///////////////////////////////////////////////////////////////////////////////////////////////////////
Object.defineProperty(exports, "__esModule", { value: true });
var UserController_1 = require("./UserController");
var userController = new UserController_1.UserController();
var onNewAccountCreated = function (args, context) {
    var request = {
        PlayFabId: currentPlayerId,
        Data: {
            won: "0",
            pisti: "0",
            totalMatch: "0"
        },
        Permission: "Public"
    };
    server.UpdateUserReadOnlyData(request);
};
handlers["onNewAccountCreated"] = onNewAccountCreated;
// Photon Webhooks Integration
//
// The following functions are examples of Photon Cloud Webhook handlers. 
// When you enable the Photon Add-on (https://playfab.com/marketplace/photon/)
// in the Game Manager, your Photon applications are automatically configured
// to authenticate players using their PlayFab accounts and to fire events that 
// trigger your Cloud Script Webhook handlers, if defined. 
// This makes it easier than ever to incorporate multiplayer server logic into your game.
// Triggered automatically when a Photon room is first created
handlers.RoomCreated = function (args) {
    log.debug("Room Created - Game: " + args.GameId + " MaxPlayers: " + args.CreateOptions.MaxPlayers);
    server.WriteTitleEvent({
        EventName: "room_created",
        Body: {
            GameId: args.GameId,
            OpeningPlayer: args.UserId
        }
    });
};
// Triggered automatically when a player joins a Photon room
handlers.RoomJoined = function (args) {
    log.debug("Room Joined - Game: " + args.GameId + " PlayFabId: " + args.UserId);
    //Raise event
    var eventRequest = {
        PlayFabId: args.UserId,
        EventName: "player_joined_game"
    };
    server.WritePlayerEvent(eventRequest);
    userController.incrementTotalMatch(args.UserId);
};
// Triggered automatically when a player leaves a Photon room
handlers.RoomLeft = function (args) {
    log.debug("Room Left - Game: " + args.GameId + " PlayFabId: " + args.UserId);
};
// Triggered automatically when a Photon room closes
// Note: currentPlayerId is undefined in this function
handlers.RoomClosed = function (args) {
    log.debug("Room Closed - Game: " + args.GameId);
    server.WriteTitleEvent({
        EventName: "room_closed",
        Body: {
            GameId: args.GameId,
            ClosingPlayer: args.UserId
        }
    });
};
// Triggered automatically when a Photon room game property is updated.
// Note: currentPlayerId is undefined in this function
handlers.RoomPropertyUpdated = function (args) {
    log.debug("Room Property Updated - Game: " + args.GameId);
    server.WriteTitleEvent({
        EventName: "received_room_property_update",
        Body: {
            GameId: args.GameId,
            Player1Id: args.Properties["player1Id"],
            Player2Id: args.Properties["player2Id"]
        }
    });
    var player1Id = args.Properties["player1Id"];
    var player2Id = args.Properties["player2Id"];
    server.UpdateUserReadOnlyData({
        PlayFabId: player1Id,
        Data: {
            pisti: args.Properties[player1Id + "pisti"]
        },
        Permission: "Public"
    });
    server.UpdateUserReadOnlyData({
        PlayFabId: player2Id,
        Data: {
            pisti: args.Properties[player2Id + "pisti"]
        },
        Permission: "Public"
    });
    var request = {
        PlayFabId: args.Properties["winnerId"],
        Data: {
            won: args.Properties["winnerWon"]
        },
        Permission: "Public"
    };
    server.UpdateUserReadOnlyData(request);
    server.WriteTitleEvent({
        EventName: "updated_player_scores",
        Body: {
            GameId: args.GameId
        }
    });
};
// Triggered by calling "OpRaiseEvent" on the Photon client. The "args.Data" property is 
// set to the value of the "customEventContent" HashTable parameter, so you can use
// it to pass in arbitrary data.
handlers.RoomEventRaised = function (args) {
    var eventData = args.Data;
    log.debug("Event Raised - Game: " + args.GameId + " Event Type: " + eventData.eventType);
};
//# sourceMappingURL=main.js.map