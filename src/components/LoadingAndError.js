import React from 'react';

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
    RangeSlider,
    Search,
    Select,
    Tabbar,
    TabbarItem,
    Tabs,
    TabsItem,
    Textarea,
    View,
    Spinner,Footer
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import PropTypes from 'prop-types';

const osname = platform();


class LoadingAndError extends React.Component {

    constructor (props) {
        super(props);
    }

    render() {
        const { isLoading, isHasError, fetchData, style } = this.props;

        if(isLoading) {
            return (
                <Footer>
                    <Spinner size="regular"/>
                </Footer>
            );
        }

        if(isHasError) {
            return (
                <Footer style={style}>
                    <Div>Не удалось получить данные</Div>
                    <Div><Button level="outline" onClick={fetchData}>Попробовать снова</Button></Div>
                </Footer>
            );
        }

        return null;
    }
}

LoadingAndError.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    isHasError: PropTypes.bool.isRequired,
    fetchData: PropTypes.func.isRequired,
};

export default LoadingAndError;
