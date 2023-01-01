let myLeads = []
const inputEl = document.getElementById("input-el") 
const inputBtn = document.getElementById("input-btn") 
const ulEl = document.getElementById("ul-el")
let deleteBtn = document.getElementById("delete-btn")
const leadsfromlocalstorage = JSON.parse(localStorage.getItem("myLeads"))
const tabBtn = document.getElementById("tab-btn")

if (leadsfromlocalstorage) {
    myLeads = leadsfromlocalstorage
    render(myLeads)
}
tabBtn.addEventListener("click",function(){
    chrome.tabs.query({active :true, currentWindow:true},function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads",JSON.stringify(myLeads))
        render(myLeads)
    })
})
    
function render(leads){
    let listitems = " "
    for(var i=0;i<leads.length;i++){
        //ulEl.innerHTML +="<li>" + myLeads[i] + "</li> "
        listitems += 
        `<li> 
            <a href='${leads[i]}' target='_blank' >  
                ${leads[i]}
            </a>
        </li> `
    }
    ulEl.innerHTML = listitems
}

deleteBtn.addEventListener("dblclick",function(){
    localStorage.clear()
    myLeads = []
    render(myLeads)

})

let inputbtn = document.querySelector("#input-btn")
inputbtn.addEventListener("click",function(){
    myLeads.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myLeads",JSON.stringify(myLeads))
    render(myLeads)

})



