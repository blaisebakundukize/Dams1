export function sendOrGetData(url, data = null, verb = "GET") {
  const xhr = new XMLHttpRequest();
  return new Promise((resolve, reject) => {
    xhr.open(verb, url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=utf-8");
    xhr.onload = function () {
      const response = JSON.parse(xhr.responseText);
      resolve(response)
    };
    xhr.send(data);
  });
}

export async function getUserData() {
  const url = "../controllers/getIdentity.php";
  const result = await sendOrGetData(url);
  if (!result['success']) {
    window.location.href = '../index.html';
  }
  return result;
}
