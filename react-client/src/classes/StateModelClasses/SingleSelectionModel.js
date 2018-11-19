import StateModel from "./StateModel";
import {deepCopy} from "../../utilities/UTILITIES";

export default class SingleSelectionModel extends StateModel
{
    constructor(numId: number, strId: string, items: Array<string>)
    {
        super(numId, strId);
        this.items = items;
        this.numberOfItems = items.length;
        this.selectedItemIndex = 0;
        this.mouseHoveredItemIndex = null;
    }

    getItems(): Array<string>
    {
        return this.items;
    }

    selectItem(index: number)
    {
        this.selectedItemIndex = index;
    }

    mouseHoversItem(index: number)
    {
        this.mouseHoveredItemIndex = index;
    }

    getNumberOfItems(): number
    {
        return this.numberOfItems;
    }

    getSelectedItemIndex(): number
    {
        return this.selectedItemIndex;
    }

    getMouseHoveredItemIndex(): number
    {
        return this.mouseHoveredItemIndex;
    }

    deepClone(): SingleSelectionModel
    {
        let result = new SingleSelectionModel(this.getNumberId(), this.getStringId(), deepCopy(this.getItems()));
        result.selectItem(this.getSelectedItemIndex());
        result.mouseHoversItem(this.getMouseHoveredItemIndex());
        result.setMouseHover(this.getMouseHover());
        result.setIsSelected(this.getIsSelected());
        return result;
    }
}