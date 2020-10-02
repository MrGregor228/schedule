const getData = async function (url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Ошибка по адресу ${url}, статус ошибки ${response.status}!`);
    }
    return await response.json();
};

let span__dateTime = document.querySelectorAll(".date-time"),
    li__headings = document.querySelectorAll(".schedule-navigation-panel ul li"),
    lectures__container = document.querySelector('.lectures-container'),
    lectures = document.querySelectorAll(".lecture");

function addZeroToNumber(num) {
    if (num <= 9) {
        return '0' + num;
    } else return num;
}


getData("https://raw.githubusercontent.com/MrGregor228/different-jsons/master/timetable.json").then((data) => {
    span__dateTime.forEach((item, i) => {
        item.textContent = data[i].date;
    });
    let date = new Date();

    for (let i = 0; i < li__headings.length; i++) {
        if (parseInt(data[i].date) == date.getDate()) {
            li__headings[i].classList.add("active");
        }
    }
    let daysToChill = 5 || 6 || 7;
    if (date.getDay() < daysToChill) {
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
    
        let progress__bar = document.querySelectorAll('.progress-bar .bar'),
            i1, i2, i3, i4 = 0,
            lecturesEndTime = ["10:20:00", "11:50:00", "13:50:00", "15:20:00"];
        setInterval(() => {
            let newdate = new Date(),
                hours = addZeroToNumber(newdate.getHours()),
                minutes = addZeroToNumber(newdate.getMinutes()),
                seconds = addZeroToNumber(newdate.getSeconds()),
                mainString = `${hours}:${minutes}:${seconds}`;
            
            for (let i = 0; i < progress__bar.length; i++) {
                if (mainString >= lecturesEndTime[i]) {
                    progress__bar[i].style.cssText = `width:100%`;
                }
            }
        }, 1000);
        // timer
    
    
        function getTimeRemaining(endtime) {
            let t = Date.parse(endtime) - Date.parse(new Date()),
                seconds = Math.floor((t / 1000) % 60),
                minutes = Math.floor((t / 1000 / 60) % 60),
                hours = Math.floor((t / (1000 * 60 * 60)));
    
            return {
                'total': t,
                'hours': hours,
                'minutes': minutes,
                'seconds': seconds
            };
        }
    
        function setClock(endtime, element) {
            let timer = element,
                timerInterval = setInterval(updateClock, 1000);
    
            function updateClock() {
                let t = getTimeRemaining(endtime);
                timer.textContent = t.hours + ":" + t.minutes + ":" + t.seconds;
    
                function addZeroToNumber(num) {
                    if (num <= 9) {
                        return '0' + num;
                    } else return num;
                }
    
                timer.textContent = "До конца " + addZeroToNumber(t.hours) + ":" + addZeroToNumber(t.minutes) + ":" + addZeroToNumber(t.seconds);
    
                if (t.total <= 0) {
                    clearInterval(timerInterval);
    
                    timer.textContent = 'Пара завершена';
                }
            }
        }
    
        let showLectureTime = document.querySelectorAll('.status'),
            lecturesDateTime = ['2020-10-1 10:20', '2020-10-1 11:50', '2020-10-1 13:50', '2020-10-1 15:20'],
            lecturesStartTime = ["09:00:00", "10:30:00", "12:30:00", "14:00:00"];
    
        showLectureTime.forEach((item, i) => {
            let deadline = lecturesDateTime[i];
    
            let dt = new Date(),
                hours = addZeroToNumber(dt.getHours()),
                minutes = addZeroToNumber(dt.getMinutes()),
                seconds = addZeroToNumber(dt.getSeconds()),
                mainString = `${hours}:${minutes}:${seconds}`;
    
            if (mainString <= lecturesStartTime[i]) {
                console.log("Пара начнётся в " + lecturesStartTime[i].substr(0, 5));
                item.textContent = "Пара начнётся в " + lecturesStartTime[i].substr(0, 5);
            } else {
                setClock(deadline, item);
            }
    
        });
    
    
        span__dateTime.forEach((item) => {
            item.addEventListener('click', () => {
                document.getElementsByClassName('active')[0].classList.remove('active');
                setTimeout(() => {
                    item.closest('li').classList.add('active');
                }, 200);
            });
        });
    } else {
        console.log("Сегодня отдыхаем");
    }
});