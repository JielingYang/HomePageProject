import {ID} from "../utilities/CONSTANTS_STRING";
import Shape2d_Point from "../classes/Shape2d_Point";
import Shape2d_Rectangle from "../classes/Shape2d_Rectangle";
import {createReducer, deepCopy} from "./reducerCreator";
import {BOTTOM_LEFT_PANEL_ACTION_TYPE} from "../actionCreators/bottomLeftPanelActions";
import {BLUR_LEVEL} from "../utilities/CONSTANTS_NUMBER";

export type bottomLeftPanelStateType = {
    bottomLeftPanelShapeModel: Shape2d_Rectangle,
    bottomLeftPanelBlurLevel: BLUR_LEVEL,
}

const bottomLeftPanelDefaultState: bottomLeftPanelStateType = {
    bottomLeftPanelShapeModel: new Shape2d_Rectangle(5, ID.BOTTOM_LEFT_PANEL_ID, new Shape2d_Point(0, window.innerHeight / 2), window.innerWidth / 2, window.innerHeight / 2),
    bottomLeftPanelBlurLevel: BLUR_LEVEL.NONE
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