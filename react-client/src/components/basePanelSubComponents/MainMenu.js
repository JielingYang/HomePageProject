import React from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {LEVEL2_CONSOLE_FONT, LEVEL2_CONSOLE_PREFIX} from "../../utilities/CONSTANTS_CONSOLE_FONT";
import {COMMON_TYPE, MAIN_MENU_ITEMS_TITLES, MAIN_MENU_NAME} from "../../utilities/CONSTANTS_STRING";
import StyleObject from "../../classes/StyleObject";

type MainMenuPropsType = {
    /* Values from parent */
    /* Values from mapStateToProps() */
    /* Functions from matchDispatchToProps() */
}

const MainMenu = (props: MainMenuPropsType) =>
{
    let mainMenuItemsStyleObject: StyleObject = new StyleObject(COMMON_TYPE.EMPTY)
        .setDisplay("flex")
        .setWidth("100%")
        .setHeight("10%")
        .setBoxSizing("border-box")
        .setBorder(1, "solid", "rgba(0,255,255,0.1)");
    let mainMenuItemsTitleTextWrapperStyleObject: StyleObject = new StyleObject(COMMON_TYPE.EMPTY).setMargin("auto");

    let mainMenuItems: Array = MAIN_MENU_ITEMS_TITLES.map((menuItemTitle: string) =>
    {

        return <div style={mainMenuItemsStyleObject.getStyle()}>
            <div style={mainMenuItemsTitleTextWrapperStyleObject.getStyle()}>{menuItemTitle}</div>
        </div>;
    });

    console.log(LEVEL2_CONSOLE_PREFIX + MAIN_MENU_NAME, LEVEL2_CONSOLE_FONT);
    return (mainMenuItems);
};


const mapStateToProps = () =>
{
    return {};
};

const matchDispatchToProps = (dispatch) =>
{
    return bindActionCreators({}, dispatch);
};

export default connect(mapStateToProps, matchDispatchToProps)(MainMenu);