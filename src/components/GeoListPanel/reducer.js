import * as actionTypes from './actionTypes';

const initialState = {
    isCanFetchData: true,

    data:       [],
    count:      0,
    nextPage:   null,
    isLoading:  false,
    isLoadingSpinner:  false,
    isHasError: false,
    isHasErrorMore: false,

    hasMoreItems: true,
};

export function reducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.FETCH_DATA: {
            return {
                ...state,
                data:       [],
                isLoading:  true,
                isLoadingSpinner: true,
                isHasError: false,
            };
        }
        case actionTypes.FETCH_DATA_SUCCESS: {
            return {
                ...state,
                data:       action.payload.results,
                nextPage:   action.payload.next,
                count:      action.payload.count,
                isLoading:  false,
                isLoadingSpinner: false,
                isHasError: false,

                hasMoreItems: action.payload.next !== null,
                isCanFetchData: false,
            };
        }
        case actionTypes.FETCH_DATA_FAILED: {
            return {
                ...state,
                isLoading:  false,
                isLoadingSpinner: false,
                isHasError: true,
            };
        }

        case actionTypes.FETCH_DATA_MORE: {
            return {
                ...state,
                isLoadingSpinner: true,
                isHasErrorMore: false,
            }
        }

        case actionTypes.FETCH_DATA_MORE_SUCCESS: {
            return {
                ...state,
                data:       state.data.concat(action.payload.results),
                nextPage:   action.payload.next,
                isLoading:  false,
                isLoadingSpinner: false,
                isHasError: false,
                isHasErrorMore: false,

                hasMoreItems: action.payload.next !== null,
            };
        }

        case actionTypes.FETCH_DATA_MORE_FAILED: {
            return {
                ...state,
                isLoadingSpinner: false,
                isHasErrorMore: true,
            }
        }

        case actionTypes.SET_IS_CAN_FETCH_DATA: {
            return {
                ...state,
                isCanFetchData: action.payload,
            };
        }

        case actionTypes.SET_IS_HAS_ERROR_MORE: {
            return {
                ...state,
                isHasErrorMore: action.payload,
            };
        }

    }

    return state;
}

export default reducer;
