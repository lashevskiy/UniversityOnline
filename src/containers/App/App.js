import React from 'react';
import ReactGA from 'react-ga';
import axios from 'axios';
import { connect as connectRedux } from 'react-redux'
import connect from '@vkontakte/vkui-connect';
import { ScreenSpinner, InfoRow, Root, Gallery, ListItem, Textarea, Radio, Checkbox, Button, FormLayout, Input, FormLayoutGroup, Select, List, Cell, Search, FixedLayout, Tabs, TabsItem, Epic, Tabbar, TabbarItem, Link, Group, Panel, PanelHeader, View, Avatar, HorizontalScroll, Header, PopoutWrapper, Div, ActionSheet, ActionSheetItem, platform, CellButton, IOS, Alert } from '@vkontakte/vkui';
import Icon24User from '@vkontakte/icons/dist/24/users';
import Icon28Newsfeed from '@vkontakte/icons/dist/28/newsfeed';
import Icon28Search from '@vkontakte/icons/dist/28/search';
import Icon28Place from '@vkontakte/icons/dist/28/place';
import Icon28Video from '@vkontakte/icons/dist/28/video';
import Icon28KeyboardBotsOutline from '@vkontakte/icons/dist/28/keyboard_bots_outline';
//import Icon24FavoriteOutline from '@vkontakte/icons/dist/24/favorite_outline';
import Icon28Favorite from '@vkontakte/icons/dist/28/favorite';
import Icon24Globe from '@vkontakte/icons/dist/24/globe';
import Icon24List from '@vkontakte/icons/dist/24/list';
import Icon28Play from '@vkontakte/icons/dist/28/play';
import Icon28Notifications from '@vkontakte/icons/dist/28/notifications';
import Icon28Messages from '@vkontakte/icons/dist/28/messages';
import Icon24MoreHorizontal from '@vkontakte/icons/dist/24/more_horizontal';
import Icon28More from '@vkontakte/icons/dist/28/more';
import '@vkontakte/vkui/dist/vkui.css';

import Home from '../../panels/Home';
import Persik from '../../panels/Persik';
import EventListPanel from '../../components/EventListPanel/EventListPanel';
import GeoObjectListPanel from '../../components/GeoObjectListPanel/GeoObjectListPanel';
import GeoListPanel from '../../components/GeoListPanel/GeoListPanel';
import EventPanel from '../../components/EventPanel/EventPanel';
import PlacePanel from '../../components/PlacePanel/PlacePanel';
import MapPanel from '../../components/MapPanel/MapPanel';
import CityFilterPanel from '../../components/CityFilterPanel/CityFilterPanel';
import EventTypeFilterPanel from '../../components/EventTypeFilterPanel/EventTypeFilterPanel';
import PlaceTypeFilterPanel from '../../components/PlaceTypeFilterPanel/PlaceTypeFilterPanel';
import DateFilterPanel from '../../components/DateFilterPanel/DateFilterPanel';
import SearchPanel from '../../components/SearchPanel/SearchPanel';
import FilterPanel from '../../components/FilterPanel/FilterPanel';
import OverviewPanel from '../../components/OverviewPanel/OverviewPanel';
import OverviewPlacePanel from '../../components/OverviewPlacePanel/OverviewPlacePanel';
import OverviewEventPanel from '../../components/OverviewEventPanel/OverviewEventPanel';
import UserPanel from '../../components/UserPanel/UserPanel';
import { bindActionCreators } from 'redux';
import Actions from '../../components/CityFilterPanel/actions';
import AppActions from './actions';
import EventListPanelActions from '../../components/EventListPanel/actions';

import MovieListPanel from '../../components/MovieListPanel/MovieListPanel';
import MoviePanel from '../../components/MoviePanel/MoviePanel';
import ShowingsPanel from '../../components/ShowingsPanel/ShowingsPanel';
import LicensePanel from '../../components/LicensePanel/LicensePanel';

import FavoritesPanel from '../../components/FavoritesPanel/FavoritesPanel';

const osname = platform();


