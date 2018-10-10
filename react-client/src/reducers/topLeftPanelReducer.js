import {ID} from "../utilities/CONSTANTS_STRING";
import Shape2d_Point from "../classes/Shape2d_Point";
import Shape2d_Rectangle from "../classes/Shape2d_Rectangle";
import {deepCopy} from "../utilities/UTILITIES";
import {createReducer} from "./reducerCreator";
import {TOP_LEFT_PANEL_ACTION_TYPE} from "../actionCreators/topLeftPanelActions";
import {BLUR_LEVEL} from "../utilities/CONSTANTS_NUMBER";

export type topLeftPanelStateType = {
    topLeftPanelShapeModel: Shape2d_Rectangle,
    topLeftPanelBlurLevel: BLUR_LEVEL,
}

const topLeftPanelDefaultState: topLeftPanelStateType = {
    topLeftPanelShapeModel: new Shape2d_Rectangle(3, ID.TOP_LEFT_PANEL_ID, new Shape2d_Point(0, 0), window.innerWidth / 2, window.innerHeight / 2),
    topLeftPanelBlurLevel: BLUR_LEVEL.NONE
};

const topLeftPanelAction_updateTopLeftPanelSize_handler = (state: topLeftPanelStateType, action) =>
{
    let nextState = deepCopy(state);
    nextState.topLeftPanelShapeModel.updateRectangleSize(action.newTopLeftPanelWidth, action.newTopLeftPanelHeight);
    return nextState;
};

const topLeftPanelAction_updateTopLeftPanelPosition_handler = (state: topLeftPanelStateType, action) =>
{
    let nextState = deepCopy(state);
    nextState.topLeftPanelShapeModel.updateTopLeftPoint(action.newPosition);
    return nextState;
};

// Check reducerCreator for explanation of handlers
const topLeftPanelReducerHandlers = {
    [TOP_LEFT_PANEL_ACTION_TYPE.TOP_LEFT_PANEL_ACTION_UPDATE_TOP_LEFT_PANEL_SIZE]: topLeftPanelAction_updateTopLeftPanelSize_handler,
    [TOP_LEFT_PANEL_ACTION_TYPE.TOP_LEFT_PANEL_ACTION_UPDATE_TOP_LEFT_PANEL_POSITION]: topLeftPanelAction_updateTopLeftPanelPosition_handler
};

export default createReducer(topLeftPanelDefaultState, topLeftPanelReducerHandlers);