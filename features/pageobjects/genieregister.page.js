class GenieLogin{
    get LoginOrRegister(){
        return $("//a[text()='Login/Register']");
    }
    get genieUsername(){
        return $("input#username");
    }
    get geniePassword(){
        return $("input#password");
    }
    get genieSignInButton(){
        return $("//button[text()='Sign in']");
    }
    async geniePageOpen(){
        await browser.url('http://geniehealthjobsqa-env-3.eba-kmcgagjd.us-west-1.elasticbeanstalk.com/#/job');
        await browser.maximizeWindow();
        await browser.pause(2000);
    }
    async genieLoginCredentials(LoginId,Password){
         await this.genieUsername.setValue(LoginId);
         await browser.pause(2000);
         await this.geniePassword.setValue(Password);
         await browser.pause(2000);
    }
}
module.exports=new GenieLogin();