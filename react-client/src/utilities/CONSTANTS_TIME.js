import {ID} from "./CONSTANTS_STRING";

export const APP_REFRESHING_TIME_GAP = 30; // Milliseconds

export const TIMING_KEYWORDS = Object.freeze({
                                                 BEGIN: ".begin",
                                                 END: ".end",
                                                 CLICK: ".click"
                                             });

export const GENERAL_TIMING = Object.freeze({
                                                INITIAL: 0 // The earliest time that any animate can start with

                                            });

export const CENTER_COMPONENT_TIMING = Object.freeze({
                                                         LOADING_BAR_BEGIN: GENERAL_TIMING.INITIAL,
                                                         LOADING_BAR_DUR: 1,

                                                         FADE_OUT_BEGIN: ID.CENTER_COMPONENT_ANIMATE_LOADING_BAR_WIDTH + TIMING_KEYWORDS.END,
                                                         FADE_OUT_DUR: 1.2,
                                                         FADE_OUT_DELAY: 0.8,

                                                         PARTIAL_CIRCLE_TO_FULL_BEGIN: ID.CENTER_COMPONENT_ANIMATE_LOADING_BAR_WIDTH + TIMING_KEYWORDS.END,
                                                         PARTIAL_CIRCLE_TO_FULL_DUR: 2,
                                                         PARTIAL_CIRCLE_TO_FULL_DELAY: 0,

                                                         FULL_CIRCLE_TO_FINAL_BEGIN: ID.CENTER_COMPONENT_ANIMATE_PARTIAL_CIRCLE_TO_FULL + TIMING_KEYWORDS.END,
                                                         FULL_CIRCLE_TO_FINAL_DUR: 1.2,
                                                         FULL_CIRCLE_TO_FINAL_DELAY: 0,

                                                         DASH_CIRCLE_TO_NONE_BEGIN: ID.CENTER_COMPONENT_ANIMATE_PARTIAL_CIRCLE_TO_FULL + TIMING_KEYWORDS.END,
                                                         DASH_CIRCLE_TO_NONE_DUR: 0.1,
                                                         DASH_CIRCLE_TO_NONE_DELAY: 0
                                                     });