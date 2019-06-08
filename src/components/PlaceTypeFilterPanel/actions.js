import * as actionTypes from './actionTypes';
import axios from 'axios';
import { defaultFilter } from '../../containers/App/reducer';
import { capitalize } from '../../utils/utils';

const ActionCreator = {

    fetchData(id) {
        return (dispatch) => {
            dispatch({ type: actionTypes.FETCH_DATA });

            axios.post('https://lionspromo.ru/index.php',
                {
                    url: 'https://kudago.com/public-api/v1.4/place-categories/'
                })
                 .then(function (response) {

                     if(response && response.data && response.data !== "" && typeof response.data === "object") {

                         let resData = [];
                         if (response.data && response.data.length > 0) {
                             resData = response.data.filter(el => el.id !== 131).map(item => {
                                 return ({
                                     ...item,
                                     name: capitalize(item.name)
                                 });
                             });

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

                         resData = [defaultFilter.placeTypeId].concat(resData);

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
