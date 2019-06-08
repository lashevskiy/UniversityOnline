import React from 'react';
import ReactGA from 'react-ga';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import Actions from './actions'
import EventPanelActions from '../EventPanel/actions'
import PlacePanelActions from '../PlacePanel/actions'
import OverviewPlacePanelActions from '../OverviewPlacePanel/actions'
import OverviewEventPanelActions from '../OverviewEventPanel/actions'
import MovieListPanelActions from '../MovieListPanel/actions'
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroller';
//import InfiniteScroll from 'react-infinite-scroll-component';
// import connect from '@vkontakte/vkui-connect';

import {
    HeaderButton,
    Spinner,
    Footer,
    ListItem,
    Textarea,
    Radio,
    Checkbox,
    Button,
    FormLayout,
    Input,
    FormLayoutGroup,
    Select,
    List,
    Cell,
    Search,
    FixedLayout,
    Tabs,
    TabsItem,
    Epic,
    Tabbar,
    TabbarItem,
    Link,
    Group,
    Panel,
    PanelHeader,
    View,
    Avatar,
    HorizontalScroll,
    Header,
    PopoutWrapper,
    Div,
    ActionSheet,
    ActionSheetItem,
    platform,
    CellButton,
    IOS,
    Gallery,
    Tooltip
} from '@vkontakte/vkui';
import Icon24User from '@vkontakte/icons/dist/24/users';
import Icon28Newsfeed from '@vkontakte/icons/dist/28/newsfeed';
import Icon28Search from '@vkontakte/icons/dist/28/search';
import Icon28Notifications from '@vkontakte/icons/dist/28/notifications';
import Icon28Messages from '@vkontakte/icons/dist/28/messages';
import Icon28More from '@vkontakte/icons/dist/28/more';
import Icon24Globe from '@vkontakte/icons/dist/24/globe';
import Icon16Place from '@vkontakte/icons/dist/16/place';
import Icon16Dropdown from '@vkontakte/icons/dist/16/dropdown';
import Icon24Dropdown from '@vkontakte/icons/dist/24/dropdown';
import Icon24MoreHorizontal from '@vkontakte/icons/dist/24/more_horizontal';
import Icon24Search from '@vkontakte/icons/dist/24/search';
import Icon24Filter from '@vkontakte/icons/dist/24/filter';
import Icon16Recent from '@vkontakte/icons/dist/16/recent';
import '@vkontakte/vkui/dist/vkui.css';

import ObjectGroup from '../ObjectGroup'
import ObjectItemCell from '../ObjectItemCell'
import PlaceCell from '../PlaceCell'
import ObjectCell from '../Cell/ObjectCell'
import AppActions from '../../containers/App/actions';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import { CATEGORIES_TYPE } from '../../containers/App/reducer';
import OverviewPlacePanel from '../OverviewPlacePanel/reducer';
import MoviePanelActions from '../MoviePanel/actions';

import { defaultFilter } from '../../containers/App/reducer';
import EventListPanelActions from '../EventListPanel/actions';
import GeoObjectListPanelActions from '../GeoObjectListPanel/actions';
import GeoListPanelActions from '../GeoListPanel/actions';
import FilterPanelActions from '../FilterPanel/actions';
import { getImageMovieSrc } from '../../utils/utils';
import LoadingAndError from '../LoadingAndError';

const osname = platform();

class OverviewPanel extends React.Component {

    constructor (props) {
        super(props);

        this.state = {
            tooltip: true,
        };
    }

    componentDidMount() {
        const { actions, actionsMovieListPanel, actionsOverviewPlacePanel, actionsOverviewEventPanel, isCanFetchData } = this.props;

        //if(isCanFetchData) {
        //     actions.fetchPlace();
        //     actions.fetchEvent();
        //}

        this.fetchDataPlace();
        this.fetchDataEvent();
        this.fetchDataMovie();

        // const script = document.createElement("script");
        //
        // script.src = "https://experience.tripster.ru/partner/widget.js?script_id=tripster-widget-287797&template=horizontal&order=top&width=100%25&num=3&version=2&partner=vk140&widgetbar=true&widgetbar_delay=20";
        // script.id = "tripster-widget-287797";
        // script.async = true;
        // this.instance.appendChild(script);
    }

    fetchDataPlace() {
        const { actionsOverviewPlacePanel } = this.props;
        if(this.props.isCanFetchDataPlace) {
            actionsOverviewPlacePanel.fetchData();
        }
    }

    fetchDataEvent() {
        const { actionsOverviewEventPanel } = this.props;
        if(this.props.isCanFetchDataEvent) {
            actionsOverviewEventPanel.fetchData();
        }
    }

    fetchDataMovie() {
        const { actionsMovieListPanel } = this.props;
        if(this.props.isCanFetchDataMovie) {
            actionsMovieListPanel.fetchData();
        }

    }

    get getDataPlace() {
        return this.props.dataPlace;
    }

    get getDataEvent() {
        return this.props.dataEvent;
    }

