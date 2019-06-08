import 'core-js/es6/map';
import 'core-js/es6/set';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { store } from './configureStore'
import connect from '@vkontakte/vkui-connect';
import { YMaps } from 'react-yandex-maps';
import App from './containers/App/App';

import { Alert, View, Panel } from '@vkontakte/vkui';
import AppInitPanel from './containers/AppInitPanel';
import AppContainer from './containers/AppContainer/AppContainer';
// import registerServiceWorker from './sw';

import ReactGA from 'react-ga';
ReactGA.initialize('UA-140460375-1');
ReactGA.pageview('/homepage');

connect.subscribe((e) => {
    switch (e.detail.type) {
        case 'VKWebAppUpdateConfig':
            let schemeAttribute = document.createAttribute('scheme');
            schemeAttribute.value = e.detail.data.scheme ? e.detail.data.scheme : 'client_light';
            document.body.attributes.setNamedItem(schemeAttribute);
            break;

        default:
            //console.log(e.detail.type);
    }
});

// Init VK App
connect.send('VKWebAppInit', {});

// Если вы хотите, чтобы ваше веб-приложение работало в оффлайне и загружалось быстрее,
// расскомментируйте строку с registerServiceWorker();
// Но не забывайте, что на данный момент у технологии есть достаточно подводных камней
// Подробнее про сервис воркеры можно почитать тут — https://vk.cc/8MHpmT
// registerServiceWorker();

ReactDOM.render(
    <Provider store={store}>
        <YMaps query={{ lang: "ru_RU", load: "package.full" }}>
            <AppContainer />
        </YMaps>
    </Provider>,
    document.getElementById('root'));
