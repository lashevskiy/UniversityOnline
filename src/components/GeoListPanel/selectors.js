import { createSelector } from 'reselect'

const dataSelector = state => state.geoListPanel.data;

export const getData = createSelector(
    [ dataSelector ],
    (data) => { return data }
);
