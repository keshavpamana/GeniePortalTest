class GenieElements{
    ReportButton(button){
        return $(`//a[text()='${button}']`);
    }
}
module.exports=new GenieElements();