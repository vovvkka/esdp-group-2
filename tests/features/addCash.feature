# language: ru
Функционал: Авторизация кассира и внесение наличных в кассу
  Как пользователь кассир я перехожу на страницу открытия смены
  После открытия смены, открываю модальное окно с внесением наличных в кассу
  Сценарий:
    Допустим я захожу на страницу "login"
    Если я введу данные
      | username | cashier 1 |
      | password | cashier1 |
    И нажимаю на кнопку "Войти"
    Затем я захожу на страницу "cashier/open-shift"
    Затем я ввожу данные
      | pin | 1111 |
    И нажмаю на кнопку "Открыть смену"
    Затем перехожу на страницу "cashier"
    И тыкаю на кнопку "Операции"
    Затем выбираю поле "Внесение наличных"
    Затем я ввожу данные
      | amountOfMoney | 2000 |
      | comment | на товар |
    И нажимаю на кнопку "Внести"