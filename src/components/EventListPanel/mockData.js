import { CITIES } from '../../containers/AppContainer/AppContainer';

const data = [
    {
        id:           8,
        title:        'Санкт-Петербургский горный университет',
        city:         CITIES[0],
        imgIcon:      'https://postupi.online/images/images90/08/566.jpg',
        url:          'https://spb.postupi.online/vuz/gornyj-universitet/',
        isGOS:        true, //государственный ли?
        annonce:      'Направления обучения: горное дело; нефтегазовое дело; прикладная геология и еще 31 направление',
        budget:       64.67,
        budget_count: 1554,
        platno:       45,
        platno_count: 710,
        price:        260000, //стоимость в год
    },
    {
        id:           42,
        title:        'Санкт-Петербургский государственный университет промышленных технологий и дизайна',
        city:         CITIES[0],
        imgIcon:      'https://postupi.online/images/images90/42/406.jpg',
        url:          'https://spb.postupi.online/vuz/spbguptd/',
        isGOS:        true, //государственный ли?
        annonce:      'Направления обучения: менеджмент; экономика; дизайн и еще 33 направления',
        budget:       45,
        budget_count: 1274,
        platno:       36.33,
        platno_count: 5651,
        price:        48000, //стоимость в год
    },
    {
        id:           36,
        title:        'Университет при Межпарламентской Ассамблее ЕврАзЭС',
        city:         CITIES[0],
        imgIcon:      'https://postupi.online/images/images90/36/942.jpg',
        url:          'https://spb.postupi.online/vuz/universitet-pri-mpa-evrazes/',
        isGOS:        false, //государственный ли?
        annonce:      'Направления обучения: дизайн; психология; декоративно-прикладное искусство и народные промыслы и еще 10 направлений',
        budget:       45,
        budget_count: 1274,
        platno:       36.33,
        platno_count: 5651,
        price:        48000, //стоимость в год
    },
    {
        id:           13,
        title:        'Санкт-Петербургский политехнический университет Петра Великого',
        city:         CITIES[0],
        imgIcon:      'https://postupi.online/images/images90/13/719.jpg',
        url:          'https://spb.postupi.online/vuz/spbpu/',
        isGOS:        true, //государственный ли?
        annonce:      'Направления обучения: менеджмент; электроэнергетика и электротехника; экономика и еще 63 направления',
        budget:       45,
        budget_count: 1274,
        platno:       36.33,
        platno_count: 5651,
        price:        48000, //стоимость в год
    },
    {
        id:           19,
        title:        'Санкт-Петербургский государственный университет гражданской авиации',
        city:         CITIES[0],
        imgIcon:      'https://postupi.online/images/images90/19/215.jpg',
        url:          'https://spb.postupi.online/vuz/spbgu-ga/',
        isGOS:        true, //государственный ли?
        annonce:      'Направления обучения: эксплуатация воздушных судов и организация воздушного движения; аэронавигация; эксплуатация аэропортов и обеспечение полетов воздушных судов и еще 10 направлений',
        budget:       45,
        budget_count: 1274,
        platno:       36.33,
        platno_count: 5651,
        price:        48000, //стоимость в год
    },
    {
        id:           9,
        title:        'Российский государственный институт сценических искусств',
        city:         CITIES[0],
        imgIcon:      'https://postupi.online/images/images90/09/387.jpg',
        url:          'https://spb.postupi.online/vuz/rgisi/',
        isGOS:        true, //государственный ли?
        annonce:      'Направления обучения: актерское искусство; технология художественного оформления спектакля; режиссура театра и еще 4 направления',
        budget:       45,
        budget_count: 1274,
        platno:       36.33,
        platno_count: 5651,
        price:        48000, //стоимость в год
    },
    {
        id:           34,
        title:        'Санкт-Петербургский государственный технологический институт (Технический университет)',
        city:         CITIES[0],
        imgIcon:      'https://postupi.online/images/images90/34/395.jpg',
        url:          'https://spb.postupi.online/vuz/spbgti-tu/',
        isGOS:        true, //государственный ли?
        annonce:      'Направления обучения: менеджмент; строительство; химическая технология энергонасыщенных материалов и изделий и еще 17 направлений',
        budget:       45,
        budget_count: 1274,
        platno:       36.33,
        platno_count: 5651,
        price:        48000, //стоимость в год
    },
    {
        id:           45,
        title:        'Санкт-Петербургский государственный электротехнический университет "ЛЭТИ" имени В.И. Ульянова (Ленина)',
        city:         CITIES[0],
        imgIcon:      'https://postupi.online/images/images90/45/001.jpg',
        url:          'https://spb.postupi.online/vuz/spbgetu-leti/',
        isGOS:        true, //государственный ли?
        annonce:      'Направления обучения: электроника и наноэлектроника; приборостроение; электроэнергетика и электротехника и еще 19 направлений',
        budget:       45,
        budget_count: 1274,
        platno:       36.33,
        platno_count: 5651,
        price:        48000, //стоимость в год
    },
    {
        id:           9,
        title:        'Санкт-Петербургский национальный исследовательский университет информационных технологий, механики и оптики',
        city:         CITIES[0],
        imgIcon:      'https://postupi.online/images/images90/09/980.jpg',
        url:          'https://spb.postupi.online/vuz/universitet-itmo/',
        isGOS:        true, //государственный ли?
        annonce:      'Направления обучения: фотоника и оптоинформатика; программная инженерия; техническая физика и еще 27 направлений',
        budget:       45,
        budget_count: 1274,
        platno:       36.33,
        platno_count: 5651,
        price:        48000, //стоимость в год
    },
    {
        id:           14,
        title:        'Ленинградский государственный университет имени А.С. Пушкина',
        city:         CITIES[0],
        imgIcon:      'https://postupi.online/images/images90/14/214.jpg',
        url:          'https://spb.postupi.online/vuz/lgu-im-pushkina/',
        isGOS:        true, //государственный ли?
        annonce:      'Направления обучения: педагогическое образование; педагогическое образование (с двумя профилями подготовки); специальное (дефектологическое) образование и еще 25 направлений',
        budget:       45,
        budget_count: 1274,
        platno:       36.33,
        platno_count: 5651,
        price:        48000, //стоимость в год
    },
    {
        id:           109,
        title:        'Северо-Западный государственный медицинский университет имени И.И. Мечникова',
        city:         CITIES[0],
        imgIcon:      'https://postupi.online/images/images90/00/109.jpg',
        url:          'https://spb.postupi.online/vuz/szgmu-im-mechnikova/',
        isGOS:        true, //государственный ли?
        annonce:      'Направления обучения: медико-профилактическое дело; стоматология; лечебное дело и еще 1 направление',
        budget:       45,
        budget_count: 1274,
        platno:       36.33,
        platno_count: 5651,
        price:        48000, //стоимость в год
    },
    {
        id:           108,
        title:        'Санкт-Петербургский государственный химико-фармацевтический университет',
        city:         CITIES[0],
        imgIcon:      'https://postupi.online/images/images90/00/108.jpg',
        url:          'https://spb.postupi.online/vuz/sankt-peterburgskij-gosudarstvennyj-himiko-farmacevticheskij-universitet/',
        isGOS:        true, //государственный ли?
        annonce:      'Направления обучения: фармация; химическая технология; химия и еще 2 направления',
        budget:       45,
        budget_count: 1274,
        platno:       36.33,
        platno_count: 5651,
        price:        48000, //стоимость в год
    },
    {
        id:           402,
        title:        'Санкт-Петербургский государственный экономический университет',
        city:         CITIES[0],
        imgIcon:      'https://postupi.online/images/images90/01/402.jpg',
        url:          'https://spb.postupi.online/vuz/spbgeu/',
        isGOS:        true, //государственный ли?
        annonce:      'Направления обучения: менеджмент; экономика; зарубежное регионоведение и еще 20 направлений',
        budget:       45,
        budget_count: 1274,
        platno:       36.33,
        platno_count: 5651,
        price:        48000, //стоимость в год
    },
    {
        id:           770,
        title:        'Санкт-Петербургский государственный университет аэрокосмического приборостроения',
        city:         CITIES[0],
        imgIcon:      'https://postupi.online/images/images90/09/770.jpg',
        url:          'https://spb.postupi.online/vuz/guap/',
        isGOS:        true, //государственный ли?
        annonce:      'Направления обучения: прикладная информатика; юриспруденция; экономика и еще 51 направление',
        budget:       45,
        budget_count: 1274,
        platno:       36.33,
        platno_count: 5651,
        price:        48000, //стоимость в год
    },

];


export const universityDataMock = {
    results: data,
    next:    null,
    count:   data.length
};
