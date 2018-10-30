import Shape2d_Point from "../classes/shapeClasses/Shape2d_Point";
import type {topLeftPanelStateType} from "../reducers/topLeftPanelReducer";
import Shape2d_Rectangle from "../classes/shapeClasses/Shape2d_Rectangle";

/* ************************** Requesting actions ************************** */
/* This kind of actions do not send new data directly to reducer            */
/* They check on new data to decide whether to call updating actions or not */
/* ************************************************************************ */

export const topLeftPanelAction_requestToUpdateTopLeftPanelContentLayoutData = () =>
{
    return (dispatch, getState) =>
    {
        let topLeftPanelState: topLeftPanelStateType = getState().topLeftPanelState;
        let basePanelUnitLength: number = getState().basePanelState.basePanelShapeModel.getUnitLengthSmall();
        let topLeftPanelShapeModel: Shape2d_Rectangle = topLeftPanelState.topLeftPanelShapeModel;
        let topLeftPanelPadding: number = topLeftPanelState.panelPadding;

        let topLeftPanelBorderWidth: number = topLeftPanelShapeModel.getWidth() - 2 * topLeftPanelPadding;
        let topLeftPanelBorderHeight: number = topLeftPanelShapeModel.getHeight() - 2 * topLeftPanelPadding;
        let topLeftPanelBorderSize: number = basePanelUnitLength * 0.5;
        let topLeftPanelBorderRadius: number = basePanelUnitLength * 3;

        dispatch(topLeftPanelAction_updateTopLeftPanelContentLayoutData(topLeftPanelBorderWidth, topLeftPanelBorderHeight, topLeftPanelBorderSize, topLeftPanelBorderRadius));
    }
};

/* **************************** Updating actions ***************************** */
/* This kind of actions send new data to reducer directly and contain no logic */
/* *************************************************************************** */

export const TOP_LEFT_PANEL_ACTION_TYPE = Object.freeze({
    TOP_LEFT_PANEL_ACTION_UPDATE_TOP_LEFT_PANEL_SIZE: "TOP_LEFT_PANEL_ACTION_UPDATE_TOP_LEFT_PANEL_SIZE",
    TOP_LEFT_PANEL_ACTION_UPDATE_TOP_LEFT_PANEL_POSITION: "TOP_LEFT_PANEL_ACTION_UPDATE_TOP_LEFT_PANEL_POSITION",
    TOP_LEFT_PANEL_ACTION_SET_TOP_LEFT_PANEL_FOCUS_ON: "TOP_LEFT_PANEL_ACTION_SET_TOP_LEFT_PANEL_FOCUS_ON",
    TOP_LEFT_PANEL_ACTION_UPDATE_TOP_LEFT_PANEL_CONTENT_LAYOUT_DATA: "TOP_LEFT_PANEL_ACTION_UPDATE_TOP_LEFT_PANEL_CONTENT_LAYOUT_DATA",
});

export const topLeftPanelAction_updateTopLeftPanelSize = (newTopLeftPanelWidth: number, newTopLeftPanelHeight: number) =>
{
    return {
        type: TOP_LEFT_PANEL_ACTION_TYPE.TOP_LEFT_PANEL_ACTION_UPDATE_TOP_LEFT_PANEL_SIZE,
        newTopLeftPanelWidth: newTopLeftPanelWidth,
        newTopLeftPanelHeight: newTopLeftPanelHeight
    };
};

export const topLeftPanelAction_updateTopLeftPanelPosition = (newPosition: Shape2d_Point) =>
{
    return {
        type: TOP_LEFT_PANEL_ACTION_TYPE.TOP_LEFT_PANEL_ACTION_UPDATE_TOP_LEFT_PANEL_POSITION,
        newPosition: newPosition
    };
};

export const topLeftPanelAction_setTopLeftPanelFocusOn = (focusOn: boolean) =>
{
    return {
        type: TOP_LEFT_PANEL_ACTION_TYPE.TOP_LEFT_PANEL_ACTION_SET_TOP_LEFT_PANEL_FOCUS_ON,
        focusOn: focusOn
    };
};

const topLeftPanelAction_updateTopLeftPanelContentLayoutData = (topLeftPanelBorderWidth: number, topLeftPanelBorderHeight: number, topLeftPanelBorderSize: number, topLeftPanelBorderRadius: number) =>
{
    return {
        type: TOP_LEFT_PANEL_ACTION_TYPE.TOP_LEFT_PANEL_ACTION_UPDATE_TOP_LEFT_PANEL_CONTENT_LAYOUT_DATA,
        topLeftPanelBorderWidth: topLeftPanelBorderWidth,
        topLeftPanelBorderHeight: topLeftPanelBorderHeight,
        topLeftPanelBorderSize: topLeftPanelBorderSize,
        topLeftPanelBorderRadius: topLeftPanelBorderRadius,
    }
};