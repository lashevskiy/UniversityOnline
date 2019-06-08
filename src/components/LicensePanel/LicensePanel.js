import React from 'react';
import { connect } from 'react-redux';
import VKConnect from '@vkontakte/vkui-connect';
import { bindActionCreators } from 'redux';
import Actions from './actions';
import EventPanelActions from '../EventPanel/actions';
import PlacePanelActions from '../PlacePanel/actions';
import MoviePanelActions from '../MoviePanel/actions';
//import InfiniteScroll from 'react-infinite-scroll-component';

import {
    ActionSheet,
    ActionSheetItem,
    Avatar,
    Button,
    Cell,
    CellButton,
    Checkbox,
    Div,
    Epic,
    FixedLayout,
    Footer,
    FormLayout,
    FormLayoutGroup,
    Gallery,
    Group,
    Header,
    HeaderButton,
    HorizontalScroll,
    InfoRow,
    Input,
    IOS,
    Link,
    List,
    ListItem,
    Panel,
    PanelHeader,
    platform,
    PopoutWrapper,
    Radio,
    Search,
    Select,
    Spinner,
    Switch,
    Tabbar,
    TabbarItem,
    Tabs,
    TabsItem,
    Textarea,
    View
} from '@vkontakte/vkui';
import Icon24Message from '@vkontakte/icons/dist/24/message';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';

import Icon24User from '@vkontakte/icons/dist/24/users';
import '@vkontakte/vkui/dist/vkui.css';
import AppActions from '../../containers/App/actions';

import axios from 'axios';
import { CITIES } from '../../containers/AppContainer/AppContainer';

const osname = platform();

class LicensePanel extends React.Component {

    constructor(props) {
        super(props);

        this.formData = null;

        this.state = {
            email: '',
            purpose: '',
            phone: ''
        }

        this.addressItems = [
            { label: 'Почтовый индекс', name: 'zip' },
            { label: 'Страна', name: 'country' },
            { label: 'Город', name: 'city' }
        ];

        this.onChange = this.onChange.bind(this);
    }

    onChange(e) {
        const { name, value } = e.currentTarget;
        this.setState({ [name]: value });
    }



    // componentDidMount() {
    //     axios.get('http://localhost:4000/todos/')
    //          .then(response => {
    //              this.setState({ todos: response.data });
    //
    //              this.setState({ email: response.data.pop().todo_description})
    //          })
    //          .catch(function (error){
    //              console.log(error);
    //          })
    // }


    componentDidMount() {


        // this.formData = new FormData();
        //
        // this.formData.append('user', 'ARTEM LASHEVSKIY');
        //
        // axios({
        //     method: 'post',
        //     url: "https://it-apps.ru/php/hacAddAbit.php",
        //     data: this.formData,
        //     config: { headers: {'Content-Type': 'multipart/form-data' }}
        // })
        //     .then((response) => {
        //         console.log('lol', response)
        //     })
        //     .catch(function (error){
        //         console.log('error', error)
        //     });



        VKConnect.subscribe((e) => {
            switch (e.detail.type) {
                // case 'VKWebAppGetEmail': {
                //     const user = e.detail.data;
                //
                //     console.log('ARTEM', user)
                //
                //     break;
                // }
                case 'VKWebAppGetPersonalCardResult': {
                    const data = e.detail.data;
                    console.log('ARTEM 2222', data)
                    break;
                }
                case 'VKWebAppGetPersonalCardFailed': {
                    const data = e.detail.data;
                    console.log('ARTEM 333', data)
                    break;
                }
                case 'VKWebAppGetEmailResult': {
                    const data = e.detail.data;
                    this.setState({ email: data.email });
                    console.log('ARTEM 2222', data)
                    break;
                }
                case 'VKWebAppGetEmailFailed': {
                    const data = e.detail.data;
                    console.log('ARTEM 333', data)
                    break;
                }
                case 'VKWebAppGetPhoneNumberResult': {
                    const data = e.detail.data;
                    this.setState({ phone: data.phone_number });
                    console.log('ARTEM 2222', data)
                    break;
                }
                case 'VKWebAppGetPhoneNumberFailed': {
                    const data = e.detail.data;
                    console.log('ARTEM 333', data)
                    break;
                }
                default: {
                    //actionsApp.setUser({});
                    //console.log('CCCCC', e.detail.type);
                }
            }
        });

    }

