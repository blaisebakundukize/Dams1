const tableSchedules = document.querySelector(".js--docs-schedules");
const tbodySchedules = document.querySelector(".table__schedules-body");

window.tabHandler = function tabHandler(event, tabName) {
  var i, tabContents, tabLinks;
  tabContents = document.getElementsByClassName("tab__content");
  for (i = 0; i < tabContents.length; i++) {
    tabContents[i].style.display = "none";
  }
  tabLinks = document.getElementsByClassName("tabs__item");
  for (i = 0; i < tabLinks.length; i++) {
    tabLinks[i].className = tabLinks[i].className.replace(" active-tab", "");
  }
  document.getElementById(tabName).style.display = "block";
  event.currentTarget.className += " active-tab";
  if (event.target.attributes.id.value === "id-schedules") {
    generateSchedulesTable();
  }
}

const data = [
  { id: 1, name: 'blaise', department: 'depart', date: '2019-23-01', next: '08:20' },
  { id: 2, name: 'blaise', department: 'depart', date: '2019-23-01', next: '08:20' },
  { id: 3, name: 'blaise', department: 'depart', date: '2019-23-01', next: '08:20' },
  { id: 4, name: 'blaise', department: 'depart', date: '2019-23-01', next: '08:20' },
  { id: 5, name: 'blaise', department: 'depart', date: '2019-23-01', next: '08:20' },
  { id: 6, name: 'blaise', department: 'depart', date: '2019-23-01', next: '08:20' },
  { id: 7, name: 'blaise', department: 'depart', date: '2019-23-01', next: '08:20' },
  { id: 8, name: 'blaise', department: 'depart', date: '2019-23-01', next: '08:20' },
  { id: 9, name: 'blaise', department: 'depart', date: '2019-23-01', next: '08:20' },
  { id: 10, name: 'blaise', department: 'depart', date: '2019-23-01', next: '08:20' }];

generateSchedulesTable();

function generateSchedulesTable() {
  let number = 0;
  for (let element of data) {
    number += 1;
    let row = tbodySchedules.insertRow();
    row.setAttribute('id', number)
    for (let key in element) {
      let cell = row.insertCell();
      cell.innerHTML = element[key];
      // let cellText = createTextNode(element[key]);
      // cell.appendChild(cellText);
    }
    let cellActions = row.insertCell();
    let button = document.createElement('input');
    button.setAttribute('type', 'button');
    button.setAttribute('value', 'book');
    button.setAttribute('class', 'btn btn--green btn--action js--btn-book');
    button.setAttribute('onclick', 'btnBookClickHandler(event)');
    cellActions.appendChild(button);
  }
}


window.btnBookClickHandler = function btnBookClickHandler(event) {
  console.log(event.target.parentNode.parentNode.id);
  event.preventDefault();
}
