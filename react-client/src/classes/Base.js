export default class Base
{
    constructor(numId: number, strId: string)
    {
        this.numId = numId;
        this.strId = strId;
    }

    getNumberId(): number {return this.numId}

    getStringId(): string {return this.strId}

    deepClone(): Base {return new Base(this.getNumberId(), this.getStringId())}
}