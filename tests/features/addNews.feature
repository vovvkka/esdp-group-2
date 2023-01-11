# language: ru
Функционал: Авторизация админа и создание одной новости
  Я логинюсь как пользователь админ и перехожу на главную страницу
  После я с главной страницы перехожу на страницу с новостями и нажимаю на кнопку добавить новость
  После этого я заполняю все нужные поля и нажимаю на кнопку добавить
  Сценарий:
    Допустим я захожу на страницу "login"
    Если я введу данные
      | username | admin  |
      | password | admin0 |
    И нажимаю на кнопку "Войти"

    Затем я захожу на страницу "admin/news/add-new-news"
    Если я введу данные
      | title | Новости |
      | description | Магазин Tai-Tai |
    И вставлю картинку "./files/beanie.jpg"
    И нажму на кнопку "Добавить"
    То я перехожу на страницу c новостями и вижу заголовок "Новости"