import Notiflix from 'notiflix';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const button = document.querySelector("button[data-start]");

const daysTitle = document.querySelector("span[data-days]");
const hoursTitle = document.querySelector("span[data-hours]");
const minutesTitle = document.querySelector("span[data-minutes]");
const secondsTitle = document.querySelector("span[data-seconds]");

let ms = null;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,


    onClose(selectedDates) {
      const selectedDate = selectedDates[0];
      ms = selectedDate - options.defaultDate;

      if (ms < 0) {
        Notiflix.Notify.failure("Please choose a date in the future");
        button.classList.add("btn-disabled");
        button.disabled = true;
        return;
      } 
        button.classList.remove("btn-disabled");
        button.disabled = false;
    }, 
};

flatpickr("#datetime-picker", options);

button.addEventListener('click', startTimer);


function startTimer() {

    let timerId = setInterval(() => {
        ms = ms - 1000;
        const convert = convertMs(ms); 

        daysTitle.textContent = `${pad(convert.days)}`;
        hoursTitle.textContent = `${pad(convert.hours)}`;
        minutesTitle.textContent = `${pad(convert.minutes)}`;
        secondsTitle.textContent = `${pad(convert.seconds)}`;

        stopTimer(daysTitle,hoursTitle,minutesTitle,secondsTitle,timerId);
       
    }, 1000);

}

function pad(value) {
    return String(value).padStart(2,'0');
}

function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
};

function stopTimer(daysTitle,hoursTitle,minutesTitle,secondsTitle,timerId){
    if (daysTitle.textContent === '00' && hoursTitle.textContent === '00'
    && minutesTitle.textContent === '00' && secondsTitle.textContent === '00') {
        clearTimeout(timerId);
    };
}




  