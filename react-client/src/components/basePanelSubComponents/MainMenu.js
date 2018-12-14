import React from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {LEVEL2_CONSOLE_FONT, LEVEL2_CONSOLE_PREFIX} from "../../utilities/CONSTANTS_CONSOLE_FONT";
import {COMMON_TYPE, MAIN_MENU_ITEMS_TITLES, MAIN_MENU_NAME} from "../../utilities/CONSTANTS_STRING";
import StyleObject from "../../classes/StyleObject";
import {MAIN_MENU_ITEMS_HEIGHT} from "../../utilities/CONSTANTS_NUMBER";
import BaseModelWithState from "../../classes/BaseModelWithState";

type MainMenuPropsType = {
    /* Values from parent */
    /* Values from mapStateToProps() */
    mainMenuItemModels: Array<BaseModelWithState>,
    mainMenuItemBackgroundColor_default: string,
    mainMenuItemBackgroundColor_hover: string,
    mainMenuItemBackgroundColor_selected: string,
    /* Functions from matchDispatchToProps() */
}

const MainMenu = (props: MainMenuPropsType) =>
{
    let mainMenuItemsCommonStyleObject: StyleObject = new StyleObject(COMMON_TYPE.EMPTY)
        .setDisplay("flex")
        .setWidth("100%")
        .setHeight(MAIN_MENU_ITEMS_HEIGHT)
        .setBoxSizing("border-box");
    let mainMenuItemsTitleTextWrapperStyleObject: StyleObject = new StyleObject(COMMON_TYPE.EMPTY)
        .setMargin("auto auto auto 10%")
        .setPointerEvents("none");

    let mainMenuItems: Array = props.mainMenuItemModels.map((menuItemModel: BaseModelWithState, index: number) =>
    {
        let isMouseOver: boolean = menuItemModel.getMouseHover();
        let isSelected: boolean = menuItemModel.getIsSelected();
        let mainMenuItemsBackgroundColor: string = isMouseOver
            ? props.mainMenuItemBackgroundColor_hover
            : isSelected
                                                       ? props.mainMenuItemBackgroundColor_selected
                                                       : props.mainMenuItemBackgroundColor_default;

        let mainMenuItemStyleObject: StyleObject = mainMenuItemsCommonStyleObject.clone().setBackgroundColor(mainMenuItemsBackgroundColor);

        return <div style={mainMenuItemStyleObject.getStyle()}>
            <div style={mainMenuItemsTitleTextWrapperStyleObject.getStyle()}>{MAIN_MENU_ITEMS_TITLES[index]}</div>
        </div>;
    });

    console.log(LEVEL2_CONSOLE_PREFIX + MAIN_MENU_NAME, LEVEL2_CONSOLE_FONT);
    return (mainMenuItems);
};


const mapStateToProps = (store) =>
{
    return {
        mainMenuItemModels: store.mainMenuState.mainMenuItemModels,
        mainMenuItemBackgroundColor_default: store.appState.mainMenuItemBackgroundColor_default,
        mainMenuItemBackgroundColor_hover: store.appState.mainMenuItemBackgroundColor_hover,
        mainMenuItemBackgroundColor_selected: store.appState.mainMenuItemBackgroundColor_selected,
    };
};

const matchDispatchToProps = (dispatch) =>
{
    return bindActionCreators({}, dispatch);
};

export default connect(mapStateToProps, matchDispatchToProps)(MainMenu);