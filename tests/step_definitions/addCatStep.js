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

Given('я перехожу на страницу {string}', (page) => {
    I.amOnPage('/' + page);
});

Given('кликаю на первый селект и выбираю поле {string}', text => {
    I.click(`//div//input`);
    I.wait(5);
    I.click(`//div//span[@title="${text}"]`);
});

Given('я введу данные', table => {
    table.rows.forEach(row => {
        const name = row.cells[0].value;
        const value = row.cells[1].value;
        I.fillField(name, value);
    });
});

Then('я нажму на селект {string}', text => {
    I.click(text);
    I.click(`//ul//li[@data-value="Активный"]`);
});

When('я нажимаю на кнопку {string}', saveText => {
    I.forceClick(`//form//button[contains(text(), "${saveText}")]`);
    I.wait(5);
});

Then('я перехожу на страницу с категориями и вижу моя созданную {string}', text => {
    I.see(text);
});

