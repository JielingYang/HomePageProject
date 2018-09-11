import {BASE_PANEL_ACTION_TYPE} from "../actionCreators/basePanelActions";
import Shape2d_Rectangle from "../classes/Shape2d_Rectangle";
import {ID_CONSTANTS} from "../utilities/CONSTANTS_ID";
import Shape2d_Point from "../classes/Shape2d_Point";
import {createReducer, deepCopy} from "./reducerCreator";

export type basePanelStateType = {
    basePanelShapeModel: Shape2d_Rectangle,
    basePanelTranslatePercentageX: String,
    basePanelTranslatePercentageY: String,
    basePanelRotationX: String,
    basePanelRotationY: String,
    basePanelFocusPointPercentageY: String,
    basePanelFocusPointPercentageX: String,
}

const basePanelDefaultState: basePanelStateType = {
    basePanelShapeModel: new Shape2d_Rectangle(1, ID_CONSTANTS.BASE_PANEL_COMPONENT, new Shape2d_Point(0, 0), window.innerWidth, window.innerHeight),
    basePanelTranslatePercentageX: "0%",
    basePanelTranslatePercentageY: "0%",
    basePanelRotationX: "0%",
    basePanelRotationY: "0%",
    basePanelFocusPointPercentageY: "50%",
    basePanelFocusPointPercentageX: "50%",
};

const basePanelAction_updateBasePanelSize_handler = (state: basePanelStateType, action) =>
{
    let nextState = deepCopy(state);
    nextState.basePanelShapeModel.updateRectangleSize(action.newBasePanelWidth, action.newBasePanelHeight);
    return nextState;
};

const basePanelAction_updateBasePanelTransformAndFocusPoint_handler = (state: basePanelStateType, action) =>
{
    let nextState = deepCopy(state);
    nextState.basePanelTranslatePercentageX = action.basePanelTranslatePercentageX;
    nextState.basePanelTranslatePercentageY = action.basePanelTranslatePercentageY;
    nextState.basePanelRotationX = action.basePanelRotationX;
    nextState.basePanelRotationY = action.basePanelRotationY;
    nextState.basePanelFocusPointPercentageX = action.basePanelFocusPointPercentageX;
    nextState.basePanelFocusPointPercentageY = action.basePanelFocusPointPercentageY;
    return nextState;
};

// Check reducerCreator for explanation of handlers
const basePanelReducerHandlers = {
    [BASE_PANEL_ACTION_TYPE.BASE_PANEL_ACTION_UPDATE_BASE_PANEL_TRANSFORM_AND_FOCUS_POINT]: basePanelAction_updateBasePanelTransformAndFocusPoint_handler,
    [BASE_PANEL_ACTION_TYPE.BASE_PANEL_ACTION_UPDATE_BASE_PANEL_SIZE]: basePanelAction_updateBasePanelSize_handler,
};

export default createReducer(basePanelDefaultState, basePanelReducerHandlers);