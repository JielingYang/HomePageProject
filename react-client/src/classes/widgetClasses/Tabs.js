import Widget from "./Widget";
import {deepCopy} from "../../utilities/UTILITIES";

export default class Tabs extends Widget
{
    constructor(numId: number, strId: string, titles: Array<string>)
    {
        super(numId, strId);
        this.titles = titles;
        this.numberOfTabs = titles.length;
        this.selectedTabIndex = 0;
        this.mouseOverTabIndex = null;
    }

    getTabsTitles(): Array<string>
    {
        return this.titles;
    }

    selectTab(index: number)
    {
        this.selectedTabIndex = index;
    }

    mouseOverTab(index: number)
    {
        this.mouseOverTabIndex = index;
    }

    getNumberOfTabs(): number
    {
        return this.numberOfTabs;
    }

    getSelectedTabIndex(): number
    {
        return this.selectedTabIndex;
    }

    getMouseOverTabIndex(): number
    {
        return this.mouseOverTabIndex;
    }

    deepClone(): Tabs
    {
        let result = new Tabs(this.getNumberId(), this.getStringId(), deepCopy(this.getTabsTitles()));
        result.selectTab(this.getSelectedTabIndex());
        result.mouseOverTab(this.getMouseOverTabIndex());
        result.setIsMouseOver(this.getIsMouseOver());
        return result;
    }
}