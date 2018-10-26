import Shape2d_Point from "../classes/shapeClasses/Shape2d_Point";
import type {bottomLeftPanelStateType} from "../reducers/bottomLeftPanelReducer";
import Shape2d_Rectangle from "../classes/shapeClasses/Shape2d_Rectangle";

/* ************************** Requesting actions ************************** */
/* This kind of actions do not send new data directly to reducer            */
/* They check on new data to decide whether to call updating actions or not */
/* ************************************************************************ */

export const bottomLeftPanelAction_requestToUpdateBottomLeftPanelContentLayoutData = () =>
{
    return (dispatch, getState) =>
    {
        let bottomLeftPanelState: bottomLeftPanelStateType = getState().bottomLeftPanelState;
        let basePanelUnitLength: number = getState().basePanelState.basePanelShapeModel.getUnitLength();
        let bottomLeftPanelShapeModel: Shape2d_Rectangle = bottomLeftPanelState.bottomLeftPanelShapeModel;
        let bottomLeftPanelPadding: number = bottomLeftPanelState.panelPadding;

        let bottomLeftPanelBorderWidth: number = bottomLeftPanelShapeModel.getWidth() - 2 * bottomLeftPanelPadding;
        let bottomLeftPanelBorderHeight: number = bottomLeftPanelShapeModel.getHeight() - 2 * bottomLeftPanelPadding;
        let bottomLeftPanelBorderSize: number = basePanelUnitLength * 0.5;
        let bottomLeftPanelBorderRadius: number = basePanelUnitLength * 3;

        dispatch(bottomLeftPanelAction_updateBottomLeftPanelContentLayoutData(bottomLeftPanelBorderWidth, bottomLeftPanelBorderHeight, bottomLeftPanelBorderSize, bottomLeftPanelBorderRadius));
    }
};

/* **************************** Updating actions ***************************** */
/* This kind of actions send new data to reducer directly and contain no logic */
/* *************************************************************************** */

export const BOTTOM_LEFT_PANEL_ACTION_TYPE = Object.freeze({
    BOTTOM_LEFT_PANEL_ACTION_UPDATE_BOTTOM_LEFT_PANEL_SIZE: "BOTTOM_LEFT_PANEL_ACTION_UPDATE_BOTTOM_LEFT_PANEL_SIZE",
    BOTTOM_LEFT_PANEL_ACTION_UPDATE_BOTTOM_LEFT_PANEL_POSITION: "BOTTOM_LEFT_PANEL_ACTION_UPDATE_BOTTOM_LEFT_PANEL_POSITION",
    BOTTOM_LEFT_PANEL_ACTION_SET_BOTTOM_LEFT_PANEL_FOCUS_ON: "BOTTOM_LEFT_PANEL_ACTION_SET_BOTTOM_LEFT_PANEL_FOCUS_ON",
    BOTTOM_LEFT_PANEL_ACTION_UPDATE_BOTTOM_LEFT_PANEL_CONTENT_LAYOUT_DATA: "BOTTOM_LEFT_PANEL_ACTION_UPDATE_BOTTOM_LEFT_PANEL_CONTENT_LAYOUT_DATA",
});

export const bottomLeftPanelAction_updateBottomLeftPanelSize = (newBottomLeftPanelWidth: number, newBottomLeftPanelHeight: number) =>
{
    return {
        type: BOTTOM_LEFT_PANEL_ACTION_TYPE.BOTTOM_LEFT_PANEL_ACTION_UPDATE_BOTTOM_LEFT_PANEL_SIZE,
        newBottomLeftPanelWidth: newBottomLeftPanelWidth,
        newBottomLeftPanelHeight: newBottomLeftPanelHeight
    };
};

export const bottomLeftPanelAction_updateBottomLeftPanelPosition = (newPosition: Shape2d_Point) =>
{
    return {
        type: BOTTOM_LEFT_PANEL_ACTION_TYPE.BOTTOM_LEFT_PANEL_ACTION_UPDATE_BOTTOM_LEFT_PANEL_POSITION,
        newPosition: newPosition
    };
};

export const bottomLeftPanelAction_setBottomLeftPanelFocusOn = (focusOn: boolean) =>
{
    return {
        type: BOTTOM_LEFT_PANEL_ACTION_TYPE.BOTTOM_LEFT_PANEL_ACTION_SET_BOTTOM_LEFT_PANEL_FOCUS_ON,
        focusOn: focusOn
    };
};

const bottomLeftPanelAction_updateBottomLeftPanelContentLayoutData = (bottomLeftPanelBorderWidth: number, bottomLeftPanelBorderHeight: number, bottomLeftPanelBorderSize: number, bottomLeftPanelBorderRadius: number) =>
{
    return {
        type: BOTTOM_LEFT_PANEL_ACTION_TYPE.BOTTOM_LEFT_PANEL_ACTION_UPDATE_BOTTOM_LEFT_PANEL_CONTENT_LAYOUT_DATA,
        bottomLeftPanelBorderWidth: bottomLeftPanelBorderWidth,
        bottomLeftPanelBorderHeight: bottomLeftPanelBorderHeight,
        bottomLeftPanelBorderSize: bottomLeftPanelBorderSize,
        bottomLeftPanelBorderRadius: bottomLeftPanelBorderRadius,
    }
};