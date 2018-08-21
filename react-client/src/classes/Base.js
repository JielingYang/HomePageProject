export default class Base
{
    constructor(numId: Number, strId: String)
    {
        this.numId = numId;
        this.strId = strId;
    }

    getNumberId(): Number {return this.numId}

    getStringId(): String {return this.strId}

    clone(): Base {return new Base(this.getNumberId(), this.getStringId())}
}