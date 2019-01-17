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
import MainMenu from "./MainMenu";
import BaseModelWithState from "../classes/BaseModelWithState";
import EnginePart from "./EnginePart";

type ContentPanelPropsType = {
    /* Values from parent */
    contentPanelIndex: number,
    /* Values from mapStateToProps() */
    contentPanelModel: BaseModelWithStateAndShape,
    enginePerspective: number,
    contentPanelEngine_backgroundColor: string,
    contentPanelMainMenu_backgroundColor: string,
    selectedMenuItemIndex: number,
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

    let blur: BLUR_LEVEL = contentPanelIndex === CONTENT_PANELS_INDICES.CONTENT_PANEL_MENU || contentPanelModel.getMouseHover()
                           ? BLUR_LEVEL.NONE
                           : BLUR_LEVEL.LIGHT;

    let contentPanelComponentStyleObject = new StyleObject(COMMON_TYPE.DEFAULT).setBasics(contentPanelModel.getWidth(), contentPanelModel.getHeight(), contentPanelModel.getX(), contentPanelModel.getY())
        .setPointerEvents("auto")
        .setBlur(blur)
        .addTransition("filter", TRANSITION_TIME_NORMAL);
    // .setBorder(1, "solid", "rgba(0,255,255,0.1)");

    contentPanelComponentStyleObject = appendContentPanelSpecifiedStyle(contentPanelComponentStyleObject, props);

    console.log(LEVEL1_CONSOLE_PREFIX + contentPanelModel.getStringId(), LEVEL1_CONSOLE_FONT);
    return (
        <div id={contentPanelModel.getStringId()} style={contentPanelComponentStyleObject.getStyle()}
             onMouseEnter={() => props.contentPanelAction_mouseEnters(contentPanelIndex)}
             onMouseLeave={() => props.contentPanelAction_mouseLeaves(contentPanelIndex)}>
            {createContent(contentPanelIndex)}
        </div>);
};

const appendContentPanelSpecifiedStyle: StyleObject = (contentPanelStyleObject: StyleObject, props: ContentPanelPropsType) =>
{
    let shouldDisplay: string = props.contentPanelIndex === props.selectedMenuItemIndex
                                ? "block"
                                : "none";
    switch (props.contentPanelIndex)
    {
        case CONTENT_PANELS_INDICES.CONTENT_PANEL_MENU:
            contentPanelStyleObject.setDisplay("flex").setFlexDirection("column").setBackgroundColor(props.contentPanelMainMenu_backgroundColor);
            break;
        case CONTENT_PANELS_INDICES.CONTENT_PANEL_ENGINE:
            contentPanelStyleObject.setDisplay(shouldDisplay).setPerspective(props.enginePerspective).setBackgroundColor(props.contentPanelEngine_backgroundColor);
            break;
        case CONTENT_PANELS_INDICES.CONTENT_PANEL_ABOUT:
            contentPanelStyleObject.setDisplay(shouldDisplay).setBackgroundColor("rgba(50,0,0,0.5)");
            break;
        case CONTENT_PANELS_INDICES.CONTENT_PANEL_SETTINGS:
            contentPanelStyleObject.setDisplay(shouldDisplay).setBackgroundColor("rgba(0,50,0,0.5)");
            break;
        case CONTENT_PANELS_INDICES.CONTENT_PANEL_PLACEHOLDER:
            contentPanelStyleObject.setDisplay(shouldDisplay).setBackgroundColor("rgba(0,0,50,0.5)");
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
            return <MainMenu/>;
        case CONTENT_PANELS_INDICES.CONTENT_PANEL_ENGINE:
            return Object.values(ENGINE_PART_INDICES).map((index: number) => <EnginePart key={index}
                                                                                         enginePartIndex={index}/>);
        default:
            return null;
    }
};


const mapStateToProps = (store, props) =>
{
    let selectedMenuItemIndex: number = 0;
    store.mainMenuState.mainMenuItemModels.some((model: BaseModelWithState, index: number) =>
    {
        if (model.getIsSelected())
        {
            selectedMenuItemIndex = index;
            return true;
        }
        else
        {
            return false;
        }
    });
    return {
        contentPanelModel: store.contentPanelsState.contentPanelsModels[props.contentPanelIndex],
        enginePerspective: store.engineState.enginePerspective,
        contentPanelEngine_backgroundColor: store.appState.engine_contentPanel_backgroundColor,
        contentPanelMainMenu_backgroundColor: store.appState.mainMenu_contentPanel_backgroundColor,
        selectedMenuItemIndex: selectedMenuItemIndex,
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