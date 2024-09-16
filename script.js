const api = {
    //ссылка API базы данных
    endpoint: "https://api.openweathermap.org/data/2.5/",
    //API key
    key: "d919334e6aee33871db917f5784cfaff"
}

const button = document.querySelector("#get-weather");
button.addEventListener("click", enter) //нажатие кнопки

const input = document.querySelector("#city-input");
input.addEventListener("keydown", enter);
//1-если нажата клавиша enter(13)и получить доступ к написанному 
//2- то запуститься поиск(getInfo)
function enter(e) {
    if (e.keyCode === 13) {
        getInfo(input.value);
    }
}
//получаем доступ к ссылке endpoint c нашим ключом api.key, с русским яз.
async function getInfo(data) {
    const result = await fetch(`${api.endpoint}weather?q=${data}&units=metric&appID=${api.key}&lang=ru`);
    const resReceived = await result.json();
    displayResult(resReceived);
}

function displayResult(resReceived) {
    console.log(resReceived);
    let city = document.querySelector("#city-name");
    city.textContent = `${resReceived.name}`;

    getOurDate();

    let temperature = document.querySelector("#temperature");
    temperature.innerHTML = `<span>Температура:</span>  ${Math.round(resReceived.main.temp)}<span>°</span>`;
    let conditions = document.querySelector("#conditions");
    conditions.textContent = `${resReceived.weather[0].description}`;
    let wind = document.querySelector("#wind");
    wind.innerHTML = `<span>Скорость ветра:</span> ${Math.round(resReceived.wind.speed)} <span>м/с</span>`;

}

function getOurDate() {

    //1 Сегодняшний день
    const myDate = new Date();
    // Массивы дней недели 
    const days = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];
    let day = days[myDate.getDay()];
    //3 Дата
    let todaysDate = myDate.getDate();
    // Массивы  месяцев 
    const months = ["Января", "Февраля", "Марта", "Апреля", "Мая", "Июня", "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря"];
    let todayMonth = months[myDate.getMonth()];
    //5 год
    const year = myDate.getFullYear();
    //показать в нужном месте
    let showDate = document.querySelector("#date");
    showDate.textContent = `${day} ${todaysDate} ${todayMonth} ${year}`;
}