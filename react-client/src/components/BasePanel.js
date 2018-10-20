import React from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {LEVEL1_CONSOLE_FONT, LEVEL1_CONSOLE_PREFIX} from "../utilities/CONSTANTS_CONSOLE_FONT";
import type {basePanelStateType} from "../reducers/basePanelReducer";
import Shape2d_Rectangle from "../classes/shapeClasses/Shape2d_Rectangle";
import StyleObject from "../classes/StyleObject";
import {BLACK_TRANSPARENT_00} from "../utilities/CONSTANTS_COLOR";
import BottomRightPanel from "./basePanelSubComponents/BottomRightPanel";
import TopLeftPanel from "./basePanelSubComponents/TopLeftPanel";
import TopRightPanel from "./basePanelSubComponents/TopRightPanel";
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

    let basePanelComponentStyleObject = new StyleObject().setBasics(basePanelShapeModel.getWidth(), basePanelShapeModel.getHeight(), basePanelShapeModel.getTopLeftPoint().getX(), basePanelShapeModel.getTopLeftPoint().getY())
                                                         .setBackgroundColor(BLACK_TRANSPARENT_00)
                                                         .setTransformStyle("preserve-3d")
                                                         .addTranslation(basePanelTranslatePercentageX, basePanelTranslatePercentageY, 0)
                                                         .addRotation(basePanelRotationX, basePanelRotationY, 0);

    console.log(LEVEL1_CONSOLE_PREFIX + basePanelShapeModel.getStringId(), LEVEL1_CONSOLE_FONT);
    return (
        <div id={basePanelShapeModel.getStringId()} style={basePanelComponentStyleObject.getStyle()}>
            <TopLeftPanel/>
            <TopRightPanel/>
            <BottomLeftPanel/>
            <BottomRightPanel/>
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