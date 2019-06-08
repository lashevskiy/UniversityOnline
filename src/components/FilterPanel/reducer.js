import * as actionTypes from './actionTypes';
import { CATEGORIES_TYPE, defaultFilter } from '../../containers/App/reducer';

const initialState = {
    data:       [],
    isLoading:  false,
    isHasError: false,

    categoriesTypeId: CATEGORIES_TYPE.event,
    eventTypeId: defaultFilter.eventTypeId,
    placeTypeId: defaultFilter.placeTypeId,
    dateTypeId:     1,
    isFreeType: false,
    searchRadiusId: 500,
};

export function reducer(state = initialState, action) {
    switch (action.type) {
        // case actionTypes.FETCH_DATA: {
        //     return {
        //         ...state,
        //         isLoading:  true,
        //         isHasError: false,
        //     };
        // }
        // case actionTypes.FETCH_DATA_SUCCESS: {
        //     return {
        //         ...state,
        //         data:       action.payload,
        //         isLoading:  false,
        //         isHasError: false,
        //     };
        // }
        // case actionTypes.FETCH_DATA_FAILED: {
        //     return {
        //         ...state,
        //         isLoading:  false,
        //         isHasError: true,
        //     };
        // }

        // case actionTypes.FETCH_DATA_MORE_SUCCESS: {
        //     return {
        //         data:       state.data.concat(action.payload.results),
        //         nextPage:   action.payload.next,
        //         isLoading:  false,
        //         isHasError: false,
        //     };
        // }


        case actionTypes.SET_EVENT_TYPE_ID: {
            return {
                ...state,
                eventTypeId: action.payload,
                // categoriesTypeId: CATEGORIES_TYPE.event,
            };
        }
        case actionTypes.SET_PLACE_TYPE_ID: {
            return {
                ...state,
                placeTypeId: action.payload,
                // categoriesTypeId: CATEGORIES_TYPE.place,
            };
        }
        case actionTypes.SET_CATEGORIES_TYPE_ID: {
            return {
                ...state,
                categoriesTypeId: action.payload,
            };
        }
        case actionTypes.SET_IS_FREE_TYPE: {
            return {
                ...state,
                isFreeType: action.payload,
            };
        }
        case actionTypes.SET_DATE_TYPE_ID: {
            return {
                ...state,
                dateTypeId: action.payload,
            };
        }
        case actionTypes.SET_SEARCH_RADIUS: {
            return {
                ...state,
                searchRadiusId: action.payload,
            };
        }

    }

    return state;
}

export default reducer;
