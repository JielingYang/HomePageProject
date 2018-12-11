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
    nextState.mainMenuItemModels = action.mainMenuItemsIndices.map(() => new BaseModelWithState(MAIN_MENU_ITEM_NAME, numberIdGenerator.generateId()));
    return nextState;
};

// Check reducerCreator for explanation of handlers
const mainMenuReducerHandlers = {
    [MAIN_MENU_ACTION_TYPE.MAIN_MENU_ACTION_INITIALIZE_MAIN_MENU_ITEM_MODELS]: mainMenuAction_initializeMainMenuItemModels_handler,
};

export default createReducer(mainMenuReducerDefaultType, mainMenuReducerHandlers);