import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import Actions from './actions'
import EventPanelActions from '../EventPanel/actions'
import PlacePanelActions from '../PlacePanel/actions'
import MoviePanelActions from '../MoviePanel/actions'
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroller';
//import InfiniteScroll from 'react-infinite-scroll-component';
import VKConnect from '@vkontakte/vkui-connect';

import {
    Switch,
    InfoRow,
    HeaderButton,
    Spinner,
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
import Icon24Followers from '@vkontakte/icons/dist/24/followers';
import Icon24Message from '@vkontakte/icons/dist/24/message';
import Icon24User from '@vkontakte/icons/dist/24/users';
import Icon24Share from '@vkontakte/icons/dist/24/share';
import Icon24MoneyCircle from '@vkontakte/icons/dist/24/money_circle';
import Icon28Newsfeed from '@vkontakte/icons/dist/28/newsfeed';
import Icon28Search from '@vkontakte/icons/dist/28/search';
import Icon28Notifications from '@vkontakte/icons/dist/28/notifications';
import Icon28Messages from '@vkontakte/icons/dist/28/messages';
import Icon28More from '@vkontakte/icons/dist/28/more';
import Icon24Globe from '@vkontakte/icons/dist/24/globe';
import Icon16Place from '@vkontakte/icons/dist/16/place';
import Icon16Dropdown from '@vkontakte/icons/dist/16/dropdown';
import Icon24Dropdown from '@vkontakte/icons/dist/24/dropdown';
import Icon24MoreHorizontal from '@vkontakte/icons/dist/24/more_horizontal';
import Icon24Search from '@vkontakte/icons/dist/24/search';
import Icon24Filter from '@vkontakte/icons/dist/24/filter';
import Icon16Recent from '@vkontakte/icons/dist/16/recent';
import '@vkontakte/vkui/dist/vkui.css';

import ObjectGroup from '../ObjectGroup'
import PlaceCell from '../PlaceCell'
import ObjectCell from '../Cell/ObjectCell'
import AppActions from '../../containers/App/actions';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import { CATEGORIES_TYPE } from '../../containers/App/reducer';

const osname = platform();

class UserPanel extends React.Component {

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
    }

    componentDidMount() {
    }

    render() {
        const { id, fetchedUser, data, count, cityId, eventTypeId, placeTypeId, categoriesTypeId } = this.props;

        //console.log('UserPanel', this.props)

        return (
            <Panel id={id}>
                <PanelHeader>
                    Личный кабинет
                </PanelHeader>
                {fetchedUser && (
                <Group title="Приветствуем Вас">
                    <ListItem
                        before={fetchedUser.photo_200 ? <Avatar src={fetchedUser.photo_200}/> : null}
                        description={fetchedUser.city && fetchedUser.city.title ? fetchedUser.city.title : ''}
                    >
                        {`${fetchedUser.first_name} ${fetchedUser.last_name}`}
                    </ListItem>
                </Group>
                )}
                {/*{fetchedUser && fetchedUser.id == "11828988" && (*/}
                <Group title='Внешний вид'>
                    <List>
                        <Cell multiline
                              asideContent={<Switch defaultChecked={this.props.viewType} onChange={(e) => this.props.actionsApp.setViewType(e.target.checked)}/> }
                              // description='В списке событий и мест показывать их изображения при предварительном просмотре'
                              description='Отображать изображения при предварительном просмотре'
                        >
                            Крупный вид с фотографиями
                        </Cell>
                    </List>
                </Group>
                {/*)}*/}
                <Group title="Обратная связь и реклама">
                    <List>
                        <Cell href="https://vk.me/club153259801" target="_blank" expandable={true}
                              before={<Icon24MoneyCircle />} description="Сотрудничество и реклама в сервисе">По вопросам рекламы</Cell>
                        <Cell href="https://vk.com/club153259801" target="_blank" expandable={true}
                              before={<Icon24User />}
                              description="Наша группа ВКонтакте">Официальное сообщество</Cell>
                        <Cell href="https://vk.me/id11828988" target="_blank" expandable={true}
                              before={<Icon24Message />} description="Любые вопросы и предложения">Написать разработчику</Cell>
                    </List>
                </Group>
                <Group title="Поделиться с друзьями">
                    <List>
                        <Cell before={<Icon24Share />}
                              multiline
                              expandable={true}
                              description="Рассказать друзьям, опубликовать в сообществе или отправить сообщением другу"
                              onClick={() => VKConnect.send("VKWebAppShare", {'link': 'https://vk.com/app6841964'})}
                        >
                            Поделиться ссылкой на сервис
                        </Cell>
                        <Cell before={<Icon24Followers />}
                              multiline
                              expandable={true}
                              description="Публикация записи с кратким описанием сервиса у себя на стене"
                              onClick={() => VKConnect.send('VKWebAppShowWallPostBox', {
                                  'message': 'Не знаешь куда сходить? Здесь есть ответ! Информационный сервис поиска мест и событий рядом с текущим местонахождением пользователя. Поможет выбрать куда сходить и что посмотреть.',
                                  'attachments': 'photo-153259801_247638718,https://vk.com/app6841964'
                              })}
                        >
                            Публикация записи на Вашей стене
                        </Cell>
                    </List>
                </Group>
                <Group>
                    <List>
                        <Cell multiline>
                            <InfoRow title="Информация о сервисе">
                                Информационный сервис поиска мест и событий рядом с текущим местонахождением пользователя. Поможет выбрать куда сходить и что посмотреть.
                            </InfoRow>
                        </Cell>
                    </List>
                </Group>
                <Group>
                    <List>
                        <Cell multiline
                              onClick={(e) => {
                                  this.props.go(e);
                              }}
                              data-to={'LicensePanel'}
                              // before={<Icon24User />}
                              description="Необходимо заполнить для подачи документов онлайн">Анкета абитуриента</Cell>
                    </List>
                </Group>
            </Panel>
        );
    }
}

const mapStateToProps = store => {
    return {
        isCanFetchData: store.movieListPanel.isCanFetchData,
        data: store.movieListPanel.data,
        count: store.movieListPanel.count,
        nextPage: store.movieListPanel.nextPage,
        isLoading: store.movieListPanel.isLoading,
        cityId: store.appPanel.cityId,
        eventTypeId: store.appPanel.eventTypeId,
        placeTypeId: store.appPanel.placeTypeId,
        categoriesTypeId: store.appPanel.categoriesTypeId,

        hasMoreItems: store.movieListPanel.hasMoreItems,

        fetchedUser: store.appPanel.user,
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
            actionsMoviePanel: bindActionCreators(MoviePanelActions, dispatch),
            actionsApp: bindActionCreators(AppActions, dispatch),
        }
    }
)(UserPanel);
