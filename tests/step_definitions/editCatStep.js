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

When('пытаюсь нажать кнопку редактирования', () => {
    I.click(`//tr//td//a`);
    I.wait(5);
});

Given('нажимаю на первый селект в неём выбираю пункт {string}',text => {
    I.click(`//div//input`);
    I.wait(5);
    I.click(`//div//span[@title="${text}"]`);
});

Then('ввожу данные', table => {
    table.rows.forEach(row => {
        const name = row.cells[0].value;
        const value = row.cells[1].value;
        I.fillField(name, value);
    });
});

Given('нажму на второй селект {string}', text => {
    I.click(text);
    I.click(`//ul//li[@data-value="Неактивный"]`);
});

When('я нажимаю на кнопку {string}', saveText => {
    I.forceClick(`//form//button[contains(text(), "${saveText}")]`);
    I.wait(5);
});

Then('я перехожу на страницу с категориями и вижу мою отредактированную {string}', text => {
    I.see(text);
});