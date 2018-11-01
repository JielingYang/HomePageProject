import Shape2d_Point from "../classes/shapeClasses/Shape2d_Point";
import type {bottomRightPanelStateType} from "../reducers/bottomRightPanelReducer";
import Shape2d_Rectangle from "../classes/shapeClasses/Shape2d_Rectangle";
import EnginePartStateModel from "../classes/StateModelClasses/EnginePartStateModel";
import numberIdGenerator from "../classes/NumberIdGenerator";
import {INDEX} from "../utilities/CONSTANTS_NUMBER";
import {ENGINE_PART_NAMES} from "../utilities/CONSTANTS_STRING";

/* ************************** Requesting actions ************************** */
/* This kind of actions do not send new data directly to reducer            */
/* They check on new data to decide whether to call updating actions or not */
/* ************************************************************************ */

export const bottomRightPanelAction_requestToUpdateBottomRightPanelContentLayoutData = () =>
{
    return (dispatch, getState) =>
    {
        let bottomRightPanelState: bottomRightPanelStateType = getState().bottomRightPanelState;
        let basePanelUnitLength: number = getState().basePanelState.basePanelShapeModel.getUnitLengthSmall();
        let bottomRightPanelShapeModel: Shape2d_Rectangle = bottomRightPanelState.bottomRightPanelShapeModel;
        let bottomRightPanelPadding: number = bottomRightPanelState.panelPadding;

        let bottomRightPanelBorderWidth: number = bottomRightPanelShapeModel.getWidth() - 2 * bottomRightPanelPadding;
        let bottomRightPanelBorderHeight: number = bottomRightPanelShapeModel.getHeight() - 2 * bottomRightPanelPadding;
        let bottomRightPanelBorderSize: number = basePanelUnitLength * 0.5;
        let bottomRightPanelBorderRadius: number = basePanelUnitLength * 3;

        let enginePartStateModels = getState().bottomRightPanelState.enginePartStateModels;
        if (enginePartStateModels.length === 0) // Initialize engine part state models if none exist
        {
            enginePartStateModels = [];
            let engineDistance: number = -100 * basePanelUnitLength;
            let engineRotation: number = 45;
            let enginePartsGapDistance = 30 * bottomRightPanelShapeModel.getUnitLengthLarge();
            let numberOfEngineParts = ENGINE_PART_NAMES.length;
            enginePartStateModels[INDEX.ENGINE_PART_F1] = new EnginePartStateModel(numberIdGenerator.generateId(), ENGINE_PART_NAMES[INDEX.ENGINE_PART_F1], (INDEX.ENGINE_PART_F1 - (numberOfEngineParts - 1) / 2) * enginePartsGapDistance);
            enginePartStateModels[INDEX.ENGINE_PART_F2] = new EnginePartStateModel(numberIdGenerator.generateId(), ENGINE_PART_NAMES[INDEX.ENGINE_PART_F2], (INDEX.ENGINE_PART_F2 - (numberOfEngineParts - 1) / 2) * enginePartsGapDistance);
            enginePartStateModels[INDEX.ENGINE_PART_M] = new EnginePartStateModel(numberIdGenerator.generateId(), ENGINE_PART_NAMES[INDEX.ENGINE_PART_M], (INDEX.ENGINE_PART_M - (numberOfEngineParts - 1) / 2) * enginePartsGapDistance);
            enginePartStateModels[INDEX.ENGINE_PART_B1] = new EnginePartStateModel(numberIdGenerator.generateId(), ENGINE_PART_NAMES[INDEX.ENGINE_PART_B1], (INDEX.ENGINE_PART_B1 - (numberOfEngineParts - 1) / 2) * enginePartsGapDistance);
            enginePartStateModels[INDEX.ENGINE_PART_B2] = new EnginePartStateModel(numberIdGenerator.generateId(), ENGINE_PART_NAMES[INDEX.ENGINE_PART_B2], (INDEX.ENGINE_PART_B2 - (numberOfEngineParts - 1) / 2) * enginePartsGapDistance);

            dispatch(bottomRightPanelAction_setEngineData(engineDistance, engineRotation, enginePartStateModels));
        }
        // else
        // {
        //     dispatch(bottomRightPanelAction_updateEngineData());
        // }

        dispatch(bottomRightPanelAction_updateBottomRightPanelContentLayoutData(bottomRightPanelBorderWidth, bottomRightPanelBorderHeight, bottomRightPanelBorderSize, bottomRightPanelBorderRadius));
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
    BOTTOM_RIGHT_PANEL_ACTION_SET_ENGINE_DATA: "BOTTOM_RIGHT_PANEL_ACTION_SET_ENGINE_DATA",
    BOTTOM_RIGHT_PANEL_ACTION_UPDATE_ENGINE_DATA: "BOTTOM_RIGHT_PANEL_ACTION_UPDATE_ENGINE_DATA",
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

const bottomRightPanelAction_updateBottomRightPanelContentLayoutData = (bottomRightPanelBorderWidth: number, bottomRightPanelBorderHeight: number, bottomRightPanelBorderSize: number, bottomRightPanelBorderRadius: number) =>
{
    return {
        type: BOTTOM_RIGHT_PANEL_ACTION_TYPE.BOTTOM_RIGHT_PANEL_ACTION_UPDATE_BOTTOM_RIGHT_PANEL_CONTENT_LAYOUT_DATA,
        bottomRightPanelBorderWidth: bottomRightPanelBorderWidth,
        bottomRightPanelBorderHeight: bottomRightPanelBorderHeight,
        bottomRightPanelBorderSize: bottomRightPanelBorderSize,
        bottomRightPanelBorderRadius: bottomRightPanelBorderRadius
    }
};

const bottomRightPanelAction_setEngineData = (engineDistance: number, engineRotation: number, enginePartStateModels: Array<EnginePartStateModel>) =>
{
    return {
        type: BOTTOM_RIGHT_PANEL_ACTION_TYPE.BOTTOM_RIGHT_PANEL_ACTION_SET_ENGINE_DATA,
        engineDistance: engineDistance,
        engineRotation: engineRotation,
        enginePartStateModels: enginePartStateModels,
    }
};

const bottomRightPanelAction_updateEngineData = () =>
{

};