# language: ru
Функционал: Авторизация админа и редактирование кассира
  Как пользователь админ
  Я перехожу на страницу редактирования кассира
  Заполнию данные для редактирования кассира и отредактирую
  Я должен перейти на страницу категорий
  @editCashier
  Сценарий:
    Допустим я захожу на страницу "login"
    Если я введу данные
      | username | admin  |
      | password | admin0 |
    И нажимаю на кнопку "Войти"

    Затем я захожу на страницу "admin/cashiers"
    И я нажимаю на кнопку редактирования
    Затем я введу данные
      | username | 1 |
      | displayName | 1 |
      | password | 123456 |
      | pin | 1111 |
    И нажимаю на кнопку "Сохранить"
    Затем я перехожу на страницу "admin/cashiers"
    И вижу заголовок "Кассиры"