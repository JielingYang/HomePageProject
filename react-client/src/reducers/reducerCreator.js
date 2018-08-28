const CLASS_NAMES = Object.freeze({
    Base: "Base",
    Shape2d_Line: "Shape2d_Line",
    Shape2d_Point: "Shape2d_Point",
    Shape2d_Polygon: "Shape2d_Polygon",
    Shape2d_Rectangle: "Shape2d_Rectangle"
});

/**
 * Returns a reducer function with two given objects: One contains default state and another contains types of actions and their implementation functions to be used for changing the state
 * @param defaultState Object that represents default state of the reducer created by this function
 * @param handlers Object that contains handler functions which take the state and redux action as parameters. Each handler applies the action to the state if the action type can be recognised by this handler
 * @returns reducer Function that represents created reducer
 */
export const createReducer = (defaultState: Object, handlers: Object) =>
{
    // Return the reducer function
    return (state = defaultState, action) =>
    {
        /**
         * Check if this action's type can be recognised
         */
        // If type of the action is recognised by the handler
        if (handlers.hasOwnProperty(action.type))
        {
            // Apply the action by calling the related function inside the hsandler
            return handlers[action.type](state, action)
        }
        // If type of incoming action is not recognised by the handler
        else
        {
            // Do nothing and just return unchanged old state
            return state
        }
    };
};

/**
 * This function do a deep copy on given object (including array) and return copied result.
 * @param originalObject
 * @returns {*}
 */
export const deepCopy = (originalObject) =>
{
    let copiedObject = Array.isArray(originalObject) ? [] : {};

    for (let key in originalObject)
    {
        if (originalObject.hasOwnProperty(key))
        {
            let o = originalObject[key];

            // If target is class object
            if (CLASS_NAMES.hasOwnProperty(o.constructor.name))
            {
                // Call class object deepClone method
                copiedObject[key] = o.deepClone();
            }
            else
            {
                copiedObject[key] = (typeof o === "object") ? deepCopy(o) : o;
            }
        }
    }
    return copiedObject;
};