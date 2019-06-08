import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import Actions from './actions'
import EventPanelActions from '../EventPanel/actions'
import PlacePanelActions from '../PlacePanel/actions'
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroller';
//import InfiniteScroll from 'react-infinite-scroll-component';
// import connect from '@vkontakte/vkui-connect';

import { YMaps, Map, Placemark, GeolocationControl, Clusterer, Circle, GeoObject, FullscreenControl, Button as ButtonMap } from 'react-yandex-maps';

import {
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
import Icon24User from '@vkontakte/icons/dist/24/users';
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
import Icon24List from '@vkontakte/icons/dist/24/list';
import '@vkontakte/vkui/dist/vkui.css';
import VKConnect from '@vkontakte/vkui-connect';

import ObjectGroup from '../ObjectGroup'
import PlaceCell from '../PlaceCell'
import ObjectCell from '../Cell/ObjectCell'
import AppActions from '../../containers/App/actions';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import { CATEGORIES_TYPE } from '../../containers/App/reducer';
import { capitalize } from '../../utils/utils';

import { getData } from './selectors'
import GeoListPanelActions from '../GeoListPanel/actions';

const osname = platform();

class GeoObjectListPanel extends React.Component {

    constructor (props) {
        super(props);

        this.ref = null;

        this.state = {
            activeStory: 'more',
            activePanel: 'home',
            activeTab: 'groups',
            search: '',

            data: [],
            artem: '',

            ymaps: null,

            reload: false,

            test2: '',


            selectedPoint: null,
            openedDescription: null
        };

        window.openDescription = index => {
            this.setState({ openedDescription: index });
        };
    }

    componentDidUpdate(prevProps, prevState) {
        const { categoriesTypeId } = this.props;
        //console.log("componentDidUpdate", this.state.openedDescription);
        if (prevState.openedDescription !== this.state.openedDescription && this.state.openedDescription !== null) {
            //alert(this.state.openedDescription)


            if(categoriesTypeId === CATEGORIES_TYPE.event) {
                this.props.actionsEventPanel.setEventId(this.state.openedDescription);
                this.props.actionsEventPanel.setBackPanel('GeoObjectListPanel');
            } else {
                this.props.actionsPlacePanel.setPlaceId(this.state.openedDescription);
                this.props.actionsPlacePanel.setBackPanel('GeoObjectListPanel');
            }
            this.props.goGeo(categoriesTypeId === CATEGORIES_TYPE.event ? 'EventPanel' : 'PlacePanel');


        }
    }

    getBody(item, categoriesTypeId) {
        if(categoriesTypeId === CATEGORIES_TYPE.event) {
            if(item.place && item.place.address) {
                return item.place.address;
            } else {
                return ''
            }
        } else {
            if (item.address) {
                return item.address;
            } else {
                return '';
            }
        }
    }

    closeDescription = () => {
        this.setState({ openedDescription: null });
    };

    // onPlacemarkClick = point => () => {
    //   this.setState({ selectedPoint: point });
    // };

    componentDidMount() {
        const { actions, isCanFetchData } = this.props;

        if(isCanFetchData) {
            actions.fetchData();
        }

        VKConnect.subscribe((e) => {
            switch (e.detail.type) {
                case 'VKWebAppGeodataResult': {
                    const data = e.detail.data;
                    //console.log('VKWebAppGeodataResult22', data);
                    if (data.available == 1) {
                        //TODO порядок setIsNeedSetCenter и setLocationCoords важен, тк одна выключает isShowReloadButton, а он нужен
                        this.props.actionsApp.setIsNeedSetCenter(false);
                        this.props.actionsApp.setLocationCoords([data.lat, data.long]);
                        this.setState({reload: !this.state.reload}); //TODO
                    } else {
                        this.setState({test2: ',,,'})
                        this.setState({reload: !this.state.reload}); //TODO
                        this.props.openPopout();
                    }
                    break;
                }
                case 'VKWebAppGeodataFailed': {
                    //TODO сюда попадал когда не разрешал доступ
                    const data = e.detail.data;
                    //console.log('VKWebAppGeodataFailed11', data)
                    this.setState({test2: '.'})
                    break;
                }
                default: {
                    this.setState({test2: '|'})
                    //console.log(e.detail.type);
                }
            }
        });

        //VKConnect.send("VKWebAppGetGeodata", {});
    }

    getGeoLocation = () => {
        //console.log('getGeoLocation');
        VKConnect.send("VKWebAppGetGeodata", {});
    };


    getCoords(item) {
        if(item.place) {
            return item.place.coords;
        } else {
            return item.coords;
        }
    }

    setYmaps = ymaps => {
        this.setState({ ymaps });
    };


    setCenterForSearch = event => {
        const coordinates = event.originalEvent.target.geometry.getCoordinates();
        this.props.actionsApp.setLocationCoords(coordinates);
    };

    setCenter = (ref) => {
        const { data, isNeedSetCenter, actionsApp } = this.props;

        if(isNeedSetCenter) {
            let points = [];
            data.map(item => {
                let place = this.getCoords(item);
                if (place) {
                    let { lat, lon } = place;
                    points.push([lat, lon]);
                }
            });

            const { ymaps } = this.state;
            // if(points.length === 0) {
            //     let center = [
            //         this.props.cityId.coords.lat,
            //         this.props.cityId.coords.lon,
            //     ];
            //     if (ymaps) {
            //         ref.setCenter(center, 12, {checkZoomRange: true});
            //     }
            // } else { }
            if(points.length !== 0) {
                if (ymaps) {
                    ref.setBounds(ymaps.util.bounds.fromPoints(points), {checkZoomRange: true});
                    actionsApp.setIsNeedSetCenter(false);
                }
            }
        }

        ref.events.add("click", e => {
            ref.balloon.close();
        });
        //ref.events.add('click', this.handleClickOnMap);
    };

    handleClick = (event) => {
        //console.log('Clicked', event.originalEvent.target.geometry.getCoordinates());
        //this.props.actionsApp.setLocationCoords(event.originalEvent.target.geometry.getCoordinates());
    }

    handleClickOnMap = e => {
        var coords = e.get('coords');
        //console.log('handleClickOnMap', coords);
        this.props.actionsApp.setLocationCoords(coords);
        //this.setState({locationCoords: coords});
    };

    render() {
        const { id, data, count, cityId, eventTypeId, placeTypeId, categoriesTypeId, locationCoords } = this.props;
        const { selectedPoint, openedDescription } = this.state;

        //console.log('GeoObjectListPanel', this.state.openItem)
        //console.log('GeoObjectListPanel', this.props )

        let style = {
            backgroundImage: `url('https://kudago.com/media/images/event/04/e1/04e1235948eef60ddc0e29993f7a5c5d.jpg')`,
            backgroundSize:  'cover'
        };


        let center = locationCoords != null ? locationCoords : [
            cityId.coords.lat,
            cityId.coords.lon,
        ];

        return (
            <Panel id={id} className='MapPanel'>
                <PanelHeader noShadow
                             left={<HeaderButton onClick={this.props.go} data-to={'GeoListPanel'}>
                                 <Icon24List/>
                             </HeaderButton>}
                >
                    Поиск на карте
                </PanelHeader>
                <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <Group style={{marginTop: 0}}>
                        <List>
                            <Cell
                                onClick={(e) => {
                                    this.props.go(e);
                                }}
                                data-to={'FilterPanel'}
                                // before={<div>Фильтр:</div>}
                                // description="Друзья в Facebook"
                                asideContent={<Link><Icon24Filter /></Link>}
                            >
                                <div style={{display: 'flex'}}>
                                    <Link><div style={{marginRight: '8px'}}>Фильтр:</div></Link>
                                    <div style={{color: '#909499'}}>
                                        {categoriesTypeId === CATEGORIES_TYPE.event ?
                                            (eventTypeId && eventTypeId.name) :
                                            (placeTypeId && placeTypeId.name)
                                        }
                                    </div>
                                </div>
                            </Cell>
                        </List>
                    </Group>
                    <Group style={{margin: 0,}}>
                        <Header level="2" aside={
                            <Link onClick={(e) => {
                                // this.props.actionsEventPanel.setEventId(item.id);
                                this.props.go(e);
                            }} data-to={'CityFilterPanel'}>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <Icon16Place style={{ marginRight: '2px' }}/>
                                    <div style={{ marginRight: '4px' }}>{cityId && cityId.name}</div>
                                    <Icon16Dropdown style={{marginTop: '4px'}}/>
                                </div>
                            </Link>
                        }>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <div style={{marginRight: '4px'}}>Вариантов {data ? data.length : 0}</div>
                                {this.props.isLoadingSpinner &&
                                <div><Spinner size="small"/></div>
                                }
                            </div>
                        </Header>
                    </Group>
                    {/*{(this.props.isLoading) && (*/}
                        {/*<Footer>*/}
                            {/*<Spinner size="regular"/>*/}
                        {/*</Footer>*/}
                    {/*)}*/}
                    {/*{!this.props.isLoading && (*/}
                    <Map state={{ center: center, zoom: 12, controls: ['zoomControl'], }}
                         options={{ suppressMapOpenBlock: true }}
                         modules={['control.ZoomControl']}
                         style={{flex: '1 0 auto'}}
                         width={'100%'}
                         onClick={this.handleClickOnMap}
                         onLoad={ymaps => {
                             this.setYmaps(ymaps)
                         }}
                         //instanceRef={ref => {  this.ref = ref; }}
                        //TODO рабочее ниже строка
                         instanceRef={ref => ref && this.setCenter(ref)}
                         //instanceRef={ref => { ref && ref.events.add('actionbegin', () => { console.log('Событие на карте'); }); }}
                    >
                        {/*<GeolocationControl options={{ float: 'left' }} />*/}
                        {/*<FullscreenControl options={{ float: 'left' }}/>*/}
                        <ButtonMap
                            data={{
                                content: 'Я на карте',
                            }}
                            options={{
                                maxWidth: 140,
                                float: 'left',
                                selectOnClick: false
                            }}
                            defaultState={{
                                selected: true, //TODO можно сделать в true чтобы она была более заметна пользователям
                                enabled: true //false в случае, если пользователь запретил использование своих данных, либо по нажатию на кнопку вновь просить геоданные доступ
                            }}
                            onClick={() => this.getGeoLocation()}
                        />
                        <GeoObject
                            geometry={{
                                type: 'Point',
                                coordinates: center,
                            }}
                            options={{
                                preset: 'islands#redCircleDotIcon',
                                draggable: true,
                            }}
                            onDragEnd={this.setCenterForSearch}
                        />
                        <Clusterer
                            onBalloonclose={this.closeDescription}
                            //instanceRef={ref => { ref && ref.events.add('hintopen', (e) => { console.log('hintopen', e); }); }}
                            options={{
                                // preset: 'islands#invertedVioletClusterIcons',
                                groupByCoordinates: false,
                                balloonPanelMaxMapArea: Infinity,
                                clusterBalloonContentLayout: 'cluster#balloonCarousel',
                                // clusterBalloonPagerSize: 10
                            }}
                        >
                        {!this.props.isLoading && (
                            data && data.length > 0 && data.map((item, index) => {
                                let place = this.getCoords(item);
                                let itemId = item.id;
                                if (place) {
                                    let { lat, lon } = place;
                                    let placeTitle = "";
                                    if(categoriesTypeId === CATEGORIES_TYPE.event && item.place && item.place.title) {
                                        placeTitle = '<br/><b>Место: </b>' + item.place.title;
                                    }
                                    return (
                                        <Placemark
                                            //instanceRef={ref => { ref && ref.events.add('balloonopen', (e) => { console.log('Кликнули по точке', e.originalEvent.currentTarget.properties._data.item); }); }}
                                            //instanceRef={ref => {  this.ref = ref; }}
                                            events={(e)=> console.log('events', e)}
                                            balloonclose={(e) => console.log('123123', e)}
                                            // onClick={this.handleClick}
                                            //instanceRef={ref => {  this.ref = ref; }}
                                            // onClick={() => {
                                            //     this.ref.events.fire('click', {target: this.ref})
                                            // }}
                                            // onClick={(lol, res) => {
                                            //     console.log('ARTEMLOL!!!', lol, res, item)
                                            //     this.setState({openItem: item});
                                            // }}
                                            key={item.id}
                                            modules={['geoObject.addon.balloon', 'geoObject.addon.hint']}
                                            defaultGeometry={[lat, lon]}
                                            properties={{
                                                item: item,
                                                // hintContent: '11',
                                                // balloonContent: '22',
                                                balloonContentHeader: capitalize(item.title),
                                                balloonContentBody: '<b>Адрес: </b>' + this.getBody(item, categoriesTypeId) + placeTitle,
                                                // balloonContentFooter:
                                                //     openedDescription === null || openedDescription !== itemId
                                                //         ? `<input type="button" class="Tappable Tappable--ios Button Button--ios Button--sz-l Button--lvl-primary Button--aln-center Tappable--inactive" onclick="window.openDescription(${itemId});" value="Подробнее.."/>`
                                                //         : `<div>${item.descr}</div>`
                                                //balloonContentFooter: `<input type="button" class="Tappable Tappable--ios Button Button--ios Button--sz-l Button--lvl-primary Button--aln-center Tappable--inactive" onclick="window.openDescription(${itemId});" value="Подробнее.."/>`,
                                                balloonContentFooter: osname === IOS ?
                                                                          `<div style="margin-bottom: 10px"><button onclick="window.openDescription(${itemId});" type="default" role="button" class="Tappable Tappable--ios Button Button--ios Button--sz-m Button--lvl-primary Button--aln-center Tappable--inactive"><div class="Button__in"><div class="Button__content">Подробнее</div></div></button></div>` :
                                                                          `<div style="margin-bottom: 10px"><button onclick="window.openDescription(${itemId});" type="default" role="button" class="Tappable Tappable--android Button Button--android Button--sz-m Button--lvl-primary Button--aln-center Tappable--inactive"><span class="Tappable__waves"></span><div class="Button__in"><div class="Button__content">Подробнее</div></div></button></div>`,
                                                // balloonContentFooter:
                                                //balloonContentFooter: '<p><a onclick={' +this.lol(item) + '}><strong>'+item.title+'</strong></a></p>'
                                                //balloonContentFooter: '<button type="button" onClick="'+this.invoke+'" name="gotoNode" data-arg1="1234">GotoNode</button>'
                                                //balloonContentFooter: '<input type="button" onclick="{console.log(123); this; debugger;}" value="Считать кроликов!"/>'
                                                //balloonContentFooter: '<input type="button" onclick="this.handleClick()" value="Считать кроликов!"/>'
                                                //balloonContentFooter: `<input type="button" onclick="window.myFunc(${item.id});" value="Считать кроликов!"/>`
                                                //balloonContentFooter: '<input id="elem" type="button" value="Нажми меня" onclick="{alert(this.dataset.to); this; debugger;}" data-actions="{alert()}" data-to="1234"/>'
                                            }}
                                            options={{
                                                balloonPanelMaxMapArea: Infinity
                                                //preset: 'islands#blueCircleDotIcon',
                                                //preset: 'islands#blueCircleIcon',
                                            }}
                                        />
                                    );
                                }
                            })
                        )}
                        </Clusterer>
                        <Circle
                            // onClick={this.handleClick}
                            geometry={[center, this.props.searchRadiusId ]}
                            options={{
                                draggable: false,
                                fillColor: 'rgba(43, 148, 225, 0.0)',
                                strokeColor: 'rgba(43, 148, 225, 0.4)',
                                strokeOpacity: 0.9,
                                strokeWidth: 2,
                            }}
                        />
                    </Map>
                    {/*)}*/}
                </div>
                {this.props.isShowReloadButton && (
                    <FixedLayout vertical="bottom">
                        <Div>
                            <Button stretched onClick={() => {
                                this.props.actionsApp.setIsNeedSetCenter(true);
                                this.props.actions.fetchData();
                                this.props.actionsGeoListPanel.setIsCanFetchData(true);
                            }}>Поиск в указанном месте</Button>
                        </Div>
                    </FixedLayout>
                )}
            </Panel>
        );
    }
}

const mapStateToProps = store => {
    return {
        isCanFetchData: store.geoObjectListPanel.isCanFetchData,
        // data: store.geoObjectListPanel.data,
        data: getData(store),
        count: store.geoObjectListPanel.count,
        nextPage: store.geoObjectListPanel.nextPage,
        isLoading: store.geoObjectListPanel.isLoading,
        isLoadingSpinner: store.geoObjectListPanel.isLoadingSpinner,
        cityId: store.appPanel.cityId,
        eventTypeId: store.appPanel.eventTypeId,
        placeTypeId: store.appPanel.placeTypeId,
        categoriesTypeId: store.appPanel.categoriesTypeId,
        searchRadiusId: store.appPanel.searchRadiusId,
        locationCoords: store.appPanel.locationCoords,
        isNeedSetCenter: store.appPanel.isNeedSetCenter,
        isShowReloadButton: store.appPanel.isShowReloadButton,

        hasMoreItems: store.eventListPanel.hasMoreItems,
    }
};

export default connect(
    mapStateToProps,
    (dispatch) => {
        return {
            actions: bindActionCreators(Actions, dispatch),
            actionsEventPanel: bindActionCreators(EventPanelActions, dispatch),
            actionsPlacePanel: bindActionCreators(PlacePanelActions, dispatch),
            actionsApp: bindActionCreators(AppActions, dispatch),
            actionsGeoListPanel: bindActionCreators(GeoListPanelActions, dispatch),
        }
    }
)(GeoObjectListPanel);
