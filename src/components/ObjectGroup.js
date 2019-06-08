import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import connect from '@vkontakte/vkui-connect';

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
import LoadingAndError from './LoadingAndError';

const osname = platform();

class ObjectGroup extends React.Component {

    constructor (props) {
        super(props);

        this.state = {
        };
    }

    renderData() {
        const { header, description, courses, isLoading, isHasError, fetchData } = this.props;

        if(isHasError) {
            return <LoadingAndError isLoading={false} isHasError={isHasError} fetchData={() => fetchData()}/>;
        }

        return (
            <React.Fragment>
                {isLoading && (
                    <Footer>
                        <Spinner size="regular"/>
                    </Footer>
                )}
                {!isLoading && (
                    <Gallery
                        slideWidth="90%"
                        align="right"
                        style={{ height: '100%' }}
                    >
                        {courses}
                    </Gallery>
                )}
                {!isLoading && courses.length === 0 && (
                    <Footer>
                        <div>По Вашему запросу ничего не найдено. <br/>Попробуйте другие критерии поиска.</div>
                    </Footer>
                )}
            </React.Fragment>
        );
    }

    render() {
        const { header, description, courses, isLoading, isHasError, fetchData } = this.props;

        //console.log('ObjectGroup', courses);

        return (
            <Group description={description} style={{ paddingBottom: 8 }}>
                <Header level="2" aside={
                    <Link onClick={this.props.onClickShowAll}
                          data-story={this.props.dataStory}
                          data-to={this.props.dataToGo}>
                        Показать все
                    </Link>
                }>
                    {header}
                </Header>
                {this.renderData()}
            </Group>
        );
    }
}

export default ObjectGroup;
