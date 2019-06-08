import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import Actions from './actions'
import EventPanelActions from '../EventPanel/actions'
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
import Icon24Back from '@vkontakte/icons/dist/24/back';
import AppActions from '../../containers/App/actions';
import FilterPanelActions from '../FilterPanel/actions';
import LoadingAndError from '../LoadingAndError';

const osname = platform();

class PlaceTypeFilterPanel extends React.Component {

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
        const { isLoading, isHasError } = this.props;

        if(isLoading || isHasError) {
            return <LoadingAndError isLoading={isLoading} isHasError={isHasError} fetchData={() => this.fetchData()}/>;
        }

        let placeTypeArray = this.cityList;

        return (
            <React.Fragment>
                <Search value={this.state.search} onChange={this.onChange}/>
                {placeTypeArray.length > 0 && !this.props.isLoading && (
                    <List>
                        {placeTypeArray.map(city => {
                            return (
                                <Cell key={city.slug}
                                      multiline
                                      asideContent={this.props.placeTypeId.slug === city.slug ? <Icon24Done fill="#528bcc" /> : null}
                                      onClick={(e) => {
                                          this.props.actionsFilterPanel.setPlaceTypeId(city);
                                          this.props.go(e);
                                      }}
                                      data-to={'FilterPanel'}>
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
                {(placeTypeArray.length === 0 && !this.props.isLoading) && (
                    <Footer>
                        <div>По Вашему запросу ничего не найдено. <br/>Попробуйте другие критерии поиска.</div>
                    </Footer>
                )}
            </React.Fragment>
        )
    }

    render() {
        const { id } = this.props;

        //console.log('PlaceTypeFilterPanel', this.props)

        return (
            <Panel id={id}>
                <PanelHeader noShadow
                    left={<HeaderButton onClick={this.props.go} data-to={this.props.back}>
                        {osname === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}
                    </HeaderButton>}
                >
                    Выберите категорию
                </PanelHeader>
                {this.renderData()}
            </Panel>
        );
    }
}

const mapStateToProps = store => {
    return {
        placeTypeId: store.filterPanel.placeTypeId,
        data: store.placeTypeFilterPanel.data,
        isLoading: store.placeTypeFilterPanel.isLoading,
        isHasError: store.placeTypeFilterPanel.isHasError,
    }
};

export default connect(
    mapStateToProps,
    (dispatch) => {
        return {
            actions: bindActionCreators(Actions, dispatch),
            actionsApp: bindActionCreators(AppActions, dispatch),
            actionsFilterPanel: bindActionCreators(FilterPanelActions, dispatch),
        }
    }
)(PlaceTypeFilterPanel);
