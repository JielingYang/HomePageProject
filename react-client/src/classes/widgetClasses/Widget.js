import Base from "../Base";

export default class Widget extends Base
{
    constructor(numId: number, strId: string)
    {
        super(numId, strId);
        this.isMouseOver = false;
    }

    setIsMouseOver(value: boolean)
    {
        this.isMouseOver = value;
    }

    getIsMouseOver(): boolean
    {
        return this.isMouseOver;
    }

    deepClone(): Widget
    {
        let result = new Widget(this.getNumberId(), this.getStringId());
        result.setIsMouseOver(this.getIsMouseOver());
        return result;
    }
}