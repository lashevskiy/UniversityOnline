import * as actionTypes from './actionTypes';
import axios from 'axios';
import { CATEGORIES_TYPE } from '../../containers/App/reducer';

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


            let url = 'https://kudago.com/public-api/v1.4/movies/?' +
                'fields=id,publication_date,slug,title,description,body_text,is_editors_choice,genres,original_title,locale,country,year,language,running_time,budget_currency,budget,mpaa_rating,age_restriction,stars,director,writer,awards,trailer,images,poster,url,imdb_url,imdb_rating' +
                '&expand=images,poster' +
                '&order_by=' +
                '&text_format=' +
                '&ids=' +
                '&location=' + city +
                '&premiering_in_location=' +
                '&actual_since=' + dateStart +
                '/';
                //'&actual_until=' + dateEnd

            axios.post('https://lionspromo.ru/index.php',
                {
                    url: url
                })
                 .then(function (response) {
                     dispatch({ type: actionTypes.FETCH_DATA_SUCCESS, payload: response.data });
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
