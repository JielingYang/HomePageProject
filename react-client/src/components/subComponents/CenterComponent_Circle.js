import React from 'react';
import {GOLD} from "../../utilities/CONSTANTS_COLOR";
import {CENTER_COMPONENT_CONSOLE_FONT} from "../../utilities/CONSTANTS_CONSOLE_FONT";
import {CENTER_COMPONENT_TIMING} from "../../utilities/CONSTANTS_TIME";
import {SVG_ANIMATE_CALC_MODE, SVG_ANIMATE_FILL, SVG_KEY_SPLINES, SVG_KEY_TIMES} from "../../classes/SvgAnimateBuilder";
import animateBuilder from "../../classes/SvgAnimateBuilder";

type CenterComponent_Circle_PropsType = {
    cx: Number,
    cy: Number,
    r: Number,
    thickness: Number
}

/**
 * CenterComponent_Circle
 */
const CenterComponent_Circle = (props: CenterComponent_Circle_PropsType) =>
{
    console.log("%c  - CenterComponent_Circle", CENTER_COMPONENT_CONSOLE_FONT);

    let cx = props.cx;
    let cy = props.cy;
    let r = props.r;
    let thickness = props.thickness;
    let circumference = 2 * Math.PI * r;

    let animatePartialCircleToFull = animateBuilder
        .setAttributeName('stroke-dashoffset')
        .setId(ID_CONSTANTS.CENTER_COMPONENT_ANIMATE_PARTIAL_CIRCLE_TO_FULL)
        .setBeginOnEventTime(CENTER_COMPONENT_TIMING.PARTIAL_CIRCLE_TO_FULL_BEGIN, CENTER_COMPONENT_TIMING.PARTIAL_CIRCLE_TO_FULL_DELAY)
        .setDur(CENTER_COMPONENT_TIMING.PARTIAL_CIRCLE_TO_FULL_DUR)
        .setValues(circumference * 0.25 + ';' + circumference * 0.01)
        .setKeyTimes(SVG_KEY_TIMES.default)
        .setKeySpline(SVG_KEY_SPLINES.easeIn)
        .setCalcMode(SVG_ANIMATE_CALC_MODE.spline)
        .buildAnimateAndReset();
    let animateFullCircleToFinal = animateBuilder
        .setAttributeName('stroke-dashoffset')
        .setId(ID_CONSTANTS.CENTER_COMPONENT_ANIMATE_FULL_CIRCLE_TO_FINAL)
        .setBeginOnEventTime(CENTER_COMPONENT_TIMING.FULL_CIRCLE_TO_FINAL_BEGIN, CENTER_COMPONENT_TIMING.FULL_CIRCLE_TO_FINAL_DELAY)
        .setDur(CENTER_COMPONENT_TIMING.FULL_CIRCLE_TO_FINAL_DUR)
        .setValues(circumference * 0.01 + ';-' + circumference * 0.99 + ';' + circumference * 0.01)
        .setKeyTimes('0;0.5;1')
        .setKeySpline(SVG_KEY_SPLINES.easeOut)
        .addKeySpline(SVG_KEY_SPLINES.easeIn)
        .setCalcMode(SVG_ANIMATE_CALC_MODE.spline)
        .setFill(SVG_ANIMATE_FILL.freeze)
        .buildAnimateAndReset();
    let animateDashCircleToNone = animateBuilder
        .setAttributeName('display')
        .setId(ID_CONSTANTS.CENTER_COMPONENT_ANIMATE_DASH_CIRCLE_TO_NONE)
        .setBeginOnEventTime(CENTER_COMPONENT_TIMING.DASH_CIRCLE_TO_NONE_BEGIN, CENTER_COMPONENT_TIMING.DASH_CIRCLE_TO_NONE_DELAY)
        .setDur(CENTER_COMPONENT_TIMING.DASH_CIRCLE_TO_NONE_DUR)
        .setTo('none')
        .setFill(SVG_ANIMATE_FILL.freeze)
        .buildAnimateAndReset();

    return (
        <g>
            <circle cx={cx} cy={cy}
                    r={r}
                    stroke={GOLD} strokeWidth={thickness}
                    strokeDasharray={thickness + ' ' + 0.25 * thickness}
                    fill='none'>
                {animateDashCircleToNone}
            </circle>
            <circle cx={cx} cy={cy}
                    r={r}
                    stroke={GOLD} strokeWidth={thickness}
                    strokeDasharray={circumference}
                    strokeDashoffset={circumference * 0.25}
                    fill='none'>
                {animatePartialCircleToFull}
                {animateFullCircleToFinal}
            </circle>
        </g>
    );
};


export default CenterComponent_Circle;