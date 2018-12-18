import {deepCopy} from "../utilities/UTILITIES";
import {createReducer} from "./reducerCreator";
import BaseModelWithState from "../classes/BaseModelWithState";
import {MAIN_MENU_ITEM_NAME} from "../utilities/CONSTANTS_STRING";
import numberIdGenerator from "../classes/NumberIdGenerator";
import {MAIN_MENU_ACTION_TYPE} from "../actionCreators/mainMenuActions";

export type mainMenuReducerType = {
    mainMenuItemModels: Array<BaseModelWithState>,
}

const mainMenuReducerDefaultType: mainMenuReducerType = {
    mainMenuItemModels: [],
};

const mainMenuAction_initializeMainMenuItemModels_handler = (state: mainMenuReducerType, action) =>
{
    let nextState: mainMenuReducerType = deepCopy(state);
    nextState.mainMenuItemModels = action.mainMenuItemsIndices.map((index: number) =>
    {
        let mainMenuItemModel: BaseModelWithState = new BaseModelWithState(MAIN_MENU_ITEM_NAME, numberIdGenerator.generateId());
        if (index === 0)
        {
            mainMenuItemModel.mouseClicks();
        }
        return mainMenuItemModel;
    });
    return nextState;
};

const mainMenuAction_mouseClicksMainMenuItem_handler = (state: mainMenuReducerType, action) =>
{
    let nextState: mainMenuReducerType = deepCopy(state);
    nextState.mainMenuItemModels[action.mainMenuItemIndex].mouseClicks();
    return nextState;
};

const mainMenuAction_mouseEntersMainMenuItem_handler = (state: mainMenuReducerType, action) =>
{
    let nextState: mainMenuReducerType = deepCopy(state);
    nextState.mainMenuItemModels[action.mainMenuItemIndex].mouseEnters();
    return nextState;
};

const mainMenuAction_mouseLeavesMainMenuItem_handler = (state: mainMenuReducerType, action) =>
{
    let nextState: mainMenuReducerType = deepCopy(state);
    nextState.mainMenuItemModels[action.mainMenuItemIndex].mouseLeaves();
    return nextState;
};

// Check reducerCreator for explanation of handlers
const mainMenuReducerHandlers = {
    [MAIN_MENU_ACTION_TYPE.MAIN_MENU_ACTION_INITIALIZE_MAIN_MENU_ITEM_MODELS]: mainMenuAction_initializeMainMenuItemModels_handler,
    [MAIN_MENU_ACTION_TYPE.MAIN_MENU_ACTION_MOUSE_CLICKS_MAIN_MENU_ITEM]: mainMenuAction_mouseClicksMainMenuItem_handler,
    [MAIN_MENU_ACTION_TYPE.MAIN_MENU_ACTION_MOUSE_ENTERS_MAIN_MENU_ITEM]: mainMenuAction_mouseEntersMainMenuItem_handler,
    [MAIN_MENU_ACTION_TYPE.MAIN_MENU_ACTION_MOUSE_LEAVES_MAIN_MENU_ITEM]: mainMenuAction_mouseLeavesMainMenuItem_handler,
};

export default createReducer(mainMenuReducerDefaultType, mainMenuReducerHandlers);