const { Given, When, Then } = require('@wdio/cucumber-framework');
const genieregistrationPage = require('../pageobjects/genieregistration.page');
const vars=require('../Properties/genievariables.json');
const { LoginOrRegister } = require('../pageobjects/genieregister.page');
const { elementClick, waitTime } = require('../Properties/TimeOut.page');
const cucumberJson = require("wdio-cucumberjs-json-reporter");

//----------Email Field-----------------//
Given(/^user is in Genie webpage$/, async() => {
    await browser.url(vars.GenieUrl);
	await browser.maximizeWindow();
	await waitTime();
});

When(/^user is clicks on Login Register button$/, async() => {
	await LoginOrRegister.moveTo();
});

When(/^user click on Register a new Account$/, async() => {
	await waitTime();
    await elementClick(genieregistrationPage.RegisteraNewAccount);
});

Then(/^verify the  is in Genie Caregiver Registration form page$/, async() => {
    var urlname=await browser.getTitle();
	console.log(urlname);
});

Then(/^verify email label is displayed$/, async() => {
	var lableDisplayed=await genieregistrationPage.emailLabel.isDisplayed();
	console.log(lableDisplayed);
	console.log(await genieregistrationPage.emailLabel.getText());
	cucumberJson.attach(await browser.takeScreenshot(), 'image/png');
});

Then(/^verify email label$/, async() => {
	console.log(await genieregistrationPage.emailLabel.getText());
	
});

When(/^user clicks on email input field and enter no data$/, async() => {
    await elementClick(genieregistrationPage.emailfield);
	await elementClick(genieregistrationPage.passwordfield);
});

Then('user able to see a email error message displayed as {string}', async(emailerror) => {
	var errormsgEle=genieregistrationPage.thisfieldError;
	await expect(errormsgEle).toHaveTextContaining(emailerror);
	cucumberJson.attach(await browser.takeScreenshot(), 'image/png');
});

When(/^user enter invalid email value$/, async(table) => {
    await genieregistrationPage.EmailField(table);
	await waitTime();
	await elementClick(genieregistrationPage.passwordfield);
});

Then('verify the email error message is {string}', async(emailerror) => {
	var errormsgEle=genieregistrationPage.invalidEmailError(emailerror)
	await expect(errormsgEle).toHaveTextContaining(emailerror);
	cucumberJson.attach(await browser.takeScreenshot(), 'image/png');
});

Then(/^verify the email input field highlighted with red color$/, async() => {
    let emailfieldcolor=await genieregistrationPage.emailfield.getCSSProperty('border-color');
	console.log(emailfieldcolor);
	cucumberJson.attach(await browser.takeScreenshot(), 'image/png');
});

When(/^user enter already created mail into the email input field$/, async(table) => {
    await genieregistrationPage.emailfield.clearValue();
	await genieregistrationPage.EmailField(table);
	await waitTime();
	await elementClick(genieregistrationPage.passwordfield);
});

Then('verify displayed error message {string}', async(errormessage2) => {
    var errormsgEle2=await genieregistrationPage.existingEmailError;
	await expect(errormsgEle2).toHaveTextContaining(errormessage2);
	cucumberJson.attach(await browser.takeScreenshot(), 'image/png');
});

When(/^user enter minimum length email into email input field$/, async() => {
	await genieregistrationPage.emailfield.setValue(vars.minlegthgmail);
	await elementClick(genieregistrationPage.passwordfield);
});

Then('user is able to see a email error message3 as {string}', async(emailerror) => {
	var errormsgEle=genieregistrationPage.invalidEmailError(emailerror)
	await expect(errormsgEle).toHaveTextContaining(emailerror);
	console.log('Errormessage :'+errormsgEle.getText());
	cucumberJson.attach(await browser.takeScreenshot(), 'image/png');
});

When(/^user enter maximum length email into email input field$/, async() => {
	const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
	function generateString(length) {
		let result = ' '+'@gmail.com';
		const charactersLength = characters.length;
		for ( let i = 0; i < length; i++ ) {
			result += characters.charAt(Math.floor(Math.random() * charactersLength));
		}
		return result;
	}
		await genieregistrationPage.emailfield.setValue(generateString(100));
});

