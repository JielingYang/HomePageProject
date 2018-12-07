import React from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {LEVEL1_CONSOLE_FONT, LEVEL1_CONSOLE_PREFIX} from "../utilities/CONSTANTS_CONSOLE_FONT";
import StyleObject from "../classes/StyleObject";
import {COMMON_TYPE} from "../utilities/CONSTANTS_STRING";
import BaseModelWithStateAndShape from "../classes/BaseModelWithStateAndShape";
import {contentPanelAction_mouseEnters, contentPanelAction_mouseLeaves} from "../actionCreators/contentPanelActions";
import {isUndefineOrNull} from "../utilities/UTILITIES";
import {BLUR_LEVEL, CONTENT_PANELS_INDICES, ENGINE_PART_INDICES} from "../utilities/CONSTANTS_NUMBER";
import {TRANSITION_TIME_NORMAL} from "../utilities/CONSTANTS_TIME";
import EnginePart from "./basePanelSubComponents/EnginePart";

type ContentPanelPropsType = {
    /* Values from parent */
    contentPanelIndex: number,
    /* Values from mapStateToProps() */
    contentPanelModel: BaseModelWithStateAndShape,
    enginePerspective: number,
    /* Functions from matchDispatchToProps() */
    contentPanelAction_mouseEnters: Function,
    contentPanelAction_mouseLeaves: Function,
}

const ContentPanel = (props: ContentPanelPropsType) =>
{
    let contentPanelIndex: number = props.contentPanelIndex;
    let contentPanelModel: BaseModelWithStateAndShape = props.contentPanelModel;
    if (isUndefineOrNull(contentPanelModel))
    {
        return null;
    }

    let blur: BLUR_LEVEL = contentPanelModel.getMouseHover()
                           ? BLUR_LEVEL.NONE
                           : BLUR_LEVEL.MEDIUM;

    let contentPanelComponentStyleObject = new StyleObject(COMMON_TYPE.DEFAULT).setBasics(contentPanelModel.getWidth(), contentPanelModel.getHeight(), contentPanelModel.getX(), contentPanelModel.getY())
        .setPointerEvents("auto")
        .setBlur(blur)
        .addTransition("filter", TRANSITION_TIME_NORMAL)
        .setBorder(4, "solid", "rgba(0,255,255,0.5)");

    contentPanelComponentStyleObject = appendContentPanelSpecifiedStyle(contentPanelIndex, contentPanelComponentStyleObject, props);

    console.log(LEVEL1_CONSOLE_PREFIX + contentPanelModel.getStringId(), LEVEL1_CONSOLE_FONT);
    return (
        <div id={contentPanelModel.getStringId()} style={contentPanelComponentStyleObject.getStyle()}
             onMouseEnter={() => props.contentPanelAction_mouseEnters(contentPanelIndex)}
             onMouseLeave={() => props.contentPanelAction_mouseLeaves(contentPanelIndex)}>
            {createContent(contentPanelIndex)}
        </div>);
};

const appendContentPanelSpecifiedStyle: StyleObject = (contentPanelIndex: number, contentPanelStyleObject: StyleObject, props: ContentPanelPropsType) =>
{
    switch (contentPanelIndex)
    {
        case CONTENT_PANELS_INDICES.CONTENT_PANEL_MENU:
            break;
        case CONTENT_PANELS_INDICES.CONTENT_PANEL_ENGINE:
            contentPanelStyleObject.setPerspective(props.enginePerspective);
            break;
        default:
            break;
    }
    return contentPanelStyleObject;
};

const createContent = (contentPanelIndex: number) =>
{
    switch (contentPanelIndex)
    {
        case CONTENT_PANELS_INDICES.CONTENT_PANEL_MENU:
            return null;
        case CONTENT_PANELS_INDICES.CONTENT_PANEL_ENGINE:
            return Object.values(ENGINE_PART_INDICES).map((index: number) =>
                <EnginePart key={index} enginePartIndex={index}/>);
        default:
            return null;
    }
};


const mapStateToProps = (store, props) =>
{
    return {
        contentPanelModel: store.contentPanelsState.contentPanelsModels[props.contentPanelIndex],
        enginePerspective: store.engineState.enginePerspective,
    };
};

const matchDispatchToProps = (dispatch) =>
{
    return bindActionCreators({
        contentPanelAction_mouseEnters: contentPanelAction_mouseEnters,
        contentPanelAction_mouseLeaves: contentPanelAction_mouseLeaves,
    }, dispatch);
};

export default connect(mapStateToProps, matchDispatchToProps)(ContentPanel);