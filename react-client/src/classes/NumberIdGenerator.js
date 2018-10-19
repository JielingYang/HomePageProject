/**
 * This is a singleton class
 */
class NumberIdGenerator
{
    constructor()
    {
        if (!NumberIdGenerator.instance)
        {
            this.counter = -1;
            NumberIdGenerator.instance = this;
        }

        return NumberIdGenerator.instance;
    }

    generateId()
    {
        this.counter++;
        return this.counter;
    }
}

const numberIdGenerator = new NumberIdGenerator();

export default numberIdGenerator;
