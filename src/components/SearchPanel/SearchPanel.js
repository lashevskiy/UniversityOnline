import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import Actions from './actions'
//import AppActions from '../../containers/actions'
import axios from 'axios';
// import connect from '@vkontakte/vkui-connect';

import {
    PanelHeaderContent,
    HeaderContext,
    Spinner,
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
    Gallery
} from '@vkontakte/vkui';
import Icon24Users from '@vkontakte/icons/dist/24/users';
import Icon24User from '@vkontakte/icons/dist/24/users';
import Icon28Newsfeed from '@vkontakte/icons/dist/28/newsfeed';
import Icon28Search from '@vkontakte/icons/dist/28/search';
import Icon28Notifications from '@vkontakte/icons/dist/28/notifications';
import Icon28Messages from '@vkontakte/icons/dist/28/messages';
import Icon28More from '@vkontakte/icons/dist/28/more';
import Icon24Globe from '@vkontakte/icons/dist/24/globe';
import Icon24Pin from '@vkontakte/icons/dist/24/pin';
import Icon24Artist from '@vkontakte/icons/dist/24/artist';
import Icon16Place from '@vkontakte/icons/dist/16/place';
import Icon16Dropdown from '@vkontakte/icons/dist/16/dropdown';
import Icon24Done from '@vkontakte/icons/dist/24/done';
import '@vkontakte/vkui/dist/vkui.css';

import ObjectGroup from '../ObjectGroup'
import PlaceCell from '../PlaceCell'
import ObjectCell from '../Cell/ObjectCell'
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import InfiniteScroll from 'react-infinite-scroller';
import EventPanelActions from '../EventPanel/actions';
import PlacePanelActions from '../PlacePanel/actions';


import { CATEGORIES_TYPE } from '../../containers/App/reducer';
import { getData } from './selectors'

const osname = platform();

export const SEARCH_TYPE = {
    // all:   {
    //     id: 'all',
    //     slag: 'event,place',
    //     name: 'Места и события',
    // },
    event: {
        id: 'event',
        slag: 'event',
        name: 'События'
    },
    place: {
        id: 'place',
        slag: 'place',
        name: 'Места'
    }
};

class SearchPanel extends React.Component {

    constructor (props) {
        super(props);

        this.state = {
            search: '',
        };
        this.toggleContext = this.toggleContext.bind(this);
        this.select = this.select.bind(this);
    }

    componentDidMount() {
        // const { data, actions } = this.props;
        // if (!data.length) {
        //     actions.fetchData();
        // }
    }

    onChange = (search) => {
        this.props.actions.setSearch(search.replace(/^\s*/, ''));
    };

    onSearch = () => {
        const { search, actions } = this.props;
        if(search.length >= 1) {
            actions.fetchData(search);
        }
    };

    get cityList () {
        const { data } = this.props;
        const search = this.state.search.toLowerCase();
        return data.filter(({name}) => name.toLowerCase().indexOf(search) > -1);
    }

    toggleContext() {
        this.props.actions.toggleContext(!this.props.contextOpened);
    }

    select (e) {
        const mode = e.currentTarget.dataset.mode;
        const currentMode = this.props.mode;
        this.props.actions.setMode(mode);
        requestAnimationFrame(this.toggleContext);
        if(mode !== currentMode) {
            this.onSearch();
        }
    }

