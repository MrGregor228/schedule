export const showTimes = () => {

    let date = new Date();

    function addZeroToNumber(num) {
        if (num <= 9) {
            return '0' + num;
        } else return num;
    }

    let progress__bar = document.querySelectorAll('.progress-bar .bar'),
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
    let showLectureTime = document.querySelectorAll('.status'),
        nowDate = addZeroToNumber(date.getFullYear()) + "." + addZeroToNumber(date.getMonth() + 1) + "." + addZeroToNumber(date.getDate()),
        lecturesDateTime = [`${nowDate} 10:20`, `${nowDate} 11:50`, `${nowDate} 13:50`, `${nowDate} 15:20`],
        lecturesStartTime = ["09:00:00", "10:30:00", "12:30:00", "14:00:00"];

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

            timer.textContent = "До кінця " + addZeroToNumber(t.hours) + ":" + addZeroToNumber(t.minutes) + ":" + addZeroToNumber(t.seconds);

            if (t.total <= 0) {
                clearInterval(timerInterval);

                timer.textContent = 'Пара закінчена';
            }
        }
    }

    showLectureTime.forEach((item, i) => {
        let deadline = lecturesDateTime[i];
        let dt = new Date(),
            hours = addZeroToNumber(dt.getHours()),
            minutes = addZeroToNumber(dt.getMinutes()),
            seconds = addZeroToNumber(dt.getSeconds()),
            mainString = `${hours}:${minutes}:${seconds}`;

        if (mainString <= lecturesStartTime[i]) {
            console.log("Пара почнеться в " + lecturesStartTime[i].substr(0, 5));
            item.textContent = "Пара почнеться в " + lecturesStartTime[i].substr(0, 5);
        } else {
            setClock(deadline, item);
        }
    });

};