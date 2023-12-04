const { Given, When, Then } = require('@wdio/cucumber-framework');
const genieregisterPage = require('../pageobjects/genieregister.page');



Given(/^user is on Genie home page$/, async() => {
      await genieregisterPage.geniePageOpen();
});

Then(/^user clicks on LoginOrRegister$/, async() => {
    (await genieregisterPage.LoginOrRegister).moveTo();
    await browser.pause(3000);
});

When('user enter Username as {string}', async(LoginId) => {
	await genieregisterPage.genieUsername.setValue(LoginId);
    await browser.pause(3000);
});

When('user enter Password as {string}', async(Password) => {
	(await genieregisterPage.geniePassword).setValue(Password);
    await browser.pause(3000);
});

// When(/^user enter <LoginId> and <Password>$/, async(LoginId,Password) => {
// 	await genieregisterPage.genieLoginCredentials(LoginId,Password);
// });

Then(/^user click on SignIn button$/, async() => {
    (await genieregisterPage.genieSignInButton).click();
    await browser.pause(3000);
});
