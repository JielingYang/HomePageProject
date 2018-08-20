import {BASE_PANEL_ACTION_TYPE} from "../actionCreators/basePanelActions";
import Shape2d_Rectangle from "../classes/Shape2d_Rectangle";
import {ID_CONSTANTS} from "../utilities/CONSTANTS_ID";
import Shape2d_Point from "../classes/Shape2d_Point";
import {deepCopy} from "./reducerCreator";

const basePanelDefaultState = {
    basePanelShapeModel: new Shape2d_Rectangle(0, ID_CONSTANTS.BASE_PANEL_COMPONENT, new Shape2d_Point(0, 0), window.innerWidth, window.innerHeight),
    basePanelTranslatePercentageX: "0",
    basePanelTranslatePercentageY: "0",
    basePanelRotationX: "0",
    basePanelRotationY: "0",
    basePanelFocusPointPercentageY: "50",
    basePanelFocusPointPercentageX: "50",
    basePanelObjects: [],
};

const basePanelAction_UpdateBasePanelSize_handler = (state, action) =>
{
    let nextState = deepCopy(state);
    nextState.basePanelShapeModel.updateRectangleSize(action.newBasePanelWidth, action.newBasePanelHeight);
    return nextState;
};

const basePanelAction_UpdateTransformAndFocusPoint_handler = (state, action) =>
{
    // Update state only if new values are different from previous ones
    if (state.basePanelTranslatePercentageX !== action.translatePercentageX ||
        state.basePanelTranslatePercentageY !== action.translatePercentageY ||
        state.basePanelRotationX !== action.rotationX ||
        state.basePanelRotationY !== action.rotationY ||
        state.basePanelFocusPointPercentageX !== action.focusPointPercentageX ||
        state.basePanelFocusPointPercentageY !== action.focusPointPercentageY)
    {
        let nextState = deepCopy(state);
        nextState.basePanelTranslatePercentageX = action.translatePercentageX;
        nextState.basePanelTranslatePercentageY = action.translatePercentageY;
        nextState.basePanelRotationX = action.rotationX;
        nextState.basePanelRotationY = action.rotationY;
        nextState.basePanelFocusPointPercentageX = action.focusPointPercentageX;
        nextState.basePanelFocusPointPercentageY = action.focusPointPercentageY;
        return nextState;
    }

    // No need to update state if new values are same with previous ones
    return state;
};

// Check reducerCreator for explanation of handlers
const basePanelReducerHandlers = {
    [BASE_PANEL_ACTION_TYPE.BASE_PANEL_ACTION_UPDATE_TRANSFORM_AND_FOCUS_POINT]: basePanelAction_UpdateTransformAndFocusPoint_handler,
    [BASE_PANEL_ACTION_TYPE.BASE_PANEL_ACTION_UPDATE_BASE_PANEL_SIZE]: basePanelAction_UpdateBasePanelSize_handler,
};

export default createReducer(basePanelDefaultState, basePanelReducerHandlers);