/* ************************** Requesting actions ************************** */
/* This kind of actions do not send new data directly to reducer            */
/* They check on new data to decide whether to call updating actions or not */
/* ************************************************************************ */

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

/* **************************** Updating actions ***************************** */
/* This kind of actions send new data to reducer directly and contain no logic */
/* *************************************************************************** */

export const MAIN_MENU_ACTION_TYPE = Object.freeze({
    MAIN_MENU_ACTION_INITIALIZE_MAIN_MENU_ITEM_MODELS: "MAIN_MENU_ACTION_INITIALIZE_MAIN_MENU_ITEM_MODELS",
});

const mainMenuAction_initializeMainMenuItemModels = (mainMenuItemsIndices: Array<number>) =>
{
    return {
        type: MAIN_MENU_ACTION_TYPE.MAIN_MENU_ACTION_INITIALIZE_MAIN_MENU_ITEM_MODELS,
        mainMenuItemsIndices: mainMenuItemsIndices,
    };
};