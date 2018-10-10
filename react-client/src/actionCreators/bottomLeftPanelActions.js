import Shape2d_Point from "../classes/Shape2d_Point";
import {basePanelAction_updateBasePanelFocusMaskShapeModels} from "./basePanelActions";
import Shape2d_Circle from "../classes/Shape2d_Circle";
import Shape2d_Rectangle from "../classes/Shape2d_Rectangle";

/* ************************** Requesting actions ************************** */
/* This kind of actions do not send new data directly to reducer            */
/* They check on new data to decide whether to call updating actions or not */
/* ************************************************************************ */

export const bottomLeftPanelAction_requestBottomLeftPanelFocus = () =>
{
    return (dispatch, getState) =>
    {
        let state = getState();
        // Update component focus only if mouse focus is not on
        if (!state.basePanelState.basePanelMouseFocusOn)
        {
            let maskShapeModels: Array<Shape2d_Rectangle | Shape2d_Circle> = [];
            maskShapeModels.push(state.bottomLeftPanelState.bottomLeftPanelShapeModel);
            let signature = maskShapeModels.map((model: Shape2d_Rectangle | Shape2d_Circle) => model.getNumberId()).join();

            // Update component focus if new focus is different
            if (signature !== state.basePanelState.basePanelFocusMaskShapeModelsSignature)
            {
                dispatch(basePanelAction_updateBasePanelFocusMaskShapeModels(maskShapeModels));
            }
        }
    };
};

/* **************************** Updating actions ***************************** */
/* This kind of actions send new data to reducer directly and contain no logic */
/* *************************************************************************** */

export const BOTTOM_LEFT_PANEL_ACTION_TYPE = Object.freeze({
                                                               BOTTOM_LEFT_PANEL_ACTION_UPDATE_BOTTOM_LEFT_PANEL_SIZE: "BOTTOM_LEFT_PANEL_ACTION_UPDATE_BOTTOM_LEFT_PANEL_SIZE",
                                                               BOTTOM_LEFT_PANEL_ACTION_UPDATE_BOTTOM_LEFT_PANEL_POSITION: "BOTTOM_LEFT_PANEL_ACTION_UPDATE_BOTTOM_LEFT_PANEL_POSITION"
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