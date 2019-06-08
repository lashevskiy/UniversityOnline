import React from 'react';
import PropTypes from 'prop-types';

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
import Icon24FavoriteOutline from '@vkontakte/icons/dist/24/favorite_outline';
import Icon24Filter from '@vkontakte/icons/dist/24/filter';
import Icon16Recent from '@vkontakte/icons/dist/16/recent';
import '@vkontakte/vkui/dist/vkui.css';

import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import { CATEGORIES_TYPE } from '../../containers/App/reducer';

import { renderDate, getImageSrc } from '../../utils/utils.js'
import { capitalize } from '../../utils/utils';
import GalleryItem from '../GalleryItem';

const osname = platform();

class ObjectCell extends React.Component {

    constructor (props) {
        super(props);
    }

    componentDidMount() {
    }

    renderDate(item) {
        return renderDate(item);
    }


    render() {
        const { item, categoriesTypeId, oneString, viewType, notAvatar } = this.props;

        //console.log('ObjectCell', this.props)

        let style = oneString === true ? {
            textOverflow: 'ellipsis',
            overflow:     'hidden',
        } : null;

        let avatarStyle = {
            backgroundSize:     'cover',
            backgroundImage:    'url(' + getImageSrc(item) + ')',
            backgroundPosition: 'center 35%'
        };

        if(viewType === true) {
            return (
                <Group>
                    <GalleryItem key={item.id}
                                 item={item}
                                 onClick={(e) => {
                                     this.props.onClick(e);
                                 }}
                                 dataToGo={this.props.dataToGo}
                                 categoriesTypeId={categoriesTypeId}
                                 isList={true}
                    />
                </Group>
            );
        } else {
            return (
                <Cell
                    // bottomContent={
                    //     <div style={{display: 'flex'}}>
                    //         <Button
                    //             onClick={(e) => {
                    //                 this.props.onClick(e);
                    //             }}
                    //             data-to={this.props.dataToGo}
                    //             level="secondary"
                    //             before={<Icon24FavoriteOutline/>}>
                    //             В избранное</Button>
                    //         {/*<Button*/}
                    //             {/*onClick={(e) => {*/}
                    //                 {/*this.props.onClick(e);*/}
                    //             {/*}}*/}
                    //             {/*data-to={this.props.dataToGo}*/}
                    //             {/*level="outline">*/}
                    //             {/*Подробнее</Button>*/}
                    //     </div>
                    // }
                    description={item.annonce}
                    // description={
                    //     <div style={{marginTop: '2px'}}>
                    //         {item.annonce && (
                    //         <div style={{ display: 'flex', marginTop: '4px' }}>
                    //             <Icon16Recent style={{ marginRight: '4px' }}/>
                    //             <div style={style}>{item.annonce}</div>
                    //         </div>
                    //         )}
                    //         {categoriesTypeId === CATEGORIES_TYPE.event && (
                    //             <div style={{display: 'flex'}}>
                    //                 <Icon16Recent style={{marginRight: '4px'}}/>
                    //                 <div style={style}>{this.renderDate(item)}</div>
                    //             </div>
                    //         )}
                    //         {categoriesTypeId === CATEGORIES_TYPE.event &&
                    //         item.place && (
                    //             <div style={{ display: 'flex', marginTop: '4px' }}>
                    //                 <Icon16Place style={{ marginRight: '4px' }}/>
                    //                 <div style={style}>{item.place.title}</div>
                    //             </div>
                    //         )}
                    //         {categoriesTypeId === CATEGORIES_TYPE.place &&
                    //         item.timetable && (
                    //             <div style={{ display: 'flex', marginTop: '4px' }}>
                    //                 <Icon16Recent style={{ marginRight: '4px' }}/>
                    //                 <div style={style}>{item.timetable}</div>
                    //             </div>
                    //         )}
                    //         {categoriesTypeId === CATEGORIES_TYPE.place &&
                    //         item.address && (
                    //             <div style={{ display: 'flex', marginTop: '4px' }}>
                    //                 <Icon16Place style={{ marginRight: '4px' }}/>
                    //                 <div style={style}>{item.address}</div>
                    //             </div>
                    //         )}
                    //     </div>
                    // }
                    before={notAvatar === true ? null :
                        <Avatar
                            style={avatarStyle}
                            type="image"
                            // src={this.imageSrc}
                            size={80}
                        />
                    }
                    size="l"
                    multiline={oneString !== true}
                    onClick={(e) => {
                        this.props.onClick(e);
                    }}
                    data-to={this.props.dataToGo}
                >
                    <div onClick={(e) => {
                        this.props.onClick(e);
                    }}
                         data-to={this.props.dataToGo}>{capitalize(item.title)}</div>
                </Cell>
            );
        }
    }
}

ObjectCell.propTypes = {
    item: PropTypes.object.isRequired,
    categoriesTypeId: PropTypes.string.isRequired,
    dataToGo: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default ObjectCell;
