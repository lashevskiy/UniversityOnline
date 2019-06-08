import React from 'react';

export function renderDate(item) {
    if (item.dates && item.dates[item.dates.length - 1].is_endless === true) {
        return 'Круглый год';
    }

    if (item.daterange && item.daterange.is_endless === true) {
        return 'Круглый год';
    }

    let dateFormat;
    const dateFormatDayMonth = { day: 'numeric', month: 'long' };
    const dateFormatDayMonthYear = { day: 'numeric', month: 'long', year: 'numeric' };

    if (item.daterange) {
        let start = item.daterange.start;
        let startDate = new Date(start * 1000);

        let end = item.daterange.end;
        let endDate = new Date(end * 1000);

        let startYear = startDate.getFullYear();
        let endYear = endDate.getFullYear();

        dateFormat = startYear < endYear ? dateFormatDayMonthYear : dateFormatDayMonth;

        if(start === end) {
            return (
                <div>
                    {start && startDate.toLocaleString('ru', dateFormatDayMonthYear)}
                </div>
            );
        }

        return (
            <div>
                {start && startDate.toLocaleString('ru', dateFormat)}
                {end ? <span>&mdash;</span> : ''}
                {end && endDate.toLocaleString('ru', dateFormatDayMonthYear)}
            </div>
        );
    }

    if (item.dates && item.dates.length > 0) {
        let start = item.dates[item.dates.length - 1].start_date;
        let startDate = new Date(start);

        let end = item.dates[item.dates.length - 1].end_date;
        let endDate = new Date(end);

        let startYear = startDate.getFullYear();
        let endYear = endDate.getFullYear();

        dateFormat = startYear < endYear ? dateFormatDayMonthYear : dateFormatDayMonth;

        return (
            <div>
                {start && startDate.toLocaleString('ru', dateFormat)}
                {end ? <span>&mdash;</span> : ''}
                {end && endDate.toLocaleString('ru', dateFormatDayMonthYear)}
            </div>
        );
    }

    return 'Не указана';
}

export function getImageSrc(item, size = 's') {
    if(item.first_image) {
        let res = item.first_image;


        let img = null;
        if(res.thumbnails) {
            if(res.thumbnails['144x96'] && size === 's') {
                img = res.thumbnails['144x96']
            } else if (res.thumbnails['640x384'] && size === 'm') {
                img = res.thumbnails['640x384'];
            } else {
                img = res.image;
            }
        } else {
            img = res.image;
        }

        //TODO изображение, когда нет картинки
        // if(img == null) {
        //     img = 'картинка заглушка'
        // }

        return img;
    }
    if(item.images && item.images.length > 0 && item.images[0]) {
        let res = item.images[0];
        let img = null;
        if(res.thumbnails) {
            if(res.thumbnails['144x96'] && size === 's') {
                img = res.thumbnails['144x96']
            } else if (res.thumbnails['640x384'] && size === 'm') {
                img = res.thumbnails['640x384'];
            } else {
                img = res.image;
            }
        } else {
            img = res.image;
        }

        //TODO изображение, когда нет картинки
        // if(img == null) {
        //     img = 'картинка заглушка'
        // }

        return img;
    }

    return null;
}

export function getImageSrcByIndex(item, index = 0, size = 's') {
    if(item.first_image) {
        let res = item.first_image;


        let img = null;
        if(res.thumbnails) {
            if(res.thumbnails['144x96'] && size === 's') {
                img = res.thumbnails['144x96']
            } else if (res.thumbnails['640x384'] && size === 'm') {
                img = res.thumbnails['640x384'];
            } else {
                img = res.image;
            }
        } else {
            img = res.image;
        }

        //TODO изображение, когда нет картинки
        // if(img == null) {
        //     img = 'картинка заглушка'
        // }

        return img;
    }
    if(item.images && item.images.length > 0 && item.images[index]) {
        let res = item.images[index];
        let img = null;
        if(res.thumbnails) {
            if(res.thumbnails['144x96'] && size === 's') {
                img = res.thumbnails['144x96']
            } else if (res.thumbnails['640x384'] && size === 'm') {
                img = res.thumbnails['640x384'];
            } else {
                img = res.image;
            }
        } else {
            img = res.image;
        }

        //TODO изображение, когда нет картинки
        // if(img == null) {
        //     img = 'картинка заглушка'
        // }

        return img;
    }

    return null;
}

export function getImageMovieSrc(item, size = 's') {
    if(item.poster) {
        let res = item.poster;
        let img = null;
        if(res.thumbnails) {
            if(res.thumbnails['144x96'] && size === 's') {
                img = res.thumbnails['144x96']
            } else if (res.thumbnails['640x384'] && size === 'm') {
                img = res.thumbnails['640x384'];
            }
        } else if(res.image) {
            img = res.image;
        } else {
            img = getImageSrc(item);
        }

        //TODO изображение, когда нет картинки
        // if(img == null) {
        //     img = 'картинка заглушка'
        // }

        return img;
    } else {
        return getImageSrc(item);
    }

    return null;
}

export function capitalize(s) {
    if (typeof s !== 'string') return '';
    return s.charAt(0).toUpperCase() + s.slice(1);
}

export const renderData = (data, type, prefix = '') => {
    if (!data) {

        if (type === 2) {
            return <span>&mdash;</span>;
        }

        return 'Нет информации';
    }

    return data + prefix;
};
