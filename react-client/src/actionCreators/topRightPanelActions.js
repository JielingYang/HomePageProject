import Shape2d_Point from "../classes/Shape2d_Point";
import Shape2d_Circle from "../classes/Shape2d_Circle";
import Shape2d_Rectangle from "../classes/Shape2d_Rectangle";

/* ************************** Requesting actions ************************** */
/* This kind of actions do not send new data directly to reducer            */
/* They check on new data to decide whether to call updating actions or not */
/* ************************************************************************ */

export const topRightPanelAction_requestTopRightPanelFocus = () =>
{
    return (dispatch, getState) =>
    {
        let state = getState();
        // Update component focus if mouse focus is not on
        if (!state.basePanelState.basePanelMouseFocusOn)
        {
            let maskShapeModels: Array<Shape2d_Rectangle | Shape2d_Circle> = [];
            maskShapeModels.push(state.topRightPanelState.topRightPanelShapeModel);
        }
    };
};

/* **************************** Updating actions ***************************** */
/* This kind of actions send new data to reducer directly and contain no logic */
/* *************************************************************************** */

export const TOP_RIGHT_PANEL_ACTION_TYPE = Object.freeze({
    TOP_RIGHT_PANEL_ACTION_UPDATE_TOP_RIGHT_PANEL_SIZE: "TOP_RIGHT_PANEL_ACTION_UPDATE_TOP_RIGHT_PANEL_SIZE",
    TOP_RIGHT_PANEL_ACTION_UPDATE_TOP_RIGHT_PANEL_POSITION: "TOP_RIGHT_PANEL_ACTION_UPDATE_TOP_RIGHT_PANEL_POSITION"
});

export const topRightPanelAction_updateTopRightPanelSize = (newTopRightPanelWidth: number, newTopRightPanelHeight: number) =>
{
    return {
        type: TOP_RIGHT_PANEL_ACTION_TYPE.TOP_RIGHT_PANEL_ACTION_UPDATE_TOP_RIGHT_PANEL_SIZE,
        newTopRightPanelWidth: newTopRightPanelWidth,
        newTopRightPanelHeight: newTopRightPanelHeight
    };
};

export const topRightPanelAction_updateTopRightPanelPosition = (newPosition: Shape2d_Point) =>
{
    return {
        type: TOP_RIGHT_PANEL_ACTION_TYPE.TOP_RIGHT_PANEL_ACTION_UPDATE_TOP_RIGHT_PANEL_POSITION,
        newPosition: newPosition
    };
};