Then('user is able to see a email error message4 as {string}', async(emailerror) => {
	var errormsgEle=genieregistrationPage.invalidEmailError(emailerror);
	await errormsgEle.waitUntil();
	await expect(errormsgEle).toHaveTextContaining(emailerror);
	console.log('Errormessage :'+errormsgEle.getText());
	cucumberJson.attach(await browser.takeScreenshot(), 'image/png');
});

When(/^user enter valid email vlaue$/, async(table) => {
    await genieregistrationPage.emailfield.clearValue();
	await genieregistrationPage.EmailField(table);
});

Then(/^verify the email input field highlighted with green color$/, async() => {
	let emailfieldcolor=await genieregistrationPage.emailfield.getCSSProperty('border-color');
	console.log(emailfieldcolor);
	cucumberJson.attach(await browser.takeScreenshot(), 'image/png');
});

//----------Password Field-----------//

When(/^user enter empty password and click on Confirm Password$/, async() => {
    await elementClick(genieregistrationPage.passwordfield);
	await elementClick(genieregistrationPage.confirmPasswordField);
});

Then('verify the displayed error message like {string}', async(passerror) => {
	let passerrtext=await genieregistrationPage.passwordError(passerror);
    await expect(passerrtext).toHaveTextContaining(passerror);
	console.log(passerrtext.getText());
	cucumberJson.attach(await browser.takeScreenshot(), 'image/png');
});

