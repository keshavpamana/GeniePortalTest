class GenieElements{
    ReportButton(button){
        return $(`//a[text()='${button}']`);
    }
    Dropdowns(dropdown){
        return $(`//span[normalize-space()='${dropdown}']`)
    }
    
}
module.exports=new GenieElements();