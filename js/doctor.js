import { getUserData, sendOrGetData } from './sendData.js'

const tabSetSchedules = document.querySelector(".js--tab-schedules");
const tabBookings = document.querySelector(".js--tab-bookings");
const formSetSchedule = document.querySelector(".js--form-set-schedule");
const bookings = document.querySelector(".js--bookings");

const scheduleAppointmentFormElements = document.querySelector(".js--form-set-schedule").elements;
const scheduledDateFormElements = document.querySelector('.js--form-get-scheduled').elements;

const schAppBtn = document.querySelector(".js--btn-schedule");

// set default values to some elements
setDefaultValue();

// set number of bookings
setNumberOfBookings();

schAppBtn.addEventListener("click", setAppointment);

scheduleAppointmentFormElements.timeFrom.addEventListener("change", setNumberOfBookings);
scheduleAppointmentFormElements.timeEnd.addEventListener("change", setNumberOfBookings);


// Set number of bookings automatically. Three patients per hour
function setNumberOfBookings() {
  const timeFrom = scheduleAppointmentFormElements.timeFrom.value;
  const timeEnd = scheduleAppointmentFormElements.timeEnd.value;

  var hoursToWorkWithBreak = diffMinutes(new Date("2019-01-01 " + timeFrom),
    new Date("2019-01-01 " + timeEnd));

  const workingHours = hoursToWork(hoursToWorkWithBreak);

  const patientsPerHour = 3;

  scheduleAppointmentFormElements.bookings.value = workingHours * patientsPerHour;
}

// get user data
const userData = getUserData();

// handle tabs
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
}

// set default values
function setDefaultValue() {
  const scheduleDate = scheduleAppointmentFormElements.schedule.valueAsDate = new Date();
  const timeFrom = scheduleAppointmentFormElements.timeFrom.defaultValue = "08:00";
  const timeEnd = scheduleAppointmentFormElements.timeEnd.defaultValue = "18:00";
  const scheduledDate = scheduledDateFormElements.scheduled.valueAsDate = new Date();
}

const schedule = {};

// Calculate hours between timestamps
function diffMinutes(t1, t2) {
  var m1 = t1.getHours();
  var m2 = t2.getHours();
  return m2 - m1;
}

// Calculate hours to work without break of one hour
function hoursToWork(hours) {
  const morningHours = 6;
  if (hours > morningHours) {
    hours -= 1;
  }
  return hours;
}

// hours to seconds
function toSeconds(s) {
  var p = s.split(':');
  return parseInt(p[0], 10) * 3600 + parseInt(p[1], 10) * 60;
}

// fill with zero to hours which are not in tens
function fill(s, digits) {
  s = s.toString();
  while (s.length < digits) s = '0' + s;
  return s;
}

// set appointment
async function setAppointment(e) {
  const scheduleDate = scheduleAppointmentFormElements.schedule.value;
  const timeFrom = scheduleDate + " " + scheduleAppointmentFormElements.timeFrom.value;
  const timeEnd = scheduleDate + " " + scheduleAppointmentFormElements.timeEnd.value;
  const bookings = scheduleAppointmentFormElements.bookings.value;

  schedule.date = scheduleDate;
  schedule.start = timeFrom;
  schedule.end = timeEnd;
  schedule.bookings = Math.floor(bookings);
  schedule.totalWorkingHours = diffMinutes(new Date("2019-01-01 " + timeFrom),
    new Date("2019-01-01 " + timeEnd));

  // minutes per patient
  const minutesPerPatient = '00:20';

  var sec =
    toSeconds(scheduleAppointmentFormElements.timeFrom.value) +
    toSeconds(minutesPerPatient);

  schedule.nextAppointment =
    fill(Math.floor(sec / 3600), 2) + ':' +
    fill(Math.floor(sec / 60) % 60, 2);

  var data = await userData;

  schedule.doctorId = data.user_id;
  const json = JSON.stringify(schedule);

  console.log(json)

  sendOrGetData("../controllers/doctor.php", json, "POST").then(result => {
    return alert(result[0].message);
  });

  e.preventDefault();
}
