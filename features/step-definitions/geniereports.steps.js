const {When} = require('@wdio/cucumber-framework');
const genieelementsPage = require('../pageobjects/GenieElements/genieelements.page');

When('user click on {string}', async(button) => {
	(await genieelementsPage.ReportButton(button)).click();
    await browser.pause(3000);
});

When('user clicks on {string}', async(button) => {
	(await genieelementsPage.ReportButton(button)).click();
    await browser.pause(3000);
});
