export default class Shape2d_Point
{
    constructor(x: number, y: number)
    {
        this.x = x;
        this.y = y;
    }

    getX(): number {return this.x;}

    getY(): number {return this.y;}

    setX(x: number) {this.x = x;}

    setY(y: number) {this.y = y;}

    translateX(tx: number): Shape2d_Point
    {
        this.setX(this.getX() + tx);
        return this;
    }

    translateY(ty: number): Shape2d_Point
    {
        this.setY(this.getY() + ty);
        return this;
    }

    translate(tx: number, ty: number): Shape2d_Point
    {
        this.translateX(tx);
        this.translateY(ty);
        return this;
    }

    clone(): Shape2d_Point {return new Shape2d_Point(this.getX(), this.getY());}
}