import React from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {LEVEL2_CONSOLE_FONT, LEVEL2_CONSOLE_PREFIX} from "../utilities/CONSTANTS_CONSOLE_FONT";
import {COMMON_TYPE, MAIN_MENU_ITEMS_TITLES, MAIN_MENU_NAME} from "../utilities/CONSTANTS_STRING";
import StyleObject from "../classes/StyleObject";
import {MAIN_MENU_ITEMS_HEIGHT} from "../utilities/CONSTANTS_NUMBER";
import BaseModelWithState from "../classes/BaseModelWithState";
import {mainMenuAction_requestToSelectMainMenuItem, mainMenuAction_mouseEntersMainMenuItem, mainMenuAction_mouseLeavesMainMenuItem} from "../actionCreators/mainMenuActions";
import {TRANSITION_TIME_QUICK} from "../utilities/CONSTANTS_TIME";

type MainMenuPropsType = {
    /* Values from parent */
    /* Values from mapStateToProps() */
    mainMenuItemModels: Array<BaseModelWithState>,
    mainMenuItemBackgroundColor_selected: string,
    mainMenuItemBackgroundColor_default: string,
    mainMenuItemBackgroundColor_hover: string,
    /* Functions from matchDispatchToProps() */
    mainMenuAction_requestToSelectMainMenuItem: Function,
    mainMenuAction_mouseEntersMainMenuItem: Function,
    mainMenuAction_mouseLeavesMainMenuItem: Function,
}

const MainMenu = (props: MainMenuPropsType) =>
{
    let mainMenuItemsCommonStyleObject: StyleObject = new StyleObject(COMMON_TYPE.EMPTY)
        .setDisplay("flex")
        .setWidth("100%")
        .setHeight(MAIN_MENU_ITEMS_HEIGHT)
        .setBoxSizing("border-box");

    let mainMenuItems: Array = props.mainMenuItemModels.map((menuItemModel: BaseModelWithState, index: number) =>
    {
        let isMouseOver: boolean = menuItemModel.getMouseHover();
        let isSelected: boolean = menuItemModel.getIsSelected();
        let mainMenuItemsBackgroundColor: string = isSelected
                                                   ? props.mainMenuItemBackgroundColor_selected
                                                   : isMouseOver
                                                     ? props.mainMenuItemBackgroundColor_hover
                                                     : props.mainMenuItemBackgroundColor_default;
        let opacity: number = isSelected
                              ? 1
                              : isMouseOver
                                ? 0.7
                                : 0.4;
        let mainMenuItemsTitleTextMargin: string = isSelected
                                                   ? "auto 5% auto auto"
                                                   : "auto 15% auto auto";

        let mainMenuItemsTitleTextWrapperStyleObject: StyleObject = new StyleObject(COMMON_TYPE.EMPTY)
            .setMargin(mainMenuItemsTitleTextMargin)
            .addTransition("margin", TRANSITION_TIME_QUICK)
            .setPointerEvents("none");

        let mainMenuItemStyleObject: StyleObject = mainMenuItemsCommonStyleObject.clone()
            .setBackgroundColor(mainMenuItemsBackgroundColor)
            .setOpacity(opacity)
            // .setBlur(blur)
            // .addTransition("filter", TRANSITION_TIME_NORMAL)
            .addTransition("background-color", TRANSITION_TIME_QUICK)
            .addTransition("opacity", TRANSITION_TIME_QUICK);

        console.log(LEVEL2_CONSOLE_PREFIX + menuItemModel.getStringId(), LEVEL2_CONSOLE_FONT);
        return <div key={index}
                    id={menuItemModel.getStringId()}
                    style={mainMenuItemStyleObject.getStyle()}
                    onClick={() => props.mainMenuAction_requestToSelectMainMenuItem(index)}
                    onMouseEnter={() => props.mainMenuAction_mouseEntersMainMenuItem(index)}
                    onMouseLeave={() => props.mainMenuAction_mouseLeavesMainMenuItem(index)}>
            <div style={mainMenuItemsTitleTextWrapperStyleObject.getStyle()}>{MAIN_MENU_ITEMS_TITLES[index]}</div>
        </div>;
    });

    return (mainMenuItems);
};


const mapStateToProps = (store) =>
{
    return {
        mainMenuItemBackgroundColor_selected: store.appState.mainMenuItemBackgroundColor_selected,
        mainMenuItemBackgroundColor_default: store.appState.mainMenuItemBackgroundColor_default,
        mainMenuItemBackgroundColor_hover: store.appState.mainMenuItemBackgroundColor_hover,
        mainMenuItemModels: store.mainMenuState.mainMenuItemModels,
    };
};

const matchDispatchToProps = (dispatch) =>
{
    return bindActionCreators({
        mainMenuAction_requestToSelectMainMenuItem: mainMenuAction_requestToSelectMainMenuItem,
        mainMenuAction_mouseEntersMainMenuItem: mainMenuAction_mouseEntersMainMenuItem,
        mainMenuAction_mouseLeavesMainMenuItem: mainMenuAction_mouseLeavesMainMenuItem,
    }, dispatch);
};

export default connect(mapStateToProps, matchDispatchToProps)(MainMenu);