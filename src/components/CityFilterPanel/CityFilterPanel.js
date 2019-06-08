import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import Actions from './actions'
import AppActions from '../../containers/App/actions'
import EventListPanelActions from '../EventListPanel/actions'
import MovieListPanelActions from '../MovieListPanel/actions'
import OverviewEventPanelActions from '../OverviewEventPanel/actions'
import OverviewPlacePanelActions from '../OverviewPlacePanel/actions'
import GeoObjectListPanelActions from '../GeoObjectListPanel/actions'
import GeoListPanelActions from '../GeoListPanel/actions'
import axios from 'axios';
// import connect from '@vkontakte/vkui-connect';

import {
    HeaderButton,
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
    Spinner
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
import Icon24Done from '@vkontakte/icons/dist/24/done';
import '@vkontakte/vkui/dist/vkui.css';

import ObjectGroup from '../ObjectGroup'
import PlaceCell from '../PlaceCell'
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import LoadingAndError from '../LoadingAndError';
import { CITIES } from '../../containers/AppContainer/AppContainer';
const osname = platform();

class CityFilterPanel extends React.Component {

    constructor (props) {
        super(props);

        this.state = {
            search: '',
        };
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        const { data, actions } = this.props;
        if (!data.length) {
            actions.fetchData();
        }
    }

    onChange = (search) => {
        this.setState({ search: search.replace(/^\s*/, '') });
    };

    get cityList () {
        const { data } = this.props;
        const search = this.state.search.toLowerCase().trim();
        return data.filter(({name}) => name.toLowerCase().indexOf(search) > -1);
    }

    renderData() {
        const { id, data } = this.props;
        const { isLoading, isHasError } = this.props;

        if(isLoading || isHasError) {
            return <LoadingAndError isLoading={isLoading} isHasError={isHasError} fetchData={() => this.fetchData()}/>;
        }

        let cityArray = this.cityList;

        return (
            <React.Fragment>
                <Search value={this.state.search} onChange={this.onChange}/>
                {cityArray.length > 0 && !this.props.isLoading && (
                    <List>
                        {cityArray.map(city => {
                            return (
                                <Cell key={city.slug}
                                      asideContent={this.props.city.slug === city.slug ? <Icon24Done fill="#528bcc" /> : null}
                                      onClick={(e) => {

                                          let cityValue = CITIES.find(item => item.slug === city.slug) || CITIES[0];

                                          this.props.actionsApp.setCityId(cityValue);
                                          this.props.actionsEventListPanel.setIsCanFetchData(true);
                                          this.props.actionsEventListPanel.setIsCanFetchDataTop(true);
                                          this.props.actionsMovieListPanel.setIsCanFetchData(true);
                                          this.props.actionsOverviewEventPanel.setIsCanFetchData(true);
                                          this.props.actionsOverviewPlacePanel.setIsCanFetchData(true);
                                          this.props.actionsGeoObjectListPanel.setIsCanFetchData(true);
                                          this.props.actionsGeoListPanel.setIsCanFetchData(true);
                                          //this.props.actionsApp.setIsShowPopout(true);
                                          this.props.go(e);
                                      }}
                                      data-to={this.props.back}>
                                    {city.name}
                                </Cell>
                            );
                        })}
                    </List>
                )}
                {this.props.isLoading && (
                    <Footer>
                        <Spinner size="regular"/>
                    </Footer>
                )}
                {(cityArray.length === 0 && !this.props.isLoading) && (
                    <Footer>
                        <div>Похоже, что данного города еще нет в нашем сервисе. <br/>Он обязательно появится в ближайшее время =)</div>
                    </Footer>
                )}
            </React.Fragment>
        );
    }

    render() {
        const { id } = this.props;

        //console.log('CityFilterPanel', this.props)

        return (
            <Panel id={id}>
                <PanelHeader noShadow
                    left={<HeaderButton onClick={this.props.go} data-to={this.props.back}>
                        {osname === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}
                    </HeaderButton>}
                >
                    Ваш город
                </PanelHeader>
                {this.renderData()}
            </Panel>
        );
    }
}

const mapStateToProps = store => {
    return {
        city: store.appPanel.cityId,
        data: store.cityFilterPanel.data,
        isLoading: store.cityFilterPanel.isLoading,
        isHasError: store.cityFilterPanel.isHasError,
    }
};

export default connect(
    mapStateToProps,
    (dispatch) => {
        return {
            actions: bindActionCreators(Actions, dispatch),
            actionsApp: bindActionCreators(AppActions, dispatch),
            actionsEventListPanel: bindActionCreators(EventListPanelActions, dispatch),
            actionsMovieListPanel: bindActionCreators(MovieListPanelActions, dispatch),
            actionsOverviewEventPanel: bindActionCreators(OverviewEventPanelActions, dispatch),
            actionsOverviewPlacePanel: bindActionCreators(OverviewPlacePanelActions, dispatch),
            actionsGeoObjectListPanel: bindActionCreators(GeoObjectListPanelActions, dispatch),
            actionsGeoListPanel: bindActionCreators(GeoListPanelActions, dispatch),
        }
    }
)(CityFilterPanel);
