import StateModel from "./StateModel";

export default class EnginePartStateModel extends StateModel
{
    constructor(numId: number, strId: string, startingPosition: number)
    {
        super(numId, strId);
        this.zPosition = startingPosition;
    }

    setZPosition(zPosition: number)
    {
        this.zPosition = zPosition;
    }

    getZPosition(): number
    {
        return this.zPosition;
    }

    deepClone(): EnginePartStateModel
    {
        let result = new EnginePartStateModel(this.getNumberId(), this.getStringId(), this.getZPosition());
        result.setMouseHover(this.getMouseHover());
        return result;
    }
}