import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import Actions from './actions'
//import AppActions from '../../containers/actions'
import axios from 'axios';
// import connect from '@vkontakte/vkui-connect';

import {
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
import ObjectCell from '../Cell/ObjectCell'
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import InfiniteScroll from 'react-infinite-scroller';
import EventPanelActions from '../EventPanel/actions';
import PlacePanelActions from '../PlacePanel/actions';


import { CATEGORIES_TYPE } from '../../containers/App/reducer';
import { getData } from './selectors';
import LoadingAndError from '../LoadingAndError';

const osname = platform();

class GeoListPanel extends React.Component {

    constructor (props) {
        super(props);

        this.state = {
        };
    }

    componentDidMount() {
        const { actions, isCanFetchData } = this.props;

        if(isCanFetchData) {
            actions.fetchData();
        }
    }

    render() {
        const { id, data, search, categoriesTypeId, isLoading } = this.props;

        //console.log('GeoListPanel', this.props);

        return (
            <Panel id={id}>
                <PanelHeader noShadow
                    left={<HeaderButton onClick={this.props.go} data-to={this.props.back}>
                        {osname === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}
                    </HeaderButton>}
                >
                    Рядом с Вами
                </PanelHeader>
                {!this.props.isLoading && data.length > 0 && (
                    <Group style={{ marginTop: 0 }}>
                        <List>
                            <InfiniteScroll
                                pageStart={0}
                                loadMore={() => !this.props.isHasErrorMore ? this.props.actions.fetchDataMore(this.props.nextPage) : null}
                                hasMore={this.props.hasMoreItems}
                                initialLoad={false}
                            >
                                {data.map((item, index) => {
                                    return (
                                        <ObjectCell
                                            viewType={this.props.viewType}
                                            key={item.id}
                                            item={item}
                                            categoriesTypeId={categoriesTypeId}
                                            onClick={(e) => {
                                                if(categoriesTypeId === CATEGORIES_TYPE.event) {
                                                    this.props.actionsEventPanel.setEventId(item.id);
                                                    this.props.actionsEventPanel.setBackPanel('GeoListPanel');
                                                } else {
                                                    this.props.actionsPlacePanel.setPlaceId(item.id);
                                                    this.props.actionsPlacePanel.setBackPanel('GeoListPanel');
                                                }
                                                this.props.go(e);
                                            }}
                                            dataToGo={categoriesTypeId === CATEGORIES_TYPE.event ? 'EventPanel' : 'PlacePanel'}
                                        />
                                    );
                                })}
                            </InfiniteScroll>
                        </List>
                    </Group>
                )}
                {this.props.isHasErrorMore &&
                    <LoadingAndError isLoading={false} isHasError={this.props.isHasErrorMore} fetchData={() => this.props.actions.setIsHasErrorMore(false)}/>
                }
                {!isLoading && data.length === 0 && (
                    <Footer>
                        <div>По Вашему запросу ничего не найдено. <br/>Попробуйте другие критерии поиска.</div>
                    </Footer>
                )}
                {(this.props.nextPage || this.props.isLoading) && !this.props.isHasErrorMore && (
                    <Footer>
                        <Spinner size="regular"/>
                    </Footer>
                )}
            </Panel>
        );
    }
}

const mapStateToProps = store => {
    return {
        isCanFetchData: store.geoListPanel.isCanFetchData,
        data: getData(store),
        count: store.geoListPanel.count,
        nextPage: store.geoListPanel.nextPage,
        isLoading: store.geoListPanel.isLoading,
        isHasErrorMore: store.geoListPanel.isHasErrorMore,
        hasMoreItems: store.geoListPanel.hasMoreItems,

        categoriesTypeId: store.appPanel.categoriesTypeId,

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
)(GeoListPanel);
