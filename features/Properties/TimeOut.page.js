class TimeOut{
    //This class used for only pause the browser//
    async waitTime(){
    await browser.pause(2000); 
    } 
   async elementClick(elem){
    await elem.waitForDisplayed({ timeout: 3000 });
    await elem.waitForClickable({ timeout: 3000 });
    await elem.click();
   }
}
module.exports=new TimeOut();