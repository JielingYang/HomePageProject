import {ID} from "../utilities/CONSTANTS_STRING";
import Shape2d_Point from "../classes/shapeClasses/Shape2d_Point";
import Shape2d_Rectangle from "../classes/shapeClasses/Shape2d_Rectangle";
import {deepCopy, getObjectById} from "../utilities/UTILITIES";
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

    enginePartSize: number,
    engineDistance: number,
    engineRotationX: number,
    engineRotationY: number,
    enginePartStateModels: Array<EnginePartStateModel>
}

const bottomRightPanelDefaultState: bottomRightPanelStateType = {
    bottomRightPanelShapeModel: new Shape2d_Rectangle(numberIdGenerator.generateId(), ID.BOTTOM_RIGHT_PANEL_ID, new Shape2d_Point(window.innerWidth / 2, window.innerHeight / 2), window.innerWidth / 2, window.innerHeight / 2),
    bottomRightPanelFocusOn: false,
    bottomRightPanelPerspective: 0,
    panelPadding: 10,
    panelBorderSize: 0,
    panelBorderRadius: 0,
    panelBorderWidth: 0,
    panelBorderHeight: 0,

    enginePartSize: 0,
    engineDistance: 0,
    engineRotationX: 0,
    engineRotationY: 0,
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
    return nextState;
};

const bottomRightPanelAction_setEnginePartStateModels_handler = (state: bottomRightPanelStateType, action) =>
{
    let nextState = deepCopy(state);
    nextState.enginePartStateModels = action.enginePartStateModels;
    return nextState;
};

const bottomRightPanelAction_updateEnginePartSize_handler = (state: bottomRightPanelStateType, action) =>
{
    let nextState = deepCopy(state);
    nextState.enginePartSize = action.enginePartSize;
    return nextState;
};

const bottomRightPanelAction_updateEngineDistance_handler = (state: bottomRightPanelStateType, action) =>
{
    let nextState = deepCopy(state);
    nextState.engineDistance = action.engineDistance;
    return nextState;
};

const bottomRightPanelAction_updateEngineRotation_handler = (state: bottomRightPanelStateType, action) =>
{
    let nextState = deepCopy(state);;
    nextState.engineRotationX = action.engineRotationX;
    nextState.engineRotationY = action.engineRotationY;
    return nextState;
};

const bottomRightPanelAction_updateEnginePartStateModelPosition_handler = (state: bottomRightPanelStateType, action) =>
{
    let nextState = deepCopy(state);
    getObjectById(nextState.enginePartStateModels, action.stateModelId).setPosition(action.position);
    return nextState;
};

const bottomRightPanelAction_setMouseHoverOnEnginePart_handler = (state: bottomRightPanelStateType, action) =>
{
    let nextState = deepCopy(state);
    nextState.enginePartStateModels[action.engineIndex].setMouseHover(action.hover);
    return nextState;

};

const bottomRightPanelAction_setPerspective_handler = (state: bottomRightPanelStateType, action) =>
{
    let nextState = deepCopy(state);
    nextState.bottomRightPanelPerspective = action.bottomRightPanelPerspective;
    return nextState;
};

// Check reducerCreator for explanation of handlers
const bottomRightPanelReducerHandlers = {
    [BOTTOM_RIGHT_PANEL_ACTION_TYPE.BOTTOM_RIGHT_PANEL_ACTION_UPDATE_BOTTOM_RIGHT_PANEL_SIZE]: bottomRightPanelAction_updateBottomRightPanelSize_handler,
    [BOTTOM_RIGHT_PANEL_ACTION_TYPE.BOTTOM_RIGHT_PANEL_ACTION_UPDATE_BOTTOM_RIGHT_PANEL_POSITION]: bottomRightPanelAction_updateBottomRightPanelPosition_handler,
    [BOTTOM_RIGHT_PANEL_ACTION_TYPE.BOTTOM_RIGHT_PANEL_ACTION_SET_BOTTOM_RIGHT_PANEL_FOCUS_ON]: bottomRightPanelAction_setBottomRightPanelFocusOn_handler,
    [BOTTOM_RIGHT_PANEL_ACTION_TYPE.BOTTOM_RIGHT_PANEL_ACTION_UPDATE_BOTTOM_RIGHT_PANEL_CONTENT_LAYOUT_DATA]: bottomRightPanelAction_updateBottomRightPanelContentLayoutData_handler,
    [BOTTOM_RIGHT_PANEL_ACTION_TYPE.BOTTOM_RIGHT_PANEL_ACTION_SET_ENGINE_PART_STATE_MODELS]: bottomRightPanelAction_setEnginePartStateModels_handler,
    [BOTTOM_RIGHT_PANEL_ACTION_TYPE.BOTTOM_RIGHT_PANEL_ACTION_UPDATE_ENGINE_DISTANCE]: bottomRightPanelAction_updateEngineDistance_handler,
    [BOTTOM_RIGHT_PANEL_ACTION_TYPE.BOTTOM_RIGHT_PANEL_ACTION_UPDATE_ENGINE_ROTATION]: bottomRightPanelAction_updateEngineRotation_handler,
    [BOTTOM_RIGHT_PANEL_ACTION_TYPE.BOTTOM_RIGHT_PANEL_ACTION_UPDATE_ENGINE_PART_STATE_MODEL_Z_POSITION]: bottomRightPanelAction_updateEnginePartStateModelPosition_handler,
    [BOTTOM_RIGHT_PANEL_ACTION_TYPE.BOTTOM_RIGHT_PANEL_ACTION_SET_MOUSE_HOVER_ON_ENGINE_PART]: bottomRightPanelAction_setMouseHoverOnEnginePart_handler,
    [BOTTOM_RIGHT_PANEL_ACTION_TYPE.BOTTOM_RIGHT_PANEL_ACTION_UPDATE_ENGINE_PART_SIZE]: bottomRightPanelAction_updateEnginePartSize_handler,
    [BOTTOM_RIGHT_PANEL_ACTION_TYPE.BOTTOM_RIGHT_PANEL_ACTION_SET_PERSPECTIVE]: bottomRightPanelAction_setPerspective_handler,
};

export default createReducer(bottomRightPanelDefaultState, bottomRightPanelReducerHandlers);