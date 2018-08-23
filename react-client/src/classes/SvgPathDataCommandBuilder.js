/**
 * This is a singleton class
 */
class SvgPathDataCommandBuilder
{
    constructor()
    {
        if (!SvgPathDataCommandBuilder.instance)
        {
            this.commandString = '';
            SvgPathDataCommandBuilder.instance = this;
        }

        return SvgPathDataCommandBuilder.instance;
    }

    /**
     * Make sure this method is called when finish chaining commands.
     * It returns generated SVG path data command in string that can be used directly by "d" parameter of SVG path element and clear the variable for next use.
     * @returns {string}
     */
    buildCommandAndClear()
    {
        let returnResult = this.commandString;
        this.commandString = '';
        return returnResult;
    }

    /**
     * It returns generated SVG path data command in string that can be used directly by "d" parameter of SVG path element but without clear the variable.
     */
    buildCommand()
    {
        return this.commandString;
    }


    A(rx, ry, rotation, arc, sweep, ex, ey)
    {
        this.commandString += 'A ' + rx + ' ' + ry + ' ' + rotation + ' ' + arc + ' ' + sweep + ' ' + ex + ' ' + ey + ' ';
        return this;
    }

    a(rx, ry, rotation, arc, sweep, ex, ey)
    {
        this.commandString += 'a ' + rx + ' ' + ry + ' ' + rotation + ' ' + arc + ' ' + sweep + ' ' + ex + ' ' + ey + ' ';
        return this;
    }

    C(x1, y1, x2, y2, x3, y3)
    {
        this.commandString += 'C ' + x1 + ' ' + y1 + ' ' + x2 + ' ' + y2 + ' ' + x3 + ' ' + y3 + ' ';
        return this;
    }

    c(x1, y1, x2, y2, x3, y3)
    {
        this.commandString += 'c ' + x1 + ' ' + y1 + ' ' + x2 + ' ' + y2 + ' ' + x3 + ' ' + y3 + ' ';
        return this;
    }

    H(x, y)
    {
        this.commandString += 'H ' + x + ' ' + y + ' ';
        return this;
    }

    h(x)
    {
        this.commandString += 'h ' + x + ' ';
        return this;
    }

    L(x, y)
    {
        this.commandString += 'L ' + x + ' ' + y + ' ';
        return this;
    }

    l(x, y)
    {
        this.commandString += 'l ' + x + ' ' + y + ' ';
        return this;
    }

    M(x, y)
    {
        this.commandString += 'M ' + x + ' ' + y + ' ';
        return this;
    }

    m(x, y)
    {
        this.commandString += 'm ' + x + ' ' + y + ' ';
        return this;
    }

    Q(x1, y1, x2, y2)
    {
        this.commandString += 'Q ' + x1 + ' ' + y1 + ' ' + x2 + ' ' + y2 + ' ';
        return this;
    }

    q(x1, y1, x2, y2)
    {
        this.commandString += 'q ' + x1 + ' ' + y1 + ' ' + x2 + ' ' + y2 + ' ';
        return this;
    }

    S(x1, y1, x2, y2)
    {
        this.commandString += 'S ' + x1 + ' ' + y1 + ' ' + x2 + ' ' + y2 + ' ';
        return this;
    }

    s(x1, y1, x2, y2)
    {
        this.commandString += 's ' + x1 + ' ' + y1 + ' ' + x2 + ' ' + y2 + ' ';
        return this;
    }

    T(x, y)
    {
        this.commandString += 'T ' + x + ' ' + y + ' ';
        return this;
    }

    t(x, y)
    {
        this.commandString += 't ' + x + ' ' + y + ' ';
        return this;
    }

    V(x, y)
    {
        this.commandString += 'V ' + x + ' ' + y + ' ';
        return this;
    }

    v(y)
    {
        this.commandString += 'v ' + y + ' ';
        return this;
    }

    Z()
    {
        this.commandString += 'Z ';
        return this;
    }

    z()
    {
        this.commandString += 'z ';
        return this;
    }
}

const pathCommandBuilder = new SvgPathDataCommandBuilder();

export default pathCommandBuilder;
