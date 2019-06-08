import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import Actions from './actions'
import EventPanelActions from '../EventPanel/actions'
import PlacePanelActions from '../PlacePanel/actions'
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
import AppActions from '../../containers/actions';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import { CATEGORIES_TYPE } from '../../containers/reducer';

const osname = platform();

class EventListPanel extends React.Component {

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
        const { actions } = this.props;
        actions.fetchData();
    }

    // shouldComponentUpdate(nextProps) {
    //     return false;
    //     // return nextProps.serpFeatures !== this.props.serpFeatures;
    // }

    go = (e) => {
        this.setState({ activePanel: e.currentTarget.dataset.to });
    };

    renderDate(data) {

        if(data.dates && data.dates[data.dates.length-1].is_endless === true) {
            return 'Круглый год'
        }

        return (
            <div>
                {data.dates && new Date(data.dates[data.dates.length-1].start_date).toLocaleString("ru", {day: 'numeric', month: 'long' })}
                -
                {data.dates && new Date(data.dates[data.dates.length-1].end_date).toLocaleString("ru", {day: 'numeric', month: 'long', year: 'numeric' })}
            </div>
        );
    }


    render() {
        const { id, data, count, city, eventTypeId, placeTypeId, categoriesTypeId } = this.props;

        //console.log('EventListPanel RENDER', this.props)

        let style = {
            backgroundImage: `url('https://kudago.com/media/images/event/04/e1/04e1235948eef60ddc0e29993f7a5c5d.jpg')`,
            backgroundSize:  'cover'
        };

        return (
            <Panel id={id}>
                <PanelHeader noShadow
                             left={<HeaderButton onClick={this.props.go} data-to={'SearchPanel'}>
                                 <Icon24Search/>
                             </HeaderButton>}
                >
                    Главная
                </PanelHeader>
                <Group style={{marginTop: 0}}>
                    <List>
                        <Cell
                            onClick={(e) => {
                                this.props.go(e);
                            }}
                            data-to={'FilterPanel'}
                            // before={<div>Фильтр:</div>}
                            // description="Друзья в Facebook"
                            asideContent={<Link><Icon24Filter /></Link>}
                        >
                            <div style={{display: 'flex'}}>
                                <Link><div style={{marginRight: '8px'}}>Фильтр:</div></Link>
                                <div style={{color: '#909499'}}>
                                    {categoriesTypeId === CATEGORIES_TYPE.event ?
                                        (eventTypeId && eventTypeId.name) :
                                        (placeTypeId && placeTypeId.name)
                                    }
                                </div>
                            </div>
                        </Cell>
                    </List>
                </Group>
                <Gallery
                    slideWidth="100%"
                    style={{ height: 230 }}
                    bullets="dark"
                >
                    <div style={style}/>
                </Gallery>
                <Group>
                    <Header level="2" aside={
                        <Link onClick={(e) => {
                            // this.props.actionsEventPanel.setEventId(item.id);
                            this.props.go(e);
                        }} data-to={'CityFilterPanel'}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <Icon16Place style={{ marginRight: '2px' }}/>
                                <div style={{ marginRight: '4px' }}>{city && city.name}</div>
                                <Icon16Dropdown style={{marginTop: '4px'}}/>
                            </div>
                        </Link>
                    }>
                        Вариантов {count}
                    </Header>
                    <List>
                        <InfiniteScroll
                            pageStart={0}
                            loadMore={() => this.props.actions.fetchDataMore(this.props.nextPage)}
                            hasMore={this.props.hasMoreItems}
                            initialLoad={false}
                        >
                            {data.map((item, index) => {
                                return (
                                    <Cell
                                        key={item.id}
                                        description={
                                            <div style={{marginTop: '2px'}}>
                                                {categoriesTypeId === CATEGORIES_TYPE.event && (
                                                    <div style={{display: 'flex', alignItems: 'center'}}>
                                                        <Icon16Recent style={{marginRight: '4px'}}/>
                                                        {this.renderDate(item)}
                                                    </div>
                                                )}
                                                {categoriesTypeId === CATEGORIES_TYPE.event && (
                                                    <div style={{ display: 'flex', marginTop: '4px' }}>
                                                        <Icon16Place style={{ marginRight: '4px' }}/>
                                                        {item.place.title}
                                                    </div>
                                                )}
                                                {categoriesTypeId === CATEGORIES_TYPE.place && (
                                                    <div style={{ display: 'flex', marginTop: '4px' }}>
                                                        <Icon16Recent style={{ marginRight: '4px' }}/>
                                                        {item.timetable}
                                                    </div>
                                                )}
                                                {categoriesTypeId === CATEGORIES_TYPE.place && (
                                                    <div style={{ display: 'flex', marginTop: '4px' }}>
                                                        <Icon16Place style={{ marginRight: '4px' }}/>
                                                        {item.address}
                                                    </div>
                                                )}
                                            </div>
                                        }
                                        // bottomContent={<Button>Загрузить еще</Button>}
                                        before={<Avatar type="image" src={item.images[0].image} size={80}/>}
                                        size="l"
                                        multiline
                                        onClick={(e) => {
                                            if(categoriesTypeId === CATEGORIES_TYPE.event) {
                                                this.props.actionsEventPanel.setEventId(item.id);
                                                this.props.actionsEventPanel.setBackPanel('EventListPanel');
                                            } else {
                                                this.props.actionsPlacePanel.setPlaceId(item.id);
                                                this.props.actionsPlacePanel.setBackPanel('EventListPanel');
                                            }
                                            this.props.go(e);
                                        }}
                                        data-to={categoriesTypeId === CATEGORIES_TYPE.event ? 'EventPanel' : 'PlacePanel'}
                                    >
                                        {item.title}
                                    </Cell>
                                );
                            })}
                        </InfiniteScroll>
                    </List>
                    {/*Рабочее со скроллом для react-infinite-scroll-component*/}
                    {/*<List>*/}
                        {/*<InfiniteScroll*/}
                            {/*dataLength={data.length}*/}
                            {/*next={()=>this.props.actions.fetchDataMore(this.props.nextPage)}*/}
                            {/*hasMore={this.props.hasMoreItems}*/}
                        {/*>*/}
                            {/*{data.map((item, index) => {*/}
                                {/*return (*/}
                                    {/*<Cell*/}
                                        {/*key={item.id}*/}
                                        {/*description={<div>VKontakte</div>}*/}
                                        {/*bottomContent={<Button>Загрузить еще</Button>}*/}
                                        {/*before={<Avatar type="image" src={item.images[0].image} size={80}/>}*/}
                                        {/*size="l"*/}
                                        {/*multiline*/}
                                        {/*onClick={(e) => {*/}
                                            {/*this.props.actionsEventPanel.setEventId(item.id);*/}
                                            {/*this.props.go(e);*/}
                                        {/*}}*/}
                                        {/*data-to={'EventPanel'}*/}
                                    {/*>*/}
                                        {/*{item.title}*/}
                                    {/*</Cell>*/}
                                {/*);*/}
                            {/*})}*/}
                        {/*</InfiniteScroll>*/}
                    {/*</List>*/}
                    {/*Без скролла рабочее*/}
                    {/*<List>*/}
                        {/*{data.map((item, index) => {*/}
                           {/*return (*/}
                               {/*<Cell*/}
                                   {/*key={item.id}*/}
                                   {/*description={<div>VKontakte</div>}*/}
                                   {/*bottomContent={<Button>Загрузить еще</Button>}*/}
                                   {/*before={<Avatar type="image" src={item.images[0].image} size={80}/>}*/}
                                   {/*size="l"*/}
                                   {/*multiline*/}
                                   {/*onClick={(e) => {*/}
                                       {/*this.props.actionsEventPanel.setEventId(item.id);*/}
                                       {/*this.props.go(e);*/}
                                   {/*}}*/}
                                   {/*data-to={'EventPanel'}*/}
                               {/*>*/}
                                   {/*{item.title}*/}
                               {/*</Cell>*/}
                           {/*);*/}
                        {/*})}*/}
                    {/*</List>*/}
                </Group>
                {this.props.nextPage &&
                <Footer>
                    <Spinner size="regular"/>
                </Footer>
                }
                {/*{this.props.nextPage &&*/}
                {/*<Footer>*/}
                    {/*/!*<Spinner size="regular" style={{ marginTop: 20 }} />*!/*/}
                    {/*<Button level="tertiary"*/}
                            {/*onClick={() => this.props.actions.fetchDataMore(this.props.nextPage)}*/}
                    {/*>*/}
                        {/*Загрузить еще*/}
                    {/*</Button>*/}
                {/*</Footer>*/}
                {/*}*/}
            </Panel>
        );
    }
}

const mapStateToProps = store => {
    return {
        data: store.eventListPanel.data,
        count: store.eventListPanel.count,
        nextPage: store.eventListPanel.nextPage,
        city: store.appPanel.cityId,
        eventTypeId: store.appPanel.eventTypeId,
        placeTypeId: store.appPanel.placeTypeId,
        categoriesTypeId: store.appPanel.categoriesTypeId,

        hasMoreItems: store.eventListPanel.hasMoreItems,
    }
};

export default connect(
    mapStateToProps,
    (dispatch) => {
        return {
            actions: bindActionCreators(Actions, dispatch),
            actionsEventPanel: bindActionCreators(EventPanelActions, dispatch),
            actionsPlacePanel: bindActionCreators(PlacePanelActions, dispatch),
            actionsApp: bindActionCreators(AppActions, dispatch),
        }
    }
)(EventListPanel);
