import React from 'react'
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import Shape2d_Rectangle from "../../classes/Shape2d_Rectangle";
import {LEVEL2_CONSOLE_FONT, LEVEL2_CONSOLE_PREFIX} from "../../utilities/CONSTANTS_CONSOLE_FONT";
import {CONSOLE_FONT_LAVENDER} from "../../utilities/CONSTANTS_COLOR";
import {topRightPanelAction_requestTopRightPanelFocus} from "../../actionCreators/topRightPanelActions";

type TopRightPanelPropsType = {
    topRightPanelShapeModel: Shape2d_Rectangle,
    topRightPanelAction_requestTopRightPanelFocus: Function,
}

const TopRightPanel = (props: TopRightPanelPropsType) =>
{
    let topRightPanelShapeModel: Shape2d_Rectangle = props.topRightPanelShapeModel;

    console.log(LEVEL2_CONSOLE_PREFIX + topRightPanelShapeModel.getStringId(), LEVEL2_CONSOLE_FONT);
    return (
        <g id={topRightPanelShapeModel.getStringId()} onMouseOver={(e) =>
        {
            e.stopPropagation();
            props.topRightPanelAction_requestTopRightPanelFocus();
        }}>
            <rect x={topRightPanelShapeModel.getTopLeftPoint().getX()}
                  y={topRightPanelShapeModel.getTopLeftPoint().getY()}
                  width={topRightPanelShapeModel.getWidth()}
                  height={topRightPanelShapeModel.getHeight()}
                  fill={CONSOLE_FONT_LAVENDER}/>
        </g>)
};

const mapStateToProps = (store) =>
{
    return {
        topRightPanelShapeModel: store.topRightPanelState.topRightPanelShapeModel,
    };
};

const matchDispatchToProps = (dispatch) =>
{
    return bindActionCreators({
        topRightPanelAction_requestTopRightPanelFocus: topRightPanelAction_requestTopRightPanelFocus,
    }, dispatch)
};

export default connect(mapStateToProps, matchDispatchToProps)(TopRightPanel);