import BaseModelWithState from "./BaseModelWithState";

export default class BaseModelWithStateAndShape extends BaseModelWithState
{
    constructor(name: string, numId: number, x: number, y: number, z: number, width: number, height: number)
    {
        super(name, numId);
        this.x = x;
        this.y = y;
        this.z = z;
        this.width = width;
        this.height = height;

        this.xUnitLength = width / 100; // One percent of the rectangle width
        this.yUnitLength = height / 100; // One percent of the rectangle height
        this.unitLengthSmall = null;
        this.unitLengthLarge = null;
    }

    /***********************************************************
     * These functions should be considered as private methods *
     ***********************************************************/

    calculateSmallLargeUnitLength()
    {
        this.unitLengthSmall = this.xUnitLength <= this.yUnitLength
                               ? this.xUnitLength
                               : this.yUnitLength;
        this.unitLengthLarge = this.xUnitLength > this.yUnitLength
                               ? this.xUnitLength
                               : this.yUnitLength;
    }

    /**********************************************************
     * These functions should be considered as public methods *
     **********************************************************/

    setX(x: number)
    {
        this.x = x;
    }

    getX(): number
    {
        return this.x;
    }

    setY(y: number)
    {
        this.y = y;
    }

    getY(): number
    {
        return this.y;
    }

    setZ(z: number)
    {
        this.z = z;
    }

    getZ(): number
    {
        return this.z;
    }

    setWidth(width: number)
    {
        this.width = width;
        this.xUnitLength = width / 100;
        this.unitLengthSmall = null;
        this.unitLengthLarge = null;
    }

    getWidth(): number
    {
        return this.width;
    }

    setHeight(height: number)
    {
        this.height = height;
        this.yUnitLength = height / 100;
        this.unitLengthSmall = null;
        this.unitLengthLarge = null;
    }

    getHeight(): number
    {
        return this.height;
    }

    getUnitLengthSmall(): number
    {
        if (this.unitLengthSmall === null)
        {
            this.calculateSmallLargeUnitLength();
        }
        return this.unitLengthSmall;
    }

    getUnitLengthLarge(): number
    {
        if (this.unitLengthLarge === null)
        {
            this.calculateSmallLargeUnitLength();
        }
        return this.unitLengthLarge;
    }

    deepClone(): BaseModelWithStateAndShape
    {
        let result = new BaseModelWithStateAndShape(this.getName(), this.getNumberId(), this.getX(), this.getY(), this.getZ(), this.getWidth(), this.getHeight());
        result.setMouseHover(this.getMouseHover());
        result.setIsSelected(this.getIsSelected());
        result.setMouseHoverCount(this.getMouseHoverCount());
        result.setMouseClickCount(this.getMouseClickCount());
        return result;
    }
}