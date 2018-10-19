import {ID} from "../utilities/CONSTANTS_STRING";
import Shape2d_Point from "../classes/Shape2d_Point";
import Shape2d_Rectangle from "../classes/Shape2d_Rectangle";
import {deepCopy} from "../utilities/UTILITIES";
import {createReducer} from "./reducerCreator";
import {BOTTOM_LEFT_PANEL_ACTION_TYPE} from "../actionCreators/bottomLeftPanelActions";
import numberIdGenerator from "../classes/NumberIdGenerator";

export type bottomLeftPanelStateType = {
    bottomLeftPanelShapeModel: Shape2d_Rectangle,
    bottomLeftPanelFocusOn: boolean
}

const bottomLeftPanelDefaultState: bottomLeftPanelStateType = {
    bottomLeftPanelShapeModel: new Shape2d_Rectangle(numberIdGenerator.generateId(), ID.BOTTOM_LEFT_PANEL_ID, new Shape2d_Point(0, window.innerHeight / 2), window.innerWidth / 2, window.innerHeight / 2),
    bottomLeftPanelFocusOn: false,
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

const bottomLeftPanelAction_setBottomLeftPanelFocusOn_handler = (state: bottomLeftPanelStateType, action) =>
{
    let nextState = deepCopy(state);
    nextState.bottomLeftPanelFocusOn = action.focusOn;
    return nextState;
};

// Check reducerCreator for explanation of handlers
const bottomLeftPanelReducerHandlers = {
    [BOTTOM_LEFT_PANEL_ACTION_TYPE.BOTTOM_LEFT_PANEL_ACTION_UPDATE_BOTTOM_LEFT_PANEL_SIZE]: bottomLeftPanelAction_updateBottomLeftPanelSize_handler,
    [BOTTOM_LEFT_PANEL_ACTION_TYPE.BOTTOM_LEFT_PANEL_ACTION_UPDATE_BOTTOM_LEFT_PANEL_POSITION]: bottomLeftPanelAction_updateBottomLeftPanelPosition_handler,
    [BOTTOM_LEFT_PANEL_ACTION_TYPE.BOTTOM_LEFT_PANEL_ACTION_SET_BOTTOM_LEFT_PANEL_FOCUS_ON]: bottomLeftPanelAction_setBottomLeftPanelFocusOn_handler,
};

export default createReducer(bottomLeftPanelDefaultState, bottomLeftPanelReducerHandlers);