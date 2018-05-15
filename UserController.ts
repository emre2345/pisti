export class UserController {
    constructor() { }

    public incrementTotalMatch(playfabId: string) {
        //GetTotalMatch to increase
        let getDataRequest: PlayFabServerModels.GetUserDataRequest = {
            PlayFabId: playfabId,
            Keys: ["totalMatch"]
        }
        let dataRequestResult: PlayFabServerModels.GetUserDataResult = server.GetUserReadOnlyData(getDataRequest);
        let totalMatchCount: number = Number(dataRequestResult.Data["totalMatch"].Value) + 1;

        //Update totalMatch with the incremented value
        let setDataRequest: PlayFabServerModels.UpdateUserDataRequest = {
            PlayFabId: playfabId,
            Data: {
                totalMatch: totalMatchCount.toString()
            },
            Permission: "Public"
        }
        server.UpdateUserReadOnlyData(setDataRequest);
    }

    public incrementWon(playfabId: string) {
        let getDataRequest: PlayFabServerModels.GetUserDataRequest = {
            PlayFabId: playfabId,
            Keys: ["won"]
        }
        let dataRequestResult: PlayFabServerModels.GetUserDataResult = server.GetUserReadOnlyData(getDataRequest);
        let won: number = Number(dataRequestResult.Data["won"].Value) + 1;

        let setDataRequest: PlayFabServerModels.UpdateUserDataRequest = {
            PlayFabId: playfabId,
            Data: {
                won: won.toString()
            },
            Permission: "Public"
        }
        server.UpdateUserReadOnlyData(setDataRequest);
    }
}