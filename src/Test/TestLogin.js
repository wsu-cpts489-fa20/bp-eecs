import { Selector } from 'testcafe';
fixture `EECS Course Scheduler`
    .page `http://localhost:8080`;

test('Login', async t => {
    //const passwordInput = Selector('input').withAttribute('class', 'form-control login-text', 'type', 'password', 'placeholder', 'Enter Password');
    await t
    
        .typeText('#emailInput', 'LoginTest@wsu.edu')
        .typeText('#passwordInput', 'GoCougs2020')
        .click('#loginBtn')
        .expect(Selector('#feedModeDiv').visible).eql(true)
        
});

