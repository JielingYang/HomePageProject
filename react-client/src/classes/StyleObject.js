export default class StyleObject
{
    constructor()
    {
        this.style = {};
    }

    getStyle(): Object {return this.style}

    setBasics(position: string, width: number, height: number, left: number, top: number): StyleObject
    {
        this.style = {
            position: position,
            width: width,
            height: height,
            left: left,
            top: top,
        };
        return this;
    }

    setBackgroundColor(backgroundColor: string): StyleObject
    {
        this.style.backgroundColor = backgroundColor;
        return this;
    }

    setPerspective(perspective: number, perspectiveOrigin: string): StyleObject
    {
        this.style.perspective = perspective;
        if (perspectiveOrigin !== undefined)
        {
            this.style.perspectiveOrigin = perspectiveOrigin;
        }
        return this;
    }
}