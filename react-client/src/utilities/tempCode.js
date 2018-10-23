import pathCommandBuilder from "../classes/SvgPathDataCommandBuilder";
import {ID_CONSTANTS} from "./CONSTANTS_ID";
import animateBuilder, {SVG_ANIMATE_FILL} from "../classes/SvgAnimateBuilder";
import {GOLD} from "./CONSTANTS_COLOR";

let pathCmd90Circle = pathCommandBuilder.M(centerX, centerY - radius)
                                        .A(radius, radius, 0, 0, 1, centerX + radius * Math.sin(gapAngle * (Math.PI / 180)), centerY - radius * Math.cos(gapAngle * (Math.PI / 180)))
                                        .buildCommandAndClear();

let pathCmd270Circle = pathCommandBuilder.M(centerX, centerY - radius)
                                         .A(radius, radius, 0, 1, 0, centerX + radius * Math.sin(gapAngle * (Math.PI / 180)), centerY - radius * Math.cos(gapAngle * (Math.PI / 180)))
                                         .buildCommandAndClear();

let pathCmdFullCircle = pathCommandBuilder.M(centerX, centerY - radius)
                                          .A(radius, radius, 0, 1, 0, centerX + radius * Math.sin((Math.PI / 180)), centerY - radius * Math.cos((Math.PI / 180)))
                                          .buildCommandAndClear();

let shrinkAnimate = animateBuilder
    .setAttributeName('stroke-dasharray')
    .setId('centerComponentDashOutAnimate')
    .setFrom(2 * thickness + ',' + thickness / 2)
    .setTo(2 * thickness + ',0')
    .setBeginOnEventTime('centerComponentLoadingBarWidthAnimate.end', 2)
    .setDur(0.8)
    .setFill(SVG_ANIMATE_FILL.freeze)
    .buildAnimateAndReset();

let circleAnimate = animateBuilder
    .setAttributeName('d')
    .setId('centerComponentCircleOutAnimate')
    .setFrom(pathCmd270Circle)
    .setTo(pathCmdFullCircle)
    .setBeginOnEventTime('centerComponentLoadingBarWidthAnimate.end', 0)
    .setDur(1)
    .setFill(SVG_ANIMATE_FILL.freeze)
    .buildAnimateAndReset();

return <g >
    <path stroke={GOLD}
          strokeDasharray={2 * radius * Math.PI + ',' + 2 * radius * Math.PI}
          strokeDashoffset={'0%'}
          strokeWidth={thickness}
          fill={'none'}
          d={pathCmd270Circle}>
        {circleAnimate}
    </path>
    <path stroke={GOLD}
          strokeDasharray={2 * thickness + ',' + thickness / 2}
          strokeWidth={thickness}
          fill={'none'}
          d={pathCmd90Circle}>
        {shrinkAnimate}
    </path>
</g>

import React from 'react';
import {GOLD} from "../../utilities/CONSTANTS_COLOR";
import {CENTER_COMPONENT_CONSOLE_FONT} from "../../utilities/CONSTANTS_CONSOLE_FONT";
import pathCommandBuilder from "../../classes/SvgPathDataCommandBuilder";

type CenterComponent_Character_PropsType = {
    unitLength: Number,
    startY: Number,
    startX: Number,
}

/**
 * CenterComponent_Character
 */