    render() {
        const { email, purpose } = this.state;

        return (
            <Panel id={this.props.id} >
                <PanelHeader
                    left={
                        <HeaderButton
                            onClick={(e) => {
                                this.props.go(e);
                            }}
                            data-to={this.props.back}
                        >
                            {osname === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}
                        </HeaderButton>
                    }
                >
                    Анкета абитуриента
                </PanelHeader>
                <Group>
                <FormLayout>

                    {/*<FormLayoutGroup top="Пароль" bottom="Пароль может содержать только латинские буквы и цифры.">*/}
                        {/*<Input type="password"  placeholder="Введите пароль" />*/}
                        {/*<Input type="password" placeholder="Повторите пароль" />*/}
                    {/*</FormLayoutGroup>*/}

                    <Input top="Фамилия" />
                    <Input top="Имя" />
                    <Input top="Отчество" />

                    <Input
                        type="email"
                        onFocus={() => VKConnect.send('VKWebAppGetEmail', {})}
                        // onFocus={() => VKConnect.send("VKWebAppGetPersonalCard", {"type": ["phone", "email"]})}
                        autocomplete="off"
                        top="E-mail"
                        name="email"
                        value={email}
                        onChange={this.onChange}
                        status={email ? 'valid' : 'error'}
                        // bottom={email ? 'Электронная почта введена верно!' : 'Пожалуйста, введите электронную почту'}
                    />

                    <Input
                        type="phone"
                        onFocus={() => VKConnect.send('VKWebAppGetPhoneNumber', {})}
                        // onFocus={() => VKConnect.send("VKWebAppGetPersonalCard", {"type": ["phone", "email"]})}
                        autocomplete="off"
                        top="Телефон"
                        name="phone"
                        value={this.state.phone}
                        onChange={this.onChange}
                        // status={email ? 'valid' : 'error'}
                        // bottom={email ? 'Электронная почта введена верно!' : 'Пожалуйста, введите электронную почту'}
                    />

                    <Select top="Пол" placeholder="Выберите пол">
                        <option value="m">Мужской</option>
                        <option value="f">Женский</option>
                    </Select>

                    <FormLayoutGroup top="Тип документа">
                        <Radio name="type">Паспорт</Radio>
                        <Radio name="type">Загран</Radio>
                    </FormLayoutGroup>

                    {this.addressItems.map(({ label, name }) => (
                        <Input type="text" name={name} key={name} top={label} />
                    ))}

                    <Select
                        top="Цель поездки"
                        placeholder="Выберите цель поездки"
                        status={purpose ? 'valid' : 'error'}
                        bottom={purpose ? '' : 'Пожалуйста, укажите цель поездки'}
                        onChange={this.onChange}
                        value={purpose}
                        name="purpose"
                    >
                        <option value="0">Бизнес или работа</option>
                        <option value="1">Индивидуальный туризм</option>
                        <option value="2">Посещение близких родственников</option>
                    </Select>

                    <Textarea top="О себе" />

                    <Checkbox>Согласен со всем <Link>этим</Link></Checkbox>
                    <Button size="xl">Зарегистрироваться</Button>
                </FormLayout>
                </Group>
                {/*<Group>*/}
                    {/*<List>*/}
                        {/*<Cell multiline>*/}
                            {/*<InfoRow title="Информация об источнике данных">*/}
                                {/*KudaGo - это бесплатная база событий и мест для разработчиков, вебмастеров и партнеров. Сервис по продвижению событий и мест KudaGo.com ежемесячно добавляет в свою базу от 3 до 5 тысяч событий, проходящих в крупнейших городах России, в Киеве и Нью-Йорке.*/}
                            {/*</InfoRow>*/}
                        {/*</Cell>*/}
                    {/*</List>*/}
                {/*</Group>*/}
                {/*<Group>*/}
                    {/*<List>*/}
                        {/*<Cell href="https://docs.kudago.com/api/#page:%D0%BB%D0%B8%D1%86%D0%B5%D0%BD%D0%B7%D0%B8%D0%BE%D0%BD%D0%BD%D0%BE%D0%B5-%D1%81%D0%BE%D0%B3%D0%BB%D0%B0%D1%88%D0%B5%D0%BD%D0%B8%D0%B5-%D0%BE%D1%82%D0%BA%D1%80%D1%8B%D1%82%D0%B0%D1%8F-%D0%BB%D0%B8%D1%86%D0%B5%D0%BD%D0%B7%D0%B8%D1%8F-" target="_blank"*/}
                              {/*before={<Icon24User />}*/}
                              {/*description="Лицензионное соглашение">Ссылка на лицензионное соглашение</Cell>*/}
                    {/*</List>*/}
                {/*</Group>*/}
            </Panel>
        );
    }
}

const mapStateToProps = store => {
    return {
        // isCanFetchData: store.movieListPanel.isCanFetchData,
        // data: store.movieListPanel.data,
        // count: store.movieListPanel.count,
        // nextPage: store.movieListPanel.nextPage,
        // isLoading: store.movieListPanel.isLoading,
        // cityId: store.appPanel.cityId,
        // eventTypeId: store.appPanel.eventTypeId,
        // placeTypeId: store.appPanel.placeTypeId,
        // categoriesTypeId: store.appPanel.categoriesTypeId,
        //
        // hasMoreItems: store.movieListPanel.hasMoreItems,
        //
        // fetchedUser: store.appPanel.user,
        // viewType: store.appPanel.viewType,
    }
};

export default connect(
    mapStateToProps,
    (dispatch) => {
        return {
            // actions: bindActionCreators(Actions, dispatch),
            // actionsEventPanel: bindActionCreators(EventPanelActions, dispatch),
            // actionsPlacePanel: bindActionCreators(PlacePanelActions, dispatch),
            // actionsMoviePanel: bindActionCreators(MoviePanelActions, dispatch),
            // actionsApp: bindActionCreators(AppActions, dispatch),
        }
    }
)(LicensePanel);
