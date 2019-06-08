import { createSelector } from 'reselect'

const dataSelector = state => state.eventListPanel.data;

export const getData = createSelector(
    [ dataSelector ],
    (data) => { return data }
);
