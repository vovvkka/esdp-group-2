# Тай-тай
Задача состояла в том, чтобы разработать товаро-учетную систему, рабочее место кассира и интернет-магазин для небольшого магазина одежды.
- Статус разработки: завершен.
- Статус билда: не закончен.
- Покрыто приемочными тестами: 50% проекта.

## Содержание
- [Технологии](#технологии)
- [Начало работы](#начало-работы)
- [Тестирование](#тестирование)
- [Deploy и CI/CD](#deploy-и-ci/cd)
- [Contributing](#contributing)
- [To do](#to-do)
- [Команда проекта](#команда-проекта)


## Технологии
- [React](https://ru.reactjs.org/)
- [Redux](https://redux.js.org/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Node.js](https://nodejs.org/en/)
- [Express.js](https://expressjs.com/ru/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose ODM](https://mongoosejs.com/)

### Дополнительные библиотеки используемые в разработке
- [Axios](https://www.npmjs.com/package/axios) - для запросов на сервер
- [History](https://www.npmjs.com/package/history) - для навигации по проекту
- [Material UI](https://mui.com/) - для UI компонентов админской части.
- [Toastify](https://www.npmjs.com/package/react-toastify) - для всплывающих уведомлений на админской части.
- [MUI DataTables](https://www.npmjs.com/package//mui-datatables) - для создания таблиц учета на админской части.
- [Prettier](https://prettier.io/) - для форматирования кода.


## Разработка

### Требования
Для установки и запуска проекта, необходим [NodeJS](https://nodejs.org/) v16+.

### Установка зависимостей  

#### Клиентская часть

Для установки зависимостей, выполните команду:
```sh
$ npm i --force
```

Для запуска приложения, выполните команду:
```sh
$ npm start
```

#### Серверная часть

Для установки зависимостей, выполните команду:
```sh
$ npm i
```

Для создания фикстур, выполните команду:
```sh
$ npm run seed
```

Для запуска сервера, выполните команду:
```sh
$ npm start
```

## Тестирование
Инструменты используемые для тестирования в проекте:
- [Puppeteer](https://pptr.dev/)
- [Jest](https://jestjs.io/ru/)
- [Gherkin](https://cucumber.io/docs/gherkin/)

Наш проект покрыт приемочными тестами Puppeteer. Для их запуска выполните команду:
```sh
$ ./test.sh
```

