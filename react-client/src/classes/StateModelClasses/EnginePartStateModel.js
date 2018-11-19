import StateModel from "./StateModel";

export default class EnginePartStateModel extends StateModel
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

    deepClone(): EnginePartStateModel
    {
        let result = new EnginePartStateModel(this.getNumberId(), this.getStringId(), this.getPosition());
        result.setMouseHover(this.getMouseHover());
        result.setIsSelected(this.getIsSelected());
        return result;
    }
}