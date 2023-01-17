const { I } = inject();

Given('я захожу на страницу {string}', (page) => {
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

When('нажимаю на кнопку {string}', buttonText => {
    I.click(`//form//button[contains(text(), "${buttonText}")]`);
    I.wait(5);
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
    I.wait(5);
});

Then('нажмаю на кнопку {string}', buttonText => {
    I.click(`//form//button[contains(text(), "${buttonText}")]`);
    I.wait(5);
});

When('перехожу на страницу {string}', page => {
    I.amOnPage('/' + page);
    I.wait(5);
});

Then('тыкаю на кнопку {string}', text => {
    I.click(`//button[contains(text(), "${text}")]`);
    I.wait(5);
});

When('выбираю поле {string}', text => {
    I.click(`//ul/li[contains(text(), "${text}")]`);
    I.wait(5);
});

When('я ввожу данные', table => {
    table.rows.forEach(row => {
        const name = row.cells[0].value;
        const value = row.cells[1].value;
        I.fillField(name, value);
    });
    I.wait(5);
});

Then('нажимаю на кнопку {string}', text => {
    I.click(`//button[contains(text(), "${text}")]`);
});

