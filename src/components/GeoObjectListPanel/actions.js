import * as actionTypes from './actionTypes';
import axios from 'axios';
import { CATEGORIES_TYPE } from '../../containers/App/reducer';

import AppActions from '../../containers/App/actions';

const ActionCreator = {

    fetchData() {
        return (dispatch, getState) => {
            dispatch({ type: actionTypes.FETCH_DATA });

            const locationCoords = getState().appPanel.locationCoords;
            const searchRadiusId = getState().appPanel.searchRadiusId;
            const cityId = getState().appPanel.cityId;
            const city = cityId.slug;
            const eventTypeId = getState().appPanel.eventTypeId.slug;
            const placeTypeId = getState().appPanel.placeTypeId.slug;
            const categoriesTypeId = getState().appPanel.categoriesTypeId;
            const isFreeType = getState().appPanel.isFreeType;
            const _date = getState().dateFilterPanel.dateTypeIdList.filter(item => item.id === getState().appPanel.dateTypeId)[0];
            const dateStart = _date.dateStart;
            const dateEnd = _date.dateEnd;

            const lat = locationCoords != null ? locationCoords[0] : cityId.coords.lat;
            const lon = locationCoords != null ? locationCoords[1] : cityId.coords.lon;
            const radius = searchRadiusId;

            let eventURL =
                'https://kudago.com/public-api/v1.4/events/?' +
                    // 'location=' + city +
                    '&actual_since=' + dateStart +
                    '&actual_until=' + dateEnd +
                    '&categories=' + eventTypeId +
                    '&is_free=' + isFreeType +
                    '&fields=id,title,short_title,dates,place,description,images,categories' +
                    '&expand=images,place,dates' +
                    '&page_size=100' +
                    '&lat=' + lat +
                    '&lon=' + lon +
                    '&radius=' + radius;

            let placeURL =
                'https://kudago.com/public-api/v1.4/places/?' +
                    // 'location=' + city +
                    '&categories=' + placeTypeId +
                    '&fields=id,title,short_title,address,timetable,phone,is_stub,images,description,body_text,foreign_url,coords,subway,is_closed,categories,tags' +
                    '&expand=images,dates&' +
                    '&page_size=100' +
                    '&lat=' + lat +
                    '&lon=' + lon +
                    '&radius=' + radius;

            let url = categoriesTypeId === CATEGORIES_TYPE.place ? placeURL : eventURL;

            //dispatch(AppActions.setIsShowPopout(true));
            axios.post('https://lionspromo.ru/index.php',
                {
                    url: url
                })
                 .then(function (response) {
                     if(response && response.data && response.data !== "" && typeof response.data === "object") {
                         if (response.data) {
                             dispatch({ type: actionTypes.FETCH_DATA_SUCCESS, payload: response.data });
                         }
                         if (response.data && response.data.next) {
                             dispatch(ActionCreator.fetchDataMore(response.data.next));
                         }
                     } else {
                         dispatch({ type: actionTypes.FETCH_DATA_FAILED });
                     }
                     //dispatch(AppActions.setIsShowPopout(false));
                 })
                 .catch(function (error) {
                     dispatch({ type: actionTypes.FETCH_DATA_FAILED, payload: String(error) });
                     //dispatch(AppActions.setIsShowPopout(false));
                 });
        };
    },

    fetchDataMore(url) {
        return (dispatch, getState) => {
            dispatch({ type: actionTypes.FETCH_DATA_MORE});

            //dispatch(AppActions.setIsShowPopout(true));
            axios.post('https://lionspromo.ru/index.php',
                {
                    url: url
                })
                 .then(function (response) {

                     if(response && response.data && response.data !== "" && typeof response.data === "object") {


                         if (response.data) {
                             dispatch({ type: actionTypes.FETCH_DATA_MORE_SUCCESS, payload: response.data });
                         }
                         const total = getState().geoObjectListPanel.data.length;
                         if (response.data && response.data.next && total < 300) {
                             dispatch(ActionCreator.fetchDataMore(response.data.next));
                         }


                         //dispatch({ type: actionTypes.FETCH_DATA_MORE_SUCCESS, payload: response.data });
                         //dispatch(AppActions.setIsShowPopout(false));
                     } else {
                         dispatch({ type: actionTypes.FETCH_DATA_MORE_FAILED });
                     }
                 })
                 .catch(function (error) {
                     dispatch({ type: actionTypes.FETCH_DATA_MORE_FAILED, payload: String(error) });
                     //dispatch(AppActions.setIsShowPopout(false));
                 });
        };
    },

    setIsCanFetchData(id) {
        return { type: actionTypes.SET_IS_CAN_FETCH_DATA, payload: id };
    },

};

export default ActionCreator;
