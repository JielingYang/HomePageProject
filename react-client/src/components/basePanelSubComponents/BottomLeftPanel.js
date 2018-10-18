import React from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import Shape2d_Rectangle from "../../classes/Shape2d_Rectangle";
import {LEVEL2_CONSOLE_FONT, LEVEL2_CONSOLE_PREFIX} from "../../utilities/CONSTANTS_CONSOLE_FONT";
import StyleObject from "../../classes/StyleObject";
import {BLUR_LEVEL} from "../../utilities/CONSTANTS_NUMBER";
import {FOCUS_IN_TIME} from "../../utilities/CONSTANTS_TIME";
import {bottomLeftPanelAction_setBottomLeftPanelFocusOn} from "../../actionCreators/bottomLeftPanelActions";
import {GREY_HEAVY} from "../../utilities/CONSTANTS_COLOR";

type BottomLeftPanelPropsType = {
    bottomLeftPanelShapeModel: Shape2d_Rectangle,
    bottomLeftPanelAction_setBottomLeftPanelFocusOn: Function,
    bottomLeftPanelFocusOn: boolean,
}

const BottomLeftPanel = (props: BottomLeftPanelPropsType) =>
{
    let bottomLeftPanelShapeModel: Shape2d_Rectangle = props.bottomLeftPanelShapeModel;

    let bottomLeftPanelRootDivStyleObject = new StyleObject().setBasics(bottomLeftPanelShapeModel.getWidth(), bottomLeftPanelShapeModel.getHeight(), bottomLeftPanelShapeModel.getTopLeftPoint().getX(), bottomLeftPanelShapeModel.getTopLeftPoint().getY())
        .setBlur(props.bottomLeftPanelFocusOn
                 ? BLUR_LEVEL.NONE
                 : BLUR_LEVEL.MEDIUM)
        .addTransition("filter", FOCUS_IN_TIME);

    let bottomLeftPanelBorderDivStyleObject = new StyleObject().setBasics("90%", "90%", "5%", "5%").setBorder(5, "solid", GREY_HEAVY)
        .setBorderRadius(15);

    console.log(LEVEL2_CONSOLE_PREFIX + bottomLeftPanelShapeModel.getStringId(), LEVEL2_CONSOLE_FONT);
    return (
        <div id={bottomLeftPanelShapeModel.getStringId()} style={bottomLeftPanelRootDivStyleObject.getStyle()}
             onMouseEnter={() => props.bottomLeftPanelAction_setBottomLeftPanelFocusOn(true)}
             onMouseLeave={() => props.bottomLeftPanelAction_setBottomLeftPanelFocusOn(false)}>
            <div style={bottomLeftPanelBorderDivStyleObject.getStyle()}/>
        </div>);
};

const mapStateToProps = (store) =>
{
    return {
        bottomLeftPanelShapeModel: store.bottomLeftPanelState.bottomLeftPanelShapeModel,
        bottomLeftPanelFocusOn: store.bottomLeftPanelState.bottomLeftPanelFocusOn,
    };
};

const matchDispatchToProps = (dispatch) =>
{
    return bindActionCreators({
        bottomLeftPanelAction_setBottomLeftPanelFocusOn: bottomLeftPanelAction_setBottomLeftPanelFocusOn
    }, dispatch);
};

export default connect(mapStateToProps, matchDispatchToProps)(BottomLeftPanel);