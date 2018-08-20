import Base from "./Base";
import Shape2d_Point from "./Shape2d_Point";

export default class Shape2d_Line extends Base
{
    constructor(numId: number, strId: string, pointA: Shape2d_Point, pointB: Shape2d_Point)
    {
        super(numId, strId);

        this.pointA = pointA;
        this.pointB = pointB;
    }

    getPointA(): Shape2d_Point {return this.pointA};

    getPointB(): Shape2d_Point {return this.pointB};

    clone(): Shape2d_Line {return new Shape2d_Line(this.getNumberId(), this.getStringId(), this.getPointA().clone(), this.getPointB().clone())};
}