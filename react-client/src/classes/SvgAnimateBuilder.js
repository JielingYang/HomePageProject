import * as React from "react";

export const SVG_ANIMATE_ATTRIBUTE_TYPE = Object.freeze({
                                                            CSS: "CSS",
                                                            XML: "XML",
                                                            auto: "auto"
                                                        });

export const SVG_ANIMATE_ADDITIVE = Object.freeze({
                                                      replace: "replace",
                                                      sum: "sum"
                                                  });

export const SVG_ANIMATE_ACCUMULATE = Object.freeze({
                                                        none: "none",
                                                        sum: "sum"
                                                    });

export const SVG_ANIMATE_CALC_MODE = Object.freeze({
                                                       discrete: "discrete",
                                                       linear: "linear",
                                                       paced: "paced",
                                                       spline: "spline"
                                                   });

export const SVG_ANIMATE_RESTART = Object.freeze({
                                                     always: "always",
                                                     never: "never",
                                                     whenNotActive: "whenNotActive"
                                                 });

export const SVG_ANIMATE_FILL = Object.freeze({
                                                  remove: "remove",
                                                  freeze: "freeze"
                                              });

export const SVG_KEY_TIMES = Object.freeze({
                                               default: "0;1"
                                           });

export const SVG_KEY_SPLINES = Object.freeze({
                                                 easeInOut: "0.18 0.73 0.87 0.24;",
                                                 easeIn: "0.42 0 1 1;",
                                                 easeOut: "0 0 0.59 1;"
                                             });

const EMPTY_STRING = "";

/**
 * This is a singleton class
 */
class SvgAnimateBuilder
{
    constructor()
    {
        if (!SvgAnimateBuilder.instance)
        {
            this.reset();
            SvgAnimateBuilder.instance = this;
        }

        return SvgAnimateBuilder.instance;
    }

    /**
     * Make sure this method is called when finish chaining commands.
     * It returns <animate> element and then reset everything.
     * @returns {*}
     */
    buildAnimateAndReset()
    {
        let id = this.id;
        // let xlinkHref = this.xlinkHref;
        let attributeName = this.attributeName;
        let attributeType = this.attributeType;
        let additive = this.additive;
        let accumulate = this.accumulate;

        let calcMode = this.calcMode;
        let values = this.values;
        let keyTimes = this.keyTimes;
        let keySplines = this.keySplines;
        let from = this.from;
        let to = this.to;
        // let by = this.by;

        let begin = this.begin;
        let dur = this.dur;
        let end = this.end;
        let restart = this.restart;
        let repeatCount = this.repeatCount;
        let repeatDur = this.repeatDur;
        let fill = this.fill;

        this.reset();

        if (attributeName == null || attributeName === undefined || attributeName === EMPTY_STRING)
        {
            throw Error("Can't build animate element: attributeName must be provided");
        }


        if (values !== null && values !== undefined && values !== EMPTY_STRING &&
            keyTimes !== null && keyTimes !== undefined && keyTimes !== EMPTY_STRING)
        {
            return <animate id={id}
                // xlinkHref={xlinkHref}
                            attributeName={attributeName}
                            attributeType={attributeType}
                            additive={additive}
                            accumulate={accumulate}

                            calcMode={calcMode}
                            values={values}
                            keyTimes={keyTimes}
                            keySplines={keySplines}

                            begin={begin}
                            dur={dur}
                            end={end}
                            restart={restart}
                            repeatCount={repeatCount}
                            repeatDur={repeatDur}
                            fill={fill}
            />;
        }
        else
        {
            return <animate id={id}
                // xlinkHref={xlinkHref}
                            attributeName={attributeName}
                            attributeType={attributeType}
                            additive={additive}
                            accumulate={accumulate}

                            calcMode={calcMode}
                            from={from}
                            to={to}
                // by={by}

                            begin={begin}
                            dur={dur}
                            end={end}
                            restart={restart}
                            repeatCount={repeatCount}
                            repeatDur={repeatDur}
                            fill={fill}
            />;
        }
    }

