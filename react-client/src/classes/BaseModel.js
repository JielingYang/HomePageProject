export default class BaseModel
{
    constructor(name: string, numId: number)
    {
        this.name = name;
        this.numId = numId;
        this.strId = name + numId;
    }

    getName(): number
    {
        return this.name;
    }

    getNumberId(): number
    {
        return this.numId;
    }

    getStringId(): string
    {
        return this.strId;
    }

    deepClone(): BaseModel
    {
        return new BaseModel(this.getName(), this.getNumberId());
    }
}