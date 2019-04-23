import {deepCopy} from "../utilities/UTILITIES";
import {createReducer} from "./reducerCreator";
import {ENGINE_ACTION_TYPE} from "../actionCreators/engineActions";
import BaseModelWithStateAndShape from "../classes/BaseModelWithStateAndShape";
import BaseModelWithState from "../classes/BaseModelWithState";

export type engineReducerType = {
    enginePartModels: Array<BaseModelWithStateAndShape>,
    enginePerspective: number,
    engineInitialRotationX: number,
    engineInitialRotationY: number,
    engineRotationX: number,
    engineRotationY: number,
    engineDistance: number,

    enginePartMenuItemModels: Array<Array<BaseModelWithState>>
}

const engineReducerDefaultState: engineReducerType = {
    enginePartModels: [],
    enginePerspective: 0,
    engineInitialRotationX: -10,
    engineInitialRotationY: 45,
    engineRotationX: 0,
    engineRotationY: 0,
    engineDistance: 0,

    enginePartMenuItemModels: [],
};

const engineAction_setEnginePartModels_handler = (state: engineReducerType, action) =>
{
    let nextState: engineReducerType = deepCopy(state);
    nextState.enginePartModels = action.enginePartModels;
    return nextState;
};

const engineAction_setEnginePartMenuItemModels_handler = (state: engineReducerType, action) =>
{
    let nextState: engineReducerType = deepCopy(state);
    nextState.enginePartMenuItemModels = action.enginePartMenuItemModels;
    return nextState;
};

const engineAction_setEnginePerspective_handler = (state: engineReducerType, action) =>
{
    let nextState: engineReducerType = deepCopy(state);
    nextState.enginePerspective = action.enginePerspective;
    return nextState;
};

const engineAction_updateEngineRotation_handler = (state: engineReducerType, action) =>
{
    let nextState: engineReducerType = deepCopy(state);
    nextState.engineRotationX = action.engineRotationX;
    nextState.engineRotationY = action.engineRotationY;
    return nextState;
};

const engineAction_setEngineDistance_handler = (state: engineReducerType, action) =>
{
    let nextState: engineReducerType = deepCopy(state);
    nextState.engineDistance = action.engineDistance;
    return nextState;
};

const engineAction_setEnginePartPositionAndSize_handler = (state: engineReducerType, action) =>
{
    let nextState: engineReducerType = deepCopy(state);
    let enginePartModel: BaseModelWithStateAndShape = nextState.enginePartModels[action.enginePartIndex];
    enginePartModel.setX(action.x);
    enginePartModel.setY(action.y);
    enginePartModel.setZ(action.z);
    enginePartModel.setWidth(action.width);
    enginePartModel.setHeight(action.height);
    return nextState;
};

const engineAction_enginePartMouseClicks_handler = (state: engineReducerType, action) =>
{
    let nextState: engineReducerType = deepCopy(state);
    let enginePartModel: BaseModelWithStateAndShape = nextState.enginePartModels[action.enginePartIndex];
    enginePartModel.mouseClicks();
    return nextState;
};

const engineAction_enginePartMouseEnters_handler = (state: engineReducerType, action) =>
{
    let nextState: engineReducerType = deepCopy(state);
    let enginePartModel: BaseModelWithStateAndShape = nextState.enginePartModels[action.enginePartIndex];
    enginePartModel.mouseEnters();
    return nextState;
};

const engineAction_enginePartMouseLeaves_handler = (state: engineReducerType, action) =>
{
    let nextState: engineReducerType = deepCopy(state);
    let enginePartModel: BaseModelWithStateAndShape = nextState.enginePartModels[action.enginePartIndex];
    enginePartModel.mouseLeaves();
    return nextState;
};

// Check reducerCreator for explanation of handlers
const engineReducerHandlers = {
    [ENGINE_ACTION_TYPE.ENGINE_ACTION_SET_ENGINE_PART_MODELS]: engineAction_setEnginePartModels_handler,
    [ENGINE_ACTION_TYPE.ENGINE_ACTION_SET_ENGINE_PART_MENU_ITEM_MODELS]: engineAction_setEnginePartMenuItemModels_handler,
    [ENGINE_ACTION_TYPE.ENGINE_ACTION_SET_ENGINE_PERSPECTIVE]: engineAction_setEnginePerspective_handler,
    [ENGINE_ACTION_TYPE.ENGINE_ACTION_UPDATE_ENGINE_ROTATION]: engineAction_updateEngineRotation_handler,
    [ENGINE_ACTION_TYPE.ENGINE_ACTION_SET_ENGINE_DISTANCE]: engineAction_setEngineDistance_handler,
    [ENGINE_ACTION_TYPE.ENGINE_ACTION_SET_ENGINE_PART_POSITION_AND_SIZE]: engineAction_setEnginePartPositionAndSize_handler,
    [ENGINE_ACTION_TYPE.ENGINE_ACTION_ENGINE_PART_MOUSE_CLICKS]: engineAction_enginePartMouseClicks_handler,
    [ENGINE_ACTION_TYPE.ENGINE_ACTION_ENGINE_PART_MOUSE_ENTERS]: engineAction_enginePartMouseEnters_handler,
    [ENGINE_ACTION_TYPE.ENGINE_ACTION_ENGINE_PART_MOUSE_LEAVES]: engineAction_enginePartMouseLeaves_handler,
};

export default createReducer(engineReducerDefaultState, engineReducerHandlers);