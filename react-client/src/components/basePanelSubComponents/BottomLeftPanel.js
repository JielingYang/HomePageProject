import React from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import Shape2d_Rectangle from "../../classes/Shape2d_Rectangle";
import {LEVEL2_CONSOLE_FONT, LEVEL2_CONSOLE_PREFIX} from "../../utilities/CONSTANTS_CONSOLE_FONT";
import {CONSOLE_FONT_ORANGE} from "../../utilities/CONSTANTS_COLOR";
import StyleObject from "../../classes/StyleObject";
import {BLUR_LEVEL} from "../../utilities/CONSTANTS_NUMBER";

type BottomLeftPanelPropsType = {
    bottomLeftPanelShapeModel: Shape2d_Rectangle,
}

const BottomLeftPanel = (props: BottomLeftPanelPropsType) =>
{
    let bottomLeftPanelShapeModel: Shape2d_Rectangle = props.bottomLeftPanelShapeModel;
    let bottomLeftPanelStyleObject = new StyleObject().setBasics("absolute", bottomLeftPanelShapeModel.getWidth(), bottomLeftPanelShapeModel.getHeight(), bottomLeftPanelShapeModel.getTopLeftPoint().getX(), bottomLeftPanelShapeModel.getTopLeftPoint().getY())
        .setBackgroundColor(CONSOLE_FONT_ORANGE)
        .addBlur(BLUR_LEVEL.HEAVY)
        .addTransition("filter", 0.3);

    console.log(LEVEL2_CONSOLE_PREFIX + bottomLeftPanelShapeModel.getStringId(), LEVEL2_CONSOLE_FONT);
    return (
        <div id={bottomLeftPanelShapeModel.getStringId()} style={bottomLeftPanelStyleObject.getStyle()}>
        </div>);
};

const mapStateToProps = (store) =>
{
    return {
        bottomLeftPanelShapeModel: store.bottomLeftPanelState.bottomLeftPanelShapeModel
    };
};

const matchDispatchToProps = (dispatch) =>
{
    return bindActionCreators({}, dispatch);
};

export default connect(mapStateToProps, matchDispatchToProps)(BottomLeftPanel);