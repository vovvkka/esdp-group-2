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

When('я ввожу данные', table => {
    table.rows.forEach(row => {
        const name = row.cells[0].value;
        const value = row.cells[1].value;
        I.fillField(name, value);
    });
});

Then('нажмаю на кнопку {string}', buttonText => {
    I.click(`//button[contains(text(), "${buttonText}")]`);
});

When('перехожу на страницу {string}', page => {
    I.amOnPage('/' + page);
    I.wait(5);
});

Then('тыкаю на кнопку {string}', text => {
    I.click(`//button[contains(text(), "${text}")]`);
    I.wait(2);
});

When('выбираю поле {string}', text => {
    I.click(`//ul/li[contains(text(), "${text}")]`);
    I.wait(5);
});

When('нажимаю на кнопку в модальном окне {string}', textButton => {
    I.click(`//div//button[contains(text(), "${textButton}")]`);
});

When('я перехожу на страницу {string}', page => {
    I.amOnPage('/' + page);
    I.wait(5);
});

Then('вижу заголовок {string}', text => {
    I.see(text);
});