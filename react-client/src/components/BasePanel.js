import React from "react"
import {bindActionCreators} from "redux"
import {connect} from "react-redux"
import {ID_CONSTANTS} from "../utilities/CONSTANTS_ID";
import {LEVEL1_CONSOLE_FONT, LEVEL1_CONSOLE_PREFIX} from "../utilities/CONSTANTS_CONSOLE_FONT";
import type {basePanelStateType} from "../reducers/basePanelReducer";
import Shape2d_Rectangle from "../classes/Shape2d_Rectangle";
import StyleObject from "../classes/StyleObject";
import {BLACK, BLACK_TRANSPARENT_20, WHITE} from "../utilities/CONSTANTS_COLOR";

type BasePanelPropsType = {
    basePanelState: basePanelStateType,
}

/**
 * BasePanel is a stateless component
 */
const BasePanel = (props: BasePanelPropsType) =>
    {
        let basePanelShapeModel: Shape2d_Rectangle = props.basePanelState.basePanelShapeModel;
        let basePanelTranslatePercentageX: String = props.basePanelState.basePanelTranslatePercentageX;
        let basePanelTranslatePercentageY: String = props.basePanelState.basePanelTranslatePercentageY;
        let basePanelRotationX: String = props.basePanelState.basePanelRotationX;
        let basePanelRotationY: String = props.basePanelState.basePanelRotationY;
        let basePanelFocusPointPercentageY: String = props.basePanelState.basePanelFocusPointPercentageY;
        let basePanelFocusPointPercentageX: String = props.basePanelState.basePanelFocusPointPercentageX;

        // let basePanelCenterPoint = basePanelShapeModel.getCenterPoint();
        // let basePanelCenterPointX = basePanelCenterPoint.getX();
        // let basePanelCenterPointY = basePanelCenterPoint.getY();
        // let basePanelUnitLength = basePanelShapeModel.getUnitLength();
        let basePanelContents =
            <g id={ID_CONSTANTS.BASE_PANEL_SUB_COMPONENTS_WRAPPER}>
                <rect style={{x: 0, y: 0, width: 300, height: 100, fill: "rgb(0,0,255)"}}>
                    <animate attributeName="fill" from="rgb(0,0,255)" to="rgb(0,255,0)"
                             dur="3s" repeatCount="indefinite"/>
                </rect>
            </g>;

        let basePanelComponentStyleObject = new StyleObject().setBasics('absolute', basePanelShapeModel.getWidth(), basePanelShapeModel.getHeight(), basePanelShapeModel.getTopLeftPoint().getX(), basePanelShapeModel.getTopLeftPoint().getY())
                                                             .setBackgroundColor(BLACK_TRANSPARENT_20)
                                                             .setTransformStyle('preserve-3d')
                                                             .addTranslation(basePanelTranslatePercentageX, basePanelTranslatePercentageY, 0)
                                                             .addRotation(basePanelRotationX, basePanelRotationY, 0);

        let basePanelComponentSvgStyleObject = new StyleObject().setBasics('absolute', basePanelShapeModel.getWidth(), basePanelShapeModel.getHeight(), basePanelShapeModel.getTopLeftPoint().getX(), basePanelShapeModel.getTopLeftPoint().getY());

        console.log(LEVEL1_CONSOLE_PREFIX + basePanelShapeModel.getStringId(), LEVEL1_CONSOLE_FONT);
        return (
            <div id={basePanelShapeModel.getStringId()} style={basePanelComponentStyleObject.getStyle()}>

                <svg id={ID_CONSTANTS.BASE_PANEL_COMPONENT_SVG} style={basePanelComponentSvgStyleObject.getStyle()}>

                    <defs>
                        {/*The IDs for filters, masks and gradients here are not constants because they are very specific to base panel. There is no need to do so*/}
                        <filter id='basePanelBlurFilter'>
                            <feGaussianBlur stdDeviation='10'/>
                        </filter>
                        <radialGradient id='basePanelFocusedGradient' r='30%' spreadMethod='pad'
                                        fx={basePanelFocusPointPercentageX}
                                        fy={basePanelFocusPointPercentageY}
                                        cx={basePanelFocusPointPercentageX}
                                        cy={basePanelFocusPointPercentageY}>
                            {/*NOTE: stopColor here is not actually controlling color of gradient when the gradient is applied to mask, instead, it's controlling transparency of the mask*/}
                            <stop offset='0%' stopColor={WHITE}/>
                            <stop offset='100%' stopColor={BLACK}/>
                        </radialGradient>
                        <mask id='basePanelFocusedMask'>
                            <rect width={basePanelShapeModel.getWidth()} height={basePanelShapeModel.getHeight()}
                                  fill='url(#basePanelFocusedGradient)'/>
                        </mask>
                    </defs>

                    {/*When reusing by <use> tag, all child nodes/elements become pure graphic content and no longer take any event*/}
                    <use x={0} y={0} href={'#' + ID_CONSTANTS.BASE_PANEL_SUB_COMPONENTS_WRAPPER}
                         filter='url(#basePanelBlurFilter)' style={{opacity: 0.4}}/>
                    <use x={0} y={0} href={'#' + ID_CONSTANTS.BASE_PANEL_SUB_COMPONENTS_WRAPPER}
                         mask='url(#basePanelFocusedMask)'/>

                    {/*Actual nodes/elements to interact with. This is a workaround to let events "pass" through <use>*/}
                    <g id={ID_CONSTANTS.BASE_PANEL_SUB_COMPONENTS_INVISIBLE_WRAPPER} style={{opacity: 0}}>
                        {basePanelContents}
                    </g>
                </svg>
            </div>)
    }
;

const mapStateToProps = (store) =>
{
    return {
        basePanelState: store.basePanelState,
    };
};

const matchDispatchToProps = (dispatch) =>
{
    return bindActionCreators({}, dispatch)
};

export default connect(mapStateToProps, matchDispatchToProps)(BasePanel);