import {createContext} from 'react'

export const defaultContextValue = {
    videoLoaded: false,
    pageOptions: {
        title: '',
        color: '#fff'
    },
    transition: {
        inTransition: false,
        state: 'intro',
        transitionPath: null
    },
};

export const reducer = (state, action) => {
    switch (action.type) {
        case 'videoLoaded':
            return {
                ...state,
                videoLoaded: action.videoLoaded
            }
        case 'setPageOptions':
            return {
                ...state,
                pageOptions: {
                    ...state.pageOptions,
                    title: action.pageTitle,
                    color: action.pageColor
                }
            }
        case 'transition.setState':
            return {
                ...state,
                transition: {
                    ...state.transition,
                    state: action.transitionState,
                    inTransition: action.inTransition
                },
            }
        case 'transition.changePage':
            return {
                ...state,
                transition: {
                    ...state.transition,
                    transitionPath: action.transitionPath,
                    state: action.transitionState,
                    inTransition: action.inTransition,
                }
            }
        default:
            return {
                ...state,
            }
    }
}

export const LayoutContext = createContext();
