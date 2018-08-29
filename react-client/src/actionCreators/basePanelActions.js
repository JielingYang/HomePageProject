import {MAX_ROTATION_DEGREE_VALUE, MAX_TRANSLATE_PERCENTAGE_VALUE} from "../styles/basePanelStyle";
import {numberToPercentageString} from "../utilities/UTILITIES";
import Shape2d_Rectangle from "../classes/Shape2d_Rectangle";
import type {basePanelStateType} from "../reducers/basePanelReducer";

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

        let basePanelFocusPointPercentageX: string = numberToPercentageString(mouseXToAppWidthRatio * 100);
        let basePanelFocusPointPercentageY: string = numberToPercentageString(mouseYToAppHeightRatio * 100);

        // Compare against old values
        if (basePanelState.basePanelTranslatePercentageX !== basePanelTranslatePercentageX ||
            basePanelState.basePanelTranslatePercentageY !== basePanelTranslatePercentageY ||
            basePanelState.basePanelRotationX !== basePanelRotationX ||
            basePanelState.basePanelRotationY !== basePanelRotationY ||
            basePanelState.basePanelFocusPointPercentageX !== basePanelFocusPointPercentageX ||
            basePanelState.basePanelFocusPointPercentageY !== basePanelFocusPointPercentageY)
        {
            dispatch(basePanelAction_updateBasePanelTransformAndFocusPoint(basePanelTranslatePercentageX, basePanelTranslatePercentageY, basePanelRotationX, basePanelRotationY, basePanelFocusPointPercentageX, basePanelFocusPointPercentageY));
        }
    }
};

/* **************************** Updating actions ***************************** */
/* This kind of actions send new data to reducer directly and contain no logic */
/* *************************************************************************** */

export const BASE_PANEL_ACTION_TYPE = Object.freeze({
    BASE_PANEL_ACTION_UPDATE_BASE_PANEL_SIZE: 'BASE_PANEL_ACTION_UPDATE_BASE_PANEL_SIZE',
    BASE_PANEL_ACTION_UPDATE_BASE_PANEL_TRANSFORM_AND_FOCUS_POINT: 'BASE_PANEL_ACTION_UPDATE_BASE_PANEL_TRANSFORM_AND_FOCUS_POINT',
});

export const basePanelAction_updateBasePanelSize = (newBasePanelWidth: number, newBasePanelHeight: number) =>
{
    return {
        type: BASE_PANEL_ACTION_TYPE.BASE_PANEL_ACTION_UPDATE_BASE_PANEL_SIZE,
        newBasePanelWidth: newBasePanelWidth,
        newBasePanelHeight: newBasePanelHeight,
    };
};

export const basePanelAction_updateBasePanelTransformAndFocusPoint = (basePanelTranslatePercentageX: string, basePanelTranslatePercentageY: string, basePanelRotationX: string, basePanelRotationY: string, basePanelFocusPointPercentageX: string, basePanelFocusPointPercentageY: string) =>
{
    return {
        type: BASE_PANEL_ACTION_TYPE.BASE_PANEL_ACTION_UPDATE_BASE_PANEL_TRANSFORM_AND_FOCUS_POINT,
        basePanelTranslatePercentageX: basePanelTranslatePercentageX,
        basePanelTranslatePercentageY: basePanelTranslatePercentageY,
        basePanelRotationX: basePanelRotationX,
        basePanelRotationY: basePanelRotationY,
        basePanelFocusPointPercentageX: basePanelFocusPointPercentageX,
        basePanelFocusPointPercentageY: basePanelFocusPointPercentageY,
    }
};