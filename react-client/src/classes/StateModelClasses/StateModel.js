import Base from "../Base";

export default class StateModel extends Base
{
    constructor(numId: number, strId: string)
    {
        super(numId, strId);
        this.isMouseHover = false;
    }

    setIsMouseHover(value: boolean)
    {
        this.isMouseHover = value;
    }

    getIsMouseHover(): boolean
    {
        return this.isMouseHover;
    }

    deepClone(): StateModel
    {
        let result = new StateModel(this.getNumberId(), this.getStringId());
        result.setIsMouseHover(this.getIsMouseHover());
        return result;
    }
}