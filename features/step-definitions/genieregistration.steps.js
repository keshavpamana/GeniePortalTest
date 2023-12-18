const { Given, When, Then } = require('@wdio/cucumber-framework');
const genieregistrationPage = require('../pageobjects/genieregistration.page');
const vars=require('../Properties/genievariables.json');
const { LoginOrRegister } = require('../pageobjects/genieregister.page');
const { elementClick } = require('../Properties/TimeOut.page');

//----------Email Field-----------//
Given(/^user is in Genie webpage$/, async() => {
    await browser.url(vars.GenieUrl);
	await browser.maximizeWindow();
	await browser.pause(2000);
});

When(/^user is clicks on Login Register button$/, async() => {
	await LoginOrRegister.moveTo();
	await browser.pause(1000);
});

When(/^user click on Register a new Account$/, async() => {
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
	await browser.pause(1000);
});

Then(/^verify email label$/, async() => {
	
	// await browser.pause(2000);
    // await genieregistrationPage.emailLabel.getText();
	//await expect(emaillabelText).toHaveTextContaining('Email');
	console.log(await genieregistrationPage.emailLabel.getText());
	await browser.pause(1000);
});

When(/^user clicks on email input field and enter no data$/, async() => {
    await genieregistrationPage.emailfield.click();
	await browser.pause(1000);
	await genieregistrationPage.passwordfield.click();
});

Then('user able to see a email error message displayed as {string}', async(emailerror) => {
	var errormsgEle=genieregistrationPage.thisfieldError;
	await expect(errormsgEle).toHaveTextContaining(emailerror);
	console.log('Errormessage :'+errormsgEle.getText());
	await browser.pause(1000);
});

When(/^user enter invalid email value$/, async(table) => {
    await genieregistrationPage.EmailField(table);
	// await genieregistrationPage.emailfield.setVlaue()
	await browser.pause(1000);
	await genieregistrationPage.passwordfield.click();
});

Then('verify the email error message is {string}', async(emailerror) => {
	var errormsgEle=genieregistrationPage.invalidEmailError(emailerror)
	await expect(errormsgEle).toHaveTextContaining(emailerror);
	console.log('Errormessage :'+errormsgEle.getText());
	await browser.pause(1000);
});

Then(/^verify the email input field highlighted with red color$/, async() => {
    let emailfieldcolor=await genieregistrationPage.emailfield.getCSSProperty('border-color');
	console.log(emailfieldcolor);
	await browser.pause(1000);
});

When(/^user enter already created mail into the email input field$/, async(table) => {
    await genieregistrationPage.emailfield.clearValue();
	await browser.pause(1000);
	await genieregistrationPage.EmailField(table);
	await browser.pause(1000);
	await genieregistrationPage.passwordfield.click();
	await browser.pause(1000);
});

Then('verify displayed error message {string}', async(errormessage2) => {
    var errormsgEle2=await genieregistrationPage.existingEmailError;
	await expect(errormsgEle2).toHaveTextContaining(errormessage2);
	await browser.pause(1000);
});

When(/^user enter minimum length email into email input field$/, async() => {
    await genieregistrationPage.emailfield.setValue(vars.minlegthgmail);
	await genieregistrationPage.passwordfield.click();
});

Then('user is able to see a email error message3 as {string}', async(emailerror) => {
	var errormsgEle=genieregistrationPage.invalidEmailError(emailerror)
	await expect(errormsgEle).toHaveTextContaining(emailerror);
	console.log('Errormessage :'+errormsgEle.getText());
	await browser.saveScreenshot('./Screenshots/emailerror.png');
	await browser.pause(1000);
});

When(/^user enter miximum length email into email input field$/, async() => {
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
	var errormsgEle=genieregistrationPage.invalidEmailError(emailerror)
	await expect(errormsgEle).toHaveTextContaining(emailerror);
	console.log('Errormessage :'+errormsgEle.getText());
	await browser.pause(1000);
});


When(/^user enter valid email vlaue$/, async(table) => {
    await genieregistrationPage.emailfield.clearValue();
	await browser.pause(1000);
	await genieregistrationPage.EmailField(table);
	await browser.pause(1000);
});

Then(/^verify the email input field highlighted with green color$/, async() => {
	let emailfieldcolor=await genieregistrationPage.emailfield.getCSSProperty('border-color');
	console.log(emailfieldcolor);
	await browser.pause(1000);
});

//----------Password Field-----------//
When(/^user enter empty password and click on Confirm Password$/, async() => {
    (await genieregistrationPage.passwordfield).click();
	await browser.pause(1000);
	(await genieregistrationPage.confirmPasswordField).click();
	await browser.pause(1000);
});

