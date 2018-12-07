/* ************************** Requesting actions ************************** */
/* This kind of actions do not send new data directly to reducer            */
/* They check on new data to decide whether to call updating actions or not */
/* ************************************************************************ */

export const contentPanelAction_requestToInitializeContentPanelsModels = (contentPanelsIndices: Array<number>) =>
{
    return (dispatch, getState) =>
    {
        if (getState().contentPanelsState.contentPanelsModels.length === 0)
        {
            dispatch(contentPanelAction_initializeContentPanelsModels(contentPanelsIndices));
        }
    }
};

/* **************************** Updating actions ***************************** */
/* This kind of actions send new data to reducer directly and contain no logic */
/* *************************************************************************** */

export const CONTENT_PANEL_ACTION_TYPE = Object.freeze({
    CONTENT_PANEL_ACTION_INITIALIZE_CONTENT_PANELS_MODELS: "CONTENT_PANEL_ACTION_INITIALIZE_CONTENT_PANELS_MODELS",
    CONTENT_PANEL_ACTION_UPDATE_CONTENT_PANEL_POSITION_AND_SIZE: "CONTENT_PANEL_ACTION_UPDATE_CONTENT_PANEL_POSITION_AND_SIZE",
    CONTENT_PANEL_ACTION_MOUSE_CLICKS: "CONTENT_PANEL_ACTION_MOUSE_CLICKS",
    CONTENT_PANEL_ACTION_MOUSE_ENTERS: "CONTENT_PANEL_ACTION_MOUSE_ENTERS",
    CONTENT_PANEL_ACTION_MOUSE_LEAVES: "CONTENT_PANEL_ACTION_MOUSE_LEAVES",
});

const contentPanelAction_initializeContentPanelsModels = (contentPanelsIndices: Array<number>) =>
{
    return {
        type: CONTENT_PANEL_ACTION_TYPE.CONTENT_PANEL_ACTION_INITIALIZE_CONTENT_PANELS_MODELS,
        contentPanelsIndices: contentPanelsIndices,
    };
};

export const contentPanelAction_updateContentPanelPositionAndSize = (contentPanelIndex: number, x: number, y: number, z: number, width: number, height: number) =>
{
    return {
        type: CONTENT_PANEL_ACTION_TYPE.CONTENT_PANEL_ACTION_UPDATE_CONTENT_PANEL_POSITION_AND_SIZE,
        contentPanelIndex: contentPanelIndex,
        x: x,
        y: y,
        z: z,
        width: width,
        height: height
    };
};

export const contentPanelAction_mouseClicks = (contentPanelIndex: number) =>
{
    return {
        type: CONTENT_PANEL_ACTION_TYPE.CONTENT_PANEL_ACTION_MOUSE_CLICKS,
        contentPanelIndex: contentPanelIndex
    };
};

export const contentPanelAction_mouseEnters = (contentPanelIndex: number) =>
{
    return {
        type: CONTENT_PANEL_ACTION_TYPE.CONTENT_PANEL_ACTION_MOUSE_ENTERS,
        contentPanelIndex: contentPanelIndex
    };
};

export const contentPanelAction_mouseLeaves = (contentPanelIndex: number) =>
{
    return {
        type: CONTENT_PANEL_ACTION_TYPE.CONTENT_PANEL_ACTION_MOUSE_LEAVES,
        contentPanelIndex: contentPanelIndex
    };
};