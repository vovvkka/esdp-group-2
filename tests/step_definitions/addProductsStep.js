const { I } = inject();

Given('я захожу на страницу {string}', (page) => {
    I.amOnPage('/' + page);
});

Given('я введу данные', table => {
    table.rows.forEach(row => {
        const name = row.cells[0].value;
        const value = row.cells[1].value;
        I.fillField(name, value);
    });
});

When('нажимаю на кнопку {string}', buttonText => {
    I.click(`//form//button[contains(text(), "${buttonText}")]`);
});

When('я захожу на страницу {string}', page => {
    I.amOnPage('/' + page);
    I.wait(2);
});

Then('перехожу на страницу {string}', page => {
    I.amOnPage('/' + page);
    I.wait(2);
});

When('нажимаю на ссылку {string}', text => {
    I.click(`//a[contains(text(), "${text}")]`);
});

Then('нажимаю на первый селект в неём выбираю пункт {string}', text => {
    I.click(`//div//input`);
    I.wait(2);
    I.click(`//div//span[@title="${text}"]`);
})

When('ввожу данные', table => {
    table.rows.forEach(row => {
        const name = row.cells[0].value;
        const value = row.cells[1].value;
        I.fillField(name, value);
    });
});

When('вставляю картинку {string}', img => {
    I.wait(2);
    I.attachFile('//div//input[@type="file"]', `${img}`);
    I.wait(2);
    I.attachFile('//div//input[@type="file"]', `./files/texas.jpeg`);
});

Then('заполняю оставшиеся поля {string}', text => {
    I.click(`//div[@id="mui-component-select-priceType"]`);
    I.wait(2);
    I.click(`//ul//li[contains(text(), "Фиксированная")]`);
    I.wait(2);
    I.click(text);
    I.wait(2);
    I.click(`//ul//li[@data-value="Активный"]`);
    I.wait(2);
    I.click(`//div[@id="mui-component-select-unit"]`);
    I.wait(2);
    I.click(`//ul//li[contains(text(), "шт.")]`);
    I.wait(2);
});

When('нажимаю на кнопку {string}', text => {
    I.click(`//button[contains(text(), "${text}")]`);
});

When('перехожу на страницу с товарами и вижу заголовок {string}', (text) => {
    I.wait(5);
    I.see(text);
});
