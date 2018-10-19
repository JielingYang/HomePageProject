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
        this.hoveredItemIndex = null;
    }

    getItems(): Array<string>
    {
        return this.items;
    }

    selectItem(index: number)
    {
        this.selectedItemIndex = index;
    }

    hoverItem(index: number)
    {
        this.hoveredItemIndex = index;
    }

    getNumberOfItems(): number
    {
        return this.numberOfItems;
    }

    getSelectedItemIndex(): number
    {
        return this.selectedItemIndex;
    }

    getHoveredItemIndex(): number
    {
        return this.hoveredItemIndex;
    }

    deepClone(): SingleSelectionModel
    {
        let result = new SingleSelectionModel(this.getNumberId(), this.getStringId(), deepCopy(this.getItems()));
        result.selectItem(this.getSelectedItemIndex());
        result.hoverItem(this.getHoveredItemIndex());
        result.setIsMouseHover(this.getIsMouseHover());
        return result;
    }
}