import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import Actions from './actions'
import axios from 'axios';
// import connect from '@vkontakte/vkui-connect';
import { YMaps, Map, Placemark, GeolocationControl, FullscreenControl } from 'react-yandex-maps';

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
import Icon24Dropdown from '@vkontakte/icons/dist/24/dropdown';
import '@vkontakte/vkui/dist/vkui.css';

import ObjectGroup from '../ObjectGroup'
import PlaceCell from '../PlaceCell'

const osname = platform();

class MapPanel extends React.Component {

    constructor (props) {
        super(props);

        this.state = {
            data: [],
        };
    }

    componentDidMount() {
        const { actions, placeId } = this.props;
        //actions.fetchData(placeId);
    }

    get mapCenter () {
        const { places } = this.props;
        let { lat, lon } = { lat: 55.75, lon: 37.57 };

        places.map((place) => {
            lat = place.coords.lat;
            lon = place.coords.lon;
        });

        return [lat, lon];

    }

    render() {
        const { id, places } = this.props;

        //console.log('MapPanel', this.props)

        return (
            <Panel id={id} className='MapPanel'>
                <PanelHeader
                    noShadow
                    left={<HeaderButton onClick={this.props.go} data-to={this.props.backPanel}>
                        {osname === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}
                    </HeaderButton>}
                >
                    Карта
                </PanelHeader>
                <div style={{height: '100%', display: 'flex', flexDirection: 'column'}}>
                    <Group style={{ marginTop: 0 }}>
                        <List>
                            <Cell multiline
                                  before={<Icon24Place />}
                            >
                                <InfoRow title="Адрес">
                                    {places[0].address}
                                </InfoRow>
                            </Cell>
                        </List>
                    </Group>
                    <Map defaultState={{ center: this.mapCenter, zoom: 14, controls: ['zoomControl'], }}
                         modules={['control.ZoomControl']}
                         style={{flex: '1 0 auto'}}
                         width={'100%'}
                    >
                        {/*<GeolocationControl options={{ float: 'left' }} />*/}
                        {/*<FullscreenControl options={{ float: 'left' }}/>*/}
                        {places.map((place) => {
                            let { lat, lon } = place.coords;
                            return (
                                <Placemark
                                    key={place.id}
                                    modules={['geoObject.addon.balloon']}
                                    defaultGeometry={[lat, lon]}
                                    properties={{
                                        balloonContentBody: place.title
                                    }}
                                />
                            );
                        })}
                    </Map>
                </div>
            </Panel>
        );
    }
}

const mapStateToProps = store => {
    return {
        places: store.mapPanel.places,
        backPanel: store.mapPanel.backPanel,
    }
};

export default connect(
    mapStateToProps,
    (dispatch) => {
        return {
            actions: bindActionCreators(Actions, dispatch),
        }
    }
)(MapPanel);
