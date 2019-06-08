import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
//import connect from '@vkontakte/vkui-connect';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

import {
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
import '@vkontakte/vkui/dist/vkui.css';

import { CATEGORIES_TYPE } from '../containers/App/reducer';
import ObjectCell from '../components/Cell/ObjectCell'
import Actions from './OverviewPanel/actions';
import EventPanelActions from './EventPanel/actions';
import PlacePanelActions from './PlacePanel/actions';
import OverviewPlacePanelActions from './OverviewPlacePanel/actions';
import OverviewEventPanelActions from './OverviewEventPanel/actions';
import MovieListPanelActions from './MovieListPanel/actions';
import MoviePanelActions from './MoviePanel/actions';
import AppActions from '../containers/App/actions';

const osname = platform();

class ObjectItemCell extends React.Component {

    constructor (props) {
        super(props);

        this.state = {
        };
    }

    render() {
        const { item, categoriesTypeId, backPanel } = this.props;

        //console.log('ObjectItemCell', this.props);

        if(item) {
            return (
                <ObjectCell
                    key={item.id}
                    item={item}
                    categoriesTypeId={categoriesTypeId}
                    onClick={(e) => {
                        if(categoriesTypeId === CATEGORIES_TYPE.event) {
                            this.props.actionsEventPanel.setEventId(item.id);
                            this.props.actionsEventPanel.setBackPanel(backPanel);
                        } else {
                            this.props.actionsPlacePanel.setPlaceId(item.id);
                            this.props.actionsPlacePanel.setBackPanel(backPanel);
                        }
                        this.props.go(e);
                    }}
                    oneString = {true}
                    dataToGo={categoriesTypeId === CATEGORIES_TYPE.event ? 'EventPanel' : 'PlacePanel'}
                />
            )
        }

        return null;
    }
}

const mapStateToProps = store => {
    return {
    }
};

export default connect(
    mapStateToProps,
    (dispatch) => {
        return {
            actionsEventPanel: bindActionCreators(EventPanelActions, dispatch),
            actionsPlacePanel: bindActionCreators(PlacePanelActions, dispatch),
        }
    }
)(ObjectItemCell);
