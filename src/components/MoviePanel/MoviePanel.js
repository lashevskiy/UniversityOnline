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
import Icon24Home from '@vkontakte/icons/dist/24/home';
import Icon24Pin from '@vkontakte/icons/dist/24/pin';
import Icon24Recent from '@vkontakte/icons/dist/24/recent';

import '@vkontakte/vkui/dist/vkui.css';

import ObjectGroup from '../ObjectGroup'
import PlaceCell from '../PlaceCell'
import { renderDate } from '../../utils/utils.js'
import { getImageSrcByIndex, renderData } from '../../utils/utils';
import LoadingAndError from '../LoadingAndError';

const osname = platform();

class MoviePanel extends React.Component {

    constructor (props) {
        super(props);

        this.state = {
            activeTab: 'mainInfo'
        };
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        const { actions, movieId } = this.props;
        actions.fetchData(movieId);
    }

    createMarkup(html) {
        return { __html: html };
    };

    renderDate() {
        const { data } = this.props;
        return renderDate(data);
    }

    // renderDateTime() {
    //     const { data } = this.props;
    //     //TODO если нет старт тайм и энд тайм, то смотрим на use_place_schedule === true и пишем - 'Соответствует времени работы места проведения'
    //     return (
    //         <div>
    //             {data.dates && data.dates[data.dates.length-1].start_time}
    //             &mdash;
    //             {data.dates && data.dates[data.dates.length-1].end_time}
    //         </div>
    //     );
    // }

    get getGenres() {
        const { data } = this.props;

        return data.genres && data.genres.map(genre => {
            return genre.name;
        }).join(', ');
    }


    getUrl(path) {
        let code = null;
        if (path) {
            let res = new URLSearchParams(path.split('?')[1]);
            code = res.get('v');
        }

        return code;
    }

