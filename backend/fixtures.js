const mongoose = require('mongoose');
const {nanoid} = require('nanoid');
const config = require('./config');

const User = require('./models/User');
const Category = require('./models/Category');
const Product = require('./models/Product');
const Shift = require('./models/Shift');
const Order = require('./models/Order');
const News = require("./models/News");
const Cash = require('./models/Cash');
const Contacts = require("./models/Contacts");
const Customer = require("./models/Customer");

const run = async () => {
    await mongoose.connect(config.mongo.db);

    const collections = await mongoose.connection.db.listCollections().toArray();

    for (const coll of collections) {
        await mongoose.connection.db.dropCollection(coll.name);
    }
    const [cosmetics, toys, clothes, formula] = await Category.create({
        title: 'Косметика',
        status: 'Активный',
    }, {
        title: 'Игрушки',
        status: 'Активный',
    }, {
        title: 'Одежда',
        status: 'Активный',
    }, {
        title: 'Детское питание',
        status: 'Активный',
    }, {
        title: 'Для матери',
        status: 'Неактивный',
    });

    const [product1, product2, product3, product4] = await Product.create({
        title: "Детский крем Кря-кря",
        price: 300,
        category: cosmetics._id,
        image: ['fixtures/creme.jpg'],
        description: 'Детский крем Кря-кря с витаминами А и Е',
        barcode: 10101010,
        priceType: 'Фиксированная',
        amount: 10,
        unit: 'шт.',
        status: 'Активный',
        purchasePrice: 230
    }, {
        title: "Крем мыло Ушастый нянь",
        price: 250,
        category: cosmetics._id,
        image: ['fixtures/soap.jpg'],
        description: 'Крем-мыло детское гипоаллергенное 300мл., с олив. маслом и экстрактом алоэ-вера',
        barcode: 10101011,
        priceType: 'Фиксированная',
        amount: 12,
        unit: 'шт.',
        status: 'Активный',
        purchasePrice: 200
    }, {
        title: "Погремушки-зверята",
        price: 500,
        category: toys._id,
        image: ['fixtures/toy.jpg','fixtures/deer.jpeg','fixtures/elephant.jpeg'],
        description: 'Набор погремушек в виде зверей 6шт.',
        barcode: 10101012,
        priceType: 'Свободная',
        amount: 4,
        unit: 'уп.',
        status: 'Активный',
        purchasePrice: 300
    }, {
        title: "Медведь",
        price: 400,
        category: toys._id,
        image: ['fixtures/bear.jpg'],
        description: 'Медведь плюшевый коричневый',
        barcode: 10101013,
        priceType: 'Свободная',
        amount: 15,
        unit: 'шт.',
        status: 'Активный',
        purchasePrice: 300
    }, {
        title: "Боди",
        price: 1200,
        category: clothes._id,
        image: ['fixtures/onesie.jpg'],
        description: 'Боди 3шт. в упаковке',
        barcode: 10101014,
        priceType: 'Фиксированная',
        amount: 5,
        unit: 'уп.',
        status: 'Активный',
        purchasePrice: 900
    }, {
        title: "Шапочки белые",
        price: 500,
        category: clothes._id,
        image: ['fixtures/beanie.jpg'],
        description: 'Белая шапочка с ушками 2шт. в упаковке',
        barcode: 10101015,
        priceType: 'Фиксированная',
        amount: 20,
        unit: 'уп.',
        status: 'Активный',
        purchasePrice: 420
    }, {
        title: "Смесь Nutrilak",
        price: 490,
        category: formula._id,
        image: ['fixtures/nutrilak.jpg'],
        description: 'Nutrilak probrain 1',
        barcode: 10101016,
        priceType: 'Фиксированная',
        amount: 30,
        unit: 'шт.',
        status: 'Активный',
        purchasePrice: 430
    }, {
        title: "Смесь Similac",
        price: 510,
        category: formula._id,
        image: ['fixtures/similac.jpg'],
        description: 'Similac 1 от 0 до 6 мес. 700гр.',
        barcode: 10101017,
        priceType: 'Фиксированная',
        amount: 25,
        unit: 'шт.',
        status: 'Активный',
        purchasePrice: 430
    }, {
        title: "Смесь Nan",
        price: 500,
        category: formula._id,
        image: ['fixtures/nan.jpg'],
        description: 'Nestle Nan Optipro 2',
        barcode: 10101018,
        priceType: 'Фиксированная',
        amount: 40,
        unit: 'шт.',
        status: 'Активный',
        purchasePrice: 430
    });
    const [cashier1, cashier2] = await User.create({
        username: 'cashier 1',
        displayName: 'Жувагин Павел',
        password: 'cashier1',
        email: 'pavel@gmail.com',
        pin: 1111,
        token: nanoid(),
        role: 'cashier',
    }, {
        username: 'cashier 2',
        displayName: 'Сычев Виталий',
        password: 'cashier2',
        email: 'vitalya@gmail.com',
        pin: 2222,
        token: nanoid(),
        role: 'cashier',
    }, {
        username: 'admin',
        displayName: 'Заказчик Тай-Тай',
        password: 'admin0',
        email: 'zakazchik@gmail.com',
        pin: 1234,
        token: nanoid(),
        role: 'admin',
    });

    await Shift.create({
        cashier: cashier1._id,
        isActive: false,
    }, {
        cashier: cashier2._id,
        isActive: false,
    }, {
        cashier: cashier1._id,
        isActive: true,
    });

    await Order.create({
        customer: 'Лера',
        phone: '+(996) 555 555 555',
        order: [{product: product1._id, quantity: 1}],
        status: 'Закрыт',
        address: 'г.Бишкек, микрорайон-10 1/10'
    }, {
        customer: 'Вова',
        phone: '+(996) 555 555 551',
        order: [{product: product2._id, quantity: 1}, {product: product4._id, quantity: 2}],
        status: 'Новый',
        address: 'г.Бишкек, микрорайон-12 16/30'
    }, {
        customer: 'Акбар',
        phone: '+(996) 555 515 555',
        order: [{product: product1._id, quantity: 3}],
        status: 'Собран',
        address: 'г.Бишкек, микрорайон-8 21/13'
    }, {
        customer: 'Даниил',
        phone: '+(996) 555 155 555',
        order: [{product: product3._id, quantity: 1}, {product: product2._id, quantity: 1}],
        status: 'Собран',
        address: 'г.Бишкек, микрорайон-9 12/40'
    }, {
        customer: 'Жалын',
        phone: '+(996) 551 555 555',
        order: [{product: product4._id, quantity: 2}, {product: product3._id, quantity: 1}],
        status: 'Закрыт',
        address: 'г.Бишкек, микрорайон-5 2/50'
    });

    await Customer.create({
        name: 'Джон',
        surname: 'Доу',
        phone: '+(996) 555 555 555',
        address: 'г.Бишкек, микрорайон-10 1/11',
        discount: 5,
    },{
        name: 'Черная',
        surname: 'пятница',
        discount: 15,
    },{
        name: 'Элина',
        surname: 'Усенова',
        phone: '+(996) 555 555 555',
        email: 'elina@mail.ru',
        discount: 3,
    }, );

    await News.create({
        title: 'Распродажа в Тай-Тай!',
        description: 'Дорогие друзья! С 5 декабря по 31 декабря 2022 года в сети розничных магазинов и интернет-магазине Тай-Тай проходит большая распродажа! Это отличная возможность приобрести детские вещи и игрушки по привлекательным ценам. В акции участвуют разнообразные игрушки и подарки для малышей. Спешите приобрести, пока не разобрали!',
        image: 'fixtures/sale.png',
        published: true,
    }, {
        title: 'Доставка по всему СНГ!',
        description: 'Дорогие друзья! Рады сообщить, что теперь вы можете воспользоваться доставкой в любую точку СНГ! Стоимость и сроки доставки рассчитываются согласно тарифам служб доставки. Вы можете забрать ваш заказ на кассе выбранного службы сети "Пятёрочка". Возможна только онлайн-оплата. При заказе от 10000 сом доставка осуществляется бесплатно!',
        image: 'fixtures/delivery.png',
        published: true,
    }, {
        title: 'Акция 2+1!',
        description: 'Уважаемые друзья! Спешите приобрести все для вашего малыша по сниженным ценам! Только 25.11.2022 действует специальное предложение: при покупке двух акционных товаров третий вы получаете абсолютно беспалтно! Не пропустите!',
        image: 'fixtures/2+1.png',
    }, {
        title: 'Оформите скидочную карту и получайте кэшбек!',
        description: 'Дорогие друзья, магазин Tai-Tai напоминает о выгодной программе «Тай-Тай Бонус». Совершайте покупки по скидке и копите баллы, которыми вы сможете оплатить любую покупку! Карту можно оформить в любом филиале Tai-Tai!',
        image: 'fixtures/discount.png',
        published: true,
    });

    await Contacts.create({
        address: ["Мега Молл ул. Торгоева, Алдашева (К.Маркса), Каракол"],
        phone: ["+996 (555) 911 343"],
        email: "hello@womazing.com",
        instagram: 'https://instagram.com/tay_tay_karakol?igshid=YmMyMTA2M2Y='
    });

    await Cash.create({
        cash: 3000,
    });

    await mongoose.connection.close();
};

run().catch(console.error);