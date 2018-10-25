import {ID} from "../utilities/CONSTANTS_STRING";
import Shape2d_Point from "../classes/shapeClasses/Shape2d_Point";
import Shape2d_Rectangle from "../classes/shapeClasses/Shape2d_Rectangle";
import {deepCopy} from "../utilities/UTILITIES";
import {createReducer} from "./reducerCreator";
import {TOP_LEFT_PANEL_ACTION_TYPE} from "../actionCreators/topLeftPanelActions";
import numberIdGenerator from "../classes/NumberIdGenerator";

export type topLeftPanelStateType = {
    topLeftPanelShapeModel: Shape2d_Rectangle,
    topLeftPanelFocusOn: boolean,
    panelPadding: number,
    panelBorderSize: number,
    panelBorderRadius: number,
    panelBorderWidth: number,
    panelBorderHeight: number,
}

const topLeftPanelDefaultState: topLeftPanelStateType = {
    topLeftPanelShapeModel: new Shape2d_Rectangle(numberIdGenerator.generateId(), ID.TOP_LEFT_PANEL_ID, new Shape2d_Point(0, 0), window.innerWidth / 2, window.innerHeight / 2),
    topLeftPanelFocusOn: false,
    panelPadding: 10,
    panelBorderSize: 0,
    panelBorderRadius: 0,
    panelBorderWidth: 0,
    panelBorderHeight: 0,
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

const topLeftPanelAction_setTopLeftPanelFocusOn_handler = (state: topLeftPanelStateType, action) =>
{
    let nextState = deepCopy(state);
    nextState.topLeftPanelFocusOn = action.focusOn;
    return nextState;
};

const topLeftPanelAction_updateTopLeftPanelContentLayoutData_handler = (state: topLeftPanelStateType, action) =>
{
    let nextState = deepCopy(state);
    nextState.panelBorderWidth = action.topLeftPanelBorderWidth;
    nextState.panelBorderHeight = action.topLeftPanelBorderHeight;
    nextState.panelBorderSize = action.topLeftPanelBorderSize;
    nextState.panelBorderRadius = action.topLeftPanelBorderRadius;
    return nextState;
};

// Check reducerCreator for explanation of handlers
const topLeftPanelReducerHandlers = {
    [TOP_LEFT_PANEL_ACTION_TYPE.TOP_LEFT_PANEL_ACTION_UPDATE_TOP_LEFT_PANEL_SIZE]: topLeftPanelAction_updateTopLeftPanelSize_handler,
    [TOP_LEFT_PANEL_ACTION_TYPE.TOP_LEFT_PANEL_ACTION_UPDATE_TOP_LEFT_PANEL_POSITION]: topLeftPanelAction_updateTopLeftPanelPosition_handler,
    [TOP_LEFT_PANEL_ACTION_TYPE.TOP_LEFT_PANEL_ACTION_SET_TOP_LEFT_PANEL_FOCUS_ON]: topLeftPanelAction_setTopLeftPanelFocusOn_handler,
    [TOP_LEFT_PANEL_ACTION_TYPE.TOP_LEFT_PANEL_ACTION_UPDATE_TOP_LEFT_PANEL_CONTENT_LAYOUT_DATA]: topLeftPanelAction_updateTopLeftPanelContentLayoutData_handler,
};

export default createReducer(topLeftPanelDefaultState, topLeftPanelReducerHandlers);