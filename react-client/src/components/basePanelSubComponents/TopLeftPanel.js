import React from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import Shape2d_Rectangle from "../../classes/Shape2d_Rectangle";
import {LEVEL2_CONSOLE_FONT, LEVEL2_CONSOLE_PREFIX} from "../../utilities/CONSTANTS_CONSOLE_FONT";
import {GOLD} from "../../utilities/CONSTANTS_COLOR";
import StyleObject from "../../classes/StyleObject";
import {BLUR_LEVEL} from "../../utilities/CONSTANTS_NUMBER";

type TopLeftPanelPropsType = {
    topLeftPanelShapeModel: Shape2d_Rectangle,
}

const TopLeftPanel = (props: TopLeftPanelPropsType) =>
{
    let topLeftPanelShapeModel: Shape2d_Rectangle = props.topLeftPanelShapeModel;
    let topLeftPanelStyleObject = new StyleObject().setBasics("absolute", topLeftPanelShapeModel.getWidth(), topLeftPanelShapeModel.getHeight(), topLeftPanelShapeModel.getTopLeftPoint().getX(), topLeftPanelShapeModel.getTopLeftPoint().getY())
        .setBackgroundColor(GOLD)
        .addBlur(BLUR_LEVEL.HEAVY)
        .addTransition("filter", 0.3);

    console.log(LEVEL2_CONSOLE_PREFIX + topLeftPanelShapeModel.getStringId(), LEVEL2_CONSOLE_FONT);
    return (
        <div id={topLeftPanelShapeModel.getStringId()} style={topLeftPanelStyleObject.getStyle()}>
        </div>);
};

const mapStateToProps = (store) =>
{
    return {
        topLeftPanelShapeModel: store.topLeftPanelState.topLeftPanelShapeModel
    };
};

const matchDispatchToProps = (dispatch) =>
{
    return bindActionCreators({}, dispatch);
};

export default connect(mapStateToProps, matchDispatchToProps)(TopLeftPanel);