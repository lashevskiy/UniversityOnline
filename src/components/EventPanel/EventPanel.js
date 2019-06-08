import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import Actions from './actions'
import axios from 'axios';
import PlacePanelActions from '../PlacePanel/actions'
import MapPanelActions from '../MapPanel/actions'
// import connect from '@vkontakte/vkui-connect';

import {
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
import '@vkontakte/vkui/dist/vkui.css';

import ObjectGroup from '../ObjectGroup'
import PlaceCell from '../PlaceCell'
import { renderDate, getImageSrcByIndex } from '../../utils/utils.js'
import { capitalize, renderData } from '../../utils/utils';
import LoadingAndError from '../LoadingAndError';

const osname = platform();

class EventPanel extends React.Component {

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
        this.onStoryChange = this.onStoryChange.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        const { actions, eventId } = this.props;
        actions.fetchData(eventId);
    }

    // componentWillUnmount() {
    //     this.props.actions.clearData();
    // }

    onStoryChange (e) {
        this.setState({ activeStory: e.currentTarget.dataset.story })
    }

    onChange (search) { this.setState({ search }); }

    get studyCourses() {
        const { courses } = this.props;
        return courses.filter((name) => name.study === true);
    }

    go = (e) => {
        this.setState({ activePanel: e.currentTarget.dataset.to });
    };

    createMarkup(html) {
        return { __html: html };
    };

    renderDate() {
        const { data } = this.props;
        return renderDate(data);
    }

    renderDateTime() {
        const { data } = this.props;

        if (data.dates && data.dates.length > 0) {
            if(data.dates[data.dates.length - 1].use_place_schedule) {
                return 'Соответствует времени работы места проведения'
            } else {
                return (
                    <div>
                        {data.dates && data.dates[data.dates.length - 1].start_time}
                        {data.dates && data.dates[data.dates.length - 1].end_time ? <span>&mdash;</span> : ''}
                        {data.dates && data.dates[data.dates.length - 1].end_time}
                    </div>
                );
            }
        } else {
            return 'Не указано'
        }
    }

    get otherPropsPlace() {
        const { data } = this.props;

        let otherPropsPlace = null;
        if (data.place && data.place.is_stub === false) {
            otherPropsPlace = {
                expandable: true,
                onClick:    (e) => {
                    this.props.actionsPlacePanel.setPlaceId(data.place.id);
                    this.props.actionsPlacePanel.setBackPanel('EventPanel');
                    this.props.go(e);
                }
            };
        }

        return otherPropsPlace;
    }

    get otherPropsAddress() {
        const { data } = this.props;

        let otherPropsAddress = null;
        if (data.place && data.place.address) {
            otherPropsAddress = {
                expandable: true,
                onClick:    (e) => {
                    this.props.actionsMapPanel.setPlaces([data.place]);
                    this.props.actionsMapPanel.setBackPanel('EventPanel');
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
                <Group title="Стоимость и время проведения">
                    <List>
                        <Cell multiline>
                            <InfoRow title="Когда?">
                                {this.renderDate()}
                            </InfoRow>
                        </Cell>
                        <Cell multiline>
                            <InfoRow title="Время">
                                {this.renderDateTime()}
                            </InfoRow>
                        </Cell>
                        <Cell multiline>
                            <InfoRow title="Стоимость">
                                {data.is_free ? 'Бесплатно' : renderData(data.price)}
                            </InfoRow>
                        </Cell>
                    </List>
                </Group>
                <Group title="Контакты">
                    <List>
                        <Cell
                            {...this.otherPropsPlace}
                            multiline
                            before={<Icon24Home />}
                            data-to={'PlacePanel'}
                        >
                            <InfoRow title="Место проведения">
                                {renderData(data.place && data.place.title)}
                            </InfoRow>
                        </Cell>
                        <Cell
                            {...this.otherPropsAddress}
                            multiline
                            before={<Icon24Place />}
                            data-to={'MapPanel'}
                        >
                            <InfoRow title="Адрес">
                                {renderData(data.place && data.place.address)}
                            </InfoRow>
                        </Cell>
                        <Cell before={<Icon24Pin />} multiline>
                            <InfoRow title="Ближайшее метро">
                                {renderData(data.place && data.place.subway)}
                            </InfoRow>
                        </Cell>
                        <Cell before={<Icon24Phone />} multiline>
                            <InfoRow title="Номер телефона">
                                {renderData(data.place && data.place.phone)}
                            </InfoRow>
                        </Cell>
                    </List>
                </Group>
                <Group title="Описание">
                    <Div>
                        <div dangerouslySetInnerHTML={this.createMarkup(data.body_text)} />
                    </Div>
                </Group>
                {/*<Group>*/}
                {/*<List>*/}
                {/*<Cell*/}
                {/*expandable={true}*/}
                {/*// href="https://vk.me/club153259801"*/}
                {/*target="_blank"*/}
                {/*// before={<Icon24Home/>}*/}
                {/*>*/}
                {/*<InfoRow title="Источник данных">*/}
                {/*<Link href={data.site_url}>{data.site_url}</Link>*/}
                {/*</InfoRow>*/}
                {/*</Cell>*/}
                {/*</List>*/}
                {/*</Group>*/}
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

        //console.log('EventPanel', this.props)

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
                            data-to={this.props.backPanel || this.props.back}
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
        eventId: store.eventPanel.eventId,
        data: store.eventPanel.data,
        isLoading: store.eventPanel.isLoading,
        isHasError: store.eventPanel.isHasError,
        backPanel: store.eventPanel.backPanel,
    }
};

export default connect(
    mapStateToProps,
    (dispatch) => {
        return {
            actions: bindActionCreators(Actions, dispatch),
            actionsPlacePanel: bindActionCreators(PlacePanelActions, dispatch),
            actionsMapPanel: bindActionCreators(MapPanelActions, dispatch),
        }
    }
)(EventPanel);
