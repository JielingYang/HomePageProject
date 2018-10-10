import Base from "./Base";
import Shape2d_Point from "./Shape2d_Point";

export default class Shape2d_Circle extends Base
{
    constructor(numId: number, strId: string, centerPoint: Shape2d_Point, radiant: number)
    {
        super(numId, strId);
        this.centerPoint = centerPoint;
        this.radiant = radiant;
        this.unitLength = radiant / 50;
    }

    getCenterPoint(): Shape2d_Point {return this.centerPoint;}

    getRadiant(): number {return this.radiant;}

    getUnitLength(): number {return this.unitLength;}

    updateCenterPoint(centerPoint: Shape2d_Point) {this.centerPoint = centerPoint;}

    updateCircleRadiant(radiant: number)
    {
        this.radiant = radiant;
        this.unitLength = radiant / 50;
    }

    isRadiantEqual(anotherCircle: Shape2d_Circle): Boolean {return this.radiant === anotherCircle.getRadiant();}

    deepClone(): Shape2d_Circle {return new Shape2d_Circle(this.getNumberId(), this.getStringId(), this.Shape2d_Point().clone(), this.getRadiant());}
}