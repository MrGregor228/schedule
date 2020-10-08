export const showDates = () => {
    let nowDate = new Date(),
        today = fDate(nowDate),
        buttons = document.querySelectorAll('.schedule-navigation-panel ul li button'),
        li_containers = document.querySelectorAll('.schedule-navigation-panel ul li'),
        dateTime = document.querySelectorAll('.date-time');

    function fDate(date, offset = 0) {
        date.setDate(date.getDate() + offset);
        return date.toLocaleString('ru', {
            day: "numeric",
            month: "short",
            year: "numeric",
            weekday: "short"
        }).substr(0, 16).replace(",", "");
    }

    buttons.forEach((item, i) => {
        if (item.textContent.toLowerCase() == today.substr(0, 2)) {
            li_containers[i].classList.add('active');
        }
        dateTime[i].textContent = fDate(new Date(), (1 + i - (new Date().getDay() || 7))).substr(3, 15).trim();
    });
};