export const numberToPercentageString: string = (number: number, digit: number) =>
{
    let numberInString: string;
    if (digit === undefined || digit === null || digit < 0 || digit > 100)
    {numberInString = Number(number * 100).toFixed(2)}
    else
    {numberInString = Number(number * 100).toFixed(digit)}
    return numberInString + "%"
};