Then('verify the displayed error message like {string}', async(passerror) => {
	let passerrtext=await genieregistrationPage.passwordError(passerror);
    await await expect(passerrtext).toHaveTextContaining(passerror);
	console.log(passerrtext.getText());
	await browser.pause(1000);
});

When(/^user enter 50 above longer password into the password field$/, async() => {
	(await genieregistrationPage.passwordfield).click();
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
	await browser.pause(1000);
});

Then('verify the displayed error message2 like {string}', async(passerror) => {
	let passerrtext=await genieregistrationPage.passwordError(passerror);
    await await expect(passerrtext).toHaveTextContaining(passerror);
	console.log(passerrtext.getText());
	await browser.pause(1000);
});

When(/^user enter least character password into the password field$/, async() => {
    await genieregistrationPage.passwordfield.click();
	await genieregistrationPage.passwordfield.setValue(vars.leastpassword);
});

Then('verify the displayed error message3 as {string}', async(passerror) => {
	let passerrtext=await genieregistrationPage.passwordError(passerror);
    await await expect(passerrtext).toHaveTextContaining(passerror);
	console.log(passerrtext.getText());
	await browser.pause(1000);
});

// Then('verify the displayed  confirmation error message like {string}', async(confirmpasserror) => {
// 	let confirmPasserrtext=await genieregistrationPage.confirmPassError;
// 	await await expect(confirmPasserrtext).toHaveTextContaining(confirmpasserror);
// 	console.log(confirmPasserrtext.getText());
// 	await browser.pause(2000);
// });

When(/^user enter weak password$/, async(table) => {
    await genieregistrationPage.passwordfield.setValue(table.raw()[0][0]);
	await browser.pause(1000);
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
	await browser.pause(2000);
});

Then('verify displayed error message is {string}', async(confirmpassError) => {
	let confirmPasserrtext2=await genieregistrationPage.confirmPasswordError;
	await expect(confirmPasserrtext2).toHaveTextContaining(confirmpassError);
	console.log(confirmPasserrtext2.getText());
	await browser.pause(2000);
});

When(/^user enter correct matched password into the Confirm Password field$/, async(table) => {
    (await genieregistrationPage.confirmPasswordField).clearValue();
	await browser.pause(2000);
	(await genieregistrationPage.confirmPasswordField).setValue(table.raw()[0][0]);
	await browser.pause(2000);
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
});

Then('phone number field error message displayed as {string}', async(errortext) => {
	await genieregistrationPage.Firstname.click();
	let error1=await genieregistrationPage.phoneNumberFieldError(errortext)
	await expect(error1).toHaveTextContaining(errortext);
});

Then('Then phone number field error message2 displayed as {string}', async(errortext) => {
	let error1=await genieregistrationPage.phoneNumberFieldError(errortext)
	await expect(error1).toHaveTextContaining(errortext);
	await browser.pause(2000);
});

When(/^user enter invalid phone number into the Phone Number field$/, async(table) => {
    await genieregistrationPage.phoneNumberField.setValue(table.raw()[0][0]);
	await browser.pause(2000);
});

Then('user is able to see a message like {string}', async(errortext) => {
	let error1=await genieregistrationPage.phoneNumberFieldError(errortext)
	await expect(error1).toHaveTextContaining(errortext);
	await browser.pause(2000);
});

When(/^user enter valid phone number into the Phone number input field$/, async(table) => {
    await genieregistrationPage.phoneNumberField.clearValue();
	await browser.pause(1000);
	await genieregistrationPage.phoneNumberField.setValue(table.raw()[0][0]);
});

//-----------Firstname and Lastname--------//

When(/^user click on firstname field and enter no data$/, async() => {
    await genieregistrationPage.Firstname.click();
	await browser.pause(2000);
	await genieregistrationPage.Lastname.click();
});

Then('user is able to see a message {string}', async(firstnameerror) => {
	let error1=await genieregistrationPage.FirstnameError(firstnameerror)
	await expect(error1).toHaveTextContaining(firstnameerror);
});

Then('user also able to see lastname field error as {string}', async(lastnameerror) => {
	await genieregistrationPage.Firstname.click();
	let error1=await genieregistrationPage.LastnameError(lastnameerror);
	await expect(error1).toHaveTextContaining(lastnameerror);
	await browser.pause(1000);
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
	await browser.pause(2000);
});

