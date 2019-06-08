import * as actionTypes from './actionTypes';

const initialState = {
    isCanFetchData: true,
    data:           [],
    count:          0,
    nextPage:       null,
    isLoading:      false,
    isHasError:     false,
    hasMoreItems:   true,

    isLoadingMore:  false,
    isHasErrorMore: false,
    isCanFetchDataMore: true,


    isCanFetchDataTop: true,
    dataTop:           [],
    countTop:          0,
    nextPageTop:       null,
    isLoadingTop:      false,
    isHasErrorTop:     false,
    hasMoreItemsTop:   true,
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
                count:      action.payload.count,
                isLoading:  false,
                isHasError: false,

                hasMoreItems: action.payload.next !== null,
                isCanFetchData: false,
            };
        }
        case actionTypes.FETCH_DATA_FAILED: {
            return {
                ...state,
                isLoading:  false,
                isHasError: true,
                isCanFetchData: true,
            };
        }


        case actionTypes.FETCH_DATA_MORE: {
            return {
                ...state,
                //isLoading:  true,
                //isHasError: false,

               //isLoadingMore:  true,
                isHasErrorMore: false,
               //  isCanFetchDataMore: false,
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

                //isLoadingMore:  false,
                isHasErrorMore: false,
                //isCanFetchDataMore: true,
            };
        }
        case actionTypes.FETCH_DATA_MORE_FAILED: {
            return {
                ...state,

                //isLoadingMore:  false,
                isHasErrorMore: true,
                //isCanFetchDataMore: true,
            };
        }



        case actionTypes.SET_IS_CAN_FETCH_DATA: {
            return {
                ...state,
                isCanFetchData: action.payload,
            };
        }

        case actionTypes.SET_IS_CAN_FETCH_DATA_TOP: {
            return {
                ...state,
                isCanFetchDataTop: action.payload,
            };
        }

        case actionTypes.SET_IS_HAS_ERROR_MORE: {
            return {
                ...state,
                isHasErrorMore: action.payload,
            };
        }

        case actionTypes.FETCH_DATA_TOP: {
            return {
                ...state,
                isLoadingTop:  true,
                isHasErrorTop: false,
            };
        }
        case actionTypes.FETCH_DATA_TOP_SUCCESS: {
            return {
                ...state,
                dataTop:       action.payload.results,
                nextPageTop:   action.payload.next,
                countTop:      action.payload.count,
                isLoadingTop:  false,
                isHasErrorTop: false,

                hasMoreItemsTop: action.payload.next !== null,
                isCanFetchDataTop: false,
            };
        }
        case actionTypes.FETCH_DATA_TOP_FAILED: {
            return {
                ...state,
                isLoadingTop:  false,
                isHasErrorTop: true,
                isCanFetchDataTop: true,
            };
        }

    }

    return state;
}

export default reducer;
