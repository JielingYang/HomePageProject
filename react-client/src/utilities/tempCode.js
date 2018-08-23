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

return <g id={ID_CONSTANTS.CENTER_COMPONENT_CIRCLE}>
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