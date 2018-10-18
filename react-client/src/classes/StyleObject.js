export default class StyleObject
{
    constructor()
    {
        this.style = {};
    }

    getStyle(): Object
    {
        return this.style;
    }

    setBasics(position: string, width: number, height: number, left: number, top: number): StyleObject
    {
        this.style = {
            position: position,
            width: width,
            height: height,
            left: left,
            top: top
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

    setTransformStyle(transformStyle: string)
    {
        this.style.transformStyle = transformStyle;
        return this;
    }

    setBackfaceVisibility(visibility: string)
    {
        this.style.backfaceVisibility = visibility;
        return this;
    }

    addTranslation(translateX: string | number, translateY: string | number, translateZ: string | number)
    {
        let translation: string = " translateX(" + translateX + ")" + " translateY(" + translateY + ")" + " translateZ(" + translateZ + ")";
        if (this.style.transform !== undefined)
        {
            this.style.transform = this.style.transform + translation;
        }
        else
        {
            this.style.transform = translation;
        }
        return this;
    }

    addRotation(rotateX: string | number, rotateY: string | number, rotateZ: string | number)
    {
        let rotation: string = " rotateX(" + rotateX + "deg)" + " rotateY(" + rotateY + "deg)" + " rotateZ(" + rotateZ + "deg)";
        if (this.style.transform !== undefined)
        {
            this.style.transform = this.style.transform + rotation;
        }
        else
        {
            this.style.transform = rotation;
        }
        return this;
    }

    setBlur(blurValue: number)
    {
        let blur = " blur(" + blurValue + "px)";
        if (this.style.filter !== undefined)
        {
            if (this.style.filter.includes("blur"))
            {
                this.style.filter = this.style.filter.replace(/ blur(.*)px/, blur);
            }
            else
            {
                this.style.filter = this.style.filter + blur;
            }
        }
        else
        {
            this.style.filter = blur;
        }
        return this;
    }

    addTransition(name: string, duration: number, timingFunction: string, delay: number)
    {
        let tf = timingFunction === undefined
                 ? ""
                 : timingFunction + " ";
        let d = delay === undefined
                ? ""
                : delay + "s";
        let transition = name + " " + duration + "s " + tf + d;

        if (this.style.transition !== undefined)
        {
            this.style.transition = this.style.transition + ", " + transition;
        }
        else
        {
            this.style.transition = transition;
        }
        return this;
    }
}