# language: ru
Функционал: Авторизация пользователя
  Как авторизованный пользоваель
  Я должен иметь возможность авторизоваться в системе
  После ввода данных и отправки их
  Сценарий:
    Допустим я захожу на страницу "login"
    Если я введу данные
      | username       | admin |
      | password    | admin0           |
    И нажимаю на кнопку "Войти"
    То я вижу таблицу, где есть текст "Список смен"