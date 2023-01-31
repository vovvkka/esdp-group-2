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
    I.wait(5);
});

Given('я введу данные', table => {
    table.rows.forEach(row => {
        const name = row.cells[0].value;
        const value = row.cells[1].value;

        I.fillField(name, value);
    });
});

Then('вставлю картинку {string}', text => {
    I.wait(5);
    I.attachFile('//div//input[@type="file"]', `${text}`);
});

Then('нажму на кнопку {string}', buttonText => {
    I.click(`//form//button[contains(text(), "${buttonText}")]`);
});

Then('я перехожу на страницу c новостями и вижу заголовок {string}', text => {
    I.wait(5);
    I.see(text);
});