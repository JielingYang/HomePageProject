import React from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import StyleObject from "../../classes/StyleObject";
import {BLUR_LEVEL} from "../../utilities/CONSTANTS_NUMBER";
import {TRANSITION_TIME_NORMAL} from "../../utilities/CONSTANTS_TIME";
import {topRightPanelAction_setMouseHoverOnSingleSelectionModelIndividualItem, topRightPanelAction_selectSingleSelectionModelItem, topRightPanelAction_requestToSetMouseHoversSingleSelectionModelItems, topRightPanelAction_setSettingsTabsContentDisplayValue, topRightPanelAction_requestToSetSettingsTabsContentDisplayValueToNoneWhenMouseLeave} from "../../actionCreators/topRightPanelActions";
import SingleSelectionModel from "../../classes/StateModelClasses/SingleSelectionModel";
import {getSettingsTabsSvgIcon} from "../../utilities/svgIcons";
import type {appStateType} from "../../reducers/appReducer";
import {appAction_changeAppTheme} from "../../actionCreators/appActions";
import type {topRightPanelStateType} from "../../reducers/topRightPanelReducer";

type TopRightPanel_SettingsTabsPropsType = {
    appState: appStateType,
    topRightPanelState: topRightPanelStateType,
    topRightPanelAction_selectSingleSelectionModelItem: Function,
    topRightPanelAction_setMouseHoverOnSingleSelectionModelIndividualItem: Function,
    topRightPanelAction_requestToSetMouseHoversSingleSelectionModelItems: Function,
    topRightPanelAction_setSettingsTabsContentDisplayValue: Function,
    topRightPanelAction_requestToSetSettingsTabsContentDisplayValueToNoneWhenMouseLeave: Function,
}

const TopRightPanel_SettingsTabs = (props: TopRightPanel_SettingsTabsPropsType) =>
{
    let appState: appStateType = props.appState;
    let topRightPanelState: topRightPanelStateType = props.topRightPanelState;
    let settingsTabsDivStyleObject: StyleObject = new StyleObject().setBasics(topRightPanelState.topRightPanelBorderWidth, topRightPanelState.settingsTabsHeight, topRightPanelState.topRightPanelPadding, topRightPanelState.topRightPanelPadding);
    let settingsTabsStateModel: SingleSelectionModel = topRightPanelState.settingsTabsStateModel;
    let settingsTabsStateModelStringId: string = settingsTabsStateModel.getStringId();

    return <div style={settingsTabsDivStyleObject.getStyle()}
                onMouseEnter={() => props.topRightPanelAction_requestToSetMouseHoversSingleSelectionModelItems(true, settingsTabsStateModelStringId)}
                onMouseLeave={() => props.topRightPanelAction_requestToSetMouseHoversSingleSelectionModelItems(false, settingsTabsStateModelStringId)}>
        {settingsTabsStateModel.getItems().map((title: string, index: number) =>
        {
            let isThisTabSelected: boolean = settingsTabsStateModel.getSelectedItemIndex() === index;
            let mouseHoverThisTab: boolean = settingsTabsStateModel.getMouseHoveredItemIndex() === index;
            let isTheFirst: boolean = index === 0;
            let isTheLast: boolean = index === settingsTabsStateModel.getNumberOfItems() - 1;
            let blurLevel: BLUR_LEVEL = BLUR_LEVEL.VERY_LIGHT;
            let iconColor: string = appState.iconColorDefault;
            if (isThisTabSelected || mouseHoverThisTab)
            {
                blurLevel = BLUR_LEVEL.NONE;
                iconColor = appState.iconColorSelectedPrimary;
            }
            else if (settingsTabsStateModel.getMouseHover())
            {
                blurLevel = BLUR_LEVEL.EXTREMELY_LIGHT;
                iconColor = appState.iconColorSelectedSecondary;
            }

            let individualTabDivStyleObject = new StyleObject()
                .setBasics(topRightPanelState.settingsTabsWidth, topRightPanelState.settingsTabsHeight, index * topRightPanelState.settingsTabsWidth, 0)
                .setDisplay("flex")
                .setFlexDirection("column")
                .setBlur(blurLevel)
                .addTransition("background-color", TRANSITION_TIME_NORMAL)
                .addTransition("filter", TRANSITION_TIME_NORMAL);
            let tabIconWrapperDivStyleObject = new StyleObject()
                .setPosition("relative")
                .setHeight(topRightPanelState.settingsTabsHeight * 0.4)
                .setPointerEvents("none")
                .setMargin("auto")
                .setBlur(blurLevel)
                .addTransition("filter", TRANSITION_TIME_NORMAL);
            let tabTextWrapperDivStyleObject = new StyleObject()
                .setPosition("relative")
                .setPointerEvents("none")
                .setMargin("auto")
                .setBlur(blurLevel)
                .setFontColor(iconColor)
                .addTransition("filter", TRANSITION_TIME_NORMAL)
                .addTransition("color", TRANSITION_TIME_NORMAL);

            if (isTheFirst)
            {
                individualTabDivStyleObject.setBorderRadius(topRightPanelState.topRightPanelBorderRadius, 0, 0, 0);
            }
            else if (isTheLast)
            {
                individualTabDivStyleObject.setBorderRadius(0, topRightPanelState.topRightPanelBorderRadius, 0, 0);
            }

            return <div key={index} style={individualTabDivStyleObject.getStyle()}
                        onClick={() => props.topRightPanelAction_selectSingleSelectionModelItem(index, settingsTabsStateModelStringId)}
                        onMouseLeave={() => props.topRightPanelAction_requestToSetSettingsTabsContentDisplayValueToNoneWhenMouseLeave(index)}
                        onMouseEnter={() =>
                        {
                            props.topRightPanelAction_setMouseHoverOnSingleSelectionModelIndividualItem(index, settingsTabsStateModelStringId);
                            props.topRightPanelAction_setSettingsTabsContentDisplayValue(index, "block");
                        }}>
                <div style={tabIconWrapperDivStyleObject.getStyle()}>
                    {getSettingsTabsSvgIcon(iconColor, index)}
                </div>
                <div style={tabTextWrapperDivStyleObject.getStyle()}>
                    {title}
                </div>
            </div>
        })}
    </div>;
};

const mapStateToProps = (store) =>
{
    return {
        appState: store.appState,
        topRightPanelState: store.topRightPanelState,
    };
};

const matchDispatchToProps = (dispatch) =>
{
    return bindActionCreators({
        appAction_changeAppTheme: appAction_changeAppTheme,
        topRightPanelAction_selectSingleSelectionModelItem: topRightPanelAction_selectSingleSelectionModelItem,
        topRightPanelAction_setMouseHoverOnSingleSelectionModelIndividualItem: topRightPanelAction_setMouseHoverOnSingleSelectionModelIndividualItem,
        topRightPanelAction_requestToSetMouseHoversSingleSelectionModelItems: topRightPanelAction_requestToSetMouseHoversSingleSelectionModelItems,
        topRightPanelAction_setSettingsTabsContentDisplayValue: topRightPanelAction_setSettingsTabsContentDisplayValue,
        topRightPanelAction_requestToSetSettingsTabsContentDisplayValueToNoneWhenMouseLeave: topRightPanelAction_requestToSetSettingsTabsContentDisplayValueToNoneWhenMouseLeave,
    }, dispatch);
};

export default connect(mapStateToProps, matchDispatchToProps)(TopRightPanel_SettingsTabs);