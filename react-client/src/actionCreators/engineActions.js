import {CONTENT_PANELS_INDICES, ENGINE_MAX_ROTATION_DEGREE_VALUE, ENGINE_PART_INDICES, ENGINE_PART_MENU_ITEMS_POSITIONS} from "../utilities/CONSTANTS_NUMBER";
import BaseModelWithStateAndShape from "../classes/BaseModelWithStateAndShape";
import type {engineReducerType} from "../reducers/engineReducer";
import {ENGINE_PART_MENU_ITEM_NAME, ENGINE_PART_NAME} from "../utilities/CONSTANTS_STRING";
import numberIdGenerator from "../classes/NumberIdGenerator";
import BaseModelWithState from "../classes/BaseModelWithState";

/* ************************** Requesting actions ************************** */
/* This kind of actions do not send new data directly to reducer            */
/* They check on new data to decide whether to call updating actions or not */
/* ************************************************************************ */

export const engineAction_requestToUpdateEngineLayout = () =>
{
    return (dispatch, getState) =>
    {
        let menuContentPanelModel: BaseModelWithStateAndShape = getState().contentPanelsState.contentPanelsModels[CONTENT_PANELS_INDICES.CONTENT_PANEL_ENGINE];
        let menuContentPanelUnitLengthSmall: number = menuContentPanelModel.getUnitLengthSmall();

        let isEngineModelInitialized: boolean = getState().engineState.enginePartModels.length > 0;
        let enginePartIndices: Array<number> = Object.values(ENGINE_PART_INDICES);
        let numberOfEngineParts: number = enginePartIndices.length;
        let enginePartSize: number = menuContentPanelModel.getWidth() / (numberOfEngineParts + 1);
        let engineDistance: number = -100 * menuContentPanelUnitLengthSmall;
        let x: number = (menuContentPanelModel.getWidth() - enginePartSize) / 2;
        let y: number = (menuContentPanelModel.getHeight() - enginePartSize) / 2;

        if (!isEngineModelInitialized) // Initialize engine part models if none exist
        {
            let enginePartModels: Array<BaseModelWithStateAndShape> = [];
            let enginePartMenuItemModels: Array<Array<BaseModelWithState>> = [];
            enginePartIndices.forEach((enginePartIndex: number) =>
            {
                let z: number = enginePartSize * ((numberOfEngineParts - 1) / 2 - enginePartIndex) + enginePartSize / 4;
                enginePartModels.push(new BaseModelWithStateAndShape(ENGINE_PART_NAME, numberIdGenerator.generateId(), x, y, z, enginePartSize, enginePartSize));

                enginePartMenuItemModels.push(ENGINE_PART_MENU_ITEMS_POSITIONS[enginePartIndex].map(() => new BaseModelWithState(ENGINE_PART_MENU_ITEM_NAME, numberIdGenerator.generateId())));
            });
            dispatch(engineAction_setEnginePartModels(enginePartModels));
            dispatch(engineAction_setEnginePartMenuItemModels(enginePartMenuItemModels));
        }
        else
        {
            enginePartIndices.forEach((index: number) =>
            {
                let z: number = enginePartSize * ((numberOfEngineParts - 1) / 2 - index) + enginePartSize / 4;
                dispatch(engineAction_setEnginePartPositionAndSize(index, x, y, z, enginePartSize, enginePartSize));
            });
        }

        dispatch(engineAction_setEngineDistance(engineDistance));
    }
};

export const engineAction_requestToUpdateEnginePerspective = () =>
{
    return (dispatch, getState) =>
    {
        let newEnginePerspective: number = getState().contentPanelsState.contentPanelsModels[CONTENT_PANELS_INDICES.CONTENT_PANEL_ENGINE].getWidth() * 0.7;
        if (getState().engineState.enginePerspective !== newEnginePerspective)
        {
            dispatch(engineAction_setEnginePerspective(newEnginePerspective));
        }
    }
};

export const engineAction_requestToUpdateEngineRotation = (mouseMoveX: number, mouseMoveY: number) =>
{
    return (dispatch, getState) =>
    {
        let appModel: BaseModelWithStateAndShape = getState().appState.appModel;
        let engineState: engineReducerType = getState().engineState;

        let mouseXToAppWidthRatio: number = mouseMoveX / appModel.getWidth();
        let mouseYToAppHeightRatio: number = mouseMoveY / appModel.getHeight();

        let newEngineRotationX: number = Number(((1 - mouseYToAppHeightRatio) * ENGINE_MAX_ROTATION_DEGREE_VALUE - ENGINE_MAX_ROTATION_DEGREE_VALUE / 2).toFixed(2));
        let newEngineRotationY: number = Number((ENGINE_MAX_ROTATION_DEGREE_VALUE / 2 - (1 - mouseXToAppWidthRatio) * ENGINE_MAX_ROTATION_DEGREE_VALUE).toFixed(2));

        // Compare against old values
        if (engineState.engineRotationX !== newEngineRotationX || engineState.engineRotationY !== newEngineRotationY)
        {
            dispatch(engineAction_updateEngineRotation(newEngineRotationX, newEngineRotationY));
        }
    };
};

