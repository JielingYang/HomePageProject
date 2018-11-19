import StateModel from "./StateModel";

export default class EngineStateModel extends StateModel
{
    constructor(numId: number, strId: string, startingPosition: number)
    {
        super(numId, strId);
        this.position = startingPosition;
    }

    setPosition(position: number)
    {
        this.position = position;
    }

    getPosition(): number
    {
        return this.position;
    }

    deepClone(): EngineStateModel
    {
        let result = new EngineStateModel(this.getNumberId(), this.getStringId(), this.getPosition());
        result.setMouseHover(this.getMouseHover());
        result.setIsSelected(this.getIsSelected());
        return result;
    }
}