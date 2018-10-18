import React from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import Shape2d_Rectangle from "../../classes/Shape2d_Rectangle";
import {LEVEL2_CONSOLE_FONT, LEVEL2_CONSOLE_PREFIX} from "../../utilities/CONSTANTS_CONSOLE_FONT";
import StyleObject from "../../classes/StyleObject";
import {BLUR_LEVEL} from "../../utilities/CONSTANTS_NUMBER";
import {FOCUS_IN_TIME} from "../../utilities/CONSTANTS_TIME";
import {topRightPanelAction_setTopRightPanelFocusOn} from "../../actionCreators/topRightPanelActions";
import {GREY_HEAVY} from "../../utilities/CONSTANTS_COLOR";

type TopRightPanelPropsType = {
    topRightPanelShapeModel: Shape2d_Rectangle,
    topRightPanelAction_setTopRightPanelFocusOn: Function,
    topRightPanelFocusOn: boolean,
}

const TopRightPanel = (props: TopRightPanelPropsType) =>
{
    let topRightPanelShapeModel: Shape2d_Rectangle = props.topRightPanelShapeModel;

    let topRightPanelStyleObject = new StyleObject().setBasics(topRightPanelShapeModel.getWidth(), topRightPanelShapeModel.getHeight(), topRightPanelShapeModel.getTopLeftPoint().getX(), topRightPanelShapeModel.getTopLeftPoint().getY())
        .setBlur(props.topRightPanelFocusOn
                 ? BLUR_LEVEL.NONE
                 : BLUR_LEVEL.MEDIUM)
        .addTransition("filter", FOCUS_IN_TIME);

    let topRightPanelBorderDivStyleObject = new StyleObject().setBasics("90%", "90%", "5%", "5%").setBorder(5, "solid", GREY_HEAVY)
        .setBorderRadius(15);

    console.log(LEVEL2_CONSOLE_PREFIX + topRightPanelShapeModel.getStringId(), LEVEL2_CONSOLE_FONT);
    return (
        <div id={topRightPanelShapeModel.getStringId()} style={topRightPanelStyleObject.getStyle()}
             onMouseEnter={() => props.topRightPanelAction_setTopRightPanelFocusOn(true)}
             onMouseLeave={() => props.topRightPanelAction_setTopRightPanelFocusOn(false)}>
            <div style={topRightPanelBorderDivStyleObject.getStyle()}/>
        </div>);
};

const mapStateToProps = (store) =>
{
    return {
        topRightPanelShapeModel: store.topRightPanelState.topRightPanelShapeModel,
        topRightPanelFocusOn: store.topRightPanelState.topRightPanelFocusOn,
    };
};

const matchDispatchToProps = (dispatch) =>
{
    return bindActionCreators({
        topRightPanelAction_setTopRightPanelFocusOn: topRightPanelAction_setTopRightPanelFocusOn,
    }, dispatch);
};

export default connect(mapStateToProps, matchDispatchToProps)(TopRightPanel);