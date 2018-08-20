import Base from "./Base";
import Shape2d_Point from "./Shape2d_Point";

export default class Shape2d_Polygon extends Base
{
    constructor(numId: number, strId: string, points: Array)
    {
        super(numId, strId);

        if (points.length < 3)
        {
            throw Error("Not enough points to create shape");
        }

        this.points = points;
    }

    getPoints(): Array {return this.points};

    clone(): Shape2d_Polygon {return new Shape2d_Polygon(this.getNumberId(), this.getStringId(), this.getPoints().map((point: Shape2d_Point) => point.clone()))};
}