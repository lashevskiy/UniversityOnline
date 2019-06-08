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
import Icon24Back from '@vkontakte/icons/dist/24/back';
import FilterPanelActions from '../FilterPanel/actions';

const osname = platform();

class DateFilterPanel extends React.Component {

    constructor (props) {
        super(props);
    }

    componentDidMount() {
        const { data, actions } = this.props;
        // if (!data.length) {
        //     actions.fetchData();
        // }
    }

    render() {
        const { id, dateTypeId, dateTypeIdList } = this.props;

        //console.log('DateFilterPanel', this.props)

        return (
            <Panel id={id}>
                <PanelHeader noShadow
                    left={<HeaderButton onClick={this.props.go} data-to={this.props.back}>
                        {osname === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}
                    </HeaderButton>}
                >
                    Дата проведения события
                </PanelHeader>
                <Group>
                    <List>
                        {dateTypeIdList && dateTypeIdList.map((dateItem) => {
                            return (
                                <Cell key={dateItem.id}
                                      asideContent={dateTypeId === dateItem.id ? <Icon24Done fill="#528bcc"/> : null}
                                      onClick={(e) => {
                                          this.props.actionsFilterPanel.setDateTypeId(dateItem.id);
                                          this.props.go(e);
                                      }}
                                      data-to={'FilterPanel'}>
                                    {dateItem.name}
                                </Cell>
                            );
                        })}
                    </List>
                </Group>
            </Panel>
        );
    }
}

const mapStateToProps = store => {
    return {
        dateTypeIdList: store.dateFilterPanel.dateTypeIdList,
        dateTypeId: store.filterPanel.dateTypeId,
    }
};

export default connect(
    mapStateToProps,
    (dispatch) => {
        return {
            actions: bindActionCreators(Actions, dispatch),
            actionsFilterPanel: bindActionCreators(FilterPanelActions, dispatch),
        }
    }
)(DateFilterPanel);
