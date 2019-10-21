import { sendOrGetData } from './sendData.js';

const registerDoctorFormElements = document.querySelector(".js--form-reg-doctor").elements;
const registerPatientFormElements = document.querySelector(".js--form-reg-patient").elements;

const regDoctorBtn = document.querySelector(".js--btn-reg-doctor");
const regPatientBtn = document.querySelector(".js--btn-reg-patient");

regDoctorBtn.addEventListener("click", registerDoctorHandler);
regPatientBtn.addEventListener("click", registerPatientHandler);

const dataForDoc = {};
const dataForPat = {};

function registerDoctorHandler(e) {
  const names = registerDoctorFormElements.names.value;
  const email = registerDoctorFormElements.email.value;
  const phone = registerDoctorFormElements.phone.value;
  const username = registerDoctorFormElements.username.value;
  const password = registerDoctorFormElements.password.value;
  const department = registerDoctorFormElements.department.value;

  dataForDoc.names = names;
  dataForDoc.email = email;
  dataForDoc.phone = phone;
  dataForDoc.username = username;
  dataForDoc.password = password;
  dataForDoc.department = department;

  const json = JSON.stringify(dataForDoc)
  sendOrGetData("./controllers/register.php", json, "POST").then((result) => {
    return alert(result[0].message);
  });
  // const result = sendRegis(json);
  // console.log(result)
  // console.log(result)

  e.preventDefault();
}

function registerPatientHandler(e) {
  const names = registerPatientFormElements.names.value;
  const email = registerPatientFormElements.email.value;
  const phone = registerPatientFormElements.phone.value;
  const username = registerPatientFormElements.username.value;
  const password = registerPatientFormElements.password.value;

  dataForPat.names = names;
  dataForPat.email = email;
  dataForPat.phone = phone;
  dataForPat.username = username;
  dataForPat.password = password;

  const json = JSON.stringify(dataForPat)
  sendOrGetData("./controllers/register.php", json, "POST").then(result => {
    return alert(result[0].message);
  });
  // const result = sendRegis(json);

  e.preventDefault();
}

// function sendRegis(data) {
//   const xhr = new XMLHttpRequest();
//   xhr.open("POST", "./controllers/register.php", true);
//   xhr.setRequestHeader("Content-type", "application/json; charset=utf-8");
//   xhr.onload = function () {
//     const response = JSON.parse(xhr.responseText);
//     console.log(response);
//     return response;
//   };
//   xhr.send(data);
// }