    renderData() {
        const { id, data } = this.props;
        const { isLoading, isHasError } = this.props;

        if(isLoading || isHasError) {
            return <LoadingAndError isLoading={isLoading} isHasError={isHasError} fetchData={() => this.fetchData()}/>;
        }

        return (
            <React.Fragment>
                <Group style={{marginTop: 0}}>
                    {this.props.isLoading && (
                        <Div>
                            <Footer>
                                <Spinner size="regular"/>
                            </Footer>
                        </Div>
                    )}
                    {!this.props.isLoading && (
                        <Gallery
                            slideWidth="100%"
                            style={{ height: 230 }}
                            bullets="light"
                        >
                            {data.images.map((image, index) => {
                                let style = {
                                    backgroundImage: 'url(' + getImageSrcByIndex(data, index, 'm') + ')',
                                    backgroundSize: 'cover',
                                    backgroundPosition: '50% 50%',
                                };
                                return (
                                    <div key={index} style={style}/>
                                );
                            })}
                        </Gallery>
                    )}
                </Group>
                <Group className={data.original_title ? "MovieDescription" : null} description={data.original_title ? data.original_title : ''}>
                    {!this.props.isLoading &&
                    <Header>
                        {data.title}
                    </Header>
                    }
                    {/*{this.props.isLoading && (*/}
                    {/*<Div>*/}
                    {/*<Footer>*/}
                    {/*<Spinner size="regular"/>*/}
                    {/*</Footer>*/}
                    {/*</Div>*/}
                    {/*)}*/}
                    {/*<Div style={{paddingTop: 0}}>*/}
                    {/*<div dangerouslySetInnerHTML={this.createMarkup(data.description)} />*/}
                    {/*</Div>*/}
                </Group>
                <Group>
                    <Cell
                        expandable={true}
                        data-to={'ShowingsPanel'}
                        onClick={(e) => {
                            this.props.go(e);
                        }}
                    >
                        <Link>Сеансы в кино</Link>
                    </Cell>
                </Group>
                <Group>
                    <Tabs theme="light">
                        <TabsItem
                            onClick={() => this.setState({ activeTab: 'mainInfo' })}
                            selected={this.state.activeTab === 'mainInfo'}
                        >
                            Информация
                        </TabsItem>
                        <TabsItem
                            onClick={() => this.setState({ activeTab: 'trailer' })}
                            selected={this.state.activeTab === 'trailer'}
                        >
                            Трейлер
                        </TabsItem>
                        {/*<TabsItem*/}
                        {/*onClick={() => this.setState({ activeTab: 'showings' })}*/}
                        {/*selected={this.state.activeTab === 'showings'}*/}
                        {/*>*/}
                        {/*Сеансы*/}
                        {/*</TabsItem>*/}
                    </Tabs>
                </Group>
                {this.state.activeTab === 'mainInfo' && (
                    <Group>
                        <List>
                            <Cell>
                                <InfoRow title="Год">
                                    {renderData(data.year, 2)}
                                </InfoRow>
                            </Cell>
                            <Cell>
                                <InfoRow title="Страна">
                                    {renderData(data.country, 2)}
                                </InfoRow>
                            </Cell>
                            <Cell multiline>
                                <InfoRow title="Режиссер">
                                    {renderData(data.director, 2)}
                                </InfoRow>
                            </Cell>
                            <Cell multiline>
                                <InfoRow title="Автор сценария">
                                    {renderData(data.writer, 2)}
                                </InfoRow>
                            </Cell>
                            <Cell multiline>
                                <InfoRow title="Жанры">
                                    {renderData(this.getGenres, 2)}
                                </InfoRow>
                            </Cell>
                        </List>
                    </Group>
                )}
                {this.state.activeTab === 'mainInfo' && (
                    <Group>
                        <List>
                            <Cell multiline
                                  before={<Icon24User/>}>
                                <InfoRow title="Возрастное ограничение">
                                    {renderData(data.age_restriction, 2)}
                                </InfoRow>
                            </Cell>
                            <Cell multiline
                                  before={<Icon24Recent/>}>
                                <InfoRow title="Хронометраж">
                                    {renderData(data.running_time, 2, ' минут')}
                                </InfoRow>
                            </Cell>
                            <Cell multiline
                                  before={<Icon24Users/>}>
                                <InfoRow title="В главных ролях">
                                    {renderData(data.stars, 2)}
                                </InfoRow>
                            </Cell>
                        </List>
                    </Group>
                )}
                {/*{this.state.activeTab === 'trailer' && (*/}
                {/*<ReactPlayer url={data.trailer} height={'315px'} width={'100%'} pip={false} controls/>*/}
                {/*)}*/}
                {/*{this.state.activeTab === 'trailer' && data.trailer && (*/}
                {/*<iframe width={'100%'} height="315" src={'https://www.youtube.com/embed/' + this.getUrl(data.trailer)} frameBorder="0"*/}
                {/*allow="accelerometer; autoplay; encrypted-media; gyroscope;"*/}
                {/*allowFullScreen></iframe>*/}
                {/*)}*/}
                {this.state.activeTab === 'trailer' && data.trailer && (
                    <iframe width={'100%'} height="315" src={'https://www.youtube.com/embed/' + this.getUrl(data.trailer)} frameBorder="0"
                            allow="accelerometer; autoplay; encrypted-media; gyroscope;"></iframe>
                )}
                <Group title="Описание">
                    <Div>
                        <div dangerouslySetInnerHTML={this.createMarkup(data.body_text)} />
                    </Div>
                </Group>
                {data.site_url && (
                    <Group>
                        <Cell
                            expandable={true}
                            href={data.site_url}
                            target="_blank"
                        >
                            {/*<Link href={data.site_url}>Источник данных</Link>*/}
                            Источник данных
                        </Cell>
                    </Group>
                )}
            </React.Fragment>
        );
    }

    render() {
        const { id, data } = this.props;

        //console.log('MoviePanel', this.props)

        let otherProps = null;
        if (data.place && data.place.is_stub === false) {
            otherProps = {
                expandable: true,
                onClick: (e) => {
                    this.props.actionsPlacePanel.setPlaceId(data.place.id);
                    this.props.actionsPlacePanel.setBackPanel('EventPanel');
                    this.props.go(e);
                }
            };
        }

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
                            data-to={this.props.back}
                        >
                            {osname === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}
                        </HeaderButton>
                    }
                >
                    {data.title}
                </PanelHeader>
                {this.renderData()}
            </Panel>
        );
    }
}

const mapStateToProps = store => {
    return {
        movieId: store.moviePanel.movieId,
        data: store.moviePanel.data,
        backPanel: store.moviePanel.backPanel,
        isLoading: store.moviePanel.isLoading,
        isHasError: store.moviePanel.isHasError,
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
)(MoviePanel);
