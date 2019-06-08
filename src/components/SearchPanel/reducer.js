import * as actionTypes from './actionTypes';
import { SEARCH_TYPE } from './SearchPanel';

const initialState = {
    data:          [],
    search:        '',
    count:         0,
    nextPage:      null,
    isLoading:     false,
    isHasError:    false,
    hasMoreItems:  true,
    contextOpened: false,
    mode:          SEARCH_TYPE.event.id,
    isNotFound:    false
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
                data:       action.payload.results,
                nextPage:   action.payload.next,
                isLoading:  false,
                isHasError: false,

                hasMoreItems: action.payload.next !== null,
            };
        }
        case actionTypes.FETCH_DATA_FAILED: {
            return {
                ...state,
                isLoading:  false,
                isHasError: true,
                isNotFound: true,
                data:       [],
                nextPage:   null
            };
        }

        case actionTypes.FETCH_DATA_MORE_SUCCESS: {
            return {
                ...state,
                data:       state.data.concat(action.payload.results),
                nextPage:   action.payload.next,
                isLoading:  false,
                isHasError: false,

                hasMoreItems: action.payload.next !== null,
            };
        }

        case actionTypes.SET_SEARCH: {
            return {
                ...state,
                search:     action.payload,
                isNotFound: false,
            };
        }

        case actionTypes.TOGGLE_CONTEXT: {
            return {
                ...state,
                contextOpened: action.payload,
                isNotFound:    false,
            };
        }

        case actionTypes.SET_MODE: {
            return {
                ...state,
                mode: action.payload,
            };
        }

        case actionTypes.SET_IS_NOT_FOUND: {
            return {
                ...state,
                isNotFound: action.payload,
            };
        }

    }

    return state;
}

export default reducer;
