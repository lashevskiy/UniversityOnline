import React from 'react';
import ReactDOM from 'react-dom';
import { bindActionCreators } from 'redux';
import Actions from './actions';
import { Alert, View, Panel } from '@vkontakte/vkui';
import VKConnect from '@vkontakte/vkui-connect';
import AppInitPanel from '../AppInitPanel'
import App from '../App/App'
import connect from 'react-redux/es/connect/connect';
import AppActions from '../App/actions';
import GeoObjectListPanelActions from '../../components/GeoObjectListPanel/actions';


export const CITIES = [
    {
        id:     2,
        slug:   'spb',
        name:   'Санкт-Петербург',
        coords: { lat: 59.939094999999966, lon: 30.315868 }
    },
    {
        id:     49,
        slug:   'ekb',
        name:   'Екатеринбург',
        coords: { lat: 56.838607, lon: 60.605514 }
    },
    {
        id:     314,
        slug:   'kev',
        name:   'Киев',
        coords: { lat: 50.450097, lon: 30.523397 }
    },
    {
        id:     73,
        slug:   'krasnoyarsk',
        name:   'Красноярск',
        coords: { lat: 56.010569, lon: 92.852545 }
    },
    {
        id:     72,
        slug:   'krd',
        name:   'Краснодар',
        coords: { lat: 45.023877, lon: 38.970157 }
    },
    {
        id:     60,
        slug:   'kzn',
        name:   'Казань',
        coords: { lat: 55.795793, lon: 49.106585 }
    },
    {
        id:     1,
        slug:   'msk',
        name:   'Москва',
        coords: { lat: 55.753676, lon: 37.61989899999998 }
    },
    {
        id:     95,
        slug:   'nnv',
        name:   'Нижний Новгород',
        coords: { lat: 56.326887, lon: 44.005986 }
    },
    {
        id:     99,
        slug:   'nsk',
        name:   'Новосибирск',
        coords: { lat: 55.030199, lon: 82.92043 }
    },
    {
        id:     123,
        slug:   'smr',
        name:   'Самара',
        coords: { lat: 53.195533, lon: 50.101801 }
    },
    {
        id:     133,
        slug:   'sochi',
        name:   'Сочи',
        coords: { lat: 43.581509, lon: 39.722882 }
    },
    {
        id:     151,
        slug:   'ufa',
        name:   'Уфа',
        coords: { lat: 54.734768, lon: 55.957838 }
    },
    {
        id:     177,
        slug:   'vbg',
        name:   'Выборг',
        coords: { lat: 60.713022, lon: 28.732893 }
    }
];

class AppContainer extends React.Component {
    constructor(props) {
        super(props);

        // this.state = {
        //     accessToken:       '',
        //     accessTokenFailed: '',
        //     user:              {},
        //     fetchedUser: {},
        //     geo: null,
        //     defaultError: {}
        // };
    }

    componentDidMount() {
        const { actionsApp, actionsGeoObjectListPanel } = this.props;
        VKConnect.subscribe((e) => {
            switch (e.detail.type) {
                case 'VKWebAppGetUserInfoResult': {
                    const user = e.detail.data;
                    if(user.city && user.city.id) {
                        let city = CITIES.find(item => item.id === user.city.id);
                        if(city) {
                            this.props.actionsApp.setCityId(city);
                        } else {
                            this.props.actionsApp.setCityId(CITIES[0]);
                        }
                    } else {
                        this.props.actionsApp.setCityId(CITIES[0]);
                    }
                    actionsApp.setUser(user);
                    break;
                }
                case 'VKWebAppGetUserInfoFailed': {
                    const data = e.detail.data;
                    actionsApp.setUser(data);
                    break;
                }
                case 'VKWebAppShareResult': {
                    break;
                }
                case 'VKWebAppShowWallPostBoxResult': {
                    break;
                }
                default: {
                    //actionsApp.setUser({});
                    //console.log('CCCCC', e.detail.type);
                }
                // case 'VKWebAppGeodataResult':
                // case 'VKWebAppGeodataFailed': {
                //     actionsApp.setGeodata(e.detail.data);
                //     actionsGeoObjectListPanel.isCanFetchData(true);
                //     break;
                // }
                // case 'VKWebAppAccessTokenReceived': {
                //     actionsApp.setAccessToken(e.detail.data);
                //     break;
                // }
                // case 'VKWebAppAccessTokenFailed': {
                //     this.setState({ accessTokenFailed: e.detail.data });
                //     break;
                // }
                // default: {
                //     this.setState({ defaultError: e.detail.data });
                //     console.log(e.detail.type);
                // }
            }
        });

        VKConnect.send('VKWebAppGetUserInfo', {});
        //VKConnect.send("VKWebAppGetGeodata", {});
        //VKConnect.send("VKWebAppGetAuthToken", {"app_id": 6841964, "scope": "friends,status"});
    }

    render() {
        let { user, access = true, accessToken, geoData } = this.props;

        //console.log('AppContainer', this.props.accessToken)
        console.log('user', user, user !== null && user.id === 11828988)

        return (
            <React.Fragment>
                {/*{user !== null && user.id == 11828988 ? <App/> : <AppInitPanel/>}*/}
                {user !== null ? <App/> : <AppInitPanel/>}
            </React.Fragment>
        );
    }
}

const mapStateToProps = store => {
    return {
        accessToken: store.appPanel.accessToken,
        geoData: store.appPanel.geoData,
        user: store.appPanel.user,
    }
};

export default connect(
    mapStateToProps,
    (dispatch) => {
        return {
            actions: bindActionCreators(Actions, dispatch),
            actionsApp: bindActionCreators(AppActions, dispatch),
            actionsGeoObjectListPanel: bindActionCreators(GeoObjectListPanelActions, dispatch),
        }
    }
) (AppContainer)
