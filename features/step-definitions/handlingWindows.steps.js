const { When, Then } = require('@wdio/cucumber-framework');
const { elementClick, waitTime } = require('../Properties/TimeOut.page');
const vars=require('../Properties/genievariables.json');
const genieregisterPage = require('../pageobjects/genieregister.page');
const cucumberJson = require("wdio-cucumberjs-json-reporter");

When(/^user click on facebook button$/, async() => {
    await elementClick(genieregisterPage.facebookFrameButton);
});

Then(/^Verify user is in facebook page and navigate to facebook Login Page$/, async() => {
    const handles = await browser.getWindowHandles();
    await browser.switchToWindow(handles[1]);
    //await browser.maximizeWindow();
    let url="https://www.facebook.com/login.php?skip_api_login=1&api_key=966242223397117&signed_next=1&next=https%3A%2F%2Fwww.facebook.com%2Fsharer%2Fsharer.php%3Fu%3Dwww.geniehealthjobs.com&cancel_url=https%3A%2F%2Fwww.facebook.com%2Fdialog%2Fclose_window%2F%3Fapp_id%3D966242223397117%26connect%3D0%23_%3D_&display=popup&locale=en_GB";
    await expect(browser).toHaveUrl(url);
    let Title="Facebook - Google Chrome";
    await expect(browser.getTitle() === Title);
    cucumberJson.attach(await browser.takeScreenshot(), 'image/png');
});

When(/^user enter email into the Email Address field$/, async() => {
    await genieregisterPage.facebookFrameEmailField.setValue(vars.facebookMail);
});

When(/^user enter a password$/, async() => {
    await genieregisterPage.facebookFramePasswordField.setValue(vars.facebookPassword);
});

When(/^user click on fb Login button$/, async() => {
    await elementClick(genieregisterPage.facebookWindowLoginButton);
    await waitTime();
});

Then(/^verify user is navigate to Post to Facebook page$/, async() => {
    let Title="Post to Facebook - Google Chrome";
    await expect(browser.getTitle() === Title);
    cucumberJson.attach(await browser.takeScreenshot(), 'image/png');
});

Then(/^user enter text Say something about this..$/, async() => {
   await genieregisterPage.facebookWindowtextArea.setValue("Gg bolthe Genie");
   cucumberJson.attach(await browser.takeScreenshot(), 'image/png');
   await waitTime();
});

When(/^user switch to parent Window$/, async() => {
    const handles = await browser.getWindowHandles();
    await browser.switchToWindow(handles[0]);
});


