import React from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {LEVEL1_CONSOLE_FONT, LEVEL1_CONSOLE_PREFIX} from "../utilities/CONSTANTS_CONSOLE_FONT";
import type {basePanelStateType} from "../reducers/basePanelReducer";
import Shape2d_Rectangle from "../classes/Shape2d_Rectangle";
import StyleObject from "../classes/StyleObject";
import {BLACK, BLACK_TRANSPARENT_10, WHITE} from "../utilities/CONSTANTS_COLOR";
import {ID, UTILITY_STRING} from "../utilities/CONSTANTS_STRING";
import {BLUR_OUT_TIME, FOCUS_IN_TIME} from "../utilities/CONSTANTS_TIME";
import BottomRightPanel from "./basePanelSubComponents/BottomRightPanel";
import TopLeftPanel from "./basePanelSubComponents/TopLeftPanel";
import TopRightPanel from "./basePanelSubComponents/TopRightPanel";
import Shape2d_Circle from "../classes/Shape2d_Circle";
import BottomLeftPanel from "./basePanelSubComponents/BottomLeftPanel";

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
    let basePanelCurrentFocusMaskShapeModels: Array<Shape2d_Rectangle | Shape2d_Circle> = props.basePanelState.basePanelCurrentFocusMaskShapeModels;
    let basePanelBlurLevel: number = props.basePanelState.basePanelBlurLevel;

    let basePanelContents =
        <g id={ID.BASE_PANEL_SUB_COMPONENTS_WRAPPER_ID}>
            <TopLeftPanel/>
            <TopRightPanel/>
            <BottomLeftPanel/>
            <BottomRightPanel/>
        </g>;

    let basePanelComponentStyleObject = new StyleObject().setBasics("absolute", basePanelShapeModel.getWidth(), basePanelShapeModel.getHeight(), basePanelShapeModel.getTopLeftPoint().getX(), basePanelShapeModel.getTopLeftPoint().getY())
                                                         .setBackgroundColor(BLACK_TRANSPARENT_10)
                                                         .setTransformStyle("preserve-3d")
                                                         .setBackfaceVisibility("hidden")
                                                         .addTranslation(basePanelTranslatePercentageX, basePanelTranslatePercentageY, 0)
                                                         .addRotation(basePanelRotationX, basePanelRotationY, 0);

    let basePanelComponentSvgStyleObject = new StyleObject().setBasics("absolute", basePanelShapeModel.getWidth(), basePanelShapeModel.getHeight(), basePanelShapeModel.getTopLeftPoint().getX(), basePanelShapeModel.getTopLeftPoint().getY());

    let focusGradient = null;
    let focusMask = null;
    if (basePanelMouseFocusOn)
    {
        focusGradient =
            <radialGradient id={ID.BASE_PANEL_FOCUS_GRADIENT_ID}
                            r={basePanelMouseFocusRadiance}
                            fx={basePanelMouseFocusPercentageX}
                            fy={basePanelMouseFocusPercentageY}
                            cx={basePanelMouseFocusPercentageX}
                            cy={basePanelMouseFocusPercentageY}>
                {/*NOTE: stopColor here is not actually controlling color of gradient when the gradient is applied to mask, instead, it's controlling transparency of the mask*/}
                <stop offset="0%"
                      stopColor={WHITE}/>
                <stop offset="100%"
                      stopColor={BLACK}/>
            </radialGradient>;

        focusMask =
            <mask id={ID.BASE_PANEL_FOCUS_MASK_ID}>
                <rect x={basePanelShapeModel.getTopLeftPoint().getX()}
                      y={basePanelShapeModel.getTopLeftPoint().getY()}
                      width={basePanelShapeModel.getWidth()}
                      height={basePanelShapeModel.getHeight()}
                      fill={UTILITY_STRING.SVG_URL_PREFIX + ID.BASE_PANEL_FOCUS_GRADIENT_ID + UTILITY_STRING.CLOSE_PARENTHESIS}/>
            </mask>;
    }
    else
    {
        let currentFocusMaskShapeModels = basePanelCurrentFocusMaskShapeModels.map((shape: Shape2d_Rectangle | Shape2d_Circle) =>
        {
            let animateFocusIn = <animate id={"focusIn"}
                                          attributeType="XML"
                                          attributeName="fill"
                                          from={BLACK}
                                          to={WHITE}
                                          dur={FOCUS_IN_TIME}
                                          fill={"freeze"}
                                          begin={shape.getStringId() + ".mouseenter"}/>;

            let animateBlurOut = <animate attributeType="XML"
                                          attributeName="fill"
                                          from={WHITE}
                                          to={BLACK}
                                          dur={BLUR_OUT_TIME}
                                          fill={"freeze"}
                                          begin={shape.getStringId() + ".mouseleave"}/>;

            if (shape instanceof Shape2d_Rectangle)
            {
                return (
                    <rect x={shape.getTopLeftPoint().getX()}
                          y={shape.getTopLeftPoint().getY()}
                          width={shape.getWidth()}
                          height={shape.getHeight()}
                          fill={BLACK}>
                        {animateFocusIn}
                        {animateBlurOut}
                    </rect>);
            }
        });

        focusMask =
            <mask id={ID.BASE_PANEL_FOCUS_MASK_ID}>
                {currentFocusMaskShapeModels}
            </mask>;
    }

    console.log(LEVEL1_CONSOLE_PREFIX + basePanelShapeModel.getStringId(), LEVEL1_CONSOLE_FONT);
    return (
        <div id={basePanelShapeModel.getStringId()}
             style={basePanelComponentStyleObject.getStyle()}
             onMouseOver={(e) =>
             {
                 e.stopPropagation();
             }}>

            <svg id={ID.BASE_PANEL_SVG_ID}
                 style={basePanelComponentSvgStyleObject.getStyle()}>

                <defs>
                    {/*The IDs for filters, masks and gradients here are not constants because they are very specific to base panel. There is no need to do so*/}
                    <filter id={ID.BASE_PANEL_BLUR_FILTER_ID}>
                        <feGaussianBlur stdDeviation={basePanelBlurLevel}/>
                    </filter>
                    {focusGradient}
                    {focusMask}
                </defs>

                {/*When reusing by <use> tag, all child nodes/elements become pure graphic content and no longer take any event*/}
                <use x={0}
                     y={0}
                     href={UTILITY_STRING.SHARP + ID.BASE_PANEL_SUB_COMPONENTS_WRAPPER_ID}
                     filter={UTILITY_STRING.SVG_URL_PREFIX + ID.BASE_PANEL_BLUR_FILTER_ID + UTILITY_STRING.CLOSE_PARENTHESIS}
                     opacity={0.5}/>
                <use x={0}
                     y={0}
                     href={UTILITY_STRING.SHARP + ID.BASE_PANEL_SUB_COMPONENTS_WRAPPER_ID}
                     mask={UTILITY_STRING.SVG_URL_PREFIX + ID.BASE_PANEL_FOCUS_MASK_ID + UTILITY_STRING.CLOSE_PARENTHESIS}/>

                {/*Actual nodes/elements to interact with. This is a workaround to let events "pass" through <use>*/}
                <g id={ID.BASE_PANEL_SUB_COMPONENTS_INVISIBLE_WRAPPER_ID}
                   style={{opacity: 0}}>
                    {basePanelContents}
                </g>
            </svg>
        </div>);
};

const mapStateToProps = (store) =>
{
    return {
        basePanelState: store.basePanelState
    };
};

const matchDispatchToProps = (dispatch) =>
{
    return bindActionCreators({}, dispatch);
};

export default connect(mapStateToProps, matchDispatchToProps)(BasePanel);