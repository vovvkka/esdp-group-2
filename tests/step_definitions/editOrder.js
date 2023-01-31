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
    I.wait(5);
});

When('нажимаю на заказ', () => {
    I.click(`//div//tbody//tr//td//div[contains(text(), "+(996) 555 515 555")]`);
    I.wait(5);
});
When('нажимаю на статус товара', () => {
    I.click(`//input[@name='status']`);
    I.click(`//ul//li[@data-value="Новый"]`);
    I.wait(5);
});
When('нажимаю кнопку сохранения заказа', () => {
    I.click(`//button[contains(text(), "Сохранить")]`);
    I.wait(5);
});

Then('я вижу статус заказа {string}', text => {
    I.see(text);
});


