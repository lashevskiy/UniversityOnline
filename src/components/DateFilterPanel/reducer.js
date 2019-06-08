import * as actionTypes from './actionTypes';

const initialState = {
    dateTypeIdList: [
        {
            id:        1,
            name:      'Все даты',
            dateStart: new Date().toISOString(),
            dateEnd:   '',
        }, {
            id:        2,
            name:      'Сегодня',
            dateStart: new Date().toISOString(),
            dateEnd:   new Date((new Date()).setDate((new Date()).getDate() + 1)).toISOString(),
        }, {
            id:        3,
            name:      'Завтра',
            dateStart: new Date((new Date()).setDate((new Date()).getDate() + 1)).toISOString(),
            dateEnd:   new Date((new Date()).setDate((new Date()).getDate() + 2)).toISOString(),
        }, {
            id:        4,
            name:      'Ближайшая неделя',
            dateStart: new Date().toISOString(),
            dateEnd:   new Date((new Date()).setDate((new Date()).getDate() + 7)).toISOString(),
        }, {
            id:        5,
            name:      'Ближайший месяц',
            dateStart: new Date().toISOString(),
            dateEnd:   new Date((new Date()).setMonth((new Date()).getMonth() + 1)).toISOString(),
        },
    ],
};

export function reducer(state = initialState, action) {
    switch (action.type) {

    }

    return state;
}

export default reducer;
