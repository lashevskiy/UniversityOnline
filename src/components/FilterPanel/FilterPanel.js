import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import Actions from './actions'
import EventPanelActions from '../EventPanel/actions'
import EventListPanelActions from '../EventListPanel/actions'
import GeoObjectListPanelActions from '../GeoObjectListPanel/actions'
import GeoListPanelActions from '../GeoListPanel/actions'
import axios from 'axios';
// import connect from '@vkontakte/vkui-connect';

import {
    Slider,
    InfoRow,
    SelectMimicry,
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
import Icon24Done from '@vkontakte/icons/dist/24/done';
import Icon24User from '@vkontakte/icons/dist/24/users';
import Icon28Newsfeed from '@vkontakte/icons/dist/28/newsfeed';
import Icon28Search from '@vkontakte/icons/dist/28/search';
import Icon28Notifications from '@vkontakte/icons/dist/28/notifications';
import Icon28Messages from '@vkontakte/icons/dist/28/messages';
import Icon28More from '@vkontakte/icons/dist/28/more';
import Icon24Globe from '@vkontakte/icons/dist/24/globe';
import Icon16Place from '@vkontakte/icons/dist/16/place';
import Icon16Dropdown from '@vkontakte/icons/dist/16/dropdown';
import '@vkontakte/vkui/dist/vkui.css';

import ObjectGroup from '../ObjectGroup'
import PlaceCell from '../PlaceCell'
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Cancel from '@vkontakte/icons/dist/24/cancel';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import AppActions from '../../containers/App/actions';
import { CATEGORIES_TYPE } from '../../containers/App/reducer';

const osname = platform();

class FilterPanel extends React.Component {

    constructor (props) {
        super(props);

        this.state = {
            search: '',

            value2: 10,
        };
    }

    componentDidMount() {
        const { data, actions } = this.props;
        // if (!data.length) {
        //     actions.fetchData();
        // }
    }

    onChange = (search) => {
        this.setState({ search });
    };

    get cityList () {
        const { data } = this.props;
        const search = this.state.search.toLowerCase();
        return data.filter(({name}) => name.toLowerCase().indexOf(search) > -1);
    }

    options () {
        let options = [];
        for (let i = 100; i <= 1500; i+=100) {
            options.push(<option value={`${i}`} key={`${i}`}>{i}</option>)
        }
        return options;
    }

    render() {
        const { id, categoriesTypeId, actions, actionsApp, isFreeType, isGeoFilter } = this.props;

        //console.log('FilterPanel', this.props)

        return (
            <Panel id={id}>
                <PanelHeader noShadow
                    left={
                        <HeaderButton
                            data-to={this.props.back}
                            onClick={(e) => {
                                actions.setCategoriesTypeId(this.props.categoriesTypeIdApp);
                                actions.setEventTypeId(this.props.eventTypeIdApp);
                                actions.setPlaceTypeId(this.props.placeTypeIdApp);
                                actions.setDateTypeId(this.props.dateTypeIdApp);
                                actions.setIsFreeType(this.props.isFreeTypeApp);
                                if(isGeoFilter) {
                                    actions.setSearchRadius(this.props.searchRadiusIdApp);
                                }

                                this.props.go(e);
                            }}
                        >
                            <Icon24Cancel/>
                            {/*{osname === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}*/}
                        </HeaderButton>
                    }
                >
                    Фильтры
                </PanelHeader>
                <FixedLayout vertical="top">
                    <Tabs>
                        <TabsItem
                            onClick={() => actions.setCategoriesTypeId(CATEGORIES_TYPE.event)}
                            selected={categoriesTypeId === CATEGORIES_TYPE.event}
                        >
                            События
                        </TabsItem>
                        <TabsItem
                            onClick={() => actions.setCategoriesTypeId(CATEGORIES_TYPE.place)}
                            selected={categoriesTypeId === CATEGORIES_TYPE.place}
                        >
                            Места
                        </TabsItem>
                    </Tabs>
                </FixedLayout>
                <div style={{ paddingTop: 48, paddingBottom: 54 }}>
                    <Group>
                        <FormLayout>
                            {categoriesTypeId === CATEGORIES_TYPE.event && (
                                <SelectMimicry
                                    top="Выберите категорию события"
                                    placeholder="Не выбрана"
                                    // onClick={() => this.setState({ activeView: 'countries' })}
                                    onClick={this.props.go}
                                    data-to={'EventTypeFilterPanel'}
                                >
                                    {this.props.eventTypeId.name}
                                </SelectMimicry>
                            )}
                            {categoriesTypeId === CATEGORIES_TYPE.place && (
                                <SelectMimicry
                                    top="Выберите категорию места"
                                    placeholder="Не выбрана"
                                    // onClick={() => this.setState({ activeView: 'countries' })}
                                    onClick={this.props.go}
                                    data-to={'PlaceTypeFilterPanel'}
                                >
                                    {this.props.placeTypeId.name}
                                </SelectMimicry>
                            )}
                            {categoriesTypeId === CATEGORIES_TYPE.event && (
                                <SelectMimicry
                                    top="Дата проведения события"
                                    placeholder="Не выбрана"
                                    // onClick={() => this.setState({ activeView: 'countries' })}
                                    onClick={this.props.go}
                                    data-to={'DateFilterPanel'}
                                >
                                    {this.props.dateTypeId.name}
                                </SelectMimicry>
                            )}

                            {isGeoFilter && (
                            <Slider
                                step={100}
                                min={100}
                                max={1500}
                                value={Number(this.props.searchRadiusId)}
                                onChange={value => this.props.actions.setSearchRadius(value)}
                                top="Радиус поиска в метрах"
                            />
                            )}
                            {/*{isGeoFilter && (*/}
                            {/*<Select*/}
                                {/*onChange={e => this.props.actions.setSearchRadius(e.target.value)}*/}
                                {/*value={String(this.props.searchRadiusId)}*/}
                            {/*>*/}
                                {/*{this.options()}*/}
                            {/*</Select>*/}
                            {/*)}*/}
                            {isGeoFilter && (
                                <Input value={String(this.props.searchRadiusId)} disabled/>
                            )}

                            {categoriesTypeId === CATEGORIES_TYPE.event && (
                                <Checkbox checked={isFreeType} onChange={() => actions.setIsFreeType(!isFreeType)}>Только бесплатные</Checkbox>
                            )}

                        </FormLayout>
                    </Group>
                </div>
                <FixedLayout vertical="bottom">
                    <Div>
                        <Button size="l"
                                stretched
                                data-to={this.props.back}
                                onClick={(e) => {

                                    actionsApp.setCategoriesTypeId(categoriesTypeId);
                                    if(categoriesTypeId === CATEGORIES_TYPE.event) {
                                        actionsApp.setEventTypeId(this.props.eventTypeId);
                                        actionsApp.setDateTypeId(this.props.dateTypeId.id);
                                        actionsApp.setIsFreeType(this.props.isFreeType);
                                    } else {
                                        actionsApp.setPlaceTypeId(this.props.placeTypeId);
                                    }

                                    if(isGeoFilter) {
                                        actionsApp.setSearchRadius(this.props.searchRadiusId);
                                        actionsApp.setIsNeedSetCenter(true);
                                    }

                                    this.props.actionsEventListPanel.setIsCanFetchData(true);
                                    this.props.actionsEventListPanel.setIsCanFetchDataTop(true);
                                    this.props.actionsGeoObjectListPanel.setIsCanFetchData(true);
                                    this.props.actionsGeoListPanel.setIsCanFetchData(true);
                                    this.props.go(e);
                                }}>
                            Найти
                        </Button>
                    </Div>
                </FixedLayout>
            </Panel>
        );
    }
}

const mapStateToProps = store => {
    return {
        eventTypeId: store.filterPanel.eventTypeId,
        placeTypeId: store.filterPanel.placeTypeId,
        categoriesTypeId: store.filterPanel.categoriesTypeId,
        isFreeType: store.filterPanel.isFreeType,
        searchRadiusId: store.filterPanel.searchRadiusId,

        eventTypeIdApp: store.appPanel.eventTypeId,
        placeTypeIdApp: store.appPanel.placeTypeId,
        categoriesTypeIdApp: store.appPanel.categoriesTypeId,
        isFreeTypeApp: store.appPanel.isFreeType,
        dateTypeIdApp: store.appPanel.dateTypeId,
        searchRadiusIdApp: store.appPanel.searchRadiusId,

        data: store.eventTypeFilterPanel.data,
        dateTypeId: store.dateFilterPanel.dateTypeIdList.filter(item => item.id === store.filterPanel.dateTypeId)[0],
    }
};

export default connect(
    mapStateToProps,
    (dispatch) => {
        return {
            actions: bindActionCreators(Actions, dispatch),
            actionsApp: bindActionCreators(AppActions, dispatch),
            actionsEventListPanel: bindActionCreators(EventListPanelActions, dispatch),
            actionsGeoObjectListPanel: bindActionCreators(GeoObjectListPanelActions, dispatch),
            actionsGeoListPanel: bindActionCreators(GeoListPanelActions, dispatch),
        }
    }
)(FilterPanel);
