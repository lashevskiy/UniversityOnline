import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import Actions from './actions'
import axios from 'axios';
// import connect from '@vkontakte/vkui-connect';

import {
    Spinner,
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
    Gallery
} from '@vkontakte/vkui';
import Icon24User from '@vkontakte/icons/dist/24/users';
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
import Icon24Dropdown from '@vkontakte/icons/dist/24/dropdown';
import '@vkontakte/vkui/dist/vkui.css';

import ObjectGroup from '../ObjectGroup'
import PlaceCell from '../PlaceCell'
import MapPanelActions from '../MapPanel/actions';
import LoadingAndError from '../LoadingAndError';
import { capitalize, getImageSrcByIndex, renderData } from '../../utils/utils';

const osname = platform();

class PlacePanel extends React.Component {

    constructor (props) {
        super(props);

        this.state = {
            activeStory: 'more',
            activePanel: 'home',
            activeTab: 'groups',
            search: '',

            data: [],
            dropdown: true,
        };
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        const { actions, placeId } = this.props;
        actions.fetchData(placeId);
    }

    createMarkup(html) {
        return { __html: html };
    };

    renderDate() {
        const { data } = this.props;
        return (
            <div>
                {data.dates && new Date(data.dates[data.dates.length-1].start_date).toLocaleString("ru", {day: 'numeric', month: 'long' })}
                -
                {data.dates && new Date(data.dates[data.dates.length-1].end_date).toLocaleString("ru", {day: 'numeric', month: 'long', year: 'numeric' })}
            </div>
        );
    }

    renderDateTime() {
        const { data } = this.props;
        return (
            <div>
                {data.dates && data.dates[data.dates.length-1].start_time}
                -
                {data.dates && data.dates[data.dates.length-1].end_time}
            </div>
        );
    }

    get otherPropsAddress() {
        const { data } = this.props;

        let otherPropsAddress = null;
        if (data.address !== null) {
            otherPropsAddress = {
                expandable: true,
                onClick:    (e) => {
                    this.props.actionsMapPanel.setPlaces([data]);
                    this.props.actionsMapPanel.setBackPanel('PlacePanel');
                    this.props.go(e);
                }
            };
        }

        return otherPropsAddress;
    }

    renderData() {
        const { id, data } = this.props;
        const { isLoading, isHasError } = this.props;

        if(isLoading || isHasError) {
            return <LoadingAndError isLoading={isLoading} isHasError={isHasError} fetchData={() => this.fetchData()}/>;
        }

        let style = {
            maxHeight: this.state.dropdown === true ? '150px' : '',
            overflow: 'hidden',
        };

        let style2 = {
            margin: 'auto',
            transform: this.state.dropdown === true ? '' : 'rotate(180deg)',
        };

        return (
            <React.Fragment>
                <Group style={{marginTop: 0}}>
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
                </Group>
                <Group>
                    <Header>
                        {capitalize(data.title)}
                    </Header>
                    <Div style={{paddingTop: 0}}>
                        <div dangerouslySetInnerHTML={this.createMarkup(data.description)} />
                    </Div>
                </Group>
                <Group>
                    <Div>
                        <InfoRow title="Расписание работы">
                            {renderData(data.timetable)}
                        </InfoRow>
                    </Div>
                </Group>
                <Group title="Контакты">
                    <List>
                        <Cell
                            {...this.otherPropsAddress}
                            multiline
                            before={<Icon24Place />}
                            data-to={'MapPanel'}
                        >
                            <InfoRow title="Адрес">
                                {renderData(data.address)}
                            </InfoRow>
                        </Cell>
                        {data.subway && (
                            <Cell before={<Icon24Pin/>} multiline>
                                <InfoRow title="Ближайшее метро">
                                    {renderData(data.subway)}
                                </InfoRow>
                            </Cell>
                        )}
                        <Cell before={<Icon24Phone />} multiline>
                            <InfoRow title="Номер телефона">
                                {renderData(data.phone)}
                            </InfoRow>
                        </Cell>
                        {data.foreign_url &&
                        <Cell
                            before={<Icon24Home/>}
                            expandable={true}
                            href={data.foreign_url}
                            target="_blank"
                        >
                            Перейти на сайт
                        </Cell>
                        }
                    </List>
                </Group>
                <Group title="Описание">
                    <Div>
                        <div dangerouslySetInnerHTML={this.createMarkup(data.body_text)} />
                    </Div>

                    {/*<Cell onClick={()=>this.setState({dropdown: !this.state.dropdown})}>*/}
                        {/*<Icon24Dropdown style={style2}/>*/}
                    {/*</Cell>*/}
                </Group>
                {data.site_url &&
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
                }
            </React.Fragment>
        );
    }

    render() {
        const { id, data } = this.props;

        //console.log('PlacePanel', this.props)

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
                            data-to={this.props.backPanel ? this.props.backPanel : this.props.back}
                        >
                            {osname === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}
                        </HeaderButton>
                    }
                >
                    {capitalize(data.title)}
                </PanelHeader>
                {this.renderData()}
            </Panel>
        );
    }
}

const mapStateToProps = store => {
    return {
        placeId: store.placePanel.placeId,
        data: store.placePanel.data,
        isLoading: store.placePanel.isLoading,
        isHasError: store.placePanel.isHasError,
        backPanel: store.placePanel.backPanel,
    }
};

export default connect(
    mapStateToProps,
    (dispatch) => {
        return {
            actions: bindActionCreators(Actions, dispatch),
            actionsMapPanel: bindActionCreators(MapPanelActions, dispatch),
        }
    }
)(PlacePanel);
