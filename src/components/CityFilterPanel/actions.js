import * as actionTypes from './actionTypes';
import axios from 'axios';

const ActionCreator = {

    fetchData(id) {
        return (dispatch) => {
            dispatch({ type: actionTypes.FETCH_DATA });

            axios.post('https://lionspromo.ru/index.php',
                {
                    url: 'https://kudago.com/public-api/v1.4/locations/?lang=ru&order_by=name&fields=slug,name,coords/'
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

};

export default ActionCreator;
