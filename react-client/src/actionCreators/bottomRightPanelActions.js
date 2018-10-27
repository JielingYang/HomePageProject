import Shape2d_Point from "../classes/shapeClasses/Shape2d_Point";
import type {bottomRightPanelStateType} from "../reducers/bottomRightPanelReducer";
import Shape2d_Rectangle from "../classes/shapeClasses/Shape2d_Rectangle";

/* ************************** Requesting actions ************************** */
/* This kind of actions do not send new data directly to reducer            */
/* They check on new data to decide whether to call updating actions or not */
/* ************************************************************************ */

export const bottomRightPanelAction_requestToUpdateBottomRightPanelContentLayoutData = () =>
{
    return (dispatch, getState) =>
    {
        let bottomRightPanelState: bottomRightPanelStateType = getState().bottomRightPanelState;
        let basePanelUnitLength: number = getState().basePanelState.basePanelShapeModel.getUnitLength();
        let bottomRightPanelShapeModel: Shape2d_Rectangle = bottomRightPanelState.bottomRightPanelShapeModel;
        let bottomRightPanelPadding: number = bottomRightPanelState.panelPadding;

        let bottomRightPanelBorderWidth: number = bottomRightPanelShapeModel.getWidth() - 2 * bottomRightPanelPadding;
        let bottomRightPanelBorderHeight: number = bottomRightPanelShapeModel.getHeight() - 2 * bottomRightPanelPadding;
        let bottomRightPanelBorderSize: number = basePanelUnitLength * 0.5;
        let bottomRightPanelBorderRadius: number = basePanelUnitLength * 3;

        let engineDistance: number = -100 * basePanelUnitLength;

        dispatch(bottomRightPanelAction_updateBottomRightPanelContentLayoutData(bottomRightPanelBorderWidth, bottomRightPanelBorderHeight, bottomRightPanelBorderSize, bottomRightPanelBorderRadius, engineDistance));
    }
};

/* **************************** Updating actions ***************************** */
/* This kind of actions send new data to reducer directly and contain no logic */
/* *************************************************************************** */

export const BOTTOM_RIGHT_PANEL_ACTION_TYPE = Object.freeze({
    BOTTOM_RIGHT_PANEL_ACTION_UPDATE_BOTTOM_RIGHT_PANEL_SIZE: "BOTTOM_RIGHT_PANEL_ACTION_UPDATE_BOTTOM_RIGHT_PANEL_SIZE",
    BOTTOM_RIGHT_PANEL_ACTION_UPDATE_BOTTOM_RIGHT_PANEL_POSITION: "BOTTOM_RIGHT_PANEL_ACTION_UPDATE_BOTTOM_RIGHT_PANEL_POSITION",
    BOTTOM_RIGHT_PANEL_ACTION_SET_BOTTOM_RIGHT_PANEL_FOCUS_ON: "BOTTOM_RIGHT_PANEL_ACTION_SET_BOTTOM_RIGHT_PANEL_FOCUS_ON",
    BOTTOM_RIGHT_PANEL_ACTION_UPDATE_BOTTOM_RIGHT_PANEL_CONTENT_LAYOUT_DATA: "BOTTOM_RIGHT_PANEL_ACTION_UPDATE_BOTTOM_RIGHT_PANEL_CONTENT_LAYOUT_DATA",
});

export const bottomRightPanelAction_updateBottomRightPanelSize = (newBottomRightPanelWidth: number, newBottomRightPanelHeight: number) =>
{
    return {
        type: BOTTOM_RIGHT_PANEL_ACTION_TYPE.BOTTOM_RIGHT_PANEL_ACTION_UPDATE_BOTTOM_RIGHT_PANEL_SIZE,
        newBottomRightPanelWidth: newBottomRightPanelWidth,
        newBottomRightPanelHeight: newBottomRightPanelHeight
    };
};

export const bottomRightPanelAction_updateBottomRightPanelPosition = (newPosition: Shape2d_Point) =>
{
    return {
        type: BOTTOM_RIGHT_PANEL_ACTION_TYPE.BOTTOM_RIGHT_PANEL_ACTION_UPDATE_BOTTOM_RIGHT_PANEL_POSITION,
        newPosition: newPosition
    };
};

export const bottomRightPanelAction_setBottomRightPanelFocusOn = (focusOn: boolean) =>
{
    return {
        type: BOTTOM_RIGHT_PANEL_ACTION_TYPE.BOTTOM_RIGHT_PANEL_ACTION_SET_BOTTOM_RIGHT_PANEL_FOCUS_ON,
        focusOn: focusOn
    };
};

const bottomRightPanelAction_updateBottomRightPanelContentLayoutData = (bottomRightPanelBorderWidth: number, bottomRightPanelBorderHeight: number, bottomRightPanelBorderSize: number, bottomRightPanelBorderRadius: number, engineDistance: number) =>
{
    return {
        type: BOTTOM_RIGHT_PANEL_ACTION_TYPE.BOTTOM_RIGHT_PANEL_ACTION_UPDATE_BOTTOM_RIGHT_PANEL_CONTENT_LAYOUT_DATA,
        bottomRightPanelBorderWidth: bottomRightPanelBorderWidth,
        bottomRightPanelBorderHeight: bottomRightPanelBorderHeight,
        bottomRightPanelBorderSize: bottomRightPanelBorderSize,
        bottomRightPanelBorderRadius: bottomRightPanelBorderRadius,
        engineDistance: engineDistance,
    }
};