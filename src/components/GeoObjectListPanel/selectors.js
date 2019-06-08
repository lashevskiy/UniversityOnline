import { createSelector } from 'reselect'

const dataSelector = state => state.geoObjectListPanel.data;

export const getData = createSelector(
    [ dataSelector ],
    (data) => { return data }
);
