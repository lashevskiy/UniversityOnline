import { combineReducers } from 'redux';
import EventListPanel from './components/EventListPanel/reducer';
import GeoObjectListPanel from './components/GeoObjectListPanel/reducer';
import GeoListPanel from './components/GeoListPanel/reducer';
import EventPanel from './components/EventPanel/reducer';
import PlacePanel from './components/PlacePanel/reducer';
import MapPanel from './components/MapPanel/reducer';
import CityFilterPanel from './components/CityFilterPanel/reducer';
import EventTypeFilterPanel from './components/EventTypeFilterPanel/reducer';
import PlaceTypeFilterPanel from './components/PlaceTypeFilterPanel/reducer';
import FilterPanel from './components/FilterPanel/reducer';
import SearchPanel from './components/SearchPanel/reducer';
import DateFilterPanel from './components/DateFilterPanel/reducer';

import AppReducer from './containers/App/reducer';

import MovieListPanel from './components/MovieListPanel/reducer';
import MoviePanel from './components/MoviePanel/reducer';
import ShowingsPanel from './components/ShowingsPanel/reducer';

import OverviewPanel from './components/OverviewPanel/reducer';
import OverviewPlacePanel from './components/OverviewPlacePanel/reducer';
import OverviewEventPanel from './components/OverviewEventPanel/reducer';

import FavoritesPanel from './components/FavoritesPanel/reducer';

export const rootReducer = combineReducers({
    eventListPanel: EventListPanel,
    geoObjectListPanel: GeoObjectListPanel,
    geoListPanel: GeoListPanel,
    eventPanel: EventPanel,
    placePanel: PlacePanel,
    mapPanel: MapPanel,
    cityFilterPanel: CityFilterPanel,
    eventTypeFilterPanel: EventTypeFilterPanel,
    placeTypeFilterPanel: PlaceTypeFilterPanel,
    filterPanel: FilterPanel,
    searchPanel: SearchPanel,
    dateFilterPanel: DateFilterPanel,
    appPanel: AppReducer,

    movieListPanel: MovieListPanel,
    moviePanel: MoviePanel,
    showingsPanel: ShowingsPanel,

    overviewPanel: OverviewPanel,
    overviewPlacePanel: OverviewPlacePanel,
    overviewEventPanel: OverviewEventPanel,

    favoritesPanel: FavoritesPanel,
});
