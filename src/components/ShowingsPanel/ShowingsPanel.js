import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import Actions from './actions'
import axios from 'axios';
import PlacePanelActions from '../PlacePanel/actions'
import MapPanelActions from '../MapPanel/actions'
// import connect from '@vkontakte/vkui-connect';
import ReactPlayer from 'react-player'

import Icon24MoneyCircle from '@vkontakte/icons/dist/24/money_circle';
import {
    InfoRow,
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
import Icon24Users from '@vkontakte/icons/dist/24/users';
import Icon24User from '@vkontakte/icons/dist/24/user';
import Icon28Newsfeed from '@vkontakte/icons/dist/28/newsfeed';
import Icon28Search from '@vkontakte/icons/dist/28/search';
import Icon28Notifications from '@vkontakte/icons/dist/28/notifications';
import Icon28Messages from '@vkontakte/icons/dist/28/messages';
import Icon28More from '@vkontakte/icons/dist/28/more';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import Icon24Place from '@vkontakte/icons/dist/24/place';
import Icon24Phone from '@vkontakte/icons/dist/24/phone';
import Icon16Pin from '@vkontakte/icons/dist/16/pin';
import Icon24Pin from '@vkontakte/icons/dist/24/pin';
import Icon24Recent from '@vkontakte/icons/dist/24/recent';

import '@vkontakte/vkui/dist/vkui.css';

import ObjectGroup from '../ObjectGroup'
import PlaceCell from '../PlaceCell'
import { capitalize, getImageSrcByIndex, renderData } from '../../utils/utils';
import { CATEGORIES_TYPE } from '../../containers/App/reducer';
import Icon16Place from '@vkontakte/icons/dist/16/place';

import { startOfDay, endOfDay, format, addDays } from 'date-fns';
var ruLocale = require('date-fns/locale/ru');

const osname = platform();


const renderShowings = (showings, title) => {

    if(showings.length === 0) {
        return null;
    }

    const currentTime = new Date().getTime();

    return (
        <div>
            <Div style={{ fontSize: '15px', fontWeight: '500' }}>{title}</Div>
            <HorizontalScroll>
                <div style={{ display: 'flex', padding: '0 12px' }}>
                    {showings.map(sh => {
                        let time = sh.time*1000;
                        return (
                            <div style={{ paddingRight: 30, marginBottom: 10, opacity: currentTime > time ? 0.3 : null }}>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <Icon24Recent style={{ marginRight: '4px', color: '#909499' }}/>
                                    <div>{format(new Date(time), 'HH:mm')}</div>
                                </div>
                                {sh.price &&
                                <div style={{ display: 'flex', marginTop: '4px' }}>
                                    <Icon24MoneyCircle style={{ marginRight: '4px', color: '#909499' }}/>
                                    <div>{sh.price}</div>
                                </div>
                                }
                            </div>
                        );
                    })}
                </div>
            </HorizontalScroll>
        </div>
    );
};


class ShowingsPanel extends React.Component {

    constructor (props) {
        super(props);
    }

    state = {
        activeTab: 'day1',

        day1: new Date(),
        day2: addDays(new Date(), 1),
        day3: addDays(new Date(), 2),
        day4: addDays(new Date(), 3),
        day5: addDays(new Date(), 4),
        day6: addDays(new Date(), 5),
        day7: addDays(new Date(), 6),
    };

    componentDidMount() {
        const { actions, movieId } = this.props;
        actions.fetchData(movieId, this.state.day1);
    }

    showingsImax = (item) => {
        return item.showings.filter(el => el.imax === true);
    };

    showings4DX = (item) => {
        return item.showings.filter(el => el.four_dx === true);
    };

    showings3D = (item) => {
        return item.showings.filter(el => el.three_d === true && el.imax === false && el.four_dx === false);
    };

    showings2D = (item) => {
        return item.showings.filter(el => el.three_d === false && el.four_dx === false && el.imax === false && el.original_language === false);
    };

    showingsOriginalLanguage = (item) => {
        return item.showings.filter(el => el.original_language === true);
    };

    render() {
        const { id, data, isLoading, actions, movieId } = this.props;

        const itemStyle = {
            //flexShrink: 0,
            //width: 80,
            //height: 94,
            //display: 'flex',
            //flexDirection: 'column',
            //alignItems: 'center',
            //fontSize: 12
        };

        return (
            <Panel id={id}>
                <PanelHeader
                    noShadow
                    left={
                        <HeaderButton
                            onClick={(e) => {
                                this.props.actions.clearData();
                                this.props.go(e);
                            }}
                            // data-to={this.props.backPanel || this.props.back}
                            data-to={this.props.back}
                        >
                            {osname === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}
                        </HeaderButton>
                    }
                >
                    Сеансы в кино
                </PanelHeader>
                <FixedLayout vertical="top">
                    <Tabs theme="header" type="buttons">
                        <HorizontalScroll>
                            <TabsItem
                                onClick={() => {
                                    this.setState({ activeTab: 'day1' });
                                    actions.fetchData(movieId, this.state.day1);
                                }}
                                selected={this.state.activeTab === 'day1'}
                            >
                                {format(this.state.day1, 'DD MMMM (dd)', {locale: ruLocale})}
                            </TabsItem>
                            <TabsItem
                                onClick={() => {
                                    this.setState({ activeTab: 'day2' });
                                    actions.fetchData(movieId, this.state.day2);
                                }}
                                selected={this.state.activeTab === 'day2'}
                            >
                                {format(this.state.day2, 'DD MMMM (dd)', {locale: ruLocale})}
                            </TabsItem>
                            <TabsItem
                                onClick={() => {
                                    this.setState({ activeTab: 'day3' });
                                    actions.fetchData(movieId, this.state.day3);
                                }}
                                selected={this.state.activeTab === 'day3'}
                            >
                                {format(this.state.day3, 'DD MMMM (dd)', {locale: ruLocale})}
                            </TabsItem>
                            <TabsItem
                                onClick={() => {
                                    this.setState({ activeTab: 'day4' });
                                    actions.fetchData(movieId, this.state.day4);
                                }}
                                selected={this.state.activeTab === 'day4'}
                            >
                                {format(this.state.day4, 'DD MMMM (dd)', {locale: ruLocale})}
                            </TabsItem>
                            <TabsItem
                                onClick={() => {
                                    this.setState({ activeTab: 'day5' });
                                    actions.fetchData(movieId, this.state.day5);
                                }}
                                selected={this.state.activeTab === 'day5'}
                            >
                                {format(this.state.day5, 'DD MMMM (dd)', {locale: ruLocale})}
                            </TabsItem>
                            <TabsItem
                                onClick={() => {
                                    this.setState({ activeTab: 'day6' });
                                    actions.fetchData(movieId, this.state.day6);
                                }}
                                selected={this.state.activeTab === 'day6'}
                            >
                                {format(this.state.day6, 'DD MMMM (dd)', {locale: ruLocale})}
                            </TabsItem>
                            <TabsItem
                                onClick={() => {
                                    this.setState({ activeTab: 'day7' });
                                    actions.fetchData(movieId, this.state.day7);
                                }}
                                selected={this.state.activeTab === 'day7'}
                            >
                                {format(this.state.day7, 'DD MMMM (dd)', {locale: ruLocale})}
                            </TabsItem>
                        </HorizontalScroll>
                    </Tabs>
                </FixedLayout>
                <div style={{ paddingTop: 48 }}>
                    {!isLoading && data.places.length > 0 && data.places.map(item => {
                        let showings4DX = this.showings4DX(item);
                        let showingsImax = this.showingsImax(item);
                        let showings3D = this.showings3D(item);
                        let showings2D = this.showings2D(item);
                        let showingsOriginalLanguage = this.showingsOriginalLanguage(item);

                        return (
                            <Group>
                                <Cell
                                    expandable
                                    description={
                                        <div style={{marginTop: '2px'}}>
                                            {item.address && (
                                            <div style={{ display: 'flex', marginTop: '4px' }}>
                                                <Icon16Place style={{ marginRight: '4px' }}/>
                                                <div>{item.address}</div>
                                            </div>
                                            )}
                                            {item.subway && (
                                            <div style={{ display: 'flex', marginTop: '4px' }}>
                                                <Icon16Pin style={{ marginRight: '4px' }}/>
                                                <div>{item.subway}</div>
                                            </div>
                                            )}
                                        </div>
                                    }
                                    before={null}
                                    size="l"
                                    multiline={true}
                                    onClick={(e) => {
                                        //this.props.onClick(e);
                                        this.props.actionsPlacePanel.setPlaceId(item.id);
                                        this.props.actionsPlacePanel.setBackPanel('ShowingsPanel');
                                        this.props.go(e);
                                    }}
                                    data-to={'PlacePanel'}
                                >
                                    {capitalize(item.title)}
                                </Cell>

                                {renderShowings(showings2D, 'Сеансы 2D')}
                                {renderShowings(showings3D, 'Сеансы 3D')}
                                {renderShowings(showings4DX, 'Сеансы 4DX')}
                                {renderShowings(showingsImax, 'Сеансы IMAX')}
                                {renderShowings(showingsOriginalLanguage, 'Сеансы на оригинальном языке')}

                            </Group>
                        );
                    })}
                    {isLoading && (
                        <Footer>
                            <Spinner size="regular"/>
                        </Footer>
                    )}
                    {!isLoading && data.places.length === 0 && (
                        <Footer>
                            <div>Упс, мы не смогли найти сеансы на данный фильм =( </div>
                        </Footer>
                    )}
                </div>
            </Panel>
        );
    }
}

const mapStateToProps = store => {
    return {
        movieId: store.moviePanel.movieId,
        backPanel: store.moviePanel.backPanel,

        data: store.showingsPanel.data,
        isHasError: store.showingsPanel.isHasError,
        isLoading: store.showingsPanel.isLoading,
    }
};

export default connect(
    mapStateToProps,
    (dispatch) => {
        return {
            actions: bindActionCreators(Actions, dispatch),
            actionsPlacePanel: bindActionCreators(PlacePanelActions, dispatch),
            actionsMapPanel: bindActionCreators(MapPanelActions, dispatch),
        }
    }
)(ShowingsPanel);
