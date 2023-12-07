class GenieRegistration{
     get emailfield(){
        return $('#email');
    }
    async genieurl(){
        return browser.url('http://geniehealthjobsqa-env-4.eba-kmcgagjd.us-west-1.elasticbeanstalk.com/#/register');
    }
    get emailLabel(){
        return $("//input[@type='email']");
    }
    get passwordfield(){
        return $('#password');
    }
    get invalidEmailError(){
        return $("//p[normalize-space()='Your email is invalid.']");
    }
    get existingEmailError(){
        return $("//div[@class='alert alert-danger']");
    }
    get passwordError(){
        return $("//p[normalize-space()='Your password is required.']");
    }
    get confirmPassError(){
        return $("//p[normalize-space()='Your confirmation password is required.']");
    }
    get strengthBar(){
        return $("#strength");
    }
    get confirmPasswordField(){
        return $("#confirmPassword");
    }
    get confirmPasswordError(){
        return $("//div[normalize-space()='The password and its confirmation do not match!']");
    }
    get phoneNumberField(){
        return $("#field_phoneNumber");
    }
    get phoneNumberFieldError(){
        return $("//p[text()='This PhoneNumber is Existed.Please Contact Admin.']");
    }
    get Firstname(){
        return $("#field_firstName");
    }
    get Lastname(){
        return $("#field_lastName");
    }
    get FirstNLastNError2(){
        return $("//p[normalize-space()='This field cannot be longer than 100 characters.']");
    }
    get FirstNLastNError1(){
        return $("(//p[normalize-space()='This field is required.'])[2]");
    }
    get calendarField(){
        return $("#field_availableToStart");
    }
    get calendarIcon(){
        return $("(//button[@type='button'])[6]");
    }
    calendarButtons(button){
        return $(`//button[text()="${button}"]`);
    }
    datePick(date){
        return $(`//button[@type='button']//span[text()="${date}"]`);  
    }
    get ProfessionDropdown(){
        return $("#field_candidateProfession");
    }
    get defaultProfessionDropdown(){
        return $("//select[@id='field_candidateProfession']/option[1]");
    }
    get SelectSpecialty(){
        return $("(//button[contains(@class,'btn dropdown-toggle')])[1]");
    }
    SpecialtyulForm(text){
        return $(`(//ul[@class='dropdown-menu dropdown-menu-form'])[1]/li//a[normalize-space()="${text}"]`);
    }
    get searchEngine(){
        return $("(//input[@type='text'])[5]");
    }


    async EmailField(table){
        await this.emailfield.setValue(table.raw()[0][0]);
    }

}
module.exports=new GenieRegistration();