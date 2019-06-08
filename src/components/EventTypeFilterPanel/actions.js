import * as actionTypes from './actionTypes';
import axios from 'axios';
import { defaultFilter } from '../../containers/App/reducer';

const ActionCreator = {

    fetchData(id) {
        return (dispatch) => {
            dispatch({ type: actionTypes.FETCH_DATA });

            axios.post('https://lionspromo.ru/index.php',
                {
                    url: 'https://kudago.com/public-api/v1.4/event-categories/'
                })
                 .then(function (response) {
                     if(response && response.data && response.data !== "" && typeof response.data === "object") {

                         let resData = [];

                         if (response.data && response.data.length > 0) {
                             resData = response.data;

                             resData.sort(function (a, b) {
                                 if (a.name > b.name) {
                                     return 1;
                                 }
                                 if (a.name < b.name) {
                                     return -1;
                                 }
                                 // a должно быть равным b
                                 return 0;
                             });
                         }

                         resData = [defaultFilter.eventTypeId].concat(resData);

                         dispatch({
                             type:    actionTypes.FETCH_DATA_SUCCESS,
                             payload: resData
                         });
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
