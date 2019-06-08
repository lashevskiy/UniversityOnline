import * as actionTypes from './actionTypes';
import axios from 'axios';

const ActionCreator = {

    // setEventId(id) {
    //     return { type: actionTypes.SET_EVENT_ID, payload: id };
    // },

    setCityId(id) {
        return { type: actionTypes.SET_CITY_ID, payload: id };
    },

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

    setIsShowPopout(isShowPopout) {
        return { type: actionTypes.SET_IS_SHOW_POPOUT, payload: isShowPopout };
    },

    setSearchRadius(radius) {
        return { type: actionTypes.SET_SEARCH_RADIUS, payload: radius };
    },

    setLocationCoords(coords) {
        return { type: actionTypes.SET_LOCATION_COORDS, payload: coords };
    },

    setIsNeedSetCenter(value) {
        return { type: actionTypes.SET_IS_NEED_SET_CENTER, payload: value };
    },

    setUser(user) {
        return { type: actionTypes.SET_USER, payload: user };
    },

    setGeodata(geodata) {
        return { type: actionTypes.SET_GEODATA, payload: geodata };
    },

    setAccessToken(accessToken) {
        return { type: actionTypes.SET_ACCESS_TOKEN, payload: accessToken };
    },

    setViewType(value) {
        return { type: actionTypes.SET_VIEW_TYPE, payload: value };
    },

    setMyLocation(value) {
        return { type: actionTypes.SET_MY_LOCATION, payload: value };
    },

};

export default ActionCreator;
