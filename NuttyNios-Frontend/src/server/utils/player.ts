export class Player {
    private _playerNum : number;

    constructor(public readonly id: string, private _ready: boolean) {
    }

    public get isReady(): boolean {
        return this._ready;
    }
    public set isReady(isReady: boolean) {
        this._ready = isReady;
    }
    public get getPlayerNum(): number {
        return this._playerNum;
    }
    public set setPlayerNum(playerNum: number) {
        this._playerNum = playerNum;
    }
}