    renderCourses(items, categoriesTypeId) {
        let res = [];

        if(items && items.length > 0) {
            for (let i = 0; i < items.length; i += 2) {
                let itemTop = items[i];
                let itemBottom = items[i + 1];

                res.push(
                    <div key={i}>
                        <ObjectItemCell item={itemTop} categoriesTypeId={categoriesTypeId} go={this.props.go}
                                        backPanel={'OverviewPanel'}/>
                        <ObjectItemCell item={itemBottom} categoriesTypeId={categoriesTypeId} go={this.props.go}
                                        backPanel={'OverviewPanel'}/>
                    </div>
                );
            }
        }

        return res;
    }

    renderDataMovie() {
        const { isHasErrorMovie } = this.props;

        if(isHasErrorMovie) {
            return <LoadingAndError isLoading={false} isHasError={isHasErrorMovie} fetchData={() => this.fetchDataMovie()}/>;
        }

        return (
            <React.Fragment>
                {!this.props.isLoadingMovie && (
                    <HorizontalScroll>
                        <div style={{ display: 'flex' }}>
                            {this.props.dataMovie && this.props.dataMovie.map(item => {
                                let container = {
                                    //height: window.innerWidth * 0.63,
                                    height: '260px',
                                };

                                let styleImg = {
                                    backgroundImage: 'url(' + getImageMovieSrc(item, 'm') + ')',
                                    backgroundSize: 'contain',
                                    backgroundPosition: '50% 50%',
                                    backgroundRepeat: 'no-repeat',
                                    width: '100%',
                                    height: '100%',
                                };

                                return (
                                    <Cell className="CellMovie"
                                          key={item.id}
                                          multiline
                                          description={item.year !== 0 ? item.year : null}
                                          style={{width: '50%', minWidth: '180px' }}
                                          onClick={(e) => {
                                              this.props.actionsMoviePanel.setMovieId(item.id);
                                              this.props.actionsMoviePanel.setBackPanel('MovieListPanel');
                                              this.props.go(e);
                                          }}
                                          data-to={'MoviePanel'}
                                    >
                                        <div>
                                            <div style={container}>
                                                <div style={styleImg}/>
                                            </div>
                                            <div style={{boxSizing: 'border-box'}}>{item.title}</div>
                                        </div>
                                    </Cell>
                                )
                            })}
                        </div>
                    </HorizontalScroll>
                )}
                {!this.props.isLoadingMovie && this.props.dataMovie && this.props.dataMovie.length === 0 && (
                    <Footer>
                        <div>По Вашему запросу ничего не найдено. <br/>Попробуйте другие критерии поиска.</div>
                    </Footer>
                )}
            </React.Fragment>
        );

    }

    render() {
        const {fetchedUser, id, data, count, cityId, eventTypeId, placeTypeId, categoriesTypeId, actionsApp, actionsEventListPanel, actionsGeoObjectListPanel, actionsGeoListPanel, actionsFilterPanel } = this.props;

        //console.log('OverviewPanel', this.props)

        let style = {
            backgroundImage: `url('https://kudago.com/media/images/event/04/e1/04e1235948eef60ddc0e29993f7a5c5d.jpg')`,
            backgroundSize:  'cover'
        };


        const itemStyle = {
            flexShrink: 0,
            // width: 80,
            // height: 94,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            fontSize: 12
        };

        return (
            <Panel id={id}>
                <PanelHeader noShadow
                             left={<HeaderButton onClick={this.props.go} data-to={'SearchPanel'}>
                                 <Icon24Search/>
                             </HeaderButton>}
                >
                    Актуальное
                </PanelHeader>
                <Group>
                    <Header level="2" aside={
                        <Link onClick={(e) => {
                            this.props.go(e);
                        }} data-to={'CityFilterPanel'}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <Icon16Place style={{ marginRight: '2px' }}/>
                                <div style={{ marginRight: '4px' }}>{cityId && cityId.name}</div>
                                <Icon16Dropdown style={{marginTop: '4px'}}/>
                            </div>
                        </Link>
                    }>
                        Ваш город
                    </Header>
                </Group>
                {/*<Group>*/}
                    {/*<Div>*/}
                        {/*<div ref={el => (this.instance = el)} />*/}
                    {/*</Div>*/}
                {/*</Group>*/}
                {/*{(this.props.isLoadingPlace === true || this.getDataPlace && this.getDataPlace.length > 0) && (*/}
                <ObjectGroup header={"Актуальные места " + this.props.countPlace}
                             description="Актуальные места города"
                             onClickShowAll={(e) => {
                                 actionsApp.setCategoriesTypeId(CATEGORIES_TYPE.place);
                                 actionsApp.setPlaceTypeId(defaultFilter.placeTypeId);

                                 actionsEventListPanel.setIsCanFetchData(true);
                                 actionsEventListPanel.setIsCanFetchDataTop(true);
                                 actionsGeoObjectListPanel.setIsCanFetchData(true);
                                 actionsGeoListPanel.setIsCanFetchData(true);

                                 actionsFilterPanel.setPlaceTypeId(defaultFilter.placeTypeId);
                                 actionsFilterPanel.setCategoriesTypeId(CATEGORIES_TYPE.place);

                                 this.props.onStoryChange(e);
                             }}
                             dataStory={'notifications'}
                             go={this.props.go}
                             dataToGo={'OverviewPlacePanel'}
                             isLoading={this.props.isLoadingPlace}
                             isHasError={this.props.isHasErrorPlace}
                             fetchData={() => this.fetchDataPlace()}
                             courses={this.renderCourses(this.getDataPlace, CATEGORIES_TYPE.place)}/>

                <Group style={{ paddingBottom: 8 }}>
                    <Header level="2" aside={<Link onClick={this.props.onStoryChange} data-story={'movie'}>Показать все</Link>}>
                        Сейчас в кино {this.props.countMovie}
                    </Header>
                    {this.props.isLoadingMovie && (
                        <Footer>
                            <Spinner size="regular"/>
                        </Footer>
                    )}
                    {this.renderDataMovie()}
                </Group>
                <ObjectGroup header={"Актуальные события " + this.props.countEvent}
                             description="Актуальные события города"
                             onClickShowAll={(e) => {
                                 actionsApp.setCategoriesTypeId(CATEGORIES_TYPE.event);
                                 actionsApp.setEventTypeId(defaultFilter.eventTypeId);

                                 actionsEventListPanel.setIsCanFetchData(true);
                                 actionsEventListPanel.setIsCanFetchDataTop(true);
                                 actionsGeoObjectListPanel.setIsCanFetchData(true);
                                 actionsGeoListPanel.setIsCanFetchData(true);

                                 actionsFilterPanel.setEventTypeId(defaultFilter.eventTypeId);
                                 actionsFilterPanel.setCategoriesTypeId(CATEGORIES_TYPE.event);
                                 actionsFilterPanel.setDateTypeId(1);
                                 actionsFilterPanel.setIsFreeType(false);
                                 actionsApp.setDateTypeId(1);

                                 this.props.onStoryChange(e);
                             }}
                             dataStory={'notifications'}
                             go={this.props.go}
                             dataToGo={'OverviewEventPanel'}
                             isLoading={this.props.isLoadingEvent}
                             isHasError={this.props.isHasErrorEvent}
                             fetchData={() => this.fetchDataEvent()}
                             courses={this.renderCourses(this.getDataEvent, CATEGORIES_TYPE.event)}/>
            </Panel>
        );
    }
}

