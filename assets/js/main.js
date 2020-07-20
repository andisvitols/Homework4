let buttons = document.querySelectorAll(".mybtns");
let windows = document.querySelectorAll(".windows");

let buttonsNames = [
  "Book here",
  "Necessary equipment",
  "Location",
  "Contacts",
  "Close window",
];

buttons.forEach((el, index) => makeSome(el, index));
// windows.forEach((el, index) => el.dataset.num = index)

setInterval(() => makeTime("time"), 1000);

const makeTime = (el) => {
  let t = new Date();
  let h = t.getHours();
  let m = t.getMinutes();
  let s = t.getSeconds();
  let e = document.getElementById(el);
  if (e) e.innerHTML = `${nn(h)}:${nn(m)}:${nn(s)}`;
};

const nn = (a) => (a < 10 ? `0${a}` : a);

function makeSome(el, index) {
  el.innerHTML = buttonsNames[index];
  // el.setAttribute('data-num', index)
  el.addEventListener("click", () => showWindow(index));
  // el.addEventListener('click', () => showWindow(el.dataset.num))
}

function resetwindows(e) {
  showWindow(null);
}

function showWindow(num) {
  windows.forEach((el, index) => {
    num == index
      ? //  num == el.dataset.num
        el.classList.toggle("winwis")
      : el.classList.remove("winwis");
  });
}

getData();

setInterval(() => getData(), 120000);

function getData() {
  fetch("inbox.php")
    .then((res) => res.json())
    .then((data) => render(data))
    .catch((err) => console.log(err));
}

var render = (data) => {
  document.querySelector("#city").innerHTML = data.geoip.city;
  document.querySelector(
    "#temp"
  ).innerHTML = `${data.weather.currTemp} &#8451;`;
  document.querySelector(
    "#otherweather"
  ).innerHTML = `${data.weather.icoSymbol}, wind: ${data.weather.windSpeed} m/s`;
};
