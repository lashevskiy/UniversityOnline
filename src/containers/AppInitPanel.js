import React from 'react';
import ReactDOM from 'react-dom';
import { Alert, View, Panel } from '@vkontakte/vkui';

import persik from '../img/persik.png';
import '../panels/Persik.css';

class AppInitPanel extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activePanel: 'OverviewPanel',
            fetchedUser: null,

            activeStory: 'feed',
            // activeView: 'view1',
            popout: null,
        };
    }

    renderError(msg) {
        this.setState({
            popout:
                <Alert onClose={() => this.setState({})}>
                    <h2>
                        <div style={{ color: '#ff473d', textAlign: 'center' }}>Ошибка</div>
                    </h2>
                    <div style={{ textAlign: 'center' }}>{msg}</div>
                </Alert>
        });
    }

    render() {
        let { access = true } = this.props;

        return (
            <React.Fragment>
                {access ? (
                    <View id="load" activePanel="load">
                        <Panel id="load">
                        </Panel>
                    </View>
                ) : (
                    <View id="load" activePanel="load" popout={this.state.popout}>
                        <Panel id="load">
                        </Panel>
                    </View>
                )}
            </React.Fragment>
        );

        // return (
        //     <React.Fragment>
        //         <View id="load" activePanel="load">
        //             <Panel id="load">
        //                 <img className="Persik" src={persik} alt="Persik The Cat"/>
        //                 <div style={{ textAlign: 'center' }}>В данный момент мы загружаем новые мероприятия и места,
        //                     попробуйте зайти позже =)
        //                 </div>
        //             </Panel>
        //         </View>
        //     </React.Fragment>
        // );
    }
}

export default AppInitPanel;
