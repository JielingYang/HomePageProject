import Base from "../Base";

export default class StateModel extends Base
{
    constructor(numId: number, strId: string)
    {
        super(numId, strId);
        this.mouseHover = false;
        this.isSelected = false;
    }

    setMouseHover(value: boolean)
    {
        this.mouseHover = value;
    }

    getMouseHover(): boolean
    {
        return this.mouseHover;
    }

    setIsSelected(value: boolean)
    {
        this.isSelected = value;
    }

    getIsSelected(): boolean
    {
        return this.isSelected;
    }

    deepClone(): StateModel
    {
        let result = new StateModel(this.getNumberId(), this.getStringId());
        result.setMouseHover(this.getMouseHover());
        result.setIsSelected(this.getIsSelected());
        return result;
    }
}