import { createSelector } from 'reselect'

const dataSelector = state => state.searchPanel.data;

export const getData = createSelector(
    [ dataSelector ],
    (data) => { return data }
);
