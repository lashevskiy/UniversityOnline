import * as actionTypes from './actionTypes';
import axios from 'axios';
import { SEARCH_TYPE } from './SearchPanel';

const ActionCreator = {

    fetchData(search) {
        return (dispatch, getState) => {
            dispatch({ type: actionTypes.FETCH_DATA });

            const city = getState().appPanel.cityId.slug;
            const mode = getState().searchPanel.mode;
            const ctype = SEARCH_TYPE[mode].slag;

            axios.post('https://lionspromo.ru/index.php',
                {
                    url: 'https://kudago.com/public-api/v1.4/search/?q=' + encodeURIComponent(search.trim()) +
                             '&lang=ru' +
                             '&location=' + city +
                             '&expand=place,dates' +
                             '&ctype=' + ctype
                })
                 .then(function (response) {
                     if(response && response.data && (response.data instanceof Object)) {
                         if(response.data.count === 0) {
                             dispatch({ type: actionTypes.SET_IS_NOT_FOUND, payload: true });
                         }
                         dispatch({ type: actionTypes.FETCH_DATA_SUCCESS, payload: response.data });
                     } else {
                         dispatch({ type: actionTypes.FETCH_DATA_FAILED, payload: "error" });
                     }
                 })
                 .catch(function (error) {
                     dispatch({ type: actionTypes.FETCH_DATA_FAILED, payload: String(error) });
                 });
        };
    },

    fetchDataMore(url) {
        return (dispatch) => {
            dispatch({ type: actionTypes.FETCH_DATA_MORE });

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

    setSearch(search) {
        return { type: actionTypes.SET_SEARCH, payload: search };
    },

    toggleContext(value) {
        return { type: actionTypes.TOGGLE_CONTEXT, payload: value };
    },

    setMode(value) {
        return { type: actionTypes.SET_MODE, payload: value };
    },

    setIsNotFound(value) {
        return { type: actionTypes.SET_IS_NOT_FOUND, payload: value };
    }

};

export default ActionCreator;
