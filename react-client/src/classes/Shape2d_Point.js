export default class Shape2d_Point
{
    constructor(x: Number, y: Number)
    {
        this.x = x;
        this.y = y;
    }

    getX(): Number {return this.x}

    getY(): Number {return this.y}

    setX(x: Number) {this.x = x}

    setY(y: Number) {this.y = y}

    translateX(tx: Number): Shape2d_Point
    {
        this.setX(this.getX() + tx);
        return this;
    }

    translateY(ty: Number): Shape2d_Point
    {
        this.setY(this.getY() + ty);
        return this;
    }

    translate(tx: Number, ty: Number): Shape2d_Point
    {
        this.translateX(tx);
        this.translateY(ty);
        return this;
    }

    clone(): Shape2d_Point {return new Shape2d_Point(this.getX(), this.getY())}
}