/* **************************** Updating actions ***************************** */
/* This kind of actions send new data to reducer directly and contain no logic */
/* *************************************************************************** */

export const ENGINE_ACTION_TYPE = Object.freeze({
    ENGINE_ACTION_SET_ENGINE_PART_MODELS: "ENGINE_ACTION_SET_ENGINE_PART_MODELS",
    ENGINE_ACTION_SET_ENGINE_PART_MENU_ITEM_MODELS: "ENGINE_ACTION_SET_ENGINE_PART_MENU_ITEM_MODELS",
    ENGINE_ACTION_SET_ENGINE_PERSPECTIVE: "ENGINE_ACTION_SET_ENGINE_PERSPECTIVE",
    ENGINE_ACTION_UPDATE_ENGINE_ROTATION: "ENGINE_ACTION_UPDATE_ENGINE_ROTATION",
    ENGINE_ACTION_SET_ENGINE_DISTANCE: "ENGINE_ACTION_SET_ENGINE_DISTANCE",
    ENGINE_ACTION_SET_ENGINE_PART_POSITION_AND_SIZE: "ENGINE_ACTION_SET_ENGINE_PART_POSITION_AND_SIZE",
    ENGINE_ACTION_ENGINE_PART_MOUSE_CLICKS: "ENGINE_ACTION_ENGINE_PART_MOUSE_CLICKS",
    ENGINE_ACTION_ENGINE_PART_MOUSE_ENTERS: "ENGINE_ACTION_ENGINE_PART_MOUSE_ENTERS",
    ENGINE_ACTION_ENGINE_PART_MOUSE_LEAVES: "ENGINE_ACTION_ENGINE_PART_MOUSE_LEAVES",
});

const engineAction_setEnginePartModels = (enginePartModels: Array<BaseModelWithStateAndShape>) =>
{
    return {
        type: ENGINE_ACTION_TYPE.ENGINE_ACTION_SET_ENGINE_PART_MODELS,
        enginePartModels: enginePartModels,
    }
};

const engineAction_setEnginePartMenuItemModels = (enginePartMenuItemModels: Array<Array<BaseModelWithState>>) =>
{
    return {
        type: ENGINE_ACTION_TYPE.ENGINE_ACTION_SET_ENGINE_PART_MENU_ITEM_MODELS,
        enginePartMenuItemModels: enginePartMenuItemModels,
    }
};

const engineAction_setEnginePerspective = (enginePerspective: number) =>
{
    return {
        type: ENGINE_ACTION_TYPE.ENGINE_ACTION_SET_ENGINE_PERSPECTIVE,
        enginePerspective: enginePerspective,
    };
};

const engineAction_updateEngineRotation = (engineRotationX: number, engineRotationY: number) =>
{
    return {
        type: ENGINE_ACTION_TYPE.ENGINE_ACTION_UPDATE_ENGINE_ROTATION,
        engineRotationX: engineRotationX,
        engineRotationY: engineRotationY,
    };
};

const engineAction_setEngineDistance = (engineDistance: number) =>
{
    return {
        type: ENGINE_ACTION_TYPE.ENGINE_ACTION_SET_ENGINE_DISTANCE,
        engineDistance: engineDistance,
    };
};

const engineAction_setEnginePartPositionAndSize = (enginePartIndex: number, x: number, y: number, z: number, width: number, height: number) =>
{
    return {
        type: ENGINE_ACTION_TYPE.ENGINE_ACTION_SET_ENGINE_PART_POSITION_AND_SIZE,
        enginePartIndex: enginePartIndex,
        x: x,
        y: y,
        z: z,
        width: width,
        height: height,
    }
};

export const engineAction_enginePartMouseClicks = (enginePartIndex: number) =>
{
    return {
        type: ENGINE_ACTION_TYPE.ENGINE_ACTION_ENGINE_PART_MOUSE_CLICKS,
        enginePartIndex: enginePartIndex
    };
};

export const engineAction_enginePartMouseEnters = (enginePartIndex: number) =>
{
    return {
        type: ENGINE_ACTION_TYPE.ENGINE_ACTION_ENGINE_PART_MOUSE_ENTERS,
        enginePartIndex: enginePartIndex
    };
};

export const engineAction_enginePartMouseLeaves = (enginePartIndex: number) =>
{
    return {
        type: ENGINE_ACTION_TYPE.ENGINE_ACTION_ENGINE_PART_MOUSE_LEAVES,
        enginePartIndex: enginePartIndex
    };
};


