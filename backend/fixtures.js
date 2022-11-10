const mongoose = require('mongoose');
const {nanoid} = require('nanoid');
const config = require('./config');

const User = require('./models/User');
const Category = require('./models/Category');
const Product = require('./models/Product');
const Shift = require('./models/WorkingShift');

const run = async () => {
    await mongoose.connect(config.mongo.db);

    const collections = await mongoose.connection.db.listCollections().toArray();

    for (const coll of collections) {
        await mongoose.connection.db.dropCollection(coll.name);
    }
    const [cosmetics,toys,clothes,formula]= await Category.create({
        title: 'Косметика',
        status: 'Активный',
        nds:0,
        nspCash:0,
        nspNotCash:0,
    }, {
        title: 'Игрушки',
        status: 'Активный',
        nds:0,
        nspCash:0,
        nspNotCash:0,
    }, {
        title: 'Одежда',
        status: 'Активный',
        nds:0,
        nspCash:0,
        nspNotCash:0,
    }, {
        title: 'Детское питание',
        status: 'Активный',
        nds:0,
        nspCash:0,
        nspNotCash:0,
    }, {
        title: 'Для матери',
        status: 'Неактивный',
        nds:0,
        nspCash:0,
        nspNotCash:0,
    });
    await Product.create({
        title: "Детский крем Кря-кря",
        price: 300,
        category: cosmetics._id,
        image: 'fixtures/creme.jpg',
        description:'Детский крем Кря-кря с витаминами А и Е',
        barcode:10101010,
        priceType:'Фиксированная',
        amount:10,
        unit:'шт.',
        status:'Активный',
        purchasePrice:230
    }, {
        title: "Крем мыло Ушастый нянь",
        price: 250,
        category: cosmetics._id,
        image: 'fixtures/soap.jpg',
        description:'Крем-мыло детское гипоаллергенное 300мл., с олив. маслом и экстрактом алоэ-вера',
        barcode:10101011,
        priceType:'Фиксированная',
        amount:12,
        unit:'шт.',
        status:'Активный',
        purchasePrice:200
    }, {
        title: "Погремушки-зверята",
        price: 500,
        category: toys._id,
        image: 'fixtures/toy.jpg',
        description:'Набор погремушек в виде зверей 6шт.',
        barcode:10101012,
        priceType:'Свободная',
        amount:4,
        unit:'уп.',
        status:'Активный',
        purchasePrice:300
    }, {
        title: "Медведь",
        price: 400,
        category: toys._id,
        image: 'fixtures/bear.jpg',
        description:'Медведь плюшевый коричневый',
        barcode:10101013,
        priceType:'Свободная',
        amount:15,
        unit:'шт.',
        status:'Активный',
        purchasePrice:300
    }, {
        title: "Боди",
        price: 1200,
        category: clothes._id,
        image: 'fixtures/onesie.jpg',
        description:'Боди 3шт. в упаковке',
        barcode:10101014,
        priceType:'Фиксированная',
        amount:5,
        unit:'уп.',
        status:'Активный',
        purchasePrice:900
    }, {
        title: "Шапочки белые",
        price: 500,
        category: clothes._id,
        image: 'fixtures/beanie.jpg',
        description:'Белая шапочка с ушками 2шт. в упаковке',
        barcode:10101015,
        priceType:'Фиксированная',
        amount:20,
        unit:'уп.',
        status:'Активный',
        purchasePrice:420
    }, {
        title: "Смесь Nutrilak",
        price: 490,
        category: formula._id,
        image: 'fixtures/nutrilak.jpg',
        description:'Nutrilak probrain 1',
        barcode:10101016,
        priceType:'Фиксированная',
        amount:30,
        unit:'шт.',
        status:'Активный',
        purchasePrice:430
    }, {
        title: "Смесь Similac",
        price: 510,
        category: formula._id,
        image: 'fixtures/similac.jpg',
        description:'Similac 1 от 0 до 6 мес. 700гр.',
        barcode:10101017,
        priceType:'Фиксированная',
        amount:25,
        unit:'шт.',
        status:'Активный',
        purchasePrice:430
    }, {
        title: "Смесь Nan",
        price: 500,
        category: formula._id,
        image: 'fixtures/nan.jpg',
        description:'Nestle Nan Optipro 2',
        barcode:10101018,
        priceType:'Фиксированная',
        amount:40,
        unit:'шт.',
        status:'Активный',
        purchasePrice:430
    });
    const[cashier1,cashier2] = await User.create( {
        username: 'cashier 1',
        password: 'cashier1',
        pin: 1111,
        token: nanoid(),
        role: 'cashier',
    }, {
        username: 'cashier 2',
        password: 'cashier2',
        pin: 2222,
        token: nanoid(),
        role: 'cashier',
    },{
        username: 'admin',
        password: 'admin',
        pin: 1234,
        token: nanoid(),
        role: 'admin',
    });

    await Shift.create({
        cashier: cashier1._id,
        isActive: false,
    },{
        cashier: cashier2._id,
        isActive: false,
    },{
        cashier: cashier1._id,
        isActive: true,
    });
    await mongoose.connection.close();
};

run().catch(console.error);