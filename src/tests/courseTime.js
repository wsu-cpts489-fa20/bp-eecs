import { Selector } from 'testcafe';
fixture `EECS Course Scheduler`
    .page `http://localhost:8080/#/login`;

test('Login', async t => {
    //const passwordInput = Selector('input').withAttribute('class', 'form-control login-text', 'type', 'password', 'placeholder', 'Enter Password');
    await t
    
        .typeText('#emailInput', 'll@gmail.com')
        .typeText('#passwordInput', '123456aA')
        .click('#loginBtn')
        .click('#cpts')
        .click('#floatingButton')
        .expect(Selector('#timeInput').visible).eql(true)

        //const tableElement = Selector('#roundTable').withText('cpts').exists;

        //await t.expect(tableElement).ok();
        //.expect(Selector('roundTable').withText('cpts 489')).exists(true)
        
});
