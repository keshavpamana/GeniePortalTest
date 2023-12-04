class TimeOut{
    //This class used for only pause the browser//
    async PauseTime(){
    await browser.pause(2000); 
    } 
}
module.exports=new TimeOut();