import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import connect from '@vkontakte/vkui-connect';

import {
    RangeSlider,
    HeaderButton,
    InfoRow,
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
import Icon24Share from '@vkontakte/icons/dist/24/share';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import Icon24MoreHorizontal from '@vkontakte/icons/dist/24/more_horizontal';
import '@vkontakte/vkui/dist/vkui.css';

const osname = platform();


class PlaceCell extends React.Component {

    constructor (props) {
        super(props);
    }

    render() {
        const { name, description, img, onClick } = this.props;

        return (
            <Cell
                description={(description).substring(0,30)}
                bottomContent={<Button level="secondary" onClick={onClick} data-to="CoursePage">Учиться</Button>}
                before={<Avatar type="app" src={img} size={80}/>}
                size="l"
            >
                {name}
            </Cell>
        );
    }
}

export default PlaceCell;
