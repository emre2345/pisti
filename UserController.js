var UserController = /** @class */ (function () {
    function UserController() {
    }
    UserController.prototype.incrementTotalMatch = function (playfabId) {
        //GetTotalMatch to increase
        var getDataRequest = {
            PlayFabId: playfabId,
            Keys: ["totalMatch"]
        };
        var dataRequestResult = server.GetUserReadOnlyData(getDataRequest);
        var totalMatchCount = Number(dataRequestResult.Data["totalMatch"].Value) + 1;
        //Update totalMatch with the incremented value
        var setDataRequest = {
            PlayFabId: playfabId,
            Data: {
                totalMatch: totalMatchCount.toString()
            },
            Permission: "Public"
        };
        server.UpdateUserReadOnlyData(setDataRequest);
    };
    UserController.prototype.incrementWon = function (playfabId) {
        var getDataRequest = {
            PlayFabId: playfabId,
            Keys: ["won"]
        };
        var dataRequestResult = server.GetUserReadOnlyData(getDataRequest);
        var won = Number(dataRequestResult["won"].Value) + 1;
        var setDataRequest = {
            PlayFabId: playfabId,
            Data: {
                won: won.toString()
            },
            Permission: "Public"
        };
        server.UpdateUserReadOnlyData(setDataRequest);
    };
    return UserController;
}());