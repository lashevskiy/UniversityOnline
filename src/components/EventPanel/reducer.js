import * as actionTypes from './actionTypes';

const initialState = {
    data:       {
        images: []
    },
    isLoading:  false,
    isHasError: false,

    eventId: null,

    backPanel: null,
};

export function reducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.FETCH_DATA: {
            return {
                ...state,
                isLoading:  true,
                isHasError: false,
            };
        }
        case actionTypes.FETCH_DATA_SUCCESS: {
            return {
                ...state,
                data:       action.payload,
                isLoading:  false,
                isHasError: false,
            };
        }
        case actionTypes.FETCH_DATA_FAILED: {
            return {
                ...state,
                isLoading:  false,
                isHasError: true,
            };
        }

        case actionTypes.CLEAR_DATA: {
            return initialState;
        }

        case actionTypes.SET_EVENT_ID: {
            return {
                ...state,
                eventId: action.payload
            };
        }

        case actionTypes.SET_BACK_PANEL: {
            return {
                ...state,
                backPanel: action.payload
            };
        }

    }

    return state;
}

export default reducer;
