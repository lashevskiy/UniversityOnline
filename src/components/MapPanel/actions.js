import * as actionTypes from './actionTypes';
import axios from 'axios';

const ActionCreator = {

    fetchData(id) {
        return (dispatch) => {
            dispatch({ type: actionTypes.FETCH_DATA });

            axios.post('https://lionspromo.ru/index.php',
                {
                    url:  'http://kudago.com/public-api/v1.4/places/' + id +
                              '/?fields=id,title,short_title,slug,address,location,timetable,phone,is_stub,images,description,body_text,site_url,foreign_url,coords,subway,is_closed,categories,tags' +
                              '&expand=images/',
                })
                 .then(function (response) {
                     dispatch({ type: actionTypes.FETCH_DATA_SUCCESS, payload: response.data });
                 })
                 .catch(function (error) {
                     dispatch({ type: actionTypes.FETCH_DATA_FAILED, payload: String(error) });
                 });
        };
    },

    setPlaces(places) {
        return { type: actionTypes.SET_PLACES, payload: places };
    },

    setBackPanel(back) {
        return { type: actionTypes.SET_BACK_PANEL, payload: back };
    },
};

export default ActionCreator;