When(/^user enter 50 above longer password into the password field$/, async() => {
	await elementClick(genieregistrationPage.passwordfield);
	const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
function generateString(length) {
    let result = ' ';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
	await genieregistrationPage.passwordfield.setValue(generateString(55));
	await waitTime();
});

Then('verify the displayed error message2 like {string}', async(passerror) => {
	let passerrtext=await genieregistrationPage.passwordError(passerror);
    await expect(passerrtext).toHaveTextContaining(passerror);
	console.log(passerrtext.getText());
	cucumberJson.attach(await browser.takeScreenshot(), 'image/png');
});

When(/^user enter least character password into the password field$/, async() => {
    await elementClick(genieregistrationPage.passwordfield);
	await genieregistrationPage.passwordfield.setValue(vars.leastpassword);
	await waitTime();
});

Then('verify the displayed error message3 as {string}', async(passerror) => {
	let passerrtext=await genieregistrationPage.passwordError(passerror);
    await expect(passerrtext).toHaveTextContaining(passerror);
	console.log(passerrtext.getText());
	cucumberJson.attach(await browser.takeScreenshot(), 'image/png'); 
});

// Then('verify the displayed  confirmation error message like {string}', async(confirmpasserror) => {
// 	let confirmPasserrtext=await genieregistrationPage.confirmPassError;
// 	await await expect(confirmPasserrtext).toHaveTextContaining(confirmpasserror);
// 	console.log(confirmPasserrtext.getText());
// 	await browser.pause(2000);
// });

When(/^user enter weak password$/, async(table) => {
    await genieregistrationPage.passwordfield.setValue(table.raw()[0][0]);
});

Then(/^verify displayed password strengthBar$/, async() => {
	await waitTime();
    cucumberJson.attach(await browser.takeScreenshot(), 'image/png');
});

When(/^user enter strong password$/, async(table) => {
	await genieregistrationPage.passwordfield.clearValue();
	await genieregistrationPage.passwordfield.setValue(table.raw()[0][0]);
});

Then(/^user verify displayed password strengthBar$/, async() => {
	await waitTime();
	cucumberJson.attach(await browser.takeScreenshot(), 'image/png');
});

When(/^user enter maximum characters into the Confirm Password field$/, async() => {
	await elementClick(genieregistrationPage.confirmPasswordField);
	const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
function generateString(length) {
    let result = ' ';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
	await genieregistrationPage.confirmPasswordField.setValue(generateString(55));
	await waitTime();
});

Then('verify the confirm password field error as {string}', async(errortext) => {
	let passerrtext=await genieregistrationPage.passwordError(errortext);
    await expect(passerrtext).toHaveTextContaining(errortext);
	console.log(passerrtext.getText());
	cucumberJson.attach(await browser.takeScreenshot(), 'image/png');
});

When(/^user enter minimum characters into the Confirm Password field$/, async() => {
	await elementClick(genieregistrationPage.confirmPasswordField);
	const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
function generateString(length) {
    let result = ' ';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
	await genieregistrationPage.confirmPasswordField.setValue(generateString(2));
	await waitTime();
});



When(/^user enter wrong confirm password into the Confirm Password field$/, async(table) => {
    await genieregistrationPage.confirmPasswordField.setValue(table.raw()[0][0]);
	await waitTime();
});

Then('verify displayed error message is {string}', async(confirmpassError) => {
	let confirmPasserrtext2=await genieregistrationPage.confirmPasswordError;
	await expect(confirmPasserrtext2).toHaveTextContaining(confirmpassError);
	console.log(confirmPasserrtext2.getText());
	cucumberJson.attach(await browser.takeScreenshot(), 'image/png');
});

When(/^user enter correct matched password into the Confirm Password field$/, async(table) => {
    await genieregistrationPage.confirmPasswordField.clearValue();
	await genieregistrationPage.confirmPasswordField.setValue(table.raw()[0][0]);
	await waitTime();
});

//-----------Phone Number Field--------//
When(/^user enter 20 digits above number into the phone number field$/, async() => {
	const characters ='0123456789';
	function generateString(length) {
		let result = ' ';
		const charactersLength = characters.length;
		for ( let i = 0; i < length; i++ ) {
			result += characters.charAt(Math.floor(Math.random() * charactersLength));
		}
		return result;
	}
	await genieregistrationPage.phoneNumberField.setValue(generateString(25));
	await waitTime();
});

Then('phone number field error message displayed as {string}', async(errortext) => {
	await elementClick(genieregistrationPage.Firstname);
	let error1=await genieregistrationPage.phoneNumberFieldError(errortext)
	await expect(error1).toHaveTextContaining(errortext);
	cucumberJson.attach(await browser.takeScreenshot(), 'image/png');
});

Then('Then phone number field error message2 displayed as {string}', async(errortext) => {
	let error1=await genieregistrationPage.phoneNumberFieldError(errortext)
	await expect(error1).toHaveTextContaining(errortext);
	cucumberJson.attach(await browser.takeScreenshot(), 'image/png');
});

When(/^user enter invalid phone number into the Phone Number field$/, async(table) => {
	await genieregistrationPage.phoneNumberField.setValue(table.raw()[0][0]);
	await waitTime();
});

Then('user is able to see a message like {string}', async(errortext) => {
	let error1=await genieregistrationPage.phoneNumberFieldError(errortext)
	await expect(error1).toHaveTextContaining(errortext);
	cucumberJson.attach(await browser.takeScreenshot(), 'image/png');
});

When(/^user enter valid phone number into the Phone number input field$/, async(table) => {
    await genieregistrationPage.phoneNumberField.clearValue();
	await genieregistrationPage.phoneNumberField.setValue(table.raw()[0][0]);
	await waitTime();
});

//-----------Firstname and Lastname--------//

When(/^user click on firstname field and enter no data$/, async() => {
    await elementClick(genieregistrationPage.Firstname);
	await elementClick(genieregistrationPage.Lastname);
});

Then('user is able to see a message {string}', async(firstnameerror) => {
	let error1=await genieregistrationPage.FirstnameError(firstnameerror)
	await expect(error1).toHaveTextContaining(firstnameerror);
	cucumberJson.attach(await browser.takeScreenshot(), 'image/png');
});

Then('user also able to see lastname field error as {string}', async(lastnameerror) => {
	await genieregistrationPage.Firstname.click();
	let error1=await genieregistrationPage.LastnameError(lastnameerror);
	await expect(error1).toHaveTextContaining(lastnameerror);
	cucumberJson.attach(await browser.takeScreenshot(), 'image/png');
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
    await genieregistrationPage.Firstname.setValue(generateString(105));
});

Then('user is able to see a error message is {string}', async(firstnameerror) => {
	let error1=await genieregistrationPage.FirstnameError(firstnameerror);
	await expect(error1).toHaveTextContaining(firstnameerror);
	cucumberJson.attach(await browser.takeScreenshot(), 'image/png');
});

When(/^user enter  multiple data into the firstname field$/, async(table) => {
     await genieregistrationPage.Firstname.clearValue();
	 await genieregistrationPage.Firstname.setValue(table.raw()[0][0]);
	 await genieregistrationPage.Firstname.clearValue();
	 await genieregistrationPage.Firstname.setValue(table.raw()[1][0]);
	 await genieregistrationPage.Firstname.clearValue();
	 await genieregistrationPage.Firstname.setValue(table.raw()[2][0]);
});

When(/^user  click on Lastname field$/, async() => {
     await elementClick(genieregistrationPage.Lastname);
});

When(/^user enter above Hundred characters into the lastname input field$/, async() => {
	const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	function generateString(length) {
		let result = ' ';
		const charactersLength = characters.length;
		for ( let i = 0; i < length; i++ ) {
			result += characters.charAt(Math.floor(Math.random() * charactersLength));
		}
		return result;
	}
		await genieregistrationPage.Lastname.setValue(generateString(105));
		cucumberJson.attach(await browser.takeScreenshot(), 'image/png');
		await waitTime();
});

// Then('user is able to see a lastname error message is {string}', async(lastnameerror) => {
// 	let error1=await genieregistrationPage.LastnameError(lastnameerror);
// 	await expect(error1).toHaveTextContaining(lastnameerror);
// 	// var error1=await genieregistrationPage.LastnameError(lastnameerror).getText();
// 	// if(error1==lastnameerror){
//     //   console.log(error1);
// 	// }
// 	await browser.pause(1000);
// });

When(/^user enter valid data into the Lastname field$/, async(table) => {
	// await genieregistrationPage.Lastname.clearValue();
	await genieregistrationPage.Lastname.setValue(table.raw()[0][0]);
	await genieregistrationPage.Lastname.clearValue();
	await genieregistrationPage.Lastname.setValue(table.raw()[1][0]);
	await genieregistrationPage.Lastname.clearValue();
	await genieregistrationPage.Lastname.setValue(table.raw()[2][0]);
	await waitTime();
});
  //----------calendar field--------//
 
When(/^user click on calendar icon$/, async() => {
	await browser.scroll(0,350);
    await genieregistrationPage.calendarIcon.click();
});

When('user click on {string} button', async(button) => {
	await genieregistrationPage.calendarButtons(button).click();
	await waitTime();
});

Then(/^verify calendar field have today date$/, async() => {
    cucumberJson.attach(await browser.takeScreenshot(), 'image/png');
	await waitTime();
});

When('user click on calendar icon and click {string} button', async(button) => {
	await genieregistrationPage.calendarIcon.click();
	await waitTime();
	await genieregistrationPage.calendarButtons(button).click();
	
});

When('user click on close {string} button', async(button) => {
	await browser.pause(3000);
	await genieregistrationPage.calendarIcon.click();
	await waitTime();
	await genieregistrationPage.calendarButtons(button).click();
	await waitTime();
});

Then('user select a future date as {string}', async(date) => {
	await elementClick(await genieregistrationPage.calendarIcon);
	await waitTime();
	await genieregistrationPage.datePick(date).click();
	cucumberJson.attach(await browser.takeScreenshot(), 'image/png');
	await waitTime();
});

// -------Profession and Specialty dropdowns------//

Given(/^user is able to see a Profession dropdown selected default value is Select Profession$/, async() => {
	let element=await genieregistrationPage.defaultProfessionDropdown;
	console.log(element.isSelected());
	let defaultValue=await genieregistrationPage.defaultProfessionDropdown.getAttribute('selected');
	console.log(defaultValue);
});

When(/^user click on Profession dropdown$/, async() => {
	await browser.scroll(0, 100);
	await waitTime();
    await elementClick(genieregistrationPage.ProfessionDropdown);
	await waitTime();
});

Then(/^user able to see below options$/, async() => {
	cucumberJson.attach(await browser.takeScreenshot(), 'image/png');
});

When('user select a {string} option in Profession dropdown', async(text) => {
	await waitTime();
	await genieregistrationPage.ProfessionDropdown.selectByVisibleText(text);
	await waitTime();
});

Then(/^user is able to see Select Specialty button dropdown and click on it$/, async() => {
    console.log(await genieregistrationPage. SelectSpecialty.isEnabled());
	await elementClick(genieregistrationPage.SelectSpecialty);
});

When(/^user selects list of options$/, async(text) => {
    await genieregistrationPage.SpecialtyulForm(text.raw()[0][0]).click();
	await waitTime();
	await genieregistrationPage.SpecialtyulForm(text.raw()[1][0]).click();
	await waitTime();
	await genieregistrationPage.SpecialtyulForm(text.raw()[2][0]).click();
	await waitTime();
	await genieregistrationPage.SpecialtyulForm(text.raw()[3][0]).click();
	await waitTime();
	await genieregistrationPage.SpecialtyulForm(text.raw()[4][0]).click();
	await waitTime();
});

When(/^user select another option$/, async(text) => {
    await elementClick(genieregistrationPage.SpecialtyulForm(text.raw()[0][0]));
});

Then('user able to see a error message as {string}', async(error) => {
	 await browser.saveScreenshot('./Screenshots/errormsg.png');
	 var specialtyerror=await genieregistrationPage.SelectSpecialtyError;
	 await expect(specialtyerror).toHaveTextContaining(error);
     cucumberJson.attach(await browser.takeScreenshot(), 'image/png');
	});

When(/^user remove one option from Specialty dropdown$/, async(text) => {
	await elementClick(genieregistrationPage.SpecialtyulForm(text.raw()[0][0]));
    await waitTime();
});

When('user select a option2 {string} option in Profession dropdown', async(text) => {
	await genieregistrationPage.ProfessionDropdown.selectByVisibleText(text);
    await waitTime();
});

When(/^user select Speacialty and select options$/, async(text) => {
	await elementClick(genieregistrationPage.SelectSpecialty);
	await elementClick(genieregistrationPage.SpecialtyulForm(text.raw()[0][0]));
	await waitTime();
	await elementClick(genieregistrationPage.SpecialtyulForm(text.raw()[1][0]));
	await waitTime();
});

When('user select a option3 {string} option in Profession dropdown', async(text) => {
	await genieregistrationPage.ProfessionDropdown.selectByVisibleText(text);
	await waitTime();
});

When('user click on specialty and click on search engine and enter {string}', async(value) => {
	await elementClick(genieregistrationPage.SelectSpecialty);
	await waitTime();
	await genieregistrationPage.searchEngine.setValue(value);
	await waitTime();
});

Then(/^user select a given search option$/, async(text) => {
	await elementClick(genieregistrationPage.SpecialtyulForm(text.raw()[0][0]));
	await waitTime();
});

//--------recruiter dropdowns-----//

Given(/^user select a States Licensed button dropdown$/, async() => {
    await genieregistrationPage.StatesLicensedButton.click();
	await waitTime();
});

When(/^user selects below Licensed States$/, async(text) => {
	await elementClick(genieregistrationPage.StatesLicensedulForm(text.raw()[0][0]));
	await waitTime();
	await elementClick(genieregistrationPage.StatesLicensedulForm(text.raw()[1][0]));
	await waitTime();
	await elementClick(genieregistrationPage.StatesLicensedulForm(text.raw()[2][0]));
});

Then(/^user remove last selected option$/, async(text) => {
	await elementClick(genieregistrationPage.StatesLicensedulForm(text.raw()[0][0]));
});

When('user select search engine and enter as {string}', async(value) => {
	await genieregistrationPage.StatesLicensedsearchEngine.click();
    await genieregistrationPage.StatesLicensedsearchEngine.setValue(value);
    await waitTime();
});
Then(/^user selects particular option$/, async(text) => {
	await elementClick(genieregistrationPage.StatesLicensedulForm(text.raw()[0][0]));
	await waitTime();
	await elementClick(genieregistrationPage.StatesLicensedButton);
	await waitTime();
});

When(/^user selects a Compact License check box$/, async() => {
    await genieregistrationPage.CompactLicenseCheckbox.click();
	console.log(await genieregistrationPage.CompactLicenseCheckbox.isSelected());
});

Given(/^user select a Destination States button dropdown$/, async() => {
    await elementClick(genieregistrationPage.DestinationStatesdButton);
    await waitTime();
});

When(/^user selects below Destination States$/,async(text) => {
	await elementClick(genieregistrationPage.DestinationStatesulForm(text.raw()[0][0]));
	await waitTime();
	await elementClick(genieregistrationPage.DestinationStatesulForm(text.raw()[1][0]));
	await waitTime();
	await elementClick(genieregistrationPage.DestinationStatesulForm(text.raw()[2][0]));
	await waitTime();
});

Then(/^user remove last selected Destination option$/, async(text) => {
	await elementClick(genieregistrationPage.DestinationStatesulForm(text.raw()[0][0]));
	await waitTime();
});

When('user select search engine and enter as {string} value', async(value) => {
	await elementClick(genieregistrationPage.DestinationStatessearchEngine);
    await genieregistrationPage.DestinationStatessearchEngine.setValue(value);
    await waitTime();
});

Then(/^user selects the given particular option$/, async(text) => {
	await elementClick(genieregistrationPage.DestinationStatesulForm(text.raw()[0][0]));
	await elementClick(genieregistrationPage.DestinationStatesdButton);
});

Given(/^user select the Preferred Recruiter dropdown$/, async() => {
   await elementClick(genieregistrationPage.recruiterProfileDropdown);
});

Then(/^user not select any options from Preferred Recruiter dropdown$/, async() => {
    await elementClick(genieregistrationPage.NoteToRecruiterField);
});

Then(/^user able to see Preferred Recruiter field highlighted with red color$/, async() => {
   let color= await genieregistrationPage.recruiterProfileDropdown.getCSSProperty('border-color');
   console.log('border-color :'+color);
   await genieregistrationPage.recruiterProfileDropdown.saveScreenshot('./Screenshots/redcolField.png');
   cucumberJson.attach(await browser.takeScreenshot(), 'image/png'); 
});

When(/^user select options from Preferred Recruiter dropdown$/, async() => {
	await genieregistrationPage.recruiterProfileDropdown.selectByIndex(2);
	await waitTime();
	await genieregistrationPage.recruiterProfileDropdown.selectByIndex(4);
	await waitTime();
});

Then(/^user able to see Preferred Recruiter field highlighted with green color$/, async() => {
	let color= await genieregistrationPage.recruiterProfileDropdown.getCSSProperty('border-color');
	console.log('border-color :'+color);
	await genieregistrationPage.recruiterProfileDropdown.saveScreenshot('./Screenshots/greencolField.png');
    await waitTime();
});
//--------------Handling the Resume Field---------//

 When(/^user click on the Resume input field$/, async() => {
    await genieregistrationPage.ResumeInputField.click();
	await browser.pause(1000);
});

When(/^upload the resume format type as Microsoft Word Document$/, async() => {
	const resumefilePath = './Files/Chennakeshava.Resume.doc'
	console.log(resumefilePath);
	const remoteFilePath=await browser.uploadFile(resumefilePath);
	await browser.pause(3000);
	const elem = genieregistrationPage.ResumeInputField;
	await elem.addValue(remoteFilePath);
	// await browser.pause(15000);
	// await browser.keys(["Control", "KeyV"]);
	// await browser.pause(5000);
});

When(/^click on the Upload Resume button$/, async() => {
    await genieregistrationPage.uploadResumeButton.click();
	await browser.pause(2000);
});


