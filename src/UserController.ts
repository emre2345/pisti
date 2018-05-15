export class UserController {
    constructor(){}
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

    updateUserData(name: string, value: any): void {
        let request: PlayFabServerModels.UpdateUserDataRequest = {
            PlayFabId: currentPlayerId,
            Data: {
                won: "0",
                pisti: "0",
                totalMatch: "0"
            },
            Permission: "Public"
        };
        server.UpdateUserReadOnlyData(request);

    }
}