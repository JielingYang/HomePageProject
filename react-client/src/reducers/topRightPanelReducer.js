import {ID} from "../utilities/CONSTANTS_STRING";
import Shape2d_Point from "../classes/Shape2d_Point";
import Shape2d_Rectangle from "../classes/Shape2d_Rectangle";
import {deepCopy} from "../utilities/UTILITIES";
import {createReducer} from "./reducerCreator";
import {TOP_RIGHT_PANEL_ACTION_TYPE} from "../actionCreators/topRightPanelActions";

export type topRightPanelStateType = {
    topRightPanelShapeModel: Shape2d_Rectangle,
}

const topRightPanelDefaultState: topRightPanelStateType = {
    topRightPanelShapeModel: new Shape2d_Rectangle(4, ID.TOP_RIGHT_PANEL_ID, new Shape2d_Point(window.innerWidth / 2, 0), window.innerWidth / 2, window.innerHeight / 2)
};

const topRightPanelAction_updateTopRightPanelSize_handler = (state: topRightPanelStateType, action) =>
{
    let nextState = deepCopy(state);
    nextState.topRightPanelShapeModel.updateRectangleSize(action.newTopRightPanelWidth, action.newTopRightPanelHeight);
    return nextState;
};

const topRightPanelAction_updateTopRightPanelPosition_handler = (state: topRightPanelStateType, action) =>
{
    let nextState = deepCopy(state);
    nextState.topRightPanelShapeModel.updateTopLeftPoint(action.newPosition);
    return nextState;
};

// Check reducerCreator for explanation of handlers
const topRightPanelReducerHandlers = {
    [TOP_RIGHT_PANEL_ACTION_TYPE.TOP_RIGHT_PANEL_ACTION_UPDATE_TOP_RIGHT_PANEL_SIZE]: topRightPanelAction_updateTopRightPanelSize_handler,
    [TOP_RIGHT_PANEL_ACTION_TYPE.TOP_RIGHT_PANEL_ACTION_UPDATE_TOP_RIGHT_PANEL_POSITION]: topRightPanelAction_updateTopRightPanelPosition_handler
};


export default createReducer(topRightPanelDefaultState, topRightPanelReducerHandlers);