    /**
     * Set everything to default value
     */
    reset()
    {
        this.id = null;
        this.xlinkHref = EMPTY_STRING;
        this.attributeName = EMPTY_STRING;
        this.attributeType = SVG_ANIMATE_ATTRIBUTE_TYPE.auto;
        this.additive = SVG_ANIMATE_ADDITIVE.replace;
        this.accumulate = SVG_ANIMATE_ACCUMULATE.none;

        this.calcMode = SVG_ANIMATE_CALC_MODE.linear;
        this.values = EMPTY_STRING;
        this.keyTimes = EMPTY_STRING;
        this.keySplines = EMPTY_STRING;
        this.from = EMPTY_STRING;
        this.to = EMPTY_STRING;
        this.by = EMPTY_STRING;

        this.begin = EMPTY_STRING;
        this.dur = EMPTY_STRING;
        this.end = EMPTY_STRING;
        this.restart = SVG_ANIMATE_RESTART.always;
        this.repeatCount = 1;
        this.repeatDur = EMPTY_STRING;
        this.fill = SVG_ANIMATE_FILL.remove;
    }

    setId(id: string)
    {
        this.id = id;
        return this;
    }

    setXlinkHref(xlinkHref: string)
    {
        this.xlinkHref = "#" + xlinkHref;
        return this;
    }

    setAttributeName(attributeName: string)
    {
        this.attributeName = attributeName;
        return this;
    }

    setAttributeType(attributeType: SVG_ANIMATE_ATTRIBUTE_TYPE)
    {
        this.attributeType = attributeType;
        return this;
    }

    setAdditive(additive: SVG_ANIMATE_ADDITIVE)
    {
        this.additive = additive;
        return this;
    }

    setAccumulate(accumulate: SVG_ANIMATE_ACCUMULATE)
    {
        this.accumulate = accumulate;
        return this;
    }

    setCalcMode(calcMode: SVG_ANIMATE_CALC_MODE)
    {
        this.calcMode = calcMode;
        return this;
    }

    setValues(values: string)
    {
        this.values = values;
        return this;
    }

    setKeyTimes(keyTimes: string)
    {
        this.keyTimes = keyTimes;
        return this;
    }

    setKeySpline(keySpline: SVG_KEY_SPLINES)
    {
        this.keySplines = keySpline;
        return this;
    }

    addKeySpline(keySpline: SVG_KEY_SPLINES)
    {
        this.keySplines = this.keySplines + keySpline;
        return this;
    }

    setFrom(from: string)
    {
        this.from = from;
        return this;
    }

    setTo(to: string)
    {
        this.to = to;
        return this;
    }

    setBy(by: string)
    {
        this.by = by;
        return this;
    }

    setBeginOnElementTrigger(targetId: string, trigger: string)
    {
        this.begin = targetId + "." + trigger;
        return this;
    }

    setBeginOnTime(time: number)
    {
        this.begin = time + "s";
        return this;
    }

    setBeginOnEventTime(event: string, time: number)
    {
        this.begin = event + "+" + time + "s";
        return this;
    }

    setDur(dur: number)
    {
        this.dur = dur + "s";
        return this;
    }

    setEnd(end: string)
    {
        this.end = end;
        return this;
    }

    setRestart(restart: SVG_ANIMATE_RESTART)
    {
        this.restart = restart;
        return this;
    }

    setRepeatCount(repeatCount: number)
    {
        this.repeatCount = repeatCount;
        return this;
    }

    setRepeatCountIndefinite()
    {
        this.repeatCount = "indefinite";
        return this;
    }

    setRepeatDur(repeatDur: string)
    {
        this.repeatDur = repeatDur;
        return this;
    }

    setFill(fill: SVG_ANIMATE_FILL)
    {
        this.fill = fill;
        return this;
    }
}

const animateBuilder = new SvgAnimateBuilder();

export default animateBuilder;
