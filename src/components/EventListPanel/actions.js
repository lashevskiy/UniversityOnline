import * as actionTypes from './actionTypes';
import axios from 'axios';
import { CATEGORIES_TYPE } from '../../containers/App/reducer';
import { universityDataMock } from './mockData';

const ActionCreator = {

    fetchData() {
        return (dispatch, getState) => {
            dispatch({ type: actionTypes.FETCH_DATA });

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
                    '&page_size=20';
            let placeURL =
                'https://kudago.com/public-api/v1.4/places/?' +
                    'location=' + city +
                    '&categories=' + placeTypeId +
                    '&fields=id,title,short_title,address,timetable,phone,is_stub,images,description,body_text,foreign_url,coords,subway,is_closed,categories,tags' +
                    '&expand=images,dates' +
                    '&page_size=20/';

            let url = categoriesTypeId === CATEGORIES_TYPE.place ? placeURL : eventURL;

            axios.post('https://lionspromo.ru/index.php',
                {
                    url: url
                })
                 .then(function (response) {

                     let res =
                     universityDataMock.results.map((item, index) => {
                         item.first_image = { image: item.imgIcon };

                         return item;
                     });
                     response.results = res;

                     console.log('ARTEM', response)

                     dispatch({ type: actionTypes.FETCH_DATA_SUCCESS, payload: response });

                     // if(response && response.data && response.data !== "" && typeof response.data === "object") {
                     //     dispatch({ type: actionTypes.FETCH_DATA_SUCCESS, payload: response.data });
                     // } else {
                     //     dispatch({ type: actionTypes.FETCH_DATA_FAILED });
                     // }
                 })
                 .catch(function (error) {
                     dispatch({ type: actionTypes.FETCH_DATA_FAILED, payload: String(error) });
                 });
        };
    },

    fetchDataMore(url) {
        return (dispatch) => {
            dispatch({ type: actionTypes.FETCH_DATA_MORE});

            axios.post('https://lionspromo.ru/index.php',
                {
                    url: url
                })
                 .then(function (response) {
                     if(response && response.data && response.data !== "" && typeof response.data === "object") {
                         dispatch({ type: actionTypes.FETCH_DATA_MORE_SUCCESS, payload: response.data });
                     } else {
                         dispatch({ type: actionTypes.FETCH_DATA_MORE_FAILED });
                     }
                 })
                 .catch(function (error) {
                     dispatch({ type: actionTypes.FETCH_DATA_MORE_FAILED, payload: String(error) });
                 });
        };
    },

    setIsCanFetchData(id) {
        return { type: actionTypes.SET_IS_CAN_FETCH_DATA, payload: id };
    },

    setIsCanFetchDataTop(id) {
        return { type: actionTypes.SET_IS_CAN_FETCH_DATA_TOP, payload: id };
    },

    setIsHasErrorMore(value) {
        return { type: actionTypes.SET_IS_HAS_ERROR_MORE, payload: value };
    },


    fetchDataTop() {
        return (dispatch, getState) => {
            dispatch({ type: actionTypes.FETCH_DATA_TOP });

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
                '&order_by=-favorites_count' +
                '&actual_since=' + dateStart +
                // '&actual_until=' + dateEnd +
                // '&categories=' + eventTypeId +
                // '&is_free=' + isFreeType +
                '&fields=favorites_count,id,title,short_title,dates,place,description,images,categories' +
                '&expand=images,place,dates' +
                '&page_size=15';
            let placeURL =
                'https://kudago.com/public-api/v1.4/places/?' +
                'location=' + city +
                '&order_by=-favorites_count' +
                // '&categories=' + placeTypeId +
                '&fields=favorites_count,id,title,short_title,address,timetable,phone,is_stub,images,description,body_text,foreign_url,coords,subway,is_closed,categories,tags' +
                '&expand=images,dates' +
                '&page_size=15/';

            let url = categoriesTypeId === CATEGORIES_TYPE.place ? placeURL : eventURL;

            axios.post('https://lionspromo.ru/index.php',
                {
                    url: url
                })
                 .then(function (response) {
                     if(response && response.data && response.data !== "" && typeof response.data === "object") {
                         dispatch({ type: actionTypes.FETCH_DATA_TOP_SUCCESS, payload: response.data });
                     } else {
                         dispatch({ type: actionTypes.FETCH_DATA_TOP_FAILED });
                     }
                 })
                 .catch(function (error) {
                     dispatch({ type: actionTypes.FETCH_DATA_TOP_FAILED, payload: String(error) });
                 });
        };
    },

};

export default ActionCreator;
