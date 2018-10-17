import React from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import Shape2d_Rectangle from "../../classes/Shape2d_Rectangle";
import {LEVEL2_CONSOLE_FONT, LEVEL2_CONSOLE_PREFIX} from "../../utilities/CONSTANTS_CONSOLE_FONT";
import {CONSOLE_FONT_MINT} from "../../utilities/CONSTANTS_COLOR";
import StyleObject from "../../classes/StyleObject";
import {BLUR_LEVEL} from "../../utilities/CONSTANTS_NUMBER";

type BottomRightPanelPropsType = {
    bottomRightPanelShapeModel: Shape2d_Rectangle,
}

const BottomRightPanel = (props: BottomRightPanelPropsType) =>
{
    let bottomRightPanelShapeModel: Shape2d_Rectangle = props.bottomRightPanelShapeModel;
    let bottomRightPanelStyleObject = new StyleObject().setBasics("absolute", bottomRightPanelShapeModel.getWidth(), bottomRightPanelShapeModel.getHeight(), bottomRightPanelShapeModel.getTopLeftPoint().getX(), bottomRightPanelShapeModel.getTopLeftPoint().getY())
        .setBackgroundColor(CONSOLE_FONT_MINT)
        .addBlur(BLUR_LEVEL.HEAVY);

    console.log(LEVEL2_CONSOLE_PREFIX + bottomRightPanelShapeModel.getStringId(), LEVEL2_CONSOLE_FONT);
    return (
        <div id={bottomRightPanelShapeModel.getStringId()} style={bottomRightPanelStyleObject.getStyle()}>
        </div>);
};

const mapStateToProps = (store) =>
{
    return {
        bottomRightPanelShapeModel: store.bottomRightPanelState.bottomRightPanelShapeModel
    };
};

const matchDispatchToProps = (dispatch) =>
{
    return bindActionCreators({}, dispatch);
};

export default connect(mapStateToProps, matchDispatchToProps)(BottomRightPanel);