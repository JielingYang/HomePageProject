import {DEFAULT_FONT_COLOR} from "../utilities/CONSTANTS_COLOR";

export default class StyleObject
{
    constructor()
    {
        // Default styles
        this.style = {
            position: "absolute",
            boxSizing: "border-box",
            fontFamily: "sans-serif",
            fontSize: "0.6vw",
            color: DEFAULT_FONT_COLOR,
        };
    }

    getStyle(): Object
    {
        return this.style;
    }

    setBasics(width: number | string, height: number | string, left: number | string, top: number | string): StyleObject
    {
        this.style.width = width;
        this.style.height = height;
        this.style.left = left;
        this.style.top = top;
        return this;
    }

    setPosition(position: string)
    {
        this.style.position = position;
        return this;
    }

    setTextAlign(textAlign: string)
    {
        this.style.textAlign = textAlign;
        return this;
    }

    setWidth(width: number | string)
    {
        this.style.width = width;
        return this;
    }

    setHeight(height: number | string)
    {
        this.style.height = height;
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

    setTransformOrigin(transformOrigin: string)
    {
        this.style.transformOrigin = transformOrigin;
        return this;
    }

    setBackfaceVisibility(visibility: string)
    {
        this.style.backfaceVisibility = visibility;
        return this;
    }

    setPointerEvents(event: string)
    {
        this.style.pointerEvents = event;
        return this;
    }

    setDisplay(display: string)
    {
        this.style.display = display;
        return this;
    }

    setFlexDirection(direction: string)
    {
        this.style.flexDirection = direction;
        return this;
    }

    setJustifyContent(content: string)
    {
        this.style.justifyContent = content;
        return this;
    }

    setAlignItems(align: string)
    {
        this.style.alignItems = align;
        return this;
    }

    setAlignContent(align: string)
    {
        this.style.alignContent = align;
        return this;
    }


    setMargin(margin: string)
    {
        this.style.margin = margin;
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

    addScale(scaleX: number, scaleY: number)
    {
        let scale: string = " scale(" + scaleX + "," + scaleY + ")";
        if (this.style.transform !== undefined)
        {
            this.style.transform = this.style.transform + scale;
        }
        else
        {
            this.style.transform = scale;
        }
        return this;
    }

    setBlur(blurValue: number)
    {
        let blur: string = " blur(" + blurValue + "px)";
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

    setBorder(borderSize: number, borderStyle: string, borderColor: string)
    {
        this.style.border = borderSize + "px " + borderStyle + " " + borderColor;
        return this;
    }

    setBorderRadius(r1: number, r2: number, r3: number, r4: number)
    {
        let borderRadius: string = r1 + "px ";
        if (r2 !== undefined)
        {
            borderRadius = borderRadius + r2 + "px ";
            if (r3 !== undefined)
            {
                borderRadius = borderRadius + r3 + "px ";
                if (r4 !== undefined)
                {
                    borderRadius = borderRadius + r4 + "px ";
                }
            }
        }
        this.style.borderRadius = borderRadius;
        return this;
    }

    addTransition(name: string, duration: number, timingFunction: string, delay: number)
    {
        let tf: string = timingFunction === undefined
                         ? ""
                         : timingFunction + " ";
        let d: string = delay === undefined
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

    setFontFamily(font: string)
    {
        this.style.fontFamily = font;
        return this;
    }

    setFontColor(color: string)
    {
        this.style.color = color;
        return this;
    }

    setZIndex(zIndex: number)
    {
        this.style.zIndex = zIndex;
        return this;
    }
}