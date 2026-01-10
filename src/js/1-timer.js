import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";



  
const input = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

let userSelectedDate = null;
let intervalId = null;

startBtn.disabled = true;
startBtn.addEventListener('click', startTimer);



const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0] <= new Date()) {
            iziToast.error({ message: "Please choose a date in the future",  position: "topRight" });
            startBtn.disabled = true;
            return;
        }
        userSelectedDate = selectedDates[0];
        startBtn.disabled = false;
    }
};

flatpickr(input, options);


function startTimer() {
    startBtn.disabled = true;
    input.disabled = true;

    intervalId = setInterval(() => {
        const diff = userSelectedDate - Date.now();
        if (diff <= 0) {
            clearInterval(intervalId);
            updateClock({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            iziToast.success({ message: "Time is up!" });
            return;
        
        }
        const time = convertMs(diff);
        updateClock(time);
        console.log(time);
    
    }, 1000);
    updateClock(convertMs(userSelectedDate - Date.now()));
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
    }





function updateClock({ days, hours, minutes, seconds }) {
    daysEl.textContent = days ?? '0';
    hoursEl.textContent = String(hours ?? 0).padStart(2, '0');
    minutesEl.textContent = String(minutes ?? 0).padStart(2, '0');
    secondsEl.textContent = String(seconds ?? 0).padStart(2, '0');
    }

  




