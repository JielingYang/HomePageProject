import React from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import Shape2d_Rectangle from "../../classes/shapeClasses/Shape2d_Rectangle";
import {LEVEL2_CONSOLE_FONT, LEVEL2_CONSOLE_PREFIX} from "../../utilities/CONSTANTS_CONSOLE_FONT";
import StyleObject from "../../classes/StyleObject";
import {BLUR_LEVEL} from "../../utilities/CONSTANTS_NUMBER";
import {TRANSITION_TIME_NORMAL} from "../../utilities/CONSTANTS_TIME";
import {bottomLeftPanelAction_setBottomLeftPanelFocusOn} from "../../actionCreators/bottomLeftPanelActions";
import SubPanelBorder from "./SubPanelBorder";
import type {bottomLeftPanelStateType} from "../../reducers/bottomLeftPanelReducer";
import {COMMON_TYPE} from "../../utilities/CONSTANTS_STRING";

type BottomLeftPanelPropsType = {
    bottomLeftPanelState: bottomLeftPanelStateType,
    bottomLeftPanelAction_setBottomLeftPanelFocusOn: Function,
}

const BottomLeftPanel = (props: BottomLeftPanelPropsType) =>
{
    let bottomLeftPanelShapeModel: Shape2d_Rectangle = props.bottomLeftPanelState.bottomLeftPanelShapeModel;

    let bottomLeftPanelRootDivStyleObject = new StyleObject(COMMON_TYPE.DEFAULT).setBasics(bottomLeftPanelShapeModel.getWidth(), bottomLeftPanelShapeModel.getHeight(), bottomLeftPanelShapeModel.getTopLeftPoint().getX(), bottomLeftPanelShapeModel.getTopLeftPoint().getY())
        .addTransition("filter", TRANSITION_TIME_NORMAL)
        .setBlur(props.bottomLeftPanelState.bottomLeftPanelFocusOn
                 ? BLUR_LEVEL.NONE
                 : BLUR_LEVEL.MEDIUM);

    console.log(LEVEL2_CONSOLE_PREFIX + bottomLeftPanelShapeModel.getStringId(), LEVEL2_CONSOLE_FONT);
    return (
        <div id={bottomLeftPanelShapeModel.getStringId()} style={bottomLeftPanelRootDivStyleObject.getStyle()}
             onMouseEnter={() => props.bottomLeftPanelAction_setBottomLeftPanelFocusOn(true)}
             onMouseLeave={() => props.bottomLeftPanelAction_setBottomLeftPanelFocusOn(false)}>
            <SubPanelBorder subPanelState={props.bottomLeftPanelState} borderBlurLevel={BLUR_LEVEL.LIGHT}/>
        </div>);
};

const mapStateToProps = (store) =>
{
    return {
        bottomLeftPanelState: store.bottomLeftPanelState,
    };
};

const matchDispatchToProps = (dispatch) =>
{
    return bindActionCreators({
        bottomLeftPanelAction_setBottomLeftPanelFocusOn: bottomLeftPanelAction_setBottomLeftPanelFocusOn
    }, dispatch);
};

export default connect(mapStateToProps, matchDispatchToProps)(BottomLeftPanel);