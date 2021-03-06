// es modules are recommended, if available, especially for typescript
import flatpickr from "flatpickr"; 
// Дополнительный импорт стилей
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
    dataTimePicker: document.querySelector('input[type="text"]'),
    dataBtnStart: document.querySelector('button[data-start]'),
    dataDaysValue: document.querySelector('span[data-days]'),
    dataHoursValue: document.querySelector('span[data-hours]'),
    dataMinValue: document.querySelector('span[data-minutes]'),
    dataSecValue: document.querySelector('span[data-seconds]'),
    intervalID: null,
    selectedDate: null
}

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
    if (selectedDates[0] < Date.now()) {
        return Notify.failure('Please choose a date in the future');
    }
    if (selectedDates[0] > Date.now()) {
        refs.dataBtnStart.disabled = false;
        refs.selectedDate = selectedDates[0];
    }
    console.log(selectedDates[0]);
  }
};

const TIMEDELAY_KEY = 1000;

const dataSwitch = flatpickr(refs.dataTimePicker, options);//выбор календарной даты

refs.dataBtnStart.addEventListener('click', onClickBtn);
refs.dataBtnStart.disabled = true; //// кнопка блокирована до выбора даты


function onClickBtn() {
    refs.dataTimePicker.disabled = true;
    refs.dataBtnStart.disabled = true;

    onGetTime();
    
    refs.intervalID = setInterval(onGetTime, TIMEDELAY_KEY)
};


function onGetTime() {
    const newTime = new Date();
    const checkTime = refs.selectedDate;
    const diffTime = checkTime - newTime;
    const microTime = convertMs(diffTime);

    if (diffTime < TIMEDELAY_KEY) {
        clearInterval(refs.selectedDate);
    }
    timeCalendar(microTime);
}

function timeCalendar({ days, hours, minutes, seconds }) {
    refs.dataDaysValue.textContent = `${days}`;
    refs.dataHoursValue.textContent = `${hours}`;
    refs.dataMinValue.textContent = `${minutes}`;
    refs.dataSecValue.textContent = `${seconds}`;
};


function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
    
// Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
};

// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}


//Добюавляем функцию в которой будет секундомер с 2х значной цифрой 0Х:0Х:0Х
function addLeadingZero(value) {
    return String(value).padStart(2, 0)
}

 