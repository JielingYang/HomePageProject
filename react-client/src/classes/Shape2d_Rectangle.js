import Base from "./Base";
import Shape2d_Point from "./Shape2d_Point";

export default class Shape2d_Rectangle extends Base
{
    constructor(numId: number, strId: string, topLeftPoint: Shape2d_Point, width: number, height: number)
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

    getWidth(): number {return this.width}

    getHeight(): number {return this.height}

    getXUnitLength(): number {return this.xUnitLength}

    getYUnitLength(): number {return this.yUnitLength}

    getUnitLength(): number {return this.unitLength}

    updateRectangleSize(width: number, height: number)
    {
        this.width = width;
        this.height = height;
        this.xUnitLength = width / 100;
        this.yUnitLength = height / 100;
        this.unitLength = this.xUnitLength <= this.yUnitLength ? this.xUnitLength : this.yUnitLength;
        this.calculateCenterPoint();
    }

    calculateCenterPoint() {this.centerPoint = this.getTopLeftPoint().clone().translate(this.getWidth() / 2, this.getHeight() / 2)}

    isSizeEqual(anotherRect: Shape2d_Rectangle): Boolean {return this.width === anotherRect.getWidth() && this.height === anotherRect.getHeight()}

    clone(): Shape2d_Rectangle {return new Shape2d_Rectangle(this.getNumberId(), this.getStringId(), this.getTopLeftPoint().clone(), this.getWidth(), this.getHeight())}
}