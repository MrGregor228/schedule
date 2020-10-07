import {
    showTimes
} from "./showTimes.js";
const getData = async function (url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Ошибка по адресу ${url}, статус ошибки ${response.status}!`);
    }
    return await response.json();
};
function addZeroToNumber(num) {
    if (num <= 9) {
        return '0' + num;
    } else return num;
}
let span__dateTime = document.querySelectorAll(".date-time"),

    li__headings = document.querySelectorAll(".schedule-navigation-panel ul li"),
    li__buttons = document.querySelectorAll(".schedule-navigation-panel ul li button"),

    lectures__container = document.querySelector('.lectures-container'),
    lectures = document.querySelectorAll(".lecture"),
    numerator = document.querySelector('.numerator'),
    denumerator = document.querySelector('.denumerator'),

    daysToChill = 5 || 6 || 7,

    date = new Date(),
    today = date.getDay(),
    today__date = date.getDate(),
    timeOptions = {
        month: "short",
        day: "numeric",
        year: "numeric"
    },
    nowDateString = date.toLocaleString('ru', timeOptions).substr(0, 11),
    showLectureTime = document.querySelectorAll('.status'),
    nowDate = addZeroToNumber(date.getFullYear()) + "." + addZeroToNumber(date.getMonth() + 1) + "." + addZeroToNumber(date.getDate()),
    lecturesDateTime = [`${nowDate} 10:20`, `${nowDate} 11:50`, `${nowDate} 13:50`, `${nowDate} 15:20`],
    lecturesStartTime = ["09:00:00", "10:30:00", "12:30:00", "14:00:00"],

    url__first = "https://raw.githubusercontent.com/MrGregor228/different-jsons/master/timetable1.json",
    url__second = "https://raw.githubusercontent.com/MrGregor228/different-jsons/master/timetable2.json",
    url = "";

if (today__date >= 5 && today >= 1 && today__date < 12) {
    url = url__second;
    daysToChill = 0 || 5 || 6 || 7;
    numerator.classList.remove('active');
    denumerator.classList.add('active');
} else if (today__date >= 12 && today__date < 19) {
    url = url__first;
    numerator.classList.add('active');
    denumerator.classList.remove('active');
} else if (today__date >= 19 && today__date < 28) {
    url = url__second;
    numerator.classList.remove('active');
    denumerator.classList.add('active');
    daysToChill = 0 || 5 || 6 || 7;
}

getData(url).then((data) => {
    console.log(data);

    span__dateTime.forEach((item, i) => {
        item.textContent = data[i].date;
    });
    let chillCont = document.querySelector('.chill-container');



    if (today == 0) {
        today = 7;
    } else {
        today = date.getDay();
    }

    for (let i = 0; i < li__headings.length; i++) {
        if (parseInt(data[i].date) == date.getDate()) {
            li__headings[i].classList.add("active");
        }
    }



    li__buttons.forEach((item, i) => {

        item.addEventListener('click', () => {
            document.querySelectorAll('.lecture').forEach((item) => {
                item.remove();
            });
            chillCont.style.display = "none";
            document.getElementsByClassName('active')[0].classList.remove('active');
            setTimeout(() => {
                item.closest('li').classList.add('active');
                if (url == url__first && i >= 4) {
                    chillCont.style.display = "flex";
                    setTimeout(() => {
                        chillCont.style.transform = "scale(1)";
                    }, 100);
                } else if (url == url__second && i == 0 || i >= 4) {
                    chillCont.style.display = "flex";
                    setTimeout(() => {
                        chillCont.style.transform = "scale(1)";
                    }, 100);
                } else if (i < 4) {
                    for (let j = 0; j < data[i].namesOfLessons.length; j++) {
                        lectures__container.insertAdjacentHTML('beforeend', `
								<div class="lecture">
									<div class="numer-of-lecture">#${j+1}</div>	
									<div class="person">
										<div class="person-img" style="background-image:url('${data[i].teachersImages[j]}');"></div>
										<div class="person-heading">
											${data[i].teachers[j]}
										</div>
									</div>
									<div class="description">
										<div class="time"><span class="show-lecture-time">${data[i].time[j]}</span>&nbsp;<span class="status"></span></div>
										<div class="heading">${data[i].namesOfLessons[j]}</div>
										<div class="auditory">${data[i].rooms[j]}</div>
									</div>
									<div class="progress-bar">
										<div class="bar"></div>
									</div>
								</div>
                            `);
                    }
                    if (nowDateString == span__dateTime[i].textContent) {
                        showTimes();
                    } else if (nowDateString < span__dateTime[i].textContent) {
                        for (let j = 0; j < document.getElementsByClassName('status').length; j++) {
                            // console.log(document.getElementsByClassName('status')[j]);
                            document.getElementsByClassName('status')[j].textContent = "Пара начнётся в " + lecturesStartTime[j].substr(0, 5);
                        }
                    } else if (nowDateString > span__dateTime[i].textContent) {
                        for (let j = 0; j < document.getElementsByClassName('status').length; j++) {
                            // console.log(document.getElementsByClassName('status')[j]);
                            document.getElementsByClassName('status')[j].textContent = "Пара завершена";
                        }
                    }

                }
            }, 200);
        });
    });

    if (today < 4) {
        if (url == url__second && today == 1 || today >= 4) {
            chillCont.style.display = "flex";
            setTimeout(() => {
                chillCont.style.transform = "scale(1)";
            }, 100);
        } else {
            data.forEach((item) => {
                if (parseInt(item.date) == date.getDate()) {
                    for (let i = 0; i < item.namesOfLessons.length; i++) {
                        lectures__container.insertAdjacentHTML('beforeend', `
                            <div class="lecture">
                                <div class="numer-of-lecture">#${i+1}</div>	
                                <div class="person">
                                    <div class="person-img" style="background-image:url('${item.teachersImages[i]}');"></div>
                                    <div class="person-heading">
                                        ${item.teachers[i]}
                                    </div>
                                </div>
                                <div class="description">
                                    <div class="time"><span class="show-lecture-time">${item.time[i]}</span>&nbsp;<span class="status"></span></div>
                                    <div class="heading">${item.namesOfLessons[i]}</div>
                                    <div class="auditory">${item.rooms[i]}</div>
                                </div>
                                <div class="progress-bar">
                                    <div class="bar"></div>
                                </div>
                            </div>
                    `);
                    }
                }

            });
        }

        showTimes();


    } else if (url == url__first && today >= 4) {
        chillCont.style.display = "flex";
        setTimeout(() => {
            chillCont.style.transform = "scale(1)";
        }, 100);
    } else if (url == url__second && today == 0 || today >= 4) {
        chillCont.style.display = "flex";
        setTimeout(() => {
            chillCont.style.transform = "scale(1)";
        }, 100);
    }
});