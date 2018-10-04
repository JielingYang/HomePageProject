import React from "react"
import {bindActionCreators} from "redux"
import {connect} from "react-redux"
import {LEVEL1_CONSOLE_FONT, LEVEL1_CONSOLE_PREFIX} from "../utilities/CONSTANTS_CONSOLE_FONT";
import type {basePanelStateType} from "../reducers/basePanelReducer";
import Shape2d_Rectangle from "../classes/Shape2d_Rectangle";
import StyleObject from "../classes/StyleObject";
import {BLACK, BLACK_TRANSPARENT_10, WHITE} from "../utilities/CONSTANTS_COLOR";
import {ID, UTILITY_STRING} from "../utilities/CONSTANTS_STRING";
import CenterCircle from "./basePanelSubComponents/CenterCircle";
import TopLeftPanel from "./basePanelSubComponents/TopLeftPanel";
import TopRightPanel from "./basePanelSubComponents/TopRightPanel";

type BasePanelPropsType = {
    basePanelState: basePanelStateType,
}

/**
 * BasePanel is a stateless component
 */
const BasePanel = (props: BasePanelPropsType) =>
{
    let basePanelShapeModel: Shape2d_Rectangle = props.basePanelState.basePanelShapeModel;
    let basePanelTranslatePercentageX: string = props.basePanelState.basePanelTranslatePercentageX;
    let basePanelTranslatePercentageY: string = props.basePanelState.basePanelTranslatePercentageY;
    let basePanelRotationX: string = props.basePanelState.basePanelRotationX;
    let basePanelRotationY: string = props.basePanelState.basePanelRotationY;
    let basePanelMouseFocusOn: boolean = props.basePanelState.basePanelMouseFocusOn;
    let basePanelMouseFocusPercentageY: string = props.basePanelState.basePanelMouseFocusPercentageY;
    let basePanelMouseFocusPercentageX: string = props.basePanelState.basePanelMouseFocusPercentageX;
    let basePanelMouseFocusRadiance: string = props.basePanelState.basePanelMouseFocusRadiance;
    let basePanelBlurLevel: number = props.basePanelState.basePanelBlurLevel;

    let basePanelContents =
        <g id={ID.BASE_PANEL_SUB_COMPONENTS_WRAPPER_ID}>
            {/*<rect style={{x: 0, y: 0, width: 300, height: 100, fill: 'rgb(0,0,255)'}}>*/}
            {/*<animate attributeName='fill' from='rgb(0,0,255)' to='rgb(0,255,0)'*/}
            {/*dur='3s' repeatCount='indefinite'/>*/}
            {/*</rect>*/}
            {/*<CenterCircle/>*/}
            <TopLeftPanel/>
            <TopRightPanel/>
        </g>;

    let basePanelComponentStyleObject = new StyleObject().setBasics('absolute', basePanelShapeModel.getWidth(), basePanelShapeModel.getHeight(), basePanelShapeModel.getTopLeftPoint().getX(), basePanelShapeModel.getTopLeftPoint().getY())
                                                         .setBackgroundColor(BLACK_TRANSPARENT_10)
                                                         .setTransformStyle('preserve-3d')
                                                         .addTranslation(basePanelTranslatePercentageX, basePanelTranslatePercentageY, 0)
                                                         .addRotation(basePanelRotationX, basePanelRotationY, 0);

    let basePanelComponentSvgStyleObject = new StyleObject().setBasics('absolute', basePanelShapeModel.getWidth(), basePanelShapeModel.getHeight(), basePanelShapeModel.getTopLeftPoint().getX(), basePanelShapeModel.getTopLeftPoint().getY());

    let basePanelMouseFocus = <use x={0} y={0}
                                   href={UTILITY_STRING.SHARP + ID.BASE_PANEL_SUB_COMPONENTS_WRAPPER_ID}
                                   mask={UTILITY_STRING.SVG_URL_PREFIX + ID.BASE_PANEL_FOCUS_MASK_ID + UTILITY_STRING.CLOSE_PARENTHESIS}/>;
    let basePanelSubComponentFocus = null;

    console.log(LEVEL1_CONSOLE_PREFIX + basePanelShapeModel.getStringId(), LEVEL1_CONSOLE_FONT);
    return (
        <div id={basePanelShapeModel.getStringId()} style={basePanelComponentStyleObject.getStyle()}>

            <svg id={ID.BASE_PANEL_SVG_ID} style={basePanelComponentSvgStyleObject.getStyle()}>

                <defs>
                    {/*The IDs for filters, masks and gradients here are not constants because they are very specific to base panel. There is no need to do so*/}
                    <filter id={ID.BASE_PANEL_BLUR_FILTER_ID}>
                        <feGaussianBlur stdDeviation={basePanelBlurLevel}/>
                    </filter>
                    <radialGradient id={ID.BASE_PANEL_FOCUS_GRADIENT_ID} r={basePanelMouseFocusRadiance}
                                    fx={basePanelMouseFocusPercentageX}
                                    fy={basePanelMouseFocusPercentageY}
                                    cx={basePanelMouseFocusPercentageX}
                                    cy={basePanelMouseFocusPercentageY}>
                        {/*NOTE: stopColor here is not actually controlling color of gradient when the gradient is applied to mask, instead, it's controlling transparency of the mask*/}
                        <stop offset='0%' stopColor={WHITE}/>
                        <stop offset='100%' stopColor={BLACK}/>
                    </radialGradient>
                    <mask id={ID.BASE_PANEL_FOCUS_MASK_ID}>
                        <rect width={basePanelShapeModel.getWidth()} height={basePanelShapeModel.getHeight()}
                              fill={UTILITY_STRING.SVG_URL_PREFIX + ID.BASE_PANEL_FOCUS_GRADIENT_ID + UTILITY_STRING.CLOSE_PARENTHESIS}/>
                    </mask>
                </defs>

                {/*When reusing by <use> tag, all child nodes/elements become pure graphic content and no longer take any event*/}
                <use x={0} y={0} href={UTILITY_STRING.SHARP + ID.BASE_PANEL_SUB_COMPONENTS_WRAPPER_ID}
                     filter={UTILITY_STRING.SVG_URL_PREFIX + ID.BASE_PANEL_BLUR_FILTER_ID + UTILITY_STRING.CLOSE_PARENTHESIS}
                     opacity={1}/>
                {basePanelMouseFocusOn ? basePanelMouseFocus : basePanelSubComponentFocus}

                {/*Actual nodes/elements to interact with. This is a workaround to let events "pass" through <use>*/}
                <g id={ID.BASE_PANEL_SUB_COMPONENTS_INVISIBLE_WRAPPER_ID} style={{opacity: 0}}>
                    {basePanelContents}
                </g>
            </svg>
        </div>)
};

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