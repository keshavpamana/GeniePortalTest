const { Given, When, Then } = require('@wdio/cucumber-framework');
const genieregistrationPage = require('../pageobjects/genieregistration.page');

//----------Email Field-----------//
Given(/^user is on Genie Caregiver Registration form$/, async() => {
     await genieregistrationPage.genieurl();
	 await browser.maximizeWindow();
	 await browser.pause(2000);
});

Then(/^verify email label$/, async() => {
    // await genieregistrationPage.emailLabel.getText();
	//await expect(emaillabelText).toHaveTextContaining('Email');
	console.log(await genieregistrationPage.emailLabel.getText());
	await browser.pause(1000);
});

When(/^user clicks on email input field$/, async() => {
    await genieregistrationPage.emailfield.click();
	await browser.pause(2000);
});

When(/^user enter invalid email value$/, async(table) => {
    await genieregistrationPage.EmailField(table);
	// await genieregistrationPage.emailfield.setVlaue()
	await browser.pause(2000);
	await genieregistrationPage.passwordfield.click();
});

Then('verify the email error message is {string}', async(errormessage) => {
	let errormsgEle=genieregistrationPage.invalidEmailError;
	await expect(errormsgEle).toHaveTextContaining(errormessage);
	console.log('Errormessage :'+errormsgEle.getText()); 
	await browser.pause(2000);
});

Then(/^verify the email input field highlighted with red color$/, async() => {
    let emailfieldcolor=await genieregistrationPage.emailfield.getCSSProperty('border-color');
	console.log(emailfieldcolor);
	await browser.pause(2000);
});

When(/^user enter already created mail into the email input field$/, async(table) => {
    await genieregistrationPage.emailfield.clearValue();
	await browser.pause(2000);
	await genieregistrationPage.EmailField(table);
	// await genieregistrationPage.emailfield.setalue(table.raw()[0][0]);
	await browser.pause(1000);
	await genieregistrationPage.passwordfield.click();
	await browser.pause(1000);
});

Then('verify displayed error message {string}', async(errormessage2) => {
    let errormsgEle2=await genieregistrationPage.existingEmailError;
	await expect(errormsgEle2).toHaveTextContaining(errormessage2);
	await browser.pause(2000);
});

When(/^user enter valid email vlaue$/, async(table) => {
    await genieregistrationPage.emailfield.clearValue();
	await browser.pause(2000);
	await genieregistrationPage.EmailField(table);
	// await genieregistrationPage.emailfield.setVlaue(table.raw()[0][0]);
	await browser.pause(2000);
});

Then(/^verify the email input field highlighted with green color$/, async() => {
	let emailfieldcolor=await genieregistrationPage.emailfield.getCSSProperty('border-color');
	console.log(emailfieldcolor);
	await browser.pause(2000);
});

//----------Password Field-----------//
When(/^user enter empty password and click on Confirm Password$/, async() => {
    (await genieregistrationPage.passwordfield).click();
	await browser.pause(2000);
	(await genieregistrationPage.confirmPasswordField).click();
	await browser.pause(2000);
});

Then('verify the displayed error message like {string}', async(passerror) => {
	let passerrtext=await genieregistrationPage.passwordError;
    await await expect(passerrtext).toHaveTextContaining(passerror);
	console.log(passerrtext.getText());
	await browser.pause(2000);
});

// Then('verify the displayed  confirmation error message like {string}', async(confirmpasserror) => {
// 	let confirmPasserrtext=await genieregistrationPage.confirmPassError;
// 	await await expect(confirmPasserrtext).toHaveTextContaining(confirmpasserror);
// 	console.log(confirmPasserrtext.getText());
// 	await browser.pause(2000);
// });

When(/^user enter weak password$/, async(table) => {
    await genieregistrationPage.passwordfield.setValue(table.raw()[0][0]);
	await browser.pause(2000);
});

Then(/^verify displayed password strengthBar$/, async() => {
    await genieregistrationPage.strengthBar.saveScreenshot('./Screenshots/weekpasswordBar.png');
	await browser.pause(2000);
});

When(/^user enter strong password$/, async(table) => {
	(await genieregistrationPage.passwordfield).clearValue();
	await genieregistrationPage.passwordfield.setValue(table.raw()[0][0]);
	await browser.pause(2000);
});

Then(/^user verify displayed password strengthBar$/, async() => {
	await genieregistrationPage.strengthBar.saveScreenshot('./Screenshots/strongpasswordBar.png');
	await browser.pause(2000);
});

When(/^user enter wrong confirm password into the Confirm Password field$/, async(table) => {
    (await genieregistrationPage.confirmPasswordField).setValue(table.raw()[0][0]);
	await browser.pause(3000);
});

Then('verify displayed error message is {string}', async(confirmpassError) => {
	let confirmPasserrtext2=await genieregistrationPage.confirmPasswordError;
	await expect(confirmPasserrtext2).toHaveTextContaining(confirmpassError);
	console.log(confirmPasserrtext2.getText());
	await browser.pause(3000);
});

