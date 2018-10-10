const CLASS_NAMES = Object.freeze({
                                      Base: "Base",
                                      Shape2d_Line: "Shape2d_Line",
                                      Shape2d_Point: "Shape2d_Point",
                                      Shape2d_Polygon: "Shape2d_Polygon",
                                      Shape2d_Rectangle: "Shape2d_Rectangle"
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

            // If target is class object
            if (CLASS_NAMES.hasOwnProperty(o.constructor.name))
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

export const numberToPercentageString: string = (number: number, digit: number) =>
{
    let numberInString: string;
    if (digit === undefined || digit === null || digit < 0 || digit > 100)
    {numberInString = Number(number).toFixed(2);}
    else
    {numberInString = Number(number).toFixed(digit);}
    return numberInString + "%";
};