import * as actionTypes from './actionTypes';
import axios from 'axios';

const ActionCreator = {

    fetchData(id) {
        return (dispatch) => {
            dispatch({ type: actionTypes.FETCH_DATA });

            axios.post('https://lionspromo.ru/index.php',
                {
                    url:  'http://kudago.com/public-api/v1.4/places/' + id +
                              '/?fields=site_url,id,title,short_title,slug,address,location,timetable,phone,is_stub,images,description,body_text,site_url,foreign_url,coords,subway,is_closed,categories,tags' +
                              '&expand=images',
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

    clearData() {
        return { type: actionTypes.CLEAR_DATA };
    },

    setPlaceId(id) {
        return { type: actionTypes.SET_PLACE_ID, payload: id };
    },

    setBackPanel(back) {
        return { type: actionTypes.SET_BACK_PANEL, payload: back };
    },
};

export default ActionCreator;
