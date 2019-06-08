import * as actionTypes from './actionTypes';

export const CATEGORIES_TYPE = {
    event: 'event',
    place: 'place'
};

export const defaultFilter = {
    eventTypeId: {
        slug: "",
        name: "Все события",
    },
    placeTypeId: {
        slug: "",
        name: "Все места"
    },
};

const initialState = {
    user: null,
    geoData: null,
    accessToken: null,
    isLoading:  false,
    isHasError: false,

    // eventId: null,
    cityId:      {
        name: 'Санкт-Петербург',
        slug: 'spb',
        coords: {
            lat: 59.939094999999966,
            lon: 30.315868
        },
    },
    locationCoords: null,
    isShowReloadButton: false,
    isNeedSetCenter: true,

    categoriesTypeId: CATEGORIES_TYPE.event,
    eventTypeId: defaultFilter.eventTypeId,
    placeTypeId: defaultFilter.placeTypeId,
    dateTypeId:     1,
    isFreeType: false,
    searchRadiusId: 500,
    isShowPopout: false,
    viewType: false,
    myLocation: false
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

        // case actionTypes.SET_EVENT_ID: {
        //     return {
        //         ...state,
        //         eventId: action.payload
        //     };
        // }
        case actionTypes.SET_CITY_ID: {
            return {
                ...state,
                cityId:          action.payload,
                isNeedSetCenter: true,
                locationCoords:  null,
            };
        }
        case actionTypes.SET_EVENT_TYPE_ID: {
            return {
                ...state,
                eventTypeId: action.payload,
                categoriesTypeId: CATEGORIES_TYPE.event,
            };
        }
        case actionTypes.SET_PLACE_TYPE_ID: {
            return {
                ...state,
                placeTypeId: action.payload,
                categoriesTypeId: CATEGORIES_TYPE.place,
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
        case actionTypes.SET_IS_SHOW_POPOUT: {
            return {
                ...state,
                isShowPopout: action.payload,
            };
        }
        case actionTypes.SET_SEARCH_RADIUS: {
            return {
                ...state,
                searchRadiusId: action.payload,
            };
        }
        case actionTypes.SET_LOCATION_COORDS: {
            return {
                ...state,
                locationCoords:     action.payload,
                isShowReloadButton: true,
            };
        }
        case actionTypes.SET_IS_NEED_SET_CENTER: {
            return {
                ...state,
                isNeedSetCenter: action.payload,
                isShowReloadButton: false,
            };
        }
        case actionTypes.SET_USER: {
            return {
                ...state,
                user: action.payload
            };
        }
        case actionTypes.SET_GEODATA: {
            return {
                ...state,
                geoData: action.payload
            };
        }
        case actionTypes.SET_ACCESS_TOKEN: {
            return {
                ...state,
                accessToken: action.payload
            };
        }
        case actionTypes.SET_VIEW_TYPE: {
            return {
                ...state,
                viewType: action.payload
            };
        }
        case actionTypes.SET_MY_LOCATION: {
            return {
                ...state,
                myLocation: action.payload
            };
        }

    }

    return state;
}

export default reducer;
