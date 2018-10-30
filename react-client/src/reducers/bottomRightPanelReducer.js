import {ID} from "../utilities/CONSTANTS_STRING";
import Shape2d_Point from "../classes/shapeClasses/Shape2d_Point";
import Shape2d_Rectangle from "../classes/shapeClasses/Shape2d_Rectangle";
import {deepCopy} from "../utilities/UTILITIES";
import {createReducer} from "./reducerCreator";
import {BOTTOM_RIGHT_PANEL_ACTION_TYPE} from "../actionCreators/bottomRightPanelActions";
import numberIdGenerator from "../classes/NumberIdGenerator";
import EnginePartStateModel from "../classes/StateModelClasses/EnginePartStateModel";

export type bottomRightPanelStateType = {
    bottomRightPanelShapeModel: Shape2d_Rectangle,
    bottomRightPanelFocusOn: boolean,
    bottomRightPanelPerspective: number,
    panelPadding: number,
    panelBorderSize: number,
    panelBorderRadius: number,
    panelBorderWidth: number,
    panelBorderHeight: number,

    engineDistance: number,
    engineRotation: number,
    enginePartStateModels: Array<EnginePartStateModel>
}

const bottomRightPanelDefaultState: bottomRightPanelStateType = {
    bottomRightPanelShapeModel: new Shape2d_Rectangle(numberIdGenerator.generateId(), ID.BOTTOM_RIGHT_PANEL_ID, new Shape2d_Point(window.innerWidth / 2, window.innerHeight / 2), window.innerWidth / 2, window.innerHeight / 2),
    bottomRightPanelFocusOn: false,
    bottomRightPanelPerspective: 800,
    panelPadding: 10,
    panelBorderSize: 0,
    panelBorderRadius: 0,
    panelBorderWidth: 0,
    panelBorderHeight: 0,

    engineDistance: 0,
    engineRotation: 0,
    enginePartStateModels: [],
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

const bottomRightPanelAction_updateBottomRightPanelContentLayoutData_handler = (state: bottomRightPanelStateType, action) =>
{
    let nextState = deepCopy(state);
    nextState.panelBorderWidth = action.bottomRightPanelBorderWidth;
    nextState.panelBorderHeight = action.bottomRightPanelBorderHeight;
    nextState.panelBorderSize = action.bottomRightPanelBorderSize;
    nextState.panelBorderRadius = action.bottomRightPanelBorderRadius;
    nextState.engineDistance = action.engineDistance;
    nextState.engineRotation = action.engineRotation;
    nextState.enginePartStateModels = action.enginePartStateModels;
    return nextState;
};

// Check reducerCreator for explanation of handlers
const bottomRightPanelReducerHandlers = {
    [BOTTOM_RIGHT_PANEL_ACTION_TYPE.BOTTOM_RIGHT_PANEL_ACTION_UPDATE_BOTTOM_RIGHT_PANEL_SIZE]: bottomRightPanelAction_updateBottomRightPanelSize_handler,
    [BOTTOM_RIGHT_PANEL_ACTION_TYPE.BOTTOM_RIGHT_PANEL_ACTION_UPDATE_BOTTOM_RIGHT_PANEL_POSITION]: bottomRightPanelAction_updateBottomRightPanelPosition_handler,
    [BOTTOM_RIGHT_PANEL_ACTION_TYPE.BOTTOM_RIGHT_PANEL_ACTION_SET_BOTTOM_RIGHT_PANEL_FOCUS_ON]: bottomRightPanelAction_setBottomRightPanelFocusOn_handler,
    [BOTTOM_RIGHT_PANEL_ACTION_TYPE.BOTTOM_RIGHT_PANEL_ACTION_UPDATE_BOTTOM_RIGHT_PANEL_CONTENT_LAYOUT_DATA]: bottomRightPanelAction_updateBottomRightPanelContentLayoutData_handler,
};

export default createReducer(bottomRightPanelDefaultState, bottomRightPanelReducerHandlers);