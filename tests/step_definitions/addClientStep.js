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
    I.wait(5);
});

Given('я перехожу на страницу {string}', (page) => {
    I.amOnPage('/' + page);
});

Given('я введу данные', table => {
    table.rows.forEach(row => {
        const name = row.cells[0].value;
        const value = row.cells[1].value;
        I.fillField(name, value);
    });
});

When('загружаю фотографию {string}', text => {
    I.attachFile('//div//input[@type="file"]', `${text}`);
    I.wait(10);
});

When('нажимаю кнопку {string}', buttonText => {
    I.click(`//form//button[contains(text(), "${buttonText}")]`);
    I.wait(5);
});

When('я перехожу на страницу с клиентами и вижу моего созданного {string}', text => {
    I.see(text);
});