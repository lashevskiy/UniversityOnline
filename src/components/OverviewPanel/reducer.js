import * as actionTypes from './actionTypes';

const initialState = {
    isCanFetchPlace: true,
    data:       [],
    count:      0,
    nextPage:   null,
    isLoading:  false,
    isHasError: false,
    hasMoreItems: true,

    dataPlace: [],
    dataEvent: []
};

export function reducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.FETCH_PLACE: {
            return {
                ...state,
                isLoading:  true,
                isHasError: false,
            };
        }
        case actionTypes.FETCH_PLACE_SUCCESS: {
            return {
                ...state,
                data:       action.payload.results,
                nextPage:   action.payload.next,
                count:      action.payload.count,
                isLoading:  false,
                isHasError: false,

                hasMoreItems: action.payload.next !== null,
                isCanFetchPlace: false,
            };
        }
        case actionTypes.FETCH_PLACE_FAILED: {
            return {
                ...state,
                isLoading:  false,
                isHasError: true,
            };
        }
        case actionTypes.FETCH_PLACE_MORE_SUCCESS: {
            return {
                ...state,
                data:       state.data.concat(action.payload.results),
                nextPage:   action.payload.next,
                isLoading:  false,
                isHasError: false,

                hasMoreItems: action.payload.next !== null,
            };
        }
        case actionTypes.SET_IS_CAN_FETCH_PLACE: {
            return {
                ...state,
                isCanFetchPlace: action.payload,
            };
        }

    }

    return state;
}

export default reducer;
