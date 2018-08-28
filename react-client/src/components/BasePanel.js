import React from "react"
import {bindActionCreators} from "redux"
import {connect} from "react-redux"
import basePanelStyle from "../styles/basePanelStyle";
import {ID_CONSTANTS} from "../utilities/CONSTANTS_ID";
import CenterComponent from "./subComponents/CenterComponent";
import {BASE_PANEL_CONSOLE_FONT, LEVEL1_CONSOLE_FONT, LEVEL1_CONSOLE_PREFIX} from "../utilities/CONSTANTS_CONSOLE_FONT";
import type {basePanelStateType} from "../reducers/basePanelReducer";
import Shape2d_Rectangle from "../classes/Shape2d_Rectangle";

type BasePanelPropsType = {
    basePanelShapeModel: Shape2d_Rectangle,
    // appTestState: number,
}

/**
 * BasePanel is a stateless component
 * It has following purposes:
 * 1) Providing an actual panel (made of HTML <div>) for holding SVG elements
 * 2) Keeping re-render the provided panel when its size, position or angle change
 * 3) Using SVG filters to give dynamic focus/blur effect that follows mouse movement
 * @param props
 * @returns {*}
 * @constructor
 */
const BasePanel = (props: BasePanelPropsType) =>
{
    let basePanelShapeModel: Shape2d_Rectangle = props.basePanelShapeModel;

    // let basePanelCenterPoint = basePanelShapeModel.getCenterPoint();
    // let basePanelCenterPointX = basePanelCenterPoint.getX();
    // let basePanelCenterPointY = basePanelCenterPoint.getY();
    // let basePanelUnitLength = basePanelShapeModel.getUnitLength();
    //
    // let basePanelSubComponents =
    //     <g id={ID_CONSTANTS.BASE_PANEL_SUB_COMPONENTS_WRAPPER}>
    //         <CenterComponent basePanelCenterPointX={basePanelCenterPointX}
    //                          basePanelCenterPointY={basePanelCenterPointY}
    //                          basePanelUnitLength={basePanelUnitLength}/>
    //     </g>;


    {/*<div id={ID_CONSTANTS.BASE_PANEL_COMPONENT}*/}
    {/*style={basePanelStyle(*/}
    {/*basePanelShapeModel.getWidth(),*/}
    {/*basePanelShapeModel.getHeight(),*/}
    {/*basePanelState.basePanelTranslatePercentageX,*/}
    {/*basePanelState.basePanelTranslatePercentageY,*/}
    {/*basePanelState.basePanelRotationX,*/}
    {/*basePanelState.basePanelRotationY)}>*/}

    {/*<svg id={ID_CONSTANTS.BASE_PANEL_COMPONENT_SVG}*/}
    {/*width={basePanelShapeModel.getWidth()}*/}
    {/*height={basePanelShapeModel.getHeight()}>*/}

    {/*/!*The IDs for filters, masks and gradients here are not constants because they are very specific to base panel. There is no need to do so.*!/*/}
    {/*<defs>*/}
    {/*<filter id='basePanelBlurFilter'>*/}
    {/*<feGaussianBlur stdDeviation='10'/>*/}
    {/*</filter>*/}

    {/*<radialGradient id='basePanelFocusedGradient' r='30%' spreadMethod='pad'*/}
    {/*fx={basePanelState.basePanelFocusPointPercentageX + '%'}*/}
    {/*fy={basePanelState.basePanelFocusPointPercentageY + '%'}*/}
    {/*cx={basePanelState.basePanelFocusPointPercentageX + '%'}*/}
    {/*cy={basePanelState.basePanelFocusPointPercentageY + '%'}>*/}
    {/*/!*NOTE: stopColor here is not actually controlling color of gradient when the gradient is applied to mask, instead, it's controlling transparency of the mask.*!/*/}
    {/*<stop offset='0%' stopColor='rgba(255,255,255,1)'/>*/}
    {/*<stop offset='100%' stopColor='rgba(0,0,0,1)'/>*/}
    {/*</radialGradient>*/}

    {/*<mask id='basePanelFocusedMask'>*/}
    {/*<rect width={basePanelShapeModel.getWidth()} height={basePanelShapeModel.getHeight()}*/}
    {/*fill='url(#basePanelFocusedGradient)'/>*/}
    {/*</mask>*/}
    {/*</defs>*/}

    {/*/!*When reusing by <use> tag, all child nodes/elements become pure graphic content and no longer take any event*!/*/}
    {/*<use x={0} y={0} href={'#' + ID_CONSTANTS.BASE_PANEL_SUB_COMPONENTS_WRAPPER}*/}
    {/*filter='url(#basePanelBlurFilter)' style={{opacity: 0.4}}/>*/}
    {/*<use x={0} y={0} href={'#' + ID_CONSTANTS.BASE_PANEL_SUB_COMPONENTS_WRAPPER}*/}
    {/*mask='url(#basePanelFocusedMask)'/>*/}

    {/*/!*Actual nodes/elements to interact with. This is a workaround to let events "pass" through <use>*!/*/}
    {/*<g id={ID_CONSTANTS.BASE_PANEL_SUB_COMPONENTS_INVISIBLE_WRAPPER} style={{opacity: 0}}>*/}
    {/*{basePanelSubComponents}*/}
    {/*</g>*/}

    {/*</svg>*/}
    {/*</div>*/}

    console.log(LEVEL1_CONSOLE_PREFIX + basePanelShapeModel.getStringId(), LEVEL1_CONSOLE_FONT);
    return (
        <div></div>
    );
};

const mapStateToProps = (store) =>
{
    return {
        basePanelShapeModel: store.basePanelState.basePanelShapeModel,
        // appTestState: store.appState.appMouseMoveEventTimeStamp,
    };
};

const matchDispatchToProps = (dispatch) =>
{
    return bindActionCreators({}, dispatch)
};

export default connect(mapStateToProps, matchDispatchToProps)(BasePanel);