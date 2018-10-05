/**
 * This is a singleton class
 */
class NumberIdGenerator
{
    constructor()
    {
        if (!NumberIdGenerator.instance)
        {
            NumberIdGenerator.instance = this;
        }

        return NumberIdGenerator.instance;
    }
}

const numberIdGenerator = new NumberIdGenerator();

export default numberIdGenerator;
