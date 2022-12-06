# language: ru
Функционал: Авторизация админа и изменения статуса заказа
  Как пользователь админ
  Я перехожу на страницу заказов
  Выбираю нужный заказ и меняю его статус
  Сценарий:
    Допустим я захожу на страницу "login"
    Если я введу данные
      | username       | admin |
      | password    | admin0           |
    И нажимаю на кнопку "Войти"
    Затем я перехожу на страницу "admin/orders"
    И  нажимаю на заказ
    Затем нажимаю на статус товара
    Когда нажимаю кнопку сохранения заказа
    То я вижу статус заказа "Новый"