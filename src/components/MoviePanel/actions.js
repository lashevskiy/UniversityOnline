import * as actionTypes from './actionTypes';
import axios from 'axios';

const ActionCreator = {

    fetchData(id) {
        return (dispatch) => {
            dispatch({ type: actionTypes.FETCH_DATA });

            let url = 'https://kudago.com/public-api/v1.4/movies/' + id +
                '/?fields=site_url,id,publication_date,slug,title,description,body_text,is_editors_choice,genres,original_title,locale,country,year,language,running_time,age_restriction,stars,director,writer,awards,trailer,images,poster,url' +
                '&expand=images,poster' +
                '&text_format=text' +
                '';

            axios.post('https://lionspromo.ru/index.php',
                {
                    url:  url,
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

    setMovieId(id) {
        return { type: actionTypes.SET_MOVIE_ID, payload: id };
    },

    setBackPanel(back) {
        return { type: actionTypes.SET_BACK_PANEL, payload: back };
    },

};

export default ActionCreator;
