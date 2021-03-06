import {BASE_PANEL_ACTION_TYPE} from "../actionCreators/basePanelActions";
import Shape2d_Rectangle from "../classes/shapeClasses/Shape2d_Rectangle";
import Shape2d_Point from "../classes/shapeClasses/Shape2d_Point";
import {deepCopy} from "../utilities/UTILITIES";
import {createReducer} from "./reducerCreator";
import {ID} from "../utilities/CONSTANTS_STRING";
import numberIdGenerator from "../classes/NumberIdGenerator";

export type basePanelStateType = {
    basePanelShapeModel: Shape2d_Rectangle,
    basePanelTranslatePercentageX: string,
    basePanelTranslatePercentageY: string,
    basePanelRotationX: number,
    basePanelRotationY: number,
    basePanelMouseFocusOn: boolean,
    basePanelMouseFocusPercentageY: string,
    basePanelMouseFocusPercentageX: string,
    basePanelMouseFocusRadiance: string,
}

const basePanelDefaultState: basePanelStateType = {
    basePanelShapeModel: new Shape2d_Rectangle(numberIdGenerator.generateId(), ID.BASE_PANEL_ID, new Shape2d_Point(0, 0), window.innerWidth, window.innerHeight),
    basePanelTranslatePercentageX: "0%",
    basePanelTranslatePercentageY: "0%",
    basePanelRotationX: 0,
    basePanelRotationY: 0,
    basePanelMouseFocusOn: false,
    basePanelMouseFocusPercentageY: "50%",
    basePanelMouseFocusPercentageX: "50%",
    basePanelMouseFocusRadiance: "20%",
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
    nextState.basePanelMouseFocusPercentageX = action.basePanelMouseFocusPercentageX;
    nextState.basePanelMouseFocusPercentageY = action.basePanelMouseFocusPercentageY;
    return nextState;
};

// Check reducerCreator for explanation of handlers
const basePanelReducerHandlers = {
    [BASE_PANEL_ACTION_TYPE.BASE_PANEL_ACTION_UPDATE_BASE_PANEL_SIZE]: basePanelAction_updateBasePanelSize_handler,
    [BASE_PANEL_ACTION_TYPE.BASE_PANEL_ACTION_UPDATE_BASE_PANEL_TRANSFORM_AND_FOCUS_POINT]: basePanelAction_updateBasePanelTransformAndFocusPoint_handler,
};

export default createReducer(basePanelDefaultState, basePanelReducerHandlers);