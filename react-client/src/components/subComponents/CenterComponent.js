import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {ID_CONSTANTS} from "../../utilities/CONSTANTS_ID";
import {CENTER_COMPONENT_CONSOLE_FONT} from "../../utilities/CONSTANTS_CONSOLE_FONT";
import CenterComponent_Circle from "./CenterComponent_Circle";
import {CENTER_COMPONENT_CIRCLE_RADIUS_RATIO, CENTER_COMPONENT_CIRCLE_THICKNESS_RATIO, CENTER_COMPONENT_LOADING_BAR_THICKNESS_RATIO, CENTER_COMPONENT_UNIT_LENGTH_RATIO} from "../../styles/centerComponentStyle";
import CenterComponent_Character from "./CenterComponent_Character";
import CenterComponent_LoadingBar from "./CenterComponent_LoadingBar";

type CenterComponentPropsType = {
    basePanelCenterPointX: Number,
    basePanelCenterPointY: Number,
    basePanelUnitLength: Number
};

/**
 * CenterComponent is a stateless component
 * It groups its child components and passes the latest related store data to them for rendering
 * @param props
 * @returns {*}
 * @constructor
 */
const CenterComponent = (props: CenterComponentPropsType) =>
{
    console.log("%c  - CenterComponent", CENTER_COMPONENT_CONSOLE_FONT);

    /*
     Base panel information
     */
    let basePanelCenterPointX = props.basePanelCenterPointX;
    let basePanelCenterPointY = props.basePanelCenterPointY;
    let basePanelUnitLength = props.basePanelUnitLength;

    /*
     Center component information
     */
    let centerComponentUnitLength = CENTER_COMPONENT_UNIT_LENGTH_RATIO * basePanelUnitLength;
    let centerComponentCircleRadius = CENTER_COMPONENT_CIRCLE_RADIUS_RATIO * centerComponentUnitLength;
    let centerComponentCircleThickness = CENTER_COMPONENT_CIRCLE_THICKNESS_RATIO * centerComponentUnitLength;
    let centerComponentLoadingBarThickness = CENTER_COMPONENT_LOADING_BAR_THICKNESS_RATIO * centerComponentUnitLength;

    return (
        <g id={ID_CONSTANTS.CENTER_COMPONENT}>
            <CenterComponent_Circle cx={basePanelCenterPointX} cy={basePanelCenterPointY}
                                    r={centerComponentCircleRadius} thickness={centerComponentCircleThickness}/>
            <CenterComponent_Character unitLength={centerComponentUnitLength}
                                       startX={basePanelCenterPointX}
                                       startY={basePanelCenterPointY}/>
            <CenterComponent_LoadingBar x={basePanelCenterPointX - centerComponentCircleRadius}
                                        y={basePanelCenterPointY + centerComponentCircleRadius * 1.3}
                                        width={centerComponentCircleRadius * 2}
                                        height={centerComponentLoadingBarThickness}/>
        </g>
    );
};

const mapStateToProps = () =>
{
    return {}
};

const matchDispatchToProps = (dispatch) =>
{
    return bindActionCreators({}, dispatch)
};

export default connect(mapStateToProps, matchDispatchToProps)(CenterComponent);