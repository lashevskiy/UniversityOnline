import * as actionTypes from './actionTypes';
import axios from 'axios';

const ActionCreator = {

    setEventTypeId(id) {
        return { type: actionTypes.SET_EVENT_TYPE_ID, payload: id };
    },

    setPlaceTypeId(id) {
        return { type: actionTypes.SET_PLACE_TYPE_ID, payload: id };
    },

    setCategoriesTypeId(id) {
        return { type: actionTypes.SET_CATEGORIES_TYPE_ID, payload: id };
    },

    setIsFreeType(id) {
        return { type: actionTypes.SET_IS_FREE_TYPE, payload: id };
    },

    setDateTypeId(id) {
        return { type: actionTypes.SET_DATE_TYPE_ID, payload: id };
    },

    setSearchRadius(radius) {
        return { type: actionTypes.SET_SEARCH_RADIUS, payload: radius };
    },

};

export default ActionCreator;
