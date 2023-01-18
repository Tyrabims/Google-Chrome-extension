let aLead = [];
const inputt = document.getElementById("input");
const inputBtn = document.getElementById("input-btn");
const ulList = document.getElementById("ul-l");
const deleteBtn = document.getElementById("delete-btn");
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("aLead"));
const tabBtn = document.getElementById("tab-btn");

if (leadsFromLocalStorage) {
    aLead = leadsFromLocalStorage;
    render(aLead);
}

tabBtn.addEventListener("click", function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        aLead.push(tabs[0].url);
        localStorage.setItem("aLead", JSON.stringify(aLead));
        render(aLead);  
    });   
});

function render(leads) {
  let listItems = "";
  for (let i = 0; i < leads.length; i++) {
    listItems += `
        <li>
            <a  target='_blank' href='${leads[i]}' >
                ${leads[i]}
            </a>
        </li>
    `;
  }
  ulList.innerHTML = listItems;
}

deleteBtn.addEventListener("dblclick", function () {
  localStorage.clear();
  aLead = [];
  render(aLead);
});

inputBtn.addEventListener("click", function () {
  aLead.push(inputt.value);
  inputt.value = "";
  localStorage.setItem("aLead", JSON.stringify(aLead));
  render(aLead);
});