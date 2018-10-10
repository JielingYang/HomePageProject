import Base from "../classes/Base";

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

export const getClassObjectByNumId = (target: Object, id: number) =>
{
    let result = null;
    Object.values(target).some(element =>
                               {
                                   // If current element is Base class object
                                   if (element instanceof Base)
                                   {
                                       // And if this Base class object has same number ID being searched
                                       if (element.getNumberId() === id)
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
                                       result = getClassObjectByNumId(element, id);
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
    {numberInString = Number(number).toFixed(2);}
    else
    {numberInString = Number(number).toFixed(digit);}
    return numberInString + "%";
};