const EPICS = {
    feed:          {
        tabbar:      true,
        activeView:  'feed',
        activePanel: 'OverviewPanel',
    },
    UserPanel:      {
        tabbar:      true,
        activeView:  'UserPanel',
        activePanel: 'UserPanel',
    },
    favorites:      {
        tabbar:      true,
        activeView:  'favorites',
        activePanel: 'FavoritesPanel',
    },
    movie:      {
        tabbar:      true,
        activeView:  'movie',
        activePanel: 'MovieListPanel',
    },
    notifications: {
        tabbar:      true,
        activeView:  'notifications',
        activePanel: 'EventListPanel',
    },
    more:          {
        tabbar:      true,
        activeView:  'more',
        activePanel: 'GeoObjectListPanel',
    },
};

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			activePanel: 'UserPanel',
			fetchedUser: null,

            activeStory: 'UserPanel',
            // activeView: 'view1',
            popout: null
		};
	}

    onStoryChange = (e) => {
	    const story = e.currentTarget.dataset.story;
        this.setState({ activeStory: story });
        this.setState({ activePanel: EPICS[story].activePanel });
        window.scroll(0, 0);
    };

	componentDidMount() {

        ReactGA.event({
            category: 'GoPlace',
            action: 'OpenApp',
            label: 'OpenApp',
            nonInteraction: true
        });


	    //TODO очень много раз пишется консоль
		// connect.subscribe((e) => {
		// 	switch (e.detail.type) {
		// 		case 'VKWebAppGetUserInfoResult':
		// 			this.setState({ fetchedUser: e.detail.data });
		// 			break;
		// 		default:
		// 			console.log(e.detail.type);
		// 	}
		// });
		// connect.send('VKWebAppGetUserInfo', {});
	}


    openSheet () {
        this.setState({ popout:
                <Alert
                    actions={[{
                        title: 'Понятно',
                        autoclose: true,
                        style: 'cancel'
                    }]}
                    onClose={ () => this.setState({ popout: null }) }
                >
                    <h2>Не удалось получить доступ к геопозиции</h2>
                    <p>В настройках телефона необходимо включить доступ к геопозиции</p>
                </Alert>
        });
    }



    go = (e) => {
		this.setState({ activePanel: e.currentTarget.dataset.to })
	};

    goGeo = (panel) => {
        this.setState({ activePanel: panel })
    };

	render() {

	    let renderPopout = this.state.popout != null ? this.state.popout : null;

        return (
            <Epic activeStory={this.state.activeStory} tabbar={
                <Tabbar>
                    <TabbarItem
                        onClick={this.onStoryChange}
                        selected={this.state.activeStory === 'feed'}
                        data-story="feed"
                        text="Новости"
                    ><Icon28Newsfeed /></TabbarItem>
                    <TabbarItem
                        onClick={this.onStoryChange}
                        selected={this.state.activeStory === 'notifications'}
                        data-story="notifications"
                        text="Поиск"
                    ><Icon28Search/></TabbarItem>
                    <TabbarItem
                        onClick={this.onStoryChange}
                        selected={this.state.activeStory === 'more'}
                        data-story="more"
                        text="На карте"
                    ><Icon28Place /></TabbarItem>
                    <TabbarItem
                        onClick={this.onStoryChange}
                        selected={this.state.activeStory === 'movie'}
                        data-story="movie"
                        text="Кино"
                        // label="12"
                    ><Icon28Video /></TabbarItem>
                    <TabbarItem
                        onClick={this.onStoryChange}
                        selected={this.state.activeStory === 'favorites'}
                        data-story="favorites"
                        text="Избранное"
                        // label="12"
                    ><Icon28Favorite /></TabbarItem>
                    {/*Icon28KeyboardBotsOutline*/}
                    <TabbarItem
                        onClick={this.onStoryChange}
                        selected={this.state.activeStory === 'UserPanel'}
                        data-story="UserPanel"
                        text="Кабинет"
                    ><Icon28More /></TabbarItem>
                </Tabbar>
            }>
                <View id="feed" activePanel={this.state.activePanel}>
                    <OverviewPanel id="OverviewPanel" go={this.go} onStoryChange={this.onStoryChange}/>
                    <OverviewPlacePanel id="OverviewPlacePanel" go={this.go} back={'OverviewPanel'}/>
                    <OverviewEventPanel id="OverviewEventPanel" go={this.go} back={'OverviewPanel'}/>

                    <CityFilterPanel id="CityFilterPanel" go={this.go} back={'OverviewPanel'}/>

                    <MoviePanel id="MoviePanel" go={this.go} back={'OverviewPanel'}/>
                    <ShowingsPanel id="ShowingsPanel" go={this.go} back={'MoviePanel'}/>

                    <SearchPanel id="SearchPanel" go={this.go} back={'OverviewPanel'}/>
                    <EventPanel id="EventPanel" go={this.go} back={'EventListPanel'}/>
                    <PlacePanel id="PlacePanel" go={this.go} back={'EventPanel'}/>
                    <MapPanel id="MapPanel" go={this.go}/>

                </View>
                <View id="notifications" activePanel={this.state.activePanel}>
                    <EventListPanel id="EventListPanel" go={this.go}/>
                    <SearchPanel id="SearchPanel" go={this.go} back={'EventListPanel'}/>
                    <EventPanel id="EventPanel" go={this.go} back={'EventListPanel'}/>
                    <PlacePanel id="PlacePanel" go={this.go} back={'EventPanel'}/>
                    <MapPanel id="MapPanel" go={this.go}/>

                    <CityFilterPanel id="CityFilterPanel" go={this.go} back={'EventListPanel'}/>
                    <FilterPanel id="FilterPanel" go={this.go} back={'EventListPanel'}/>
                    <EventTypeFilterPanel id="EventTypeFilterPanel" go={this.go} back={'FilterPanel'}/>
                    <PlaceTypeFilterPanel id="PlaceTypeFilterPanel" go={this.go} back={'FilterPanel'}/>
                    <DateFilterPanel id="DateFilterPanel" go={this.go} back={'FilterPanel'}/>
                </View>
                <View id="more" activePanel={this.state.activePanel} popout={this.props.isShowPopout ? <ScreenSpinner /> : renderPopout}>
                    <GeoObjectListPanel id="GeoObjectListPanel" go={this.go} goGeo={this.goGeo} openPopout={this.openSheet.bind(this)}/>
                    <GeoListPanel id="GeoListPanel" go={this.go} back={'GeoObjectListPanel'}/>
                    <EventPanel id="EventPanel" go={this.go} back={'GeoListPanel'}/>
                    <PlacePanel id="PlacePanel" go={this.go} back={'EventPanel'}/>
                    <MapPanel id="MapPanel" go={this.go}/>

                    <CityFilterPanel id="CityFilterPanel" go={this.go} back={'GeoObjectListPanel'}/>
                    <FilterPanel id="FilterPanel" go={this.go} back={'GeoObjectListPanel'} isGeoFilter={true}/>
                    <EventTypeFilterPanel id="EventTypeFilterPanel" go={this.go} back={'FilterPanel'}/>
                    <PlaceTypeFilterPanel id="PlaceTypeFilterPanel" go={this.go} back={'FilterPanel'}/>
                    <DateFilterPanel id="DateFilterPanel" go={this.go} back={'FilterPanel'}/>
                </View>
                <View id="movie" activePanel={this.state.activePanel}>
                    <MovieListPanel id="MovieListPanel" go={this.go}/>
                    <MoviePanel id="MoviePanel" go={this.go} back={'MovieListPanel'}/>
                    <ShowingsPanel id="ShowingsPanel" go={this.go} back={'MoviePanel'}/>
                    <PlacePanel id="PlacePanel" go={this.go} back={'ShowingsPanel'}/>
                    <MapPanel id="MapPanel" go={this.go}/>

                    <CityFilterPanel id="CityFilterPanel" go={this.go} back={'MovieListPanel'}/>
                </View>
                <View id="favorites" activePanel={this.state.activePanel}>
                    <FavoritesPanel id="FavoritesPanel" go={this.go}/>
                    <MoviePanel id="MoviePanel" go={this.go} back={'MovieListPanel'}/>
                    <ShowingsPanel id="ShowingsPanel" go={this.go} back={'MoviePanel'}/>
                    <PlacePanel id="PlacePanel" go={this.go} back={'ShowingsPanel'}/>
                    <MapPanel id="MapPanel" go={this.go}/>

                    <CityFilterPanel id="CityFilterPanel" go={this.go} back={'MovieListPanel'}/>
                </View>
                <View id="UserPanel" activePanel={this.state.activePanel}>
                    <UserPanel id="UserPanel" go={this.go} back={'UserPanel'}/>
                    <LicensePanel id="LicensePanel" go={this.go} back={'UserPanel'}/>
                </View>
            </Epic>
        );
	}
}

const mapStateToProps = store => {
    return {
        isShowPopout: store.appPanel.isShowPopout,
    }
};

export default connectRedux(
    mapStateToProps,
    (dispatch) => {
        return {

        }
    }
)(App);