When(/^user enter  multiple data into the firstname field$/, async(table) => {
     await genieregistrationPage.Firstname.clearValue();
	 await browser.pause(1000);
	 await genieregistrationPage.Firstname.setValue(table.raw()[0][0]);
	 await browser.pause(1000);
	 await genieregistrationPage.Firstname.clearValue();
	 await browser.pause(1000);
	 await genieregistrationPage.Firstname.setValue(table.raw()[1][0]);
	 await browser.pause(1000);
	 await genieregistrationPage.Firstname.clearValue();
	 await browser.pause(1000);
	 await genieregistrationPage.Firstname.setValue(table.raw()[2][0]);
	 await browser.pause(1000);
});

When(/^user  click on Lastname field$/, async() => {
     await genieregistrationPage.Lastname.click();
	 await browser.pause(1000);
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
		await browser.pause(2000);
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
	await browser.pause(1000);
	await genieregistrationPage.Lastname.clearValue();
	await browser.pause(1000);
	await genieregistrationPage.Lastname.setValue(table.raw()[1][0]);
	await browser.pause(1000);
	await genieregistrationPage.Lastname.clearValue();
	await browser.pause(1000);
	await genieregistrationPage.Lastname.setValue(table.raw()[2][0]);
	await browser.pause(1000);
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

When('user click on calendar icon and click {string} button', async(button) => {
	await genieregistrationPage.calendarIcon.click();
	await browser.pause(2000)
	await genieregistrationPage.calendarButtons(button).click();
	await browser.pause(2000);
});

When('user click on close {string} button', async(button) => {
	await genieregistrationPage.calendarIcon.click();
	await browser.pause(2000)
	await genieregistrationPage.calendarButtons(button).click();
	await browser.pause(2000);
});

Then('user select a future date as {string}', async(date) => {
	await genieregistrationPage.calendarIcon.click();
	await browser.pause(2000)
	await genieregistrationPage.datePick(date).click();
	await genieregistrationPage.calendarField.saveScreenshot('./Screenshots/dateText2.png');
	await browser.pause(2000);

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
    await genieregistrationPage.ProfessionDropdown.click();
	await browser.pause(2000);
});

Then(/^user able to see below options$/, async() => {
	await browser.saveScreenshot('./Screenshots/dropdownlist.png');
});

When('user select a {string} option in Profession dropdown', async(text) => {
	await genieregistrationPage.ProfessionDropdown.selectByVisibleText(text);
	await browser.pause(2000);
});

Then(/^user is able to see Select Specialty button dropdown and click on it$/, async() => {
    await genieregistrationPage.SelectSpecialty.click();
	await browser.pause(2000);
});

When(/^user selects list of options$/, async(text) => {
    await genieregistrationPage.SpecialtyulForm(text.raw()[0][0]).click();
	await browser.pause(1000);
	await genieregistrationPage.SpecialtyulForm(text.raw()[1][0]).click();
	await browser.pause(1000);
	await genieregistrationPage.SpecialtyulForm(text.raw()[2][0]).click();
	await browser.pause(1000);
	await genieregistrationPage.SpecialtyulForm(text.raw()[3][0]).click();
	await browser.pause(1000);
	await genieregistrationPage.SpecialtyulForm(text.raw()[4][0]).click();
	await browser.pause(1000);
});

When(/^user select another option$/, async(text) => {
    await genieregistrationPage.SpecialtyulForm(text.raw()[0][0]).click();
});

Then('user able to see a error message as {string}', async(error) => {
	 await browser.saveScreenshot('./Screenshots/errormsg.png');
	 var specialtyerror=await genieregistrationPage.SelectSpecialtyError;
	 await expect(specialtyerror).toHaveTextContaining(error);
	 await browser.pause(2000);
});

When(/^user remove one option from Specialty dropdown$/, async(text) => {
	await genieregistrationPage.SpecialtyulForm(text.raw()[0][0]).click();
    await browser.pause(2000);
});

When('user select a option2 {string} option in Profession dropdown', async(text) => {
	await genieregistrationPage.ProfessionDropdown.selectByVisibleText(text);
	await browser.pause(2000);
});

When(/^user select Speacialty and select options$/, async(text) => {
	await genieregistrationPage.SelectSpecialty.click();
	await browser.pause(1000);
	await genieregistrationPage.SpecialtyulForm(text.raw()[0][0]).click();
	await browser.pause(1000);
	await genieregistrationPage.SpecialtyulForm(text.raw()[1][0]).click();
	await browser.pause(1000);
});

When('user select a option3 {string} option in Profession dropdown', async(text) => {
	await genieregistrationPage.ProfessionDropdown.selectByVisibleText(text);
	await browser.pause(2000);
});

When('user click on specialty and click on search engine and enter {string}', async(value) => {
	await genieregistrationPage.SelectSpecialty.click();
	await browser.pause(1000);
	await genieregistrationPage.searchEngine.setValue(value);
	await browser.pause(2000);
});

Then(/^user select a given search option$/, async(text) => {
	await genieregistrationPage.SpecialtyulForm(text.raw()[0][0]).click();
	await browser.pause(2000);
});
//--------recruiter dropdowns-----//

Given(/^user select a States Licensed button dropdown$/, async() => {
    await genieregistrationPage.StatesLicensedButton.click();
	await browser.pause(1000);
});

When(/^user selects below Licensed States$/, async(text) => {
	await genieregistrationPage.StatesLicensedulForm(text.raw()[0][0]).click();
	await browser.pause(1000);
	await genieregistrationPage.StatesLicensedulForm(text.raw()[1][0]).click();
	await browser.pause(1000);
	await genieregistrationPage.StatesLicensedulForm(text.raw()[2][0]).click();
	await browser.pause(1000);

});

Then(/^user remove last selected option$/, async(text) => {
	await genieregistrationPage.StatesLicensedulForm(text.raw()[0][0]).click();
	await browser.pause(2000);
});

When('user select search engine and enter as {string}', async(value) => {
	await genieregistrationPage.StatesLicensedsearchEngine.click();
    await genieregistrationPage.StatesLicensedsearchEngine.setValue(value);
	await browser.pause(2000);
});
Then(/^user selects particular option$/, async(text) => {
	await genieregistrationPage.StatesLicensedulForm(text.raw()[0][0]).click();
	await browser.pause(2000);
	await genieregistrationPage.StatesLicensedButton.click();
});

When(/^user selects a Compact License check box$/, async() => {
    await genieregistrationPage.CompactLicenseCheckbox.click();
	console.log(await genieregistrationPage.CompactLicenseCheckbox.isSelected());
});

Given(/^user select a Destination States button dropdown$/, async() => {
    await genieregistrationPage.DestinationStatesdButton.click();
	await browser.pause(1000);
});

When(/^user selects below Destination States$/,async(text) => {
	await genieregistrationPage.DestinationStatesulForm(text.raw()[0][0]).click();
	await browser.pause(1000);
	await genieregistrationPage.DestinationStatesulForm(text.raw()[1][0]).click();
	await browser.pause(1000);
	await genieregistrationPage.DestinationStatesulForm(text.raw()[2][0]).click();
	await browser.pause(1000);
});

Then(/^user remove last selected Destination option$/, async(text) => {
	await genieregistrationPage.DestinationStatesulForm(text.raw()[0][0]).click();
	await browser.pause(2000);
});

When('user select search engine and enter as {string} value', async(value) => {
	await genieregistrationPage.DestinationStatessearchEngine.click();
    await genieregistrationPage.DestinationStatessearchEngine.setValue(value);
	await browser.pause(2000);
});

Then(/^user selects the given particular option$/, async(text) => {
	await genieregistrationPage.DestinationStatesulForm(text.raw()[0][0]).click();
	await browser.pause(1000);
	await genieregistrationPage.DestinationStatesdButton.click();
});

Given(/^user select the Preferred Recruiter dropdown$/, async() => {
   await genieregistrationPage.recruiterProfileDropdown.click();
});

Then(/^user not select any options from Preferred Recruiter dropdown$/, async() => {
    await genieregistrationPage.NoteToRecruiterField.click();
	await browser.pause(1000); 
});

Then(/^user able to see Preferred Recruiter field highlighted with red color$/, async() => {
   let color= await genieregistrationPage.recruiterProfileDropdown.getCSSProperty('border-color');
   console.log('border-color :'+color);
   await genieregistrationPage.recruiterProfileDropdown.saveScreenshot('./Screenshots/redcolField.png');
   await browser.pause(1000);
});

When(/^user select options from Preferred Recruiter dropdown$/, async() => {
	await genieregistrationPage.recruiterProfileDropdown.selectByIndex(2);
	await browser.pause(1000);
	await genieregistrationPage.recruiterProfileDropdown.selectByIndex(4);
	await browser.pause(1000);
});

Then(/^user able to see Preferred Recruiter field highlighted with green color$/, async() => {
	let color= await genieregistrationPage.recruiterProfileDropdown.getCSSProperty('border-color');
	console.log('border-color :'+color);
	await genieregistrationPage.recruiterProfileDropdown.saveScreenshot('./Screenshots/greencolField.png');
	await browser.pause(2000);
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