const CenterComponent_Character = (props: CenterComponent_Character_PropsType) =>
{
    console.log("%c  - CenterComponent_Character", CENTER_COMPONENT_CONSOLE_FONT);

    let unitLength = props.unitLength;
    let startX = props.startX;
    let startY = props.startY;

    let pathCmd = pathCommandBuilder.M(startX, startY)
        .q(-7 * unitLength, 0, -9 * unitLength, 6 * unitLength)
        .q(-unitLength, 7 * unitLength, 6 * unitLength, 11 * unitLength)
        .q(14 * unitLength, 10 * unitLength, 58 * unitLength, 32 * unitLength)
        .q(15 * unitLength, 7 * unitLength, 22 * unitLength, 11 * unitLength)
        .q(4 * unitLength, 2 * unitLength, 3 * unitLength, 4 * unitLength)
        .t(-5 * unitLength, 2 * unitLength)
        .q(-43 * unitLength, 0, -78 * unitLength, -3 * unitLength)
        .q(-3 * unitLength, 0, -2 * unitLength, 4 * unitLength)
        .q(4 * unitLength, 5 * unitLength, 9 * unitLength, 7 * unitLength)
        .q(38 * unitLength, 2 * unitLength, 78 * unitLength, 0)
        .q(10 * unitLength, 0, 12 * unitLength, -7 * unitLength)
        .q(unitLength, -8 * unitLength, -7 * unitLength, -12 * unitLength)
        .q(-7 * unitLength, -4 * unitLength, -24 * unitLength, -12 * unitLength)
        .q(-40 * unitLength, -19 * unitLength, -55 * unitLength, -29 * unitLength)
        .q(-2 * unitLength, -unitLength, -unitLength, -2 * unitLength)
        .q(unitLength, -2 * unitLength, 4 * unitLength, -unitLength)
        .q(54 * unitLength, 3 * unitLength, 99 * unitLength, -unitLength)
        .q(18 * unitLength, -3 * unitLength, 14 * unitLength, -21 * unitLength)
        .q(-14 * unitLength, -48 * unitLength, -40 * unitLength, -79 * unitLength)
        .q(-7 * unitLength, -4 * unitLength, -15 * unitLength, -2 * unitLength)
        .q(-5 * unitLength, unitLength, 0, 7 * unitLength)
        .q(32 * unitLength, 33 * unitLength, 45 * unitLength, 76 * unitLength)
        .q(2 * unitLength, 7 * unitLength, -7 * unitLength, 10 * unitLength)
        .h(-11 * unitLength)
        .q(-8 * unitLength, unitLength, -12 * unitLength, unitLength)
        .q(-29 * unitLength, -58 * unitLength, -83 * unitLength, -94 * unitLength)
        .q(-7 * unitLength, -4 * unitLength, -15 * unitLength, unitLength)
        .q(-3 * unitLength, 4 * unitLength, unitLength, 5 * unitLength)
        .q(61 * unitLength, 34 * unitLength, 85 * unitLength, 88 * unitLength)
        .q(-14 * unitLength, unitLength, -29 * unitLength, unitLength)
        .q(-21 * unitLength, -31 * unitLength, -60 * unitLength, -56 * unitLength)
        .q(-6 * unitLength, -4 * unitLength, -13 * unitLength, 0)
        .q(-3 * unitLength, unitLength, -3 * unitLength, 3 * unitLength)
        .q(0, unitLength, 2 * unitLength, 3 * unitLength)
        .q(40 * unitLength, 21 * unitLength, 62 * unitLength, 49 * unitLength)
        .q(-18 * unitLength, 0, -31 * unitLength, -2 * unitLength)
        .z()
        .M(startX - 53 * unitLength, startY + 84 * unitLength)
        .v(-38 * unitLength)
        .q(21 * unitLength, 0, 37 * unitLength, -unitLength)
        .q(6 * unitLength, 0, 4 * unitLength, -3 * unitLength)
        .q(-2 * unitLength, -8 * unitLength, -9 * unitLength, -7 * unitLength)
        .h(-5 * unitLength)
        .q(-12 * unitLength, 2 * unitLength, -27 * unitLength, 2 * unitLength)
        .v(-27 * unitLength)
        .q(15 * unitLength, -15 * unitLength, 36 * unitLength, -27 * unitLength)
        .q(6 * unitLength, -3 * unitLength, 2 * unitLength, -6 * unitLength)
        .q(-6 * unitLength, -4 * unitLength, -12 * unitLength, 0)
        .q(-14 * unitLength, 10 * unitLength, -26 * unitLength, 23 * unitLength)
        .v(-90 * unitLength)
        .q(0, -4 * unitLength, -4 * unitLength, -4 * unitLength)
        .q(-5 * unitLength, 0, -5 * unitLength, 4 * unitLength)
        .v(97 * unitLength)
        .q(-17 * unitLength, -32 * unitLength, -40 * unitLength, -59 * unitLength)
        .q(-7 * unitLength, -5 * unitLength, -13 * unitLength, unitLength)
        .q(-3 * unitLength, 3 * unitLength, 0, 4 * unitLength)
        .l(unitLength, unitLength)
        .q(35 * unitLength, 34 * unitLength, 52 * unitLength, 73 * unitLength)
        .v(10 * unitLength)
        .q(-27 * unitLength, 0, -42 * unitLength, -3 * unitLength)
        .q(-2 * unitLength, -unitLength, -3 * unitLength, 0)
        .t(0, 3 * unitLength)
        .q(2 * unitLength, 8 * unitLength, 6 * unitLength, 8 * unitLength)
        .q(16 * unitLength, unitLength, 39 * unitLength, unitLength)
        .v(38 * unitLength)
        .q(0, 4 * unitLength, 5 * unitLength, 5 * unitLength)
        .q(4 * unitLength, 0, 4 * unitLength, -5 * unitLength)
        .z()
        .buildCommandAndClear();

    return (
        <path fill={GOLD} d={pathCmd}
              transform={'translate(-' + 2 * startX + ',0) rotate(180,' + startX + ',' + startY + ') scale(-1,1)'}>
            {/*{animate}*/}
        </path>
    );
};


export default CenterComponent_Character;