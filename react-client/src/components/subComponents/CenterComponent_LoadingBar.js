import React from 'react';
import {ID_CONSTANTS} from "../../utilities/CONSTANTS_ID";
import {GOLD, GOLD_OPACITY_10} from "../../utilities/CONSTANTS_COLOR";
import {CENTER_COMPONENT_CONSOLE_FONT} from "../../utilities/CONSTANTS_CONSOLE_FONT";
import {CENTER_COMPONENT_TIMING} from "../../utilities/CONSTANTS_TIME";
import {SVG_ANIMATE_FILL} from "../../classes/SvgAnimateBuilder";
import animateBuilder from "../../classes/SvgAnimateBuilder";

type CenterComponent_LoadingBar_PropsType = {
    x: Number,
    y: Number,
    width: Number,
    height: Number
}

/**
 * CenterComponent_LoadingBar
 */
const CenterComponent_LoadingBar = (props: CenterComponent_LoadingBar_PropsType) =>
{
    console.log("%c  - CenterComponent_LoadingBar", CENTER_COMPONENT_CONSOLE_FONT);

    let x = props.x;
    let y = props.y;
    let width = props.width;
    let height = props.height;

    let animateCenterComponentLoadingBarWidth = animateBuilder
        .setAttributeName('width')
        .setId(ID_CONSTANTS.CENTER_COMPONENT_ANIMATE_LOADING_BAR_WIDTH)
        .setFrom(1)
        .setTo(width)
        .setBeginOnTime(CENTER_COMPONENT_TIMING.LOADING_BAR_BEGIN)
        .setDur(CENTER_COMPONENT_TIMING.LOADING_BAR_DUR)
        .buildAnimateAndReset();
    let animateCenterComponentFadeOut = animateBuilder
        .setAttributeName('opacity')
        .setId(ID_CONSTANTS.CENTER_COMPONENT_ANIMATE_FADE_OUT)
        .setFrom(1)
        .setTo(0)
        .setBeginOnEventTime(CENTER_COMPONENT_TIMING.FADE_OUT_BEGIN, CENTER_COMPONENT_TIMING.FADE_OUT_DELAY)
        .setDur(CENTER_COMPONENT_TIMING.FADE_OUT_DUR)
        .setFill(SVG_ANIMATE_FILL.freeze)
        .buildAnimateAndReset();

    return (
        <g>
            {/*The IDs for filters, masks and gradients here are not constants because they are very specific to center component. There is no need to do so.*/}
            <defs>
                <linearGradient id='centerComponentLoadingBarGradient' x1='0%' y1='50%' x2='100%' y2='50%'>
                    <stop offset='0%' stopColor={GOLD_OPACITY_10}/>
                    <stop offset='30%' stopColor={GOLD}/>
                    <stop offset='70%' stopColor={GOLD}/>
                    <stop offset='100%' stopColor={GOLD_OPACITY_10}/>
                </linearGradient>
            </defs>
            <rect x={x} y={y} width={width} height={height} fill={'url(#centerComponentLoadingBarGradient)'}>
                {animateCenterComponentLoadingBarWidth}
                {animateCenterComponentFadeOut}
            </rect>
        </g>
    );
};


export default CenterComponent_LoadingBar;