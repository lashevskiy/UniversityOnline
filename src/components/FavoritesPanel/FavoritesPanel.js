import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import Actions from './actions'
import EventPanelActions from '../EventPanel/actions'
import PlacePanelActions from '../PlacePanel/actions'
import MoviePanelActions from '../MoviePanel/actions'
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
    Gallery
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
import PlaceCell from '../PlaceCell'
import ObjectCell from '../Cell/ObjectCell'
import AppActions from '../../containers/App/actions';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import { CATEGORIES_TYPE } from '../../containers/App/reducer';
import { getImageMovieSrc } from '../../utils/utils';
import LoadingAndError from '../LoadingAndError';

const osname = platform();

class FavoritesPanel extends React.Component {

    constructor (props) {
        super(props);

        this.state = {
            activeStory: 'more',
            activePanel: 'home',
            activeTab: 'groups',
            search: '',

            data: [],
            artem: '',
        };
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        const { actions, isCanFetchData } = this.props;

        if(isCanFetchData) {
            actions.fetchData();
        }
    }

    go = (e) => {
        this.setState({ activePanel: e.currentTarget.dataset.to });
    };

    getGenres(item) {
        return (
            item.genres && item.genres.map(genre => {
                return (genre.name).toLowerCase();
            }).join(', ')
        )
    }

    renderData() {
        const { id, data, count, cityId, eventTypeId, placeTypeId, categoriesTypeId } = this.props;
        const { isLoading, isHasError } = this.props;

        if(isHasError) {
            return <LoadingAndError isLoading={isLoading} isHasError={isHasError} fetchData={() => this.fetchData()}/>;
        }

        return (
            <React.Fragment>
                {!this.props.isLoading && (
                    <InfiniteScroll
                        pageStart={0}
                        loadMore={() => !this.props.isHasErrorMore ? this.props.actions.fetchDataMore(this.props.nextPage) : null}
                        hasMore={this.props.hasMoreItems}
                        initialLoad={false}
                    >
                        <div style={{flexDirection: 'row', flexWrap: 'wrap', display: 'flex'}}>
                            {data.map((item, index) => {
                                let container = {
                                    height: window.innerWidth * 0.63,
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
                                          description={item.year + ', ' + this.getGenres(item)}
                                          style={{width: '50%' }}
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
                    </InfiniteScroll>
                )}
            </React.Fragment>
        );
    }

    renderDataMore() {
        const { isHasErrorMore } = this.props;

        return <LoadingAndError isLoading={false} isHasError={isHasErrorMore} fetchData={() => this.props.actions.fetchDataMore(this.props.nextPage)}/>;
    }

    render() {
        const { id, data, count, cityId, eventTypeId, placeTypeId, categoriesTypeId } = this.props;

        //console.log('MovieListPanel', this.props)

        let style = {
            backgroundImage: `url('https://kudago.com/media/images/event/04/e1/04e1235948eef60ddc0e29993f7a5c5d.jpg')`,
            backgroundSize:  'cover'
        };

        return (
            <Panel id={id}>
                <PanelHeader
                            // noShadow
                             // left={<HeaderButton onClick={this.props.go} data-to={'SearchPanel'}>
                             //     <Icon24Search/>
                             // </HeaderButton>}
                >
                    Избранное
                </PanelHeader>
                <Group>
                    <Header level="2" aside={
                        <Link onClick={(e) => {
                            // this.props.actionsEventPanel.setEventId(item.id);
                            this.props.go(e);
                        }} data-to={'CityFilterPanel'}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <Icon16Place style={{ marginRight: '2px' }}/>
                                <div style={{ marginRight: '4px' }}>{cityId && cityId.name}</div>
                                <Icon16Dropdown style={{marginTop: '4px'}}/>
                            </div>
                        </Link>
                    }>
                        Вариантов {count}
                    </Header>
                    {this.renderData()}
                </Group>
                {this.props.isHasErrorMore &&
                    <LoadingAndError isLoading={false} isHasError={this.props.isHasErrorMore}
                                     fetchData={() => this.props.actions.setIsHasErrorMore(false)}/>
                }
                {(this.props.nextPage || this.props.isLoading) && !this.props.isHasErrorMore && (
                    <Footer>
                        <Spinner size="regular"/>
                    </Footer>
                )}
                {(data.length === 0 && !this.props.isLoading) && (
                    <Footer>
                        <div>По Вашему запросу ничего не найдено. <br/>Попробуйте другие критерии поиска.</div>
                    </Footer>
                )}
                {/*{this.renderDataMore()}*/}
            </Panel>
        );
    }
}

const mapStateToProps = store => {
    return {
        isCanFetchData: store.favoritesPanel.isCanFetchData,
        data: store.favoritesPanel.data,
        count: store.favoritesPanel.count,
        nextPage: store.favoritesPanel.nextPage,
        isLoading: store.favoritesPanel.isLoading,
        isHasError: store.favoritesPanel.isHasError,
        isHasErrorMore: store.favoritesPanel.isHasErrorMore,
        cityId: store.appPanel.cityId,
        eventTypeId: store.appPanel.eventTypeId,
        placeTypeId: store.appPanel.placeTypeId,
        categoriesTypeId: store.appPanel.categoriesTypeId,

        hasMoreItems: store.favoritesPanel.hasMoreItems,
    }
};

export default connect(
    mapStateToProps,
    (dispatch) => {
        return {
            actions: bindActionCreators(Actions, dispatch),
            actionsEventPanel: bindActionCreators(EventPanelActions, dispatch),
            actionsPlacePanel: bindActionCreators(PlacePanelActions, dispatch),
            actionsMoviePanel: bindActionCreators(MoviePanelActions, dispatch),
            actionsApp: bindActionCreators(AppActions, dispatch),
        }
    }
)(FavoritesPanel);
