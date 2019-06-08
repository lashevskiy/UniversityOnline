import * as actionTypes from './actionTypes';
import axios from 'axios';
import { defaultFilter } from '../App/reducer';
import { connect as  VKConnect} from '@vkontakte/vkui-connect';

const ActionCreator = {

    //https://lionspromo.ru/index.php
    initApp(id) {
        return (dispatch) => {
            dispatch({ type: actionTypes.INIT_APP });

            // axios.post('lashevskiy.myjino.ru/',
            //     {
            //         url: 'https://kudago.com/public-api/v1.4/event-categories/'
            //     })
            //      .then(function (response) {
            //          dispatch({
            //              type: actionTypes.FETCH_DATA_SUCCESS,
            //              payload: [defaultFilter.eventTypeId].concat(response.data)
            //          });
            //      })
            //      .catch(function (error) {
            //          dispatch({ type: actionTypes.FETCH_DATA_FAILED, payload: String(error) });
            //      });
        };
    },

    // setEventId(id) {
    //     return { type: actionTypes.SET_EVENT_ID, payload: id };
    // },

    setCityId(id) {
        return { type: actionTypes.SET_CITY_ID, payload: id };
    },

    setEventTypeId(id) {
        return { type: actionTypes.SET_EVENT_TYPE_ID, payload: id };
    },

    setPlaceTypeId(id) {
        return { type: actionTypes.SET_PLACE_TYPE_ID, payload: id };
    },

    setCategoriesTypeId(id) {
        return { type: actionTypes.SET_CATEGORIES_TYPE_ID, payload: id };
    },

    setIsFreeType(id) {
        return { type: actionTypes.SET_IS_FREE_TYPE, payload: id };
    },

    setDateTypeId(id) {
        return { type: actionTypes.SET_DATE_TYPE_ID, payload: id };
    },

    setIsShowPopout(isShowPopout) {
        return { type: actionTypes.SET_IS_SHOW_POPOUT, payload: isShowPopout };
    },

    setSearchRadius(radius) {
        return { type: actionTypes.SET_SEARCH_RADIUS, payload: radius };
    },

};

export default ActionCreator;
