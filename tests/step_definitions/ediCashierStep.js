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

When('я нажимаю на кнопку редактирования', () => {
    I.click(`//table//tr//td//a`);
});

Then('я введу данные', table => {
    table.rows.forEach(row => {
        const name = row.cells[0].value;
        const value = row.cells[1].value;
        I.fillField(name, value);
    });
});

When('нажимаю на кнопку', (buttonText) => {
    I.click(`//form//button[contains(text(), "${buttonText}")]`);
});

Then('я перехожу на страницу {string}', page => {
    I.amOnPage('/' + page);
    I.wait(5);
});

When('вижу заголовок {string}', text => {
    I.see(text);
});