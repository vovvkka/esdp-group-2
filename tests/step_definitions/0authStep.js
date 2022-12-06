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

Then('я вижу таблицу, где есть текст {string}', text => {
    I.see(text);
    I.wait(5);
});


