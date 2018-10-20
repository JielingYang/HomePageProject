import Base from "../classes/Base";

export const CLASS_NAMES = Object.freeze({
    Base: "Base",
    Shape2d_Line: "Shape2d_Line",
    Shape2d_Point: "Shape2d_Point",
    Shape2d_Polygon: "Shape2d_Polygon",
    Shape2d_Rectangle: "Shape2d_Rectangle",
    Shape2d_Circle: "Shape2d_Circle"
});

/**
 * This function do a deep copy on given object (including array) and return copied result.
 * @param originalObject
 * @returns {*}
 */
export const deepCopy = (originalObject) =>
{
    let copiedObject = Array.isArray(originalObject)
                       ? []
                       : {};

    for (let key in originalObject)
    {
        if (originalObject.hasOwnProperty(key))
        {
            let o = originalObject[key];

            // If target is Base class object
            if (o instanceof Base)
            {
                // Call class object deepClone method
                copiedObject[key] = o.deepClone();
            }
            else
            {
                copiedObject[key] = (typeof o === "object")
                                    ? deepCopy(o)
                                    : o;
            }
        }
    }
    return copiedObject;
};

export const getObjectsByClassNames: Array = (stateObject: Object, classNames) =>
{
    let result: Array = [];
    Object.values(stateObject).forEach((element: Object) =>
    {
        if (classNames.includes(element.constructor.name))
        {
            result.push(element);
        }
        else if (typeof element === "object" && !Array.isArray(element))
        {
            result = result.concat(getObjectsByClassNames(element, classNames));
        }
    });
    return result;
};

export const getObjectById: Base = (stateObject: Object, id: number | string) =>
{
    let result = null;
    Object.values(stateObject).some(element =>
    {
        // If current element is Base class object
        if (element instanceof Base)
        {
            // And if this Base class object has same number or string ID being searched
            if (element.getNumberId() === id || element.getStringId() === id)
            {
                // Get the result and stop the loop
                result = element;
                return true;
            }
            // Otherwise, continue the loop by returning false
            else
            {
                return false;
            }
        }
        // If current element is other object types (excluding array)
        else if (typeof element === "object" && !Array.isArray(element))
        {
            result = getObjectById(element, id);
            return result !== null;
        }
        else
        {
            return false;
        }
    });
    return result;
};

export const numberToPercentageString: string = (number: number, digit: number) =>
{
    let numberInString: string;
    if (digit === undefined || digit === null || digit < 0 || digit > 100)
    {
        numberInString = Number(number).toFixed(2);
    }
    else
    {
        numberInString = Number(number).toFixed(digit);
    }
    return numberInString + "%";
};