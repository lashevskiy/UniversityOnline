import * as actionTypes from './actionTypes';
import axios from 'axios';
import { CATEGORIES_TYPE } from '../../containers/App/reducer';

const ActionCreator = {

    fetchData() {
        return (dispatch, getState) => {
            dispatch({ type: actionTypes.FETCH_DATA });

            const city = getState().appPanel.cityId.slug;
            const eventTypeId = '';//getState().appPanel.eventTypeId.slug;
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
                     if(response && response.data && response.data !== "" && typeof response.data === "object") {
                         dispatch({ type: actionTypes.FETCH_DATA_SUCCESS, payload: response.data });
                     } else {
                         dispatch({ type: actionTypes.FETCH_DATA_FAILED });
                     }
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
                     dispatch({ type: actionTypes.FETCH_DATA_MORE_SUCCESS, payload: response.data });
                 })
                 .catch(function (error) {
                     dispatch({ type: actionTypes.FETCH_DATA_MORE_FAILED, payload: String(error) });
                 });
        };
    },

    setIsCanFetchData(id) {
        return { type: actionTypes.SET_IS_CAN_FETCH_DATA, payload: id };
    },

};

export default ActionCreator;
