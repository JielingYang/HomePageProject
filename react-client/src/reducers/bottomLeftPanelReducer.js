import {ID} from "../utilities/CONSTANTS_STRING";
import Shape2d_Point from "../classes/Shape2d_Point";
import Shape2d_Rectangle from "../classes/Shape2d_Rectangle";
import {deepCopy} from "../utilities/UTILITIES";
import {createReducer} from "./reducerCreator";
import {BOTTOM_LEFT_PANEL_ACTION_TYPE} from "../actionCreators/bottomLeftPanelActions";

export type bottomLeftPanelStateType = {
    bottomLeftPanelShapeModel: Shape2d_Rectangle,
}

const bottomLeftPanelDefaultState: bottomLeftPanelStateType = {
    bottomLeftPanelShapeModel: new Shape2d_Rectangle(5, ID.BOTTOM_LEFT_PANEL_ID, new Shape2d_Point(0, window.innerHeight / 2), window.innerWidth / 2, window.innerHeight / 2),
};

const bottomLeftPanelAction_updateBottomLeftPanelSize_handler = (state: bottomLeftPanelStateType, action) =>
{
    let nextState = deepCopy(state);
    nextState.bottomLeftPanelShapeModel.updateRectangleSize(action.newBottomLeftPanelWidth, action.newBottomLeftPanelHeight);
    return nextState;
};

const bottomLeftPanelAction_updateBottomLeftPanelPosition_handler = (state: bottomLeftPanelStateType, action) =>
{
    let nextState = deepCopy(state);
    nextState.bottomLeftPanelShapeModel.updateTopLeftPoint(action.newPosition);
    return nextState;
};

// Check reducerCreator for explanation of handlers
const bottomLeftPanelReducerHandlers = {
    [BOTTOM_LEFT_PANEL_ACTION_TYPE.BOTTOM_LEFT_PANEL_ACTION_UPDATE_BOTTOM_LEFT_PANEL_SIZE]: bottomLeftPanelAction_updateBottomLeftPanelSize_handler,
    [BOTTOM_LEFT_PANEL_ACTION_TYPE.BOTTOM_LEFT_PANEL_ACTION_UPDATE_BOTTOM_LEFT_PANEL_POSITION]: bottomLeftPanelAction_updateBottomLeftPanelPosition_handler
};

export default createReducer(bottomLeftPanelDefaultState, bottomLeftPanelReducerHandlers);