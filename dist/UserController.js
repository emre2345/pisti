"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
    UserController.prototype.updateUserData = function (name, value) {
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
    return UserController;
}());
exports.UserController = UserController;
//# sourceMappingURL=UserController.js.map