const mapStateToProps = store => {
    return {
        fetchedUser: store.appPanel.user,

        isCanFetchData: store.eventListPanel.isCanFetchData,
        data: store.eventListPanel.data,
        count: store.eventListPanel.count,
        nextPage: store.eventListPanel.nextPage,
        isLoading: store.eventListPanel.isLoading,
        cityId: store.appPanel.cityId,
        eventTypeId: store.appPanel.eventTypeId,
        placeTypeId: store.appPanel.placeTypeId,
        categoriesTypeId: store.appPanel.categoriesTypeId,

        hasMoreItems: store.eventListPanel.hasMoreItems,


        dataPlace: store.overviewPlacePanel.data,
        dataEvent: store.overviewEventPanel.data,
        dataMovie: store.movieListPanel.data,

        isLoadingPlace: store.overviewPlacePanel.isLoading,
        isLoadingEvent: store.overviewEventPanel.isLoading,
        isLoadingMovie: store.movieListPanel.isLoading,

        isHasErrorPlace: store.overviewPlacePanel.isHasError,
        isHasErrorEvent: store.overviewEventPanel.isHasError,
        isHasErrorMovie: store.movieListPanel.isHasError,

        countPlace: store.overviewPlacePanel.count,
        countEvent: store.overviewEventPanel.count,
        countMovie: store.movieListPanel.count,

        isCanFetchDataMovie: store.movieListPanel.isCanFetchData,
        isCanFetchDataPlace: store.overviewPlacePanel.isCanFetchData,
        isCanFetchDataEvent: store.overviewEventPanel.isCanFetchData,
    }
};

export default connect(
    mapStateToProps,
    (dispatch) => {
        return {
            actions: bindActionCreators(Actions, dispatch),
            // actionsEventPanel: bindActionCreators(EventPanelActions, dispatch),
            // actionsPlacePanel: bindActionCreators(PlacePanelActions, dispatch),
            actionsEventListPanel: bindActionCreators(EventListPanelActions, dispatch),
            actionsGeoObjectListPanel: bindActionCreators(GeoObjectListPanelActions, dispatch),
            actionsGeoListPanel: bindActionCreators(GeoListPanelActions, dispatch),
            actionsOverviewPlacePanel: bindActionCreators(OverviewPlacePanelActions, dispatch),
            actionsOverviewEventPanel: bindActionCreators(OverviewEventPanelActions, dispatch),
            actionsMovieListPanel: bindActionCreators(MovieListPanelActions, dispatch),
            actionsMoviePanel: bindActionCreators(MoviePanelActions, dispatch),
            actionsApp: bindActionCreators(AppActions, dispatch),
            actionsFilterPanel: bindActionCreators(FilterPanelActions, dispatch),
        }
    }
)(OverviewPanel);
