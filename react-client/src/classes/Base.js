export default class Base
{
    constructor(numId: number)
    {
        this.numId = numId;
    }

    getNumberId(): number {return this.numId}

    clone(): Base {return new Base(this.getNumberId())}
}