When(/^user enter correct matched password into the Confirm Password field$/, async(table) => {
    (await genieregistrationPage.confirmPasswordField).clearValue();
	await browser.pause(3000);
	(await genieregistrationPage.confirmPasswordField).setValue(table.raw()[0][0]);
	await browser.pause(3000);
});
  
//-----------Phone Number Field--------//

When(/^user enter invalid phone number into the Phone Number field$/, async(table) => {
    await genieregistrationPage.phoneNumberField.setValue(table.raw()[0][0]);
	await browser.pause(2000);
});

Then('user is able to see a message like {string}', async(phonenumerrText) => {
	// let phoneNumErr=await genieregistrationPage.phoneNumberFieldError;
	// await expect(phoneNumErr).toHaveTextContaining()
	let phnrerr=await genieregistrationPage.phoneNumberFieldError.getText();
	if(phonenumerrText==phnrerr){
		console.log(await genieregistrationPage.phoneNumberFieldError.getText());
	}
	await browser.pause(3000);
});

When(/^user enter valid phone number into the Phone number input field$/, async(table) => {
    await genieregistrationPage.phoneNumberField.clearValue();
	await browser.pause(3000);
	await genieregistrationPage.phoneNumberField.setValue(table.raw()[0][0]);
});

//-----------Firstname and Lastname--------//

When(/^user click on firstname field and enter no data$/, async() => {
    await genieregistrationPage.Firstname.click();
	await browser.pause(2000);
	await genieregistrationPage.Lastname.click();
});

Then('user is able to see a message {string}', async(error) => {
	let error1=await genieregistrationPage.FirstNLastNError1;
	await expect(error1).toHaveTextContaining(error);
	await browser.pause(2000);
});

When('user enter above Hundred characters into the input field', async() => {
const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
function generateString(length) {
    let result = ' ';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
//  console.log(generateString(5));
await genieregistrationPage.Firstname.setValue(generateString(105));
	// for ( let i = 0; i <105; i++ ) {
    //     result += characters.charAt(Math.floor(Math.random() * charactersLength));
	// await genieregistrationPage.Firstname.setValue(Math.floor(Math.random()*table.raw()[0][0]));
	// }
	// await browser.pause(2000);
});

Then('user is able to see a error message is {string}', async(error) => {
	let error1=await genieregistrationPage.FirstNLastNError2;
	await expect(error1).toHaveTextContaining(error);
	await browser.pause(2000);
});

When(/^user enter  multiple data into the firstname field$/, async(table) => {
     await genieregistrationPage.Firstname.clearValue();
	 await browser.pause(2000);
	 await genieregistrationPage.Firstname.setValue(table.raw()[0][0]);
	 await browser.pause(2000);
	 await genieregistrationPage.Firstname.clearValue();
	 await browser.pause(2000);
	 await genieregistrationPage.Firstname.setValue(table.raw()[1][0]);
	 await browser.pause(2000);
	 await genieregistrationPage.Firstname.clearValue();
	 await browser.pause(2000);
	 await genieregistrationPage.Firstname.setValue(table.raw()[2][0]);
	 await browser.pause(2000);
});

When(/^user  click on Lastname field$/, async() => {
     await genieregistrationPage.Lastname.click();
	 await browser.pause(1000);
});

When(/^user enter valid data into the Lastname field$/, async(table) => {
	await genieregistrationPage.Lastname.setValue(table.raw()[0][0]);
	await browser.pause(2000);
	await genieregistrationPage.Lastname.clearValue();
	await browser.pause(2000);
	await genieregistrationPage.Lastname.setValue(table.raw()[1][0]);
	await browser.pause(2000);
	await genieregistrationPage.Lastname.clearValue();
	await browser.pause(2000);
	await genieregistrationPage.Lastname.setValue(table.raw()[2][0]);
	await browser.pause(2000);
});
  //----------calendar field--------//
 
When(/^user click on calendar icon$/, async() => {
    await genieregistrationPage.calendarIcon.click();
	await browser.pause(2000)
});

When('user click on {string} button', async(button) => {
	await genieregistrationPage.calendarButtons(button).click();
	await browser.pause(2000);
});

Then(/^verify calendar field have today date$/, async() => {
    await genieregistrationPage.calendarField.saveScreenshot('./Screenshots/dateText.png');
	await browser.pause(2000);
});

When(/^user click on calendar icon$/, async() => {
	await genieregistrationPage.calendarIcon.click();
	await browser.pause(2000)
});

When('user click on {string} button', async(button) => {
	await genieregistrationPage.calendarButtons(button).click();
	await browser.pause(2000);
});

When('user click on {string} button', async(button) => {
	await genieregistrationPage.calendarButtons(button).click();
	await browser.pause(2000);
});

When(/^user click on calendar icon$/, async() => {
	await genieregistrationPage.calendarIcon.click();
	await browser.pause(2000)
});

Then('user select a future date as {string}', async() => {
	await genieregistrationPage.datePick(date).click();
	await genieregistrationPage.calendarField.saveScreenshot('./Screenshots/dateText2.png');
	await browser.pause(2000);
});
 





