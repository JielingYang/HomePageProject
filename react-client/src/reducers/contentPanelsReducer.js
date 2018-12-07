import {createReducer} from "./reducerCreator";
import {CONTENT_PANEL_ACTION_TYPE} from "../actionCreators/contentPanelActions";
import {deepCopy} from "../utilities/UTILITIES";
import BaseModelWithStateAndShape from "../classes/BaseModelWithStateAndShape";
import {CONTENT_PANEL_NAME} from "../utilities/CONSTANTS_STRING";
import numberIdGenerator from "../classes/NumberIdGenerator";

export type contentPanelsStateType = {
    contentPanelsModels: Array<BaseModelWithStateAndShape>,
}

const contentPanelsDefaultState: contentPanelsStateType = {
    contentPanelsModels: []
};

const contentPanelAction_initializeContentPanelsModels_handler = (state: contentPanelsStateType, action) =>
{
    let nextState: contentPanelsStateType = deepCopy(state);
    nextState.contentPanelsModels = action.contentPanelsIndices.map(() => new BaseModelWithStateAndShape(CONTENT_PANEL_NAME, numberIdGenerator.generateId(), 0, 0, 0, 0, 0));
    return nextState;
};

const contentPanelAction_updateContentPanelPositionAndSize_handler = (state: contentPanelsStateType, action) =>
{
    let nextState: contentPanelsStateType = deepCopy(state);
    let contentPanelModel: BaseModelWithStateAndShape = nextState.contentPanelsModels[action.contentPanelIndex];
    contentPanelModel.setX(action.x);
    contentPanelModel.setY(action.y);
    contentPanelModel.setZ(action.z);
    contentPanelModel.setWidth(action.width);
    contentPanelModel.setHeight(action.height);
    return nextState;
};

const contentPanelAction_mouseClicks_handler = (state: contentPanelsStateType, action) =>
{
    let nextState: contentPanelsStateType = deepCopy(state);
    let contentPanelModel: BaseModelWithStateAndShape = nextState.contentPanelsModels[action.contentPanelIndex];
    contentPanelModel.mouseClicks();
    return nextState;
};

const contentPanelAction_mouseEnters_handler = (state: contentPanelsStateType, action) =>
{
    let nextState: contentPanelsStateType = deepCopy(state);
    let contentPanelModel: BaseModelWithStateAndShape = nextState.contentPanelsModels[action.contentPanelIndex];
    contentPanelModel.mouseEnters();
    return nextState;
};

const contentPanelAction_mouseLeaves_handler = (state: contentPanelsStateType, action) =>
{
    let nextState: contentPanelsStateType = deepCopy(state);
    let contentPanelModel: BaseModelWithStateAndShape = nextState.contentPanelsModels[action.contentPanelIndex];
    contentPanelModel.mouseLeaves();
    return nextState;
};

// Check reducerCreator for explanation of handlers
const contentPanelsReducerHandlers = {
    [CONTENT_PANEL_ACTION_TYPE.CONTENT_PANEL_ACTION_INITIALIZE_CONTENT_PANELS_MODELS]: contentPanelAction_initializeContentPanelsModels_handler,
    [CONTENT_PANEL_ACTION_TYPE.CONTENT_PANEL_ACTION_UPDATE_CONTENT_PANEL_POSITION_AND_SIZE]: contentPanelAction_updateContentPanelPositionAndSize_handler,
    [CONTENT_PANEL_ACTION_TYPE.CONTENT_PANEL_ACTION_MOUSE_CLICKS]: contentPanelAction_mouseClicks_handler,
    [CONTENT_PANEL_ACTION_TYPE.CONTENT_PANEL_ACTION_MOUSE_ENTERS]: contentPanelAction_mouseEnters_handler,
    [CONTENT_PANEL_ACTION_TYPE.CONTENT_PANEL_ACTION_MOUSE_LEAVES]: contentPanelAction_mouseLeaves_handler,
};

export default createReducer(contentPanelsDefaultState, contentPanelsReducerHandlers);