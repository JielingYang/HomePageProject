import Shape2d_Point from "../classes/Shape2d_Point";
import Shape2d_Circle from "../classes/Shape2d_Circle";
import Shape2d_Rectangle from "../classes/Shape2d_Rectangle";

/* ************************** Requesting actions ************************** */
/* This kind of actions do not send new data directly to reducer            */
/* They check on new data to decide whether to call updating actions or not */
/* ************************************************************************ */

export const topLeftPanelAction_requestTopLeftPanelFocus = () =>
{
    return (dispatch, getState) =>
    {
        let state = getState();
        // Update component focus only if mouse focus is not on
        if (!state.basePanelState.basePanelMouseFocusOn)
        {
            let maskShapeModels: Array<Shape2d_Rectangle | Shape2d_Circle> = [];
            maskShapeModels.push(state.topLeftPanelState.topLeftPanelShapeModel);
        }
    };
};

/* **************************** Updating actions ***************************** */
/* This kind of actions send new data to reducer directly and contain no logic */
/* *************************************************************************** */

export const TOP_LEFT_PANEL_ACTION_TYPE = Object.freeze({
    TOP_LEFT_PANEL_ACTION_UPDATE_TOP_LEFT_PANEL_SIZE: "TOP_LEFT_PANEL_ACTION_UPDATE_TOP_LEFT_PANEL_SIZE",
    TOP_LEFT_PANEL_ACTION_UPDATE_TOP_LEFT_PANEL_POSITION: "TOP_LEFT_PANEL_ACTION_UPDATE_TOP_LEFT_PANEL_POSITION"
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