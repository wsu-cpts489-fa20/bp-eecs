import { Selector } from 'testcafe';
fixture `EECS Course Scheduler`
    .page `http://localhost:3000/#/login`;

test('Login', async t => {
    await t
        .typeText('#emailInput', 'test@admin.com')
        .typeText('#passwordInput', 'testtest1A')
        .click('#loginBtn')
        .click('#cpts');

    const cptsMajor = Selector('#roundTable').withText('#cpts');

    await t.expect(cptsMajor).ok();
});

test('Login', async t => {
    await t
        .typeText('#emailInput', 'test@admin.com')
        .typeText('#passwordInput', 'testtest1A')
        .click('#loginBtn')
        .click('#cpte');

    const cpteMajor = Selector('#roundTable').withText('#cpte');

    await t.expect(cpteMajor).ok();
});

test('Login', async t => {
    await t
        .typeText('#emailInput', 'test@admin.com')
        .typeText('#passwordInput', 'testtest1A')
        .click('#loginBtn')
        .click('#ee');

    const eeMajor = Selector('#roundTable').withText('#ee');

    await t.expect(eeMajor).ok();
});

test('Login', async t => {
    await t
        .typeText('#emailInput', 'test@admin.com')
        .typeText('#passwordInput', 'testtest1A')
        .click('#loginBtn')
        .click('#se');

    const seMajor = Selector('#roundTable').withText('#se');

    await t.expect(seMajor).ok();
});