import * as actionTypes from './actionTypes';
import axios from 'axios';
import { CATEGORIES_TYPE } from '../../containers/App/reducer';

const ActionCreator = {

    fetchPlace() {
        return (dispatch, getState) => {
            dispatch({ type: actionTypes.FETCH_PLACE });

            const city = getState().appPanel.cityId.slug;
            const eventTypeId = getState().appPanel.eventTypeId.slug;
            const placeTypeId = getState().appPanel.placeTypeId.slug;
            const categoriesTypeId = getState().appPanel.categoriesTypeId;
            const isFreeType = getState().appPanel.isFreeType;
            const _date = getState().dateFilterPanel.dateTypeIdList.filter(item => item.id === getState().appPanel.dateTypeId)[0];
            const dateStart = _date.dateStart;
            const dateEnd = _date.dateEnd;

            let placeURL =
                'https://kudago.com/public-api/v1.4/places/?' +
                    'location=' + city +
                    '&categories=' + placeTypeId +
                    '&fields=id,title,short_title,address,timetable,phone,is_stub,images,description,body_text,foreign_url,coords,subway,is_closed,categories,tags' +
                    '&expand=images,dates&page_size=20/';

            let url = placeURL;

            axios.post('https://lionspromo.ru/index.php',
                {
                    url: url
                })
                 .then(function (response) {
                     dispatch({ type: actionTypes.FETCH_PLACE_SUCCESS, payload: response.data });
                 })
                 .catch(function (error) {
                     dispatch({ type: actionTypes.FETCH_PLACE_FAILED, payload: String(error) });
                 });
        };
    },

    fetchPlaceMore(url) {
        return (dispatch) => {
            dispatch({ type: actionTypes.FETCH_PLACE_MORE});

            axios.post('https://lionspromo.ru/index.php',
                {
                    url: url
                })
                 .then(function (response) {
                     dispatch({ type: actionTypes.FETCH_PLACE_MORE_SUCCESS, payload: response.data });
                 })
                 .catch(function (error) {
                     dispatch({ type: actionTypes.FETCH_PLACE_MORE_FAILED, payload: String(error) });
                 });
        };
    },

    setIsCanfetchPlace(id) {
        return { type: actionTypes.SET_IS_CAN_FETCH_PLACE, payload: id };
    },




    fetchEvent(type) {
        return (dispatch, getState) => {
            dispatch({ type: actionTypes.FETCH_EVENT });

            const city = getState().appPanel.cityId.slug;
            const eventTypeId = getState().appPanel.eventTypeId.slug;
            const placeTypeId = getState().appPanel.placeTypeId.slug;
            const categoriesTypeId = getState().appPanel.categoriesTypeId;
            const isFreeType = getState().appPanel.isFreeType;
            const _date = getState().dateFilterPanel.dateTypeIdList.filter(item => item.id === getState().appPanel.dateTypeId)[0];
            const dateStart = _date.dateStart;
            const dateEnd = _date.dateEnd;

            let eventURL =
                'https://kudago.com/public-api/v1.4/events/?' +
                'location=' + city +
                '&actual_since=' + dateStart +
                '&actual_until=' + dateEnd +
                '&categories=' + eventTypeId +
                '&is_free=' + isFreeType +
                '&fields=id,title,short_title,dates,place,description,images,categories' +
                '&expand=images,place,dates' +
                '&page_size=20/';

            let url = eventURL;

            axios.post('https://lionspromo.ru/index.php',
                {
                    url: url
                })
                 .then(function (response) {
                     dispatch({ type: actionTypes.FETCH_EVENT_SUCCESS, payload: response.data });
                 })
                 .catch(function (error) {
                     dispatch({ type: actionTypes.FETCH_EVENT_FAILED, payload: String(error) });
                 });
        };
    },

    fetchEventMore(url) {
        return (dispatch) => {
            dispatch({ type: actionTypes.FETCH_EVENT_MORE});

            axios.post('https://lionspromo.ru/index.php',
                {
                    url: url
                })
                 .then(function (response) {
                     dispatch({ type: actionTypes.FETCH_EVENT_MORE_SUCCESS, payload: response.data });
                 })
                 .catch(function (error) {
                     dispatch({ type: actionTypes.FETCH_EVENT_MORE_FAILED, payload: String(error) });
                 });
        };
    },

    setIsCanfetchEvent(id) {
        return { type: actionTypes.SET_IS_CAN_FETCH_EVENT, payload: id };
    },


};

export default ActionCreator;