    render() {
        const { id, data, search } = this.props;

        //console.log('SearchPanel', this.props);

        return (
            <Panel id={id}>
                <PanelHeader noShadow
                    left={<HeaderButton onClick={this.props.go} data-to={this.props.back}>
                        {osname === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}
                    </HeaderButton>}
                >
                    <PanelHeaderContent aside={<Icon16Dropdown />} onClick={this.toggleContext}>
                        {SEARCH_TYPE[this.props.mode].name}
                    </PanelHeaderContent>
                </PanelHeader>
                <FixedLayout vertical="top">
                    <Search value={search} onChange={this.onChange}/>
                </FixedLayout>
                <HeaderContext opened={this.props.contextOpened} onClose={this.toggleContext}>
                    <List>
                        {/*<Cell*/}
                            {/*before={<Icon24Users />}*/}
                            {/*asideContent={this.props.mode === SEARCH_TYPE.all.id ? <Icon24Done fill="var(--accent)" /> : null}*/}
                            {/*onClick={this.select}*/}
                            {/*data-mode={SEARCH_TYPE.all.id}*/}
                        {/*>*/}
                            {/*{SEARCH_TYPE.all.name}*/}
                        {/*</Cell>*/}
                        <Cell
                            before={<Icon24Pin />}
                            asideContent={this.props.mode === SEARCH_TYPE.place.id ? <Icon24Done fill="var(--accent)" /> : null}
                            onClick={this.select}
                            data-mode={SEARCH_TYPE.place.id}
                        >
                            {SEARCH_TYPE.place.name}
                        </Cell>
                        <Cell
                            before={<Icon24Artist />}
                            asideContent={this.props.mode === SEARCH_TYPE.event.id ? <Icon24Done fill="var(--accent)" /> : null}
                            onClick={this.select}
                            data-mode={SEARCH_TYPE.event.id}
                        >
                            {SEARCH_TYPE.event.name}
                        </Cell>
                    </List>
                </HeaderContext>
                <div style={{ paddingTop: 48, paddingBottom: 54 }}>
                    {!this.props.isLoading && data.length > 0 && (
                        <Group style={{ marginTop: 0 }}>
                            <List>
                                <InfiniteScroll
                                    pageStart={0}
                                    loadMore={() => this.props.actions.fetchDataMore(this.props.nextPage)}
                                    hasMore={this.props.hasMoreItems}
                                    initialLoad={false}
                                >
                                    {data.map((item, index) => {
                                        return (
                                            <ObjectCell
                                                notAvatar={item.ctype === CATEGORIES_TYPE.place}
                                                viewType={item.ctype === CATEGORIES_TYPE.place ? null : this.props.viewType}
                                                key={item.id}
                                                item={item}
                                                categoriesTypeId={item.ctype}
                                                onClick={(e) => {
                                                    if(item.ctype === CATEGORIES_TYPE.event) {
                                                        this.props.actionsEventPanel.setEventId(item.id);
                                                        this.props.actionsEventPanel.setBackPanel('SearchPanel');
                                                    } else {
                                                        this.props.actionsPlacePanel.setPlaceId(item.id);
                                                        this.props.actionsPlacePanel.setBackPanel('SearchPanel');
                                                    }
                                                    this.props.go(e);
                                                }}
                                                dataToGo={item.ctype === CATEGORIES_TYPE.event ? 'EventPanel' : 'PlacePanel'}
                                            />
                                        );
                                    })}
                                </InfiniteScroll>
                            </List>
                        </Group>
                    )}
                    {(this.props.nextPage || this.props.isLoading) && (
                        <Footer>
                            <Spinner size="regular"/>
                        </Footer>
                    )}
                    {(data.length === 0 && !this.props.isLoading && this.props.isNotFound) && (
                        <Footer>
                            <div>По Вашему запросу ничего не найдено. <br/>Попробуйте другие критерии поиска.</div>
                        </Footer>
                    )}
                    {(data.length === 0 && !this.props.isLoading && !this.props.isNotFound) && (
                        <Footer>
                            <div>Введите интересующий Вас запрос в строке поиска и нажмите кнопку <b>Найти</b></div>
                        </Footer>
                    )}
                </div>
                <FixedLayout vertical="bottom">
                    <Div>
                        <Button size="m" stretched onClick={this.onSearch}
                                // disabled={this.props.search.length === 0}
                        >Найти</Button>
                    </Div>
                </FixedLayout>
            </Panel>
        );
    }
}

const mapStateToProps = store => {
    return {
        data: getData(store),
        search: store.searchPanel.search,
        hasMoreItems: store.searchPanel.hasMoreItems,
        nextPage: store.searchPanel.nextPage,
        isLoading: store.searchPanel.isLoading,
        contextOpened: store.searchPanel.contextOpened,
        mode: store.searchPanel.mode,
        isNotFound: store.searchPanel.isNotFound,

        viewType: store.appPanel.viewType,
    }
};

export default connect(
    mapStateToProps,
    (dispatch) => {
        return {
            actions: bindActionCreators(Actions, dispatch),
            actionsEventPanel: bindActionCreators(EventPanelActions, dispatch),
            actionsPlacePanel: bindActionCreators(PlacePanelActions, dispatch),
        }
    }
)(SearchPanel);
