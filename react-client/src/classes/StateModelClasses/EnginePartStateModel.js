
export default class EnginePartStateModel extends StateModel
{
    constructor(numId: number, strId: string)
    {
        super(numId, strId);
    }



    deepClone(): EnginePartStateModel
    {
        let result = new EnginePartStateModel(this.getNumberId(), this.getStringId());
        return result;
    }
}