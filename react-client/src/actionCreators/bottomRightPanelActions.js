import Shape2d_Point from "../classes/shapeClasses/Shape2d_Point";
import type {bottomRightPanelStateType} from "../reducers/bottomRightPanelReducer";
import Shape2d_Rectangle from "../classes/shapeClasses/Shape2d_Rectangle";
import EnginePartStateModel from "../classes/StateModelClasses/EnginePartStateModel";
import numberIdGenerator from "../classes/NumberIdGenerator";
import {ENGINE_PART_IDS} from "../utilities/CONSTANTS_STRING";
import {getRegularPolygonSideLength, numberToPercentageString} from "../utilities/UTILITIES";
import {DEFAULT_ENGINE_ROTATION_X_VALUE, DEFAULT_ENGINE_ROTATION_Y_VALUE, NUMBER_OF_ENGINE_PART_SIDE_FACES, NUMBER_OF_ENGINE_PART_SIDES} from "../utilities/CONSTANTS_NUMBER";

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

        let numberOfEngineParts: number = ENGINE_PART_IDS.length;
        let enginePartSize: number = bottomRightPanelShapeModel.getWidth() / (numberOfEngineParts + 1);
        if (getState().bottomRightPanelState.enginePartStateModels.length === 0) // Initialize engine part state models if none exist
        {
            let enginePartStateModels: Array<EnginePartStateModel> = [];
            let engineDistance: number = -100 * basePanelUnitLength;
            ENGINE_PART_IDS.forEach((id: string, index: number) =>
            {
                enginePartStateModels.push(new EnginePartStateModel(numberIdGenerator.generateId(), id, enginePartSize * ((numberOfEngineParts - 1) / 2 - index) + enginePartSize / 4));
            });

            dispatch(bottomRightPanelAction_updateEngineDistance(engineDistance));
            dispatch(bottomRightPanelAction_updateEngineRotation(DEFAULT_ENGINE_ROTATION_X_VALUE, DEFAULT_ENGINE_ROTATION_Y_VALUE));
            dispatch(bottomRightPanelAction_setEnginePartStateModels(enginePartStateModels));
            dispatch(bottomRightPanelAction_requestToSetEngineSideFaces(NUMBER_OF_ENGINE_PART_SIDES, NUMBER_OF_ENGINE_PART_SIDE_FACES));
        }
        else
        {
            ENGINE_PART_IDS.forEach((modelStringId: string, index: number) =>
            {
                dispatch(bottomRightPanelAction_updateEnginePartStateModelPosition(modelStringId, enginePartSize * ((numberOfEngineParts - 1) / 2 - index) + enginePartSize / 4));
            });
        }

        dispatch(bottomRightPanelAction_updateEnginePartSize(enginePartSize));
        dispatch(bottomRightPanelAction_updateBottomRightPanelContentLayoutData(bottomRightPanelBorderWidth, bottomRightPanelBorderHeight, bottomRightPanelBorderSize, bottomRightPanelBorderRadius));
    }
};

export const bottomRightPanelAction_requestToUpdateEngineDistanceAndRotation = (distance: number, rotationX: number, rotationY: number) =>
{
    return (dispatch, getState) =>
    {
        let bottomRightPanelState = getState().bottomRightPanelState;

        if (distance !== bottomRightPanelState.engineDistance)
        {
            dispatch(bottomRightPanelAction_updateEngineDistance(distance));
        }

        if (rotationX !== bottomRightPanelState.engineRotationX || rotationY !== bottomRightPanelState.engineRotationY)
        {
            dispatch(bottomRightPanelAction_updateEngineRotation(rotationX, rotationY));
        }
    }
};

export const bottomRightPanelAction_requestToSetMouseHoverOnEnginePart = (engineIndex: number, shouldSet: boolean, hover: boolean) =>
{
    return (dispatch, getState) =>
    {
        if (shouldSet && getState().bottomRightPanelState.enginePartStateModels[engineIndex].getMouseHover() !== hover)
        {
            dispatch(bottomRightPanelAction_setMouseHoverOnEnginePart(engineIndex, hover));
        }
    }
};

