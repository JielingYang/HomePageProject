import {numberToPercentageString} from "../utilities/UTILITIES";
import Shape2d_Rectangle from "../classes/Shape2d_Rectangle";
import type {basePanelStateType} from "../reducers/basePanelReducer";
import Shape2d_Circle from "../classes/Shape2d_Circle";

const MAX_ROTATION_DEGREE_VALUE = 2;
const MAX_TRANSLATE_PERCENTAGE_VALUE = 10;

/* ************************** Requesting actions ************************** */
/* This kind of actions do not send new data directly to reducer            */
/* They check on new data to decide whether to call updating actions or not */
/* ************************************************************************ */

export const basePanelAction_requestToUpdateBasePanelTransformAndFocusPoint = (mouseMoveX: number, mouseMoveY: number) =>
{
    return (dispatch, getState) =>
    {
        let appShapeModel: Shape2d_Rectangle = getState().appState.appShapeModel;
        let basePanelState: basePanelStateType = getState().basePanelState;

        let mouseXToAppWidthRatio: number = mouseMoveX / appShapeModel.getWidth();
        let mouseYToAppHeightRatio: number = mouseMoveY / appShapeModel.getHeight();

        let basePanelTranslatePercentageX: string = numberToPercentageString((1 - mouseXToAppWidthRatio) * MAX_TRANSLATE_PERCENTAGE_VALUE - MAX_TRANSLATE_PERCENTAGE_VALUE / 2);
        let basePanelTranslatePercentageY: string = numberToPercentageString((1 - mouseYToAppHeightRatio) * MAX_TRANSLATE_PERCENTAGE_VALUE - MAX_TRANSLATE_PERCENTAGE_VALUE / 2);

        let basePanelRotationX: string = Number((1 - mouseYToAppHeightRatio) * MAX_ROTATION_DEGREE_VALUE - MAX_ROTATION_DEGREE_VALUE / 2).toFixed(2);
        let basePanelRotationY: string = Number(MAX_ROTATION_DEGREE_VALUE / 2 - (1 - mouseXToAppWidthRatio) * MAX_ROTATION_DEGREE_VALUE).toFixed(2);

        let basePanelMouseFocusPercentageX: string = numberToPercentageString(mouseXToAppWidthRatio * 100);
        let basePanelMouseFocusPercentageY: string = numberToPercentageString(mouseYToAppHeightRatio * 100);

        // Compare against old values
        if (basePanelState.basePanelTranslatePercentageX !== basePanelTranslatePercentageX ||
            basePanelState.basePanelTranslatePercentageY !== basePanelTranslatePercentageY ||
            basePanelState.basePanelRotationX !== basePanelRotationX ||
            basePanelState.basePanelRotationY !== basePanelRotationY ||
            basePanelState.basePanelMouseFocusPercentageX !== basePanelMouseFocusPercentageX ||
            basePanelState.basePanelMouseFocusPercentageY !== basePanelMouseFocusPercentageY)
        {
            dispatch(basePanelAction_updateBasePanelTransformAndFocusPoint(basePanelTranslatePercentageX, basePanelTranslatePercentageY, basePanelRotationX, basePanelRotationY, basePanelMouseFocusPercentageX, basePanelMouseFocusPercentageY));
        }
    }
};

/* **************************** Updating actions ***************************** */
/* This kind of actions send new data to reducer directly and contain no logic */
/* *************************************************************************** */

export const BASE_PANEL_ACTION_TYPE = Object.freeze({
    BASE_PANEL_ACTION_UPDATE_BASE_PANEL_SIZE: 'BASE_PANEL_ACTION_UPDATE_BASE_PANEL_SIZE',
    BASE_PANEL_ACTION_UPDATE_BASE_PANEL_TRANSFORM_AND_FOCUS_POINT: 'BASE_PANEL_ACTION_UPDATE_BASE_PANEL_TRANSFORM_AND_FOCUS_POINT',
    BASE_PANEL_ACTION_UPDATE_BASE_PANEL_FOCUS_MASK_SHAPE_MODELS: 'BASE_PANEL_ACTION_UPDATE_BASE_PANEL_FOCUS_MASK_SHAPE_MODELS',
});

export const basePanelAction_updateBasePanelSize = (newBasePanelWidth: number, newBasePanelHeight: number) =>
{
    return {
        type: BASE_PANEL_ACTION_TYPE.BASE_PANEL_ACTION_UPDATE_BASE_PANEL_SIZE,
        newBasePanelWidth: newBasePanelWidth,
        newBasePanelHeight: newBasePanelHeight,
    };
};

const basePanelAction_updateBasePanelTransformAndFocusPoint = (basePanelTranslatePercentageX: string, basePanelTranslatePercentageY: string, basePanelRotationX: string, basePanelRotationY: string, basePanelMouseFocusPercentageX: string, basePanelMouseFocusPercentageY: string) =>
{
    return {
        type: BASE_PANEL_ACTION_TYPE.BASE_PANEL_ACTION_UPDATE_BASE_PANEL_TRANSFORM_AND_FOCUS_POINT,
        basePanelTranslatePercentageX: basePanelTranslatePercentageX,
        basePanelTranslatePercentageY: basePanelTranslatePercentageY,
        basePanelRotationX: basePanelRotationX,
        basePanelRotationY: basePanelRotationY,
        basePanelMouseFocusPercentageX: basePanelMouseFocusPercentageX,
        basePanelMouseFocusPercentageY: basePanelMouseFocusPercentageY,
    }
};

const basePanelAction_updateBasePanelFocusMaskShapeModels = (newBasePanelFocusMaskShapeModels: Array<Shape2d_Rectangle | Shape2d_Circle>) =>
{
    return {
        type: BASE_PANEL_ACTION_TYPE.BASE_PANEL_ACTION_UPDATE_BASE_PANEL_FOCUS_MASK_SHAPE_MODELS,
        newBasePanelFocusMaskShapeModels: newBasePanelFocusMaskShapeModels,
    }
};