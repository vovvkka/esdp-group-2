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
const Operation = require("./models/Operation");

const run = async () => {
    await mongoose.set('strictQuery', false);
    await mongoose.connect(config.mongo.db);

    const collections = await mongoose.connection.db.listCollections().toArray();

    for (const coll of collections) {
        await mongoose.connection.db.dropCollection(coll.name);
    }
    const [cosmetics, toys, clothes, nursing, mother] = await Category.create({
        title: 'Косметика',
        status: 'Активный',
    }, {
        title: 'Игрушки',
        status: 'Активный',
    }, {
        title: 'Одежда',
        status: 'Активный',
    }, {
        title: 'Для кормления',
        status: 'Активный',
    }, {
        title: 'Для матери',
        status: 'Активный',
    });

    const [child, formula] = await Category.create({
        title: 'Для ребенка',
        category: cosmetics._id,
        ancestors: [cosmetics._id],
        status: 'Активный',
    }, {
        title: 'Детское питание',
        category: nursing._id,
        ancestors: [nursing._id],
        status: 'Активный',
    });
    const [crya, nyan] = await Category.create({
        title: 'Фирма Кря-Кря',
        category: child._id,
        ancestors: [cosmetics._id, child._id],
        status: 'Активный',
    }, {
        title: 'Фирма Ушастый нянь',
        category: child._id,
        ancestors: [cosmetics._id, child._id],
        status: 'Активный',
    }, {
        title: 'Уходовая',
        category: mother._id,
        ancestors: [mother._id],
        status: 'Неактивный',
    },);

    const [product1, product2, product3, product4] = await Product.create({
        title: "Детский крем Кря-кря",
        price: 300,
        category: crya._id,
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
        category: nyan._id,
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
        image: ['fixtures/toy.jpg', 'fixtures/deer.jpeg', 'fixtures/elephant.jpeg'],
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
    }, {
        title: "BIBS Соска-пустышка",
        price: 700,
        category: nursing._id,
        image: ['fixtures/bibs.webp'],
        description: 'Детям от 0 до 6 месяцев. Подходит ослабленным и недоношенным детям.' +
            'Легендарная соска-пустышка BIBS создана для стильных малышей и мам!Сделана из 100% натурального (природного) каучука, изготавливаемого из сока дерева гевеи, и безопасного полипропилена.\n' +
            '•        Круглая естественная форма («вишенка») идеально подходит практически всем детям.Благодаря своей форме насадка (шилдик) практически не соприкасается с нежным ротиком малыша и совершенно не раздражает кожу.\n' +
            '•        Все соски разработаны и сделаны в Дании и продаются уже более 40 лет по всему миру!',
        barcode: 10101019,
        priceType: 'Фиксированная',
        amount: 20,
        unit: 'шт.',
        status: 'Активный',
        purchasePrice: 430
    }, {
        title: "Соска-пустышка",
        price: 300,
        category: nursing._id,
        image: ['fixtures/pacifier.jpg'],
        description: 'Детям от 0 до 6 месяцев. Ортодонтическая форма',
        barcode: 10101020,
        priceType: 'Фиксированная',
        amount: 50,
        unit: 'шт.',
        status: 'Активный',
        purchasePrice: 230
    }, {
        title: "Бутылочка Chicco",
        price: 350,
        category: nursing._id,
        image: ['fixtures/bottle.jpg'],
        description: 'Бутылочка для кормления 150 мл',
        barcode: 10101021,
        priceType: 'Фиксированная',
        amount: 10,
        unit: 'шт.',
        status: 'Активный',
        purchasePrice: 330
    }, {
        title: "Бутылочка для кормления",
        price: 250,
        category: nursing._id,
        image: ['fixtures/bottles.webp'],
        description: 'Бутылочка для кормления 200 мл. Материал - стекло. Рисунок - жираф, носорог, тигр',
        barcode: 10101022,
        priceType: 'Фиксированная',
        amount: 20,
        unit: 'шт.',
        status: 'Активный',
        purchasePrice: 230
    }, {
        title: "Конструктор",
        price: 1050,
        category: toys._id,
        image: ['fixtures/lego.webp'],
        description: 'Конструктор-лего. Для детей от 1,5 до 6 лет. Крупные блоки, в количестве 60шт.',
        barcode: 10101023,
        priceType: 'Фиксированная',
        amount: 25,
        unit: 'шт.',
        status: 'Активный',
        purchasePrice: 830
    }, {
        title: "Развивающая игрушка Монтессори",
        price: 950,
        category: toys._id,
        image: ['fixtures/lab.jpg'],
        description: 'Игрушка Монтессори для раннего развития с лабиринтом из бусин. Материал - дерево.',
        barcode: 10101024,
        priceType: 'Фиксированная',
        amount: 5,
        unit: 'шт.',
        status: 'Активный',
        purchasePrice: 800
    }, {
        title: "Сумка-рюкзак",
        price: 3500,
        category: mother._id,
        image: ['fixtures/dbag.jpg'],
        description: 'Сумка-рюкзак — функциональный аксессуар, который оценят родители.С ней самое важное всегда будет под рукой.' +
            'Сумка-рюкзак оснащена регулируемыми плечевыми лямками. Наличие удобных лямок позволяет носить аксессуар на плечах.Сумка-рюкзак Leokid изготовлена из износостойкого материала с водоотталкивающим покрытием, благодаря этому аксессуар будет служить долго.' +
            'Термокарманы универсального размера позволяют не только сохранять комфортную температуру содержимого бутылочек, но и фиксировать их в устойчивом положении во избежание протекания.' + +
                'Съемный регулируемый ремешок позволяет быстро и легко закрепить сумку-рюкзак на коляске, а также носить аксессуар в руках или на плече.' +
            'Вместительное отделение и наличие удобных карманов дает возможность брать с собой на прогулку все необходимые вещи. Наличие непромокаемого кармана позволяет сложить мокрые вещи.',
        barcode: 10101025,
        priceType: 'Фиксированная',
        amount: 5,
        unit: 'шт.',
        status: 'Активный',
        purchasePrice: 3000
    }, {
        title: "Двойной электронный молокоотсос SWING MAXI",
        price: 4500,
        category: mother._id,
        image: ['fixtures/milk.jpg'],
        description: 'Особенности: Компактный, переносной; Работает от сети или от батареек; ' +
            'Двойное или одинарное сцеживание для регулирования лактации; Легкая сборка;' +
            ' Тихий; * Фаза стимуляции; * 9 уровней вакуума; * Клипса для крепления на поясе; ' +
            'Система соединительных трубочек для двойного или одинарного сцеживания по потребностям;' +
            ' Смартсоска Calma (Кальма) для кормления грудным молоком в комплекте.',
        barcode: 10101026,
        priceType: 'Фиксированная',
        amount: 5,
        unit: 'шт.',
        status: 'Активный',
        purchasePrice: 3500
    }, {
        title: "Набор Johnson's baby Cotton touch",
        price: 750,
        category: child._id,
        image: ['fixtures/nabor.jpeg'],
        description: 'Набор Johnson\'s baby Cotton touch. В наборе 2 предмета: средство для купания 500мл, крем 50г.',
        barcode: 10101027,
        priceType: 'Фиксированная',
        amount: 12,
        unit: 'уп.',
        status: 'Активный',
        purchasePrice: 600
    }, {
        title: "Шампунь Johnson's baby",
        price: 280,
        category: child._id,
        image: ['fixtures/shampoo.jpg'],
        description: 'Детский шампунь Johnson\'s baby без слез 200 мл ',
        barcode: 10101028,
        priceType: 'Фиксированная',
        amount: 10,
        unit: 'шт.',
        status: 'Активный',
        purchasePrice: 200
    }, {
        title: "Овечка",
        price: 700,
        category: toys._id,
        image: ['fixtures/sheep.webp', 'fixtures/sheep_black.jpg'],
        description: 'Овечка плюшевая со съемной шубкой на молнии. Расцветки шубы: бежевая, черная',
        barcode: 10101029,
        priceType: 'Фиксированная',
        amount: 11,
        unit: 'шт.',
        status: 'Активный',
        purchasePrice: 600
    }, {
        title: "Машинка бульдозер",
        price: 500,
        category: toys._id,
        image: ['fixtures/truck.webp'],
        description: 'Оранжевая пластмассовая машинка бульдозер со съемным водителем',
        barcode: 10101030,
        priceType: 'Фиксированная',
        amount: 15,
        unit: 'шт.',
        status: 'Активный',
        purchasePrice: 450
    }, {
        title: "Деревянная машинка",
        price: 400,
        category: toys._id,
        image: ['fixtures/wood.webp'],
        description: 'Деревянная машинка в виде бревна на колесах с пассажирами. Cъемные пассажиры: бобер, олень, грибочек',
        barcode: 10101031,
        priceType: 'Фиксированная',
        amount: 8,
        unit: 'шт.',
        status: 'Активный',
        purchasePrice: 300
    },);
    const [cashier1, cashier2] = await User.create({
        username: 'cashier 1',
        displayName: 'Гарри Поттер',
        password: 'cashier1',
        email: 'harry@gmail.com',
        pin: 1111,
        token: nanoid(),
        role: 'cashier',
    }, {
        username: 'cashier 2',
        displayName: 'Хаякава Аки',
        password: 'cashier2',
        email: 'aki@gmail.com',
        pin: 2222,
        token: nanoid(),
        role: 'cashier',
    }, {
        username: 'admin',
        displayName: 'Заказчик Тай-Тай',
        password: 'admin0',
        email: 'v.golem228@gmail.com',
        pin: 1234,
        token: nanoid(),
        role: 'admin',
    });

    const [shift1] = await Shift.create({
        cashier: cashier1._id,
        createdAt: new Date("2023-01-29T09:40:49.499Z"),
        isActive: false,
        updatedAt: new Date("2023-01-29T12:46:49.499Z"),
    }, {
        cashier: cashier2._id,
        createdAt: new Date("2023-01-30T09:46:49.499Z"),
        isActive: false,
        updatedAt: new Date("2023-01-30T18:46:49.499Z"),
    }, {
        cashier: cashier1._id,
        createdAt: new Date("2023-01-31T08:46:49.499Z"),
        isActive: false,
        updatedAt: new Date("2023-01-31T15:46:49.499Z"),
    },)
    ;

    await Order.create({
        customer: 'Лера',
        phone: '+(996) 555 555 555',
        order: [{product: product1._id, quantity: 1, price: product1.price}],
        status: 'Закрыт',
        address: 'г.Бишкек, микрорайон-10 1/10'
    }, {
        customer: 'Вова',
        phone: '+(996) 555 555 551',
        order: [{product: product2._id, quantity: 1, price: product2.price}, {
            product: product4._id,
            quantity: 2,
            price: product4.price
        }],
        status: 'Новый',
        address: 'г.Бишкек, микрорайон-12 16/30'
    }, {
        customer: 'Акбар',
        phone: '+(996) 555 515 555',
        order: [{product: product1._id, quantity: 3, price: product1.price}],
        status: 'Собран',
        address: 'г.Бишкек, микрорайон-8 21/13'
    }, {
        customer: 'Даниил',
        phone: '+(996) 555 155 555',
        order: [{product: product3._id, quantity: 1, price: product3.price}, {
            product: product2._id,
            quantity: 1,
            price: product2.price
        }],
        status: 'Собран',
        address: 'г.Бишкек, микрорайон-9 12/40'
    }, {
        customer: 'Жалын',
        phone: '+(996) 551 555 555',
        order: [{product: product4._id, quantity: 2, price: product4.price}, {
            product: product3._id,
            quantity: 1,
            price: product3.price
        }],
        status: 'Закрыт',
        address: 'г.Бишкек, микрорайон-5 2/50'
    });

    await Customer.create({
        name: 'Джон',
        surname: 'Доу',
        phone: '+(996) 555 555 555',
        address: 'г.Бишкек, микрорайон-10 1/11',
        discount: 5,
    }, {
        name: 'Черная',
        surname: 'пятница',
        discount: 15,
    }, {
        name: 'Элина',
        surname: 'Усенова',
        phone: '+(996) 555 555 555',
        email: 'elina@mail.ru',
        discount: 3,
    },);

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
    await Operation.create({
        shift :shift1._id,
        title :config.operations.openShift,
        dateTime :new Date("2023-01-29T09:40:49.499Z"),
        additionalInfo: {
            cash: 2700
        }
    },{
        shift :shift1._id,
        title :config.operations.purchase,
        dateTime :new Date("2023-01-29T09:40:49.499Z"),
        additionalInfo: {
            customer:"",
            discount:0,
            amountOfMoney:300,
            purchasePriceTotal:230,
            cash:2700,
            completePurchaseInfo:[{
                _id: product1._id,
                quantity:1,
                discount:0,
                price:product1.price,
                purchasePrice:product1.purchasePrice,
                title:product1.title,
                barcode:product1.barcode,
            }]
        },
    },{
        shift :shift1._id,
        title :config.operations.closeShift,
        dateTime :new Date("2023-01-29T09:40:49.499Z"),
        additionalInfo: {cash: 3000},
    });

    await mongoose.connection.close();
};

run().catch(console.error);