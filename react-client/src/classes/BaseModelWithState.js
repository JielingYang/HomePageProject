import BaseModel from "./BaseModel";
import {isEven} from "../utilities/UTILITIES";

export default class BaseModelWithState extends BaseModel
{
    constructor(name: string, numId: number)
    {
        super(name, numId);

        this.mouseHover = false;
        this.isSelected = false;

        this.mouseHoverCount = 0;
        this.mouseClickCount = 0;
    }

    /***********************************************************
     * These functions should be considered as private methods *
     ***********************************************************/

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

    setMouseHoverCount(count: number)
    {
        this.mouseHoverCount = count;
    }

    getMouseHoverCount(): number
    {
        return this.mouseHoverCount;
    }

    setMouseClickCount(count: number)
    {
        this.mouseClickCount = count;
    }

    getMouseClickCount(): number
    {
        return this.mouseClickCount;
    }

    /**********************************************************
     * These functions should be considered as public methods *
     **********************************************************/

    mouseEnters()
    {
        this.mouseHoverCount = this.mouseHoverCount++;
        this.setMouseHover(true);
    }

    mouseLeaves()
    {
        this.setMouseHover(false);
    }

    mouseClicks()
    {
        this.mouseClickCount++;
        this.setIsSelected(!isEven(this.mouseClickCount));
    }

    deepClone(): BaseModelWithState
    {
        let result = new BaseModelWithState(this.getName(), this.getNumberId());
        result.setMouseHover(this.getMouseHover());
        result.setIsSelected(this.getIsSelected());
        result.setMouseHoverCount(this.getMouseHoverCount());
        result.setMouseClickCount(this.getMouseClickCount());
        return result;
    }
}