import Base from "./Base";
import Shape2d_Point from "./Shape2d_Point";

export default class Shape2d_Rectangle extends Base
{
    constructor(numId: Number, strId: String, topLeftPoint: Shape2d_Point, width: Number, height: Number)
    {
        super(numId, strId);
        this.topLeftPoint = topLeftPoint;
        this.centerPoint = null;
        this.width = width;
        this.height = height;
        this.xUnitLength = width / 100; // One percent of the rectangle width
        this.yUnitLength = height / 100; // One percent of the rectangle height
        this.unitLength = this.xUnitLength <= this.yUnitLength ? this.xUnitLength : this.yUnitLength;

        this.calculateCenterPoint();
    }

    getTopLeftPoint(): Shape2d_Point {return this.topLeftPoint}

    getCenterPoint(): Shape2d_Point {return this.centerPoint}

    getWidth(): Number {return this.width}

    getHeight(): Number {return this.height}

    getXUnitLength(): Number {return this.xUnitLength}

    getYUnitLength(): Number {return this.yUnitLength}

    getUnitLength(): Number {return this.unitLength}

    updateRectangleSize(width: Number, height: Number)
    {
        this.width = width;
        this.height = height;
        this.xUnitLength = width / 100;
        this.yUnitLength = height / 100;
        this.unitLength = this.xUnitLength <= this.yUnitLength ? this.xUnitLength : this.yUnitLength;
        this.calculateCenterPoint();
    }

    calculateCenterPoint()
    {
        this.centerPoint = this.getTopLeftPoint()
                               .clone()
                               .translate(this.getWidth() / 2, this.getHeight() / 2);
    }

    clone(): Shape2d_Rectangle
    {
        return new Shape2d_Rectangle(
            this.getNumberId(),
            this.getStringId(),
            this.getTopLeftPoint()
                .clone(),
            this.getWidth(),
            this.getHeight())
    }
}