export const bottomRightPanelAction_requestToToggleIsSelectedOnEnginePart = (engineIndex: number, shouldToggle: boolean) =>
{
    return (dispatch, getState) =>
    {
        if (shouldToggle)
        {
            let model: EnginePartStateModel = getState().bottomRightPanelState.enginePartStateModels[engineIndex];
            dispatch(bottomRightPanelAction_setSelectOnEnginePart(engineIndex, !model.getIsSelected()));
        }
    }
};

export const bottomRightPanelAction_requestToSetPerspective = () =>
{
    return (dispatch, getState) =>
    {
        let perspective: number = getState().bottomRightPanelState.bottomRightPanelShapeModel.getWidth() * 0.7;
        if (getState().bottomRightPanelState.bottomRightPanelPerspective !== perspective)
        {
            dispatch(bottomRightPanelAction_setPerspective(perspective));
        }
    }
};

export const bottomRightPanelAction_requestToSetEngineSideFaces = (numberOfEngineSides: number, numberOfEngineSideFaces: number) =>
{
    return (dispatch, getState) =>
    {
        if (getState().bottomRightPanelState.numberOfEngineSideFaces !== numberOfEngineSides && numberOfEngineSides >= 3)
        {
            let engineSideFaceHeightPercentageInNumber: number = getRegularPolygonSideLength(numberOfEngineSides, 50);
            let engineSideFaceTopPercentage: string = numberToPercentageString(50 - engineSideFaceHeightPercentageInNumber / 2);

            dispatch(bottomRightPanelAction_setEngineSideFaces(numberOfEngineSides, numberOfEngineSideFaces, 360 / numberOfEngineSides, numberToPercentageString(engineSideFaceHeightPercentageInNumber), engineSideFaceTopPercentage));
        }
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
    BOTTOM_RIGHT_PANEL_ACTION_SET_ENGINE_PART_STATE_MODELS: "BOTTOM_RIGHT_PANEL_ACTION_SET_ENGINE_PART_STATE_MODELS",
    BOTTOM_RIGHT_PANEL_ACTION_UPDATE_ENGINE_PART_SIZE: "BOTTOM_RIGHT_PANEL_ACTION_UPDATE_ENGINE_PART_SIZE",
    BOTTOM_RIGHT_PANEL_ACTION_UPDATE_ENGINE_DISTANCE: "BOTTOM_RIGHT_PANEL_ACTION_UPDATE_ENGINE_DISTANCE",
    BOTTOM_RIGHT_PANEL_ACTION_UPDATE_ENGINE_ROTATION: "BOTTOM_RIGHT_PANEL_ACTION_UPDATE_ENGINE_ROTATION",
    BOTTOM_RIGHT_PANEL_ACTION_UPDATE_ENGINE_PART_STATE_MODEL_Z_POSITION: "BOTTOM_RIGHT_PANEL_ACTION_UPDATE_ENGINE_PART_STATE_MODEL_Z_POSITION",
    BOTTOM_RIGHT_PANEL_ACTION_SET_MOUSE_HOVER_ON_ENGINE_PART: "BOTTOM_RIGHT_PANEL_ACTION_SET_MOUSE_HOVER_ON_ENGINE_PART",
    BOTTOM_RIGHT_PANEL_ACTION_SET_SELECT_ON_ENGINE_PART: "BOTTOM_RIGHT_PANEL_ACTION_SET_SELECT_ON_ENGINE_PART",
    BOTTOM_RIGHT_PANEL_ACTION_SET_PERSPECTIVE: "BOTTOM_RIGHT_PANEL_ACTION_SET_PERSPECTIVE",
    BOTTOM_RIGHT_PANEL_ACTION_SET_ENGINE_SIDE_FACES: "BOTTOM_RIGHT_PANEL_ACTION_SET_ENGINE_SIDE_FACES",
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

const bottomRightPanelAction_setEnginePartStateModels = (enginePartStateModels: Array<EnginePartStateModel>) =>
{
    return {
        type: BOTTOM_RIGHT_PANEL_ACTION_TYPE.BOTTOM_RIGHT_PANEL_ACTION_SET_ENGINE_PART_STATE_MODELS,
        enginePartStateModels: enginePartStateModels,
    }
};

const bottomRightPanelAction_updateEnginePartSize = (size: number) =>
{
    return {
        type: BOTTOM_RIGHT_PANEL_ACTION_TYPE.BOTTOM_RIGHT_PANEL_ACTION_UPDATE_ENGINE_PART_SIZE,
        enginePartSize: size,
    }
};

const bottomRightPanelAction_updateEngineDistance = (distance: number) =>
{
    return {
        type: BOTTOM_RIGHT_PANEL_ACTION_TYPE.BOTTOM_RIGHT_PANEL_ACTION_UPDATE_ENGINE_DISTANCE,
        engineDistance: distance,
    }
};

const bottomRightPanelAction_updateEngineRotation = (rotationX: number, rotationY: number) =>
{
    return {
        type: BOTTOM_RIGHT_PANEL_ACTION_TYPE.BOTTOM_RIGHT_PANEL_ACTION_UPDATE_ENGINE_ROTATION,
        engineRotationX: rotationX,
        engineRotationY: rotationY,
    }
};

const bottomRightPanelAction_updateEnginePartStateModelPosition = (stateModelId: number | string, position: number) =>
{
    return {
        type: BOTTOM_RIGHT_PANEL_ACTION_TYPE.BOTTOM_RIGHT_PANEL_ACTION_UPDATE_ENGINE_PART_STATE_MODEL_Z_POSITION,
        stateModelId: stateModelId,
        position: position,
    }
};

const bottomRightPanelAction_setMouseHoverOnEnginePart = (engineIndex: number, hover: boolean) =>
{
    return {
        type: BOTTOM_RIGHT_PANEL_ACTION_TYPE.BOTTOM_RIGHT_PANEL_ACTION_SET_MOUSE_HOVER_ON_ENGINE_PART,
        engineIndex: engineIndex,
        hover: hover,
    }
};

const bottomRightPanelAction_setSelectOnEnginePart = (engineIndex: number, select: boolean) =>
{
    return {
        type: BOTTOM_RIGHT_PANEL_ACTION_TYPE.BOTTOM_RIGHT_PANEL_ACTION_SET_SELECT_ON_ENGINE_PART,
        engineIndex: engineIndex,
        select: select,
    }
};

const bottomRightPanelAction_setPerspective = (perspective: number) =>
{
    return {
        type: BOTTOM_RIGHT_PANEL_ACTION_TYPE.BOTTOM_RIGHT_PANEL_ACTION_SET_PERSPECTIVE,
        bottomRightPanelPerspective: perspective,
    }
};

const bottomRightPanelAction_setEngineSideFaces = (numberOfEngineSides: number, numberOfEngineSideFaces: number, engineSideFacesExteriorAngle: number, engineSideFaceHeightPercentage: string, engineSideFaceTopPercentage: string) =>
{
    return {
        type: BOTTOM_RIGHT_PANEL_ACTION_TYPE.BOTTOM_RIGHT_PANEL_ACTION_SET_ENGINE_SIDE_FACES,
        numberOfEngineSides: numberOfEngineSides,
        numberOfEngineSideFaces: numberOfEngineSideFaces,
        engineSideFacesExteriorAngle: engineSideFacesExteriorAngle,
        engineSideFaceHeightPercentage: engineSideFaceHeightPercentage,
        engineSideFaceTopPercentage: engineSideFaceTopPercentage,
    }
};