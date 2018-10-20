import Base from "../Base";

export default class StateModel extends Base
{
    constructor(numId: number, strId: string)
    {
        super(numId, strId);
        this.mouseHover = false;
    }

    setMouseHover(value: boolean)
    {
        this.mouseHover = value;
    }

    getMouseHover(): boolean
    {
        return this.mouseHover;
    }

    deepClone(): StateModel
    {
        let result = new StateModel(this.getNumberId(), this.getStringId());
        result.setMouseHover(this.getMouseHover());
        return result;
    }
}