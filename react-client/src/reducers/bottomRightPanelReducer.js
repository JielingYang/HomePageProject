import {ID} from "../utilities/CONSTANTS_STRING";
import Shape2d_Point from "../classes/shapeClasses/Shape2d_Point";
import Shape2d_Rectangle from "../classes/shapeClasses/Shape2d_Rectangle";
import {deepCopy} from "../utilities/UTILITIES";
import {createReducer} from "./reducerCreator";
import {BOTTOM_RIGHT_PANEL_ACTION_TYPE} from "../actionCreators/bottomRightPanelActions";
import numberIdGenerator from "../classes/NumberIdGenerator";

export type bottomRightPanelStateType = {
    bottomRightPanelShapeModel: Shape2d_Rectangle,
    bottomRightPanelFocusOn: boolean
}

const bottomRightPanelDefaultState: bottomRightPanelStateType = {
    bottomRightPanelShapeModel: new Shape2d_Rectangle(numberIdGenerator.generateId(), ID.BOTTOM_RIGHT_PANEL_ID, new Shape2d_Point(window.innerWidth / 2, window.innerHeight / 2), window.innerWidth / 2, window.innerHeight / 2),
    bottomRightPanelFocusOn: false,
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

const bottomRightPanelAction_setBottomRightPanelFocusOn_handler = (state: bottomRightPanelStateType, action) =>
{
    let nextState = deepCopy(state);
    nextState.bottomRightPanelFocusOn = action.focusOn;
    return nextState;
};

// Check reducerCreator for explanation of handlers
const bottomRightPanelReducerHandlers = {
    [BOTTOM_RIGHT_PANEL_ACTION_TYPE.BOTTOM_RIGHT_PANEL_ACTION_UPDATE_BOTTOM_RIGHT_PANEL_SIZE]: bottomRightPanelAction_updateBottomRightPanelSize_handler,
    [BOTTOM_RIGHT_PANEL_ACTION_TYPE.BOTTOM_RIGHT_PANEL_ACTION_UPDATE_BOTTOM_RIGHT_PANEL_POSITION]: bottomRightPanelAction_updateBottomRightPanelPosition_handler,
    [BOTTOM_RIGHT_PANEL_ACTION_TYPE.BOTTOM_RIGHT_PANEL_ACTION_SET_BOTTOM_RIGHT_PANEL_FOCUS_ON]: bottomRightPanelAction_setBottomRightPanelFocusOn_handler,
};

export default createReducer(bottomRightPanelDefaultState, bottomRightPanelReducerHandlers);