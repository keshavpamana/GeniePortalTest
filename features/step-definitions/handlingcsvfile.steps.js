const { Given,Then } = require('@wdio/cucumber-framework');
const handlingcsvfilePage = require('../pageobjects/handlingcsvfile.page');
// const cucumberJson = require("wdio-cucumberjs-json-reporter");
const fs=require('node:fs');
const path =require('node:path');
const { parse }=require('csv-parse/sync');
Given(/^User is on Onboarding with username page$/, async() => {
	await handlingcsvfilePage.usernameURL;
    await browser.maximizeWindow();
    await browser.pause(3000);
    await browser.scroll(0,1000);
});

Then(/^User verify the Username table data$/, async() => {
const records = parse(fs.readFileSync(path.join('./Files/username.csv')), {
  columns: true,
  skip_empty_lines: true
})
    for (const record of records) {
     console.log(record.Username);
        
    }
});
