/* ************************** Requesting actions ************************** */
/* This kind of actions do not send new data directly to reducer            */
/* They check on new data to decide whether to call updating actions or not */
/* ************************************************************************ */

import BaseModelWithState from "../classes/BaseModelWithState";

export const mainMenuAction_requestToInitializeMainMenuItemModels = (mainMenuItemsIndices: Array<number>) =>
{
    return (dispatch, getState) =>
    {
        if (getState().mainMenuState.mainMenuItemModels.length === 0)
        {
            dispatch(mainMenuAction_initializeMainMenuItemModels(mainMenuItemsIndices));
        }
    }
};

export const mainMenuAction_requestToSelectMainMenuItem = (mainMenuItemIndex: number) =>
{
    return (dispatch, getState) =>
    {
        let mainMenuItems: Array<BaseModelWithState> = getState().mainMenuState.mainMenuItemModels;
        mainMenuItems.forEach((model: BaseModelWithState, index: number) =>
        {
            if ((index !== mainMenuItemIndex && model.getIsSelected()) || (index === mainMenuItemIndex && !model.getIsSelected()))
            {
                dispatch(mainMenuAction_mouseClicksMainMenuItem(index));
            }
        })
    }
};

/* **************************** Updating actions ***************************** */
/* This kind of actions send new data to reducer directly and contain no logic */
/* *************************************************************************** */

export const MAIN_MENU_ACTION_TYPE = Object.freeze({
    MAIN_MENU_ACTION_INITIALIZE_MAIN_MENU_ITEM_MODELS: "MAIN_MENU_ACTION_INITIALIZE_MAIN_MENU_ITEM_MODELS",
    MAIN_MENU_ACTION_MOUSE_CLICKS_MAIN_MENU_ITEM: "MAIN_MENU_ACTION_MOUSE_CLICKS_MAIN_MENU_ITEM",
    MAIN_MENU_ACTION_MOUSE_ENTERS_MAIN_MENU_ITEM: "MAIN_MENU_ACTION_MOUSE_ENTERS_MAIN_MENU_ITEM",
    MAIN_MENU_ACTION_MOUSE_LEAVES_MAIN_MENU_ITEM: "MAIN_MENU_ACTION_MOUSE_LEAVES_MAIN_MENU_ITEM",
});

const mainMenuAction_initializeMainMenuItemModels = (mainMenuItemsIndices: Array<number>) =>
{
    return {
        type: MAIN_MENU_ACTION_TYPE.MAIN_MENU_ACTION_INITIALIZE_MAIN_MENU_ITEM_MODELS,
        mainMenuItemsIndices: mainMenuItemsIndices,
    };
};

const mainMenuAction_mouseClicksMainMenuItem = (mainMenuItemIndex: number) =>
{
    return {
        type: MAIN_MENU_ACTION_TYPE.MAIN_MENU_ACTION_MOUSE_CLICKS_MAIN_MENU_ITEM,
        mainMenuItemIndex: mainMenuItemIndex,
    };
};

export const mainMenuAction_mouseEntersMainMenuItem = (mainMenuItemIndex: number) =>
{
    return {
        type: MAIN_MENU_ACTION_TYPE.MAIN_MENU_ACTION_MOUSE_ENTERS_MAIN_MENU_ITEM,
        mainMenuItemIndex: mainMenuItemIndex,
    };
};

export const mainMenuAction_mouseLeavesMainMenuItem = (mainMenuItemIndex: number) =>
{
    return {
        type: MAIN_MENU_ACTION_TYPE.MAIN_MENU_ACTION_MOUSE_LEAVES_MAIN_MENU_ITEM,
        mainMenuItemIndex: mainMenuItemIndex,
    };
};