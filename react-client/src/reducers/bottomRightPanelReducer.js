import {ID} from "../utilities/CONSTANTS_STRING";
import Shape2d_Point from "../classes/Shape2d_Point";
import Shape2d_Rectangle from "../classes/Shape2d_Rectangle";
import {deepCopy} from "../utilities/UTILITIES";
import {createReducer} from "./reducerCreator";
import {BOTTOM_RIGHT_PANEL_ACTION_TYPE} from "../actionCreators/bottomRightPanelActions";

export type bottomRightPanelStateType = {
    bottomRightPanelShapeModel: Shape2d_Rectangle,
}

const bottomRightPanelDefaultState: bottomRightPanelStateType = {
    bottomRightPanelShapeModel: new Shape2d_Rectangle(6, ID.BOTTOM_RIGHT_PANEL_ID, new Shape2d_Point(window.innerWidth / 2, window.innerHeight / 2), window.innerWidth / 2, window.innerHeight / 2)
};

const bottomRightPanelAction_updateBottomRightPanelSize_handler = (state: bottomRightPanelStateType, action) =>
{
    let nextState = deepCopy(state);
    nextState.bottomRightPanelShapeModel.updateRectangleSize(action.newBottomRightPanelWidth, action.newBottomRightPanelHeight);
    return nextState;
};

const bottomRightPanelAction_updateBottomRightPanelPosition_handler = (state: bottomRightPanelStateType, action) =>
{
    let nextState = deepCopy(state);
    nextState.bottomRightPanelShapeModel.updateTopLeftPoint(action.newPosition);
    return nextState;
};

// Check reducerCreator for explanation of handlers
const bottomRightPanelReducerHandlers = {
    [BOTTOM_RIGHT_PANEL_ACTION_TYPE.BOTTOM_RIGHT_PANEL_ACTION_UPDATE_BOTTOM_RIGHT_PANEL_SIZE]: bottomRightPanelAction_updateBottomRightPanelSize_handler,
    [BOTTOM_RIGHT_PANEL_ACTION_TYPE.BOTTOM_RIGHT_PANEL_ACTION_UPDATE_BOTTOM_RIGHT_PANEL_POSITION]: bottomRightPanelAction_updateBottomRightPanelPosition_handler
};

export default createReducer(bottomRightPanelDefaultState, bottomRightPanelReducerHandlers);