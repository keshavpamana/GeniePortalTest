class HandlingCSV{
   get usernameURL(){
    return browser.url('https://support.staffbase.com/hc/en-us/articles/360007108391-CSV-File-Examples');
   }
   get usernameTableRows(){
    return $$("(//table[@class='grey-border'])[1]/tbody/tr");
   }
   get usernameTableColumns(){
    return $$("(//table[@class='grey-border'])[1]/tbody/tr/td");
   }
   async rowLength(){
     await this.usernameTableRows.length;
   }
   async columnLength(){
    await this.usernameTableColumns.length;
  }
 
}
module.exports=new HandlingCSV();