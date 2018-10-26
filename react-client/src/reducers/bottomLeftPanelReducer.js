import {ID} from "../utilities/CONSTANTS_STRING";
import Shape2d_Point from "../classes/shapeClasses/Shape2d_Point";
import Shape2d_Rectangle from "../classes/shapeClasses/Shape2d_Rectangle";
import {deepCopy} from "../utilities/UTILITIES";
import {createReducer} from "./reducerCreator";
import {BOTTOM_LEFT_PANEL_ACTION_TYPE} from "../actionCreators/bottomLeftPanelActions";
import numberIdGenerator from "../classes/NumberIdGenerator";

export type bottomLeftPanelStateType = {
    bottomLeftPanelShapeModel: Shape2d_Rectangle,
    bottomLeftPanelFocusOn: boolean,
    bottomLeftPanelPerspective: number,
    panelPadding: number,
    panelBorderSize: number,
    panelBorderRadius: number,
    panelBorderWidth: number,
    panelBorderHeight: number,
}

const bottomLeftPanelDefaultState: bottomLeftPanelStateType = {
    bottomLeftPanelShapeModel: new Shape2d_Rectangle(numberIdGenerator.generateId(), ID.BOTTOM_LEFT_PANEL_ID, new Shape2d_Point(0, window.innerHeight / 2), window.innerWidth, window.innerHeight / 2),
    bottomLeftPanelFocusOn: false,
    bottomLeftPanelPerspective: 800,
    panelPadding: 10,
    panelBorderSize: 0,
    panelBorderRadius: 0,
    panelBorderWidth: 0,
    panelBorderHeight: 0,
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


const bottomLeftPanelAction_updateBottomLeftPanelContentLayoutData_handler = (state: bottomLeftPanelStateType, action) =>
{
    let nextState = deepCopy(state);
    nextState.panelBorderWidth = action.bottomLeftPanelBorderWidth;
    nextState.panelBorderHeight = action.bottomLeftPanelBorderHeight;
    nextState.panelBorderSize = action.bottomLeftPanelBorderSize;
    nextState.panelBorderRadius = action.bottomLeftPanelBorderRadius;
    return nextState;
};

// Check reducerCreator for explanation of handlers
const bottomLeftPanelReducerHandlers = {
    [BOTTOM_LEFT_PANEL_ACTION_TYPE.BOTTOM_LEFT_PANEL_ACTION_UPDATE_BOTTOM_LEFT_PANEL_SIZE]: bottomLeftPanelAction_updateBottomLeftPanelSize_handler,
    [BOTTOM_LEFT_PANEL_ACTION_TYPE.BOTTOM_LEFT_PANEL_ACTION_UPDATE_BOTTOM_LEFT_PANEL_POSITION]: bottomLeftPanelAction_updateBottomLeftPanelPosition_handler,
    [BOTTOM_LEFT_PANEL_ACTION_TYPE.BOTTOM_LEFT_PANEL_ACTION_SET_BOTTOM_LEFT_PANEL_FOCUS_ON]: bottomLeftPanelAction_setBottomLeftPanelFocusOn_handler,
    [BOTTOM_LEFT_PANEL_ACTION_TYPE.BOTTOM_LEFT_PANEL_ACTION_UPDATE_BOTTOM_LEFT_PANEL_CONTENT_LAYOUT_DATA]: bottomLeftPanelAction_updateBottomLeftPanelContentLayoutData_handler,
};

export default createReducer(bottomLeftPanelDefaultState, bottomLeftPanelReducerHandlers);