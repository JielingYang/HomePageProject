import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {LEVEL2_CONSOLE_FONT, LEVEL2_CONSOLE_PREFIX} from "../../utilities/CONSTANTS_CONSOLE_FONT";
import CenterComponent_Circle from "./CenterComponent_Circle";
import {CENTER_COMPONENT_CIRCLE_RADIUS_RATIO, CENTER_COMPONENT_CIRCLE_THICKNESS_RATIO, CENTER_COMPONENT_LOADING_BAR_THICKNESS_RATIO, CENTER_COMPONENT_UNIT_LENGTH_RATIO} from "../../styles/centerComponentStyle";
import CenterComponent_Character from "./CenterComponent_Character";
import CenterComponent_LoadingBar from "./CenterComponent_LoadingBar";
import Shape2d_Circle from "../../classes/shapeClasses/Shape2d_Circle";
import {GOLD} from "../../utilities/CONSTANTS_COLOR";
import Shape2d_Point from "../../classes/shapeClasses/Shape2d_Point";

type CenterCirclePropsType = {
    centerCircleShapeModel: Shape2d_Circle,
};

/**
 * CenterCircle is a stateless component
 * It groups its child components and passes the latest related store data to them for rendering
 * @param props
 * @returns {*}
 * @constructor
 */
const CenterCircle = (props: CenterCirclePropsType) =>
{
    let centerCircleShapeModel: Shape2d_Circle = props.centerCircleShapeModel;
    let centerCircleCenterPoint: Shape2d_Point = centerCircleShapeModel.getCenterPoint();

    console.log(LEVEL2_CONSOLE_PREFIX + centerCircleShapeModel.getStringId(), LEVEL2_CONSOLE_FONT);
    return (
        <g id={centerCircleShapeModel.getStringId()}>
            <circle cx={centerCircleCenterPoint.getX()} cy={centerCircleCenterPoint.getY()}
                    r={centerCircleShapeModel.getRadiant()}
                    stroke={GOLD} strokeWidth={5}
                    fill='none'>
            </circle>
            {/*<CenterComponent_Circle cx={basePanelCenterPointX} cy={basePanelCenterPointY}*/}
            {/*r={centerComponentCircleRadius} thickness={centerComponentCircleThickness}/>*/}
            {/*<CenterComponent_Character unitLength={centerComponentUnitLength}*/}
            {/*startX={basePanelCenterPointX}*/}
            {/*startY={basePanelCenterPointY}/>*/}
            {/*<CenterComponent_LoadingBar x={basePanelCenterPointX - centerComponentCircleRadius}*/}
            {/*y={basePanelCenterPointY + centerComponentCircleRadius * 1.3}*/}
            {/*width={centerComponentCircleRadius * 2}*/}
            {/*height={centerComponentLoadingBarThickness}/>*/}
        </g>
    );
};

const mapStateToProps = (store) =>
{
    return {
        centerCircleShapeModel: store.centerCircleState.centerCircleShapeModel,
    }
};

const matchDispatchToProps = (dispatch) =>
{
    return bindActionCreators({}, dispatch)
};

export default connect(mapStateToProps, matchDispatchToProps)(CenterCircle);