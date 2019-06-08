import React, {Component} from 'react';
import {
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
import Icon16Recent from '@vkontakte/icons/dist/16/recent';
import { renderDate, getImageSrc } from '../utils/utils.js'
import { CATEGORIES_TYPE } from '../containers/App/reducer';
import { capitalize } from '../utils/utils';

export default class GalleryItem extends Component {

    renderDate(item) {
        return renderDate(item);
    }

    render() {
        const {item, isList, categoriesTypeId} = this.props;

        let style = {
            backgroundSize:  'cover',
            backgroundImage: 'url(' + getImageSrc(item, 'm') + ')',
        };

        let styleDesc = {
            textOverflow: 'ellipsis',
            overflow:     'hidden',
        };

        let description = null;
        if(isList) {
            if (categoriesTypeId === CATEGORIES_TYPE.event) {
                description = this.renderDate(item);
            } else if (categoriesTypeId === CATEGORIES_TYPE.place) {
                description = item.timetable;
            }
        }

        return (
            <Cell data-to={this.props.dataToGo}
                  onClick={(e) => {
                      this.props.onClick(e);
                  }}
                  className="Gallery__Cell"
            >
                <div className="GalleryItem__wrap" style={style}>
                    {!isList &&
                    <div className="GalleryItem__header">
                        Рекомендуемое
                    </div>
                    }
                    {isList && description && (
                    <div className="GalleryItem__header">
                        <div className="GalleryItem__description">
                            <div style={{display: 'flex', marginTop: '2px', alignItems: 'center'}}>
                                <Icon16Recent style={{ marginRight: '4px' }}/>
                                <div style={styleDesc}>{description}</div>
                            </div>
                        </div>
                    </div>
                    )}
                    <div className="GalleryItem__title_wrap">
                        <div className="GalleryItem__title">
                            {capitalize(item.title)}
                        </div>
                    </div>
                    {/*<div className="GalleryItem__info">*/}
                        {/*Подробнее*/}
                    {/*</div>*/}
                </div>
            </Cell>
        );
    }
}
