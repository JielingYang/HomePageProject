import React from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import Shape2d_Rectangle from "../../classes/Shape2d_Rectangle";
import {LEVEL2_CONSOLE_FONT, LEVEL2_CONSOLE_PREFIX} from "../../utilities/CONSTANTS_CONSOLE_FONT";
import {GOLD} from "../../utilities/CONSTANTS_COLOR";
import {topLeftPanelAction_requestTopLeftPanelFocus} from "../../actionCreators/topLeftPanelActions";

type TopLeftPanelPropsType = {
    topLeftPanelShapeModel: Shape2d_Rectangle,
    topLeftPanelAction_requestTopLeftPanelFocus: Function,
}

const TopLeftPanel = (props: TopLeftPanelPropsType) =>
{
    let topLeftPanelShapeModel: Shape2d_Rectangle = props.topLeftPanelShapeModel;

    console.log(LEVEL2_CONSOLE_PREFIX + topLeftPanelShapeModel.getStringId(), LEVEL2_CONSOLE_FONT);
    return (
        <g id={topLeftPanelShapeModel.getStringId()}
           onMouseOver={(e) =>
           {
               e.stopPropagation();
               props.topLeftPanelAction_requestTopLeftPanelFocus();
           }}>
            <rect x={topLeftPanelShapeModel.getTopLeftPoint().getX()}
                  y={topLeftPanelShapeModel.getTopLeftPoint().getY()}
                  width={topLeftPanelShapeModel.getWidth()}
                  height={topLeftPanelShapeModel.getHeight()}
                  fill={GOLD}/>
        </g>);
};

const mapStateToProps = (store) =>
{
    return {
        topLeftPanelShapeModel: store.topLeftPanelState.topLeftPanelShapeModel
    };
};

const matchDispatchToProps = (dispatch) =>
{
    return bindActionCreators({
        topLeftPanelAction_requestTopLeftPanelFocus: topLeftPanelAction_requestTopLeftPanelFocus
    }, dispatch);
};

export default connect(mapStateToProps, matchDispatchToProps)(TopLeftPanel);