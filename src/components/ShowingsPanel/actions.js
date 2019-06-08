import * as actionTypes from './actionTypes';
import axios from 'axios';
import { startOfDay, endOfDay, format } from 'date-fns';

const ActionCreator = {

    clearData() {
        return { type: actionTypes.CLEAR_DATA };
    },

    setMovieId(id) {
        return { type: actionTypes.SET_MOVIE_ID, payload: id };
    },

    setBackPanel(back) {
        return { type: actionTypes.SET_BACK_PANEL, payload: back };
    },

    //https://kudago.com/widgets/movie-showings/?date=2019-03-22&movie_id=3715&group_by=place&location=spb
    fetchData(id, day) {
        return (dispatch, getState) => {
            dispatch({ type: actionTypes.FETCH_DATA });

            const city = getState().appPanel.cityId.slug;
            //const dateShowing = format(getState().showingsPanel.dateShowing, 'YYYY-MM-DD');
            const dateShowing = format(day, 'YYYY-MM-DD');
            //const actual_since = format(startOfDay(dateShowing), 'X');
            //const actual_until = format(endOfDay(dateShowing), 'X');

            let url = 'https://kudago.com/widgets/movie-showings' +
                '/?expand=place' +
                '&movie_id=' + id +
                '&group_by=place' +
                '&location=' + city +
                '&date=' + dateShowing +
                '/';

            axios.post('https://lionspromo.ru/index.php',
                {
                    url: url,
                })
                 .then(function (response) {
                     dispatch({ type: actionTypes.FETCH_DATA_SUCCESS, payload: response.data });
                 })
                 .catch(function (error) {
                     dispatch({ type: actionTypes.FETCH_DATA_FAILED, payload: String(error) });
                 });
        };
    },
    // fetchShowings(id) {
    //     return (dispatch, getState) => {
    //         dispatch({ type: actionTypes.FETCH_SHOWINGS });
    //
    //         const city = getState().appPanel.cityId.slug;
    //         const dateShowing = getState().moviePanel.dateShowing;
    //         const actual_since = format(startOfDay(dateShowing), 'X');
    //         const actual_until = format(endOfDay(dateShowing), 'X');
    //
    //         let url = 'https://kudago.com/public-api/v1.4/movies/' + id + '/showings' +
    //             '/?expand=place' +
    //             'location=' + city +
    //             '&actual_since=' + actual_since +
    //             '&actual_until=' + actual_until +
    //             '&page_size=100';
    //
    //         axios.post('https://lionspromo.ru/index.php',
    //             {
    //                 url: url,
    //             })
    //              .then(function (response) {
    //                  dispatch({ type: actionTypes.FETCH_SHOWINGS_SUCCESS, payload: response.data });
    //              })
    //              .catch(function (error) {
    //                  dispatch({ type: actionTypes.FETCH_SHOWINGS_FAILED, payload: String(error) });
    //              });
    //     };
    // },

};

export default ActionCreator;
