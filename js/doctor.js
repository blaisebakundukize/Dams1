import { getUserData } from './sendData.js'

const tabSetSchedules = document.querySelector(".js--tab-schedules");
const tabBookings = document.querySelector(".js--tab-bookings");
const formSetSchedule = document.querySelector(".js--form-set-schedule");
const bookings = document.querySelector(".js--bookings");

const scheduleAppointmentFormElements = document.querySelector(".js--form-set-schedule").elements;
const scheduledDateFormElements = document.querySelector('.js--form-get-scheduled').elements;

const schAppBtn = document.querySelector(".js--btn-schedule");

// set default values to some elements
setDefaultValue();

schAppBtn.addEventListener("click", setAppointment);

// tabBookings.addEventListener("click", tabHandler(event, 'bookings'));
// tabSetSchedules.addEventListener("click", tabHandler(event, 'schedules'));

// function tabHandler(event) {
//   if (event.target.classList.contains('js--tab-bookings')) {
//     formSetSchedule.style.display = "none";
//     bookings.style.display = "block";
//   }
//   console.log(event.target.classList.contains('js--tab-bookings'))
// }

const userData = getUserData()
userData.then((data) => {
  console.log(data);
});

// get logged in user data
// async function getUserData() {
//   const url = "../controllers/getIdentity.php";
//   const result = await sendOrGetData(url);
//   if (!result['success']) {
//     window.location.href = '../index.html';
//   }
//   return result;
// }

// handle tabs
window.tabHandler = function tabHandler(event, tabName) {
  console.log(tabName)
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
}

// set default values
function setDefaultValue() {
  const scheduleDate = scheduleAppointmentFormElements.schedule.valueAsDate = new Date();
  const timeFrom = scheduleAppointmentFormElements.timeFrom.defaultValue = "08:00";
  const timeEnd = scheduleAppointmentFormElements.timeEnd.defaultValue = "18:00";
  const scheduledDate = scheduledDateFormElements.scheduled.valueAsDate = new Date();
}

const schedule = {};

// set appointment
function setAppointment(e) {
  const scheduleDate = scheduleAppointmentFormElements.schedule.value;
  const timeFrom = scheduleAppointmentFormElements.timeFrom.value;
  const timeEnd = scheduleAppointmentFormElements.timeEnd.value;
  const bookings = scheduleAppointmentFormElements.bookings.value;

  schedule.date = scheduleDate;
  schedule.start = timeFrom;
  schedule.end = timeEnd;
  schedule.bookings = Math.floor(bookings);

  const json = JSON.stringify(schedule)
  const result = sendRegis(json);

  e.preventDefault();
}
