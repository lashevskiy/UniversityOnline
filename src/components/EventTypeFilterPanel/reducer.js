import * as actionTypes from './actionTypes';

const initialState = {
    data:       [],
    isLoading:  false,
    isHasError: false,
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


        // case actionTypes.FETCH_DATA_MORE_SUCCESS: {
        //     return {
        //         data:       state.data.concat(action.payload.results),
        //         nextPage:   action.payload.next,
        //         isLoading:  false,
        //         isHasError: false,
        //     };
        // }

    }

    return state;
}

export default reducer;
