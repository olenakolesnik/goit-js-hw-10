import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector('.form');

form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
    event.preventDefault();
    const delay = Number(event.target.elements.delay.value);
    const state = event.target.elements.state.value;
    if (delay <= 0) {
        return iziToast.error({ message: "Delay must be greater than 0!", position: "topRight"});
    }
    createPromise(delay, state)
        .then(delay => {
            iziToast.success({ message: `✅ Fulfilled promise in ${delay}ms`, position: "topRight" });
        })
        .catch(delay => {
            iziToast.error({
                message: `❌ Rejected promise in ${delay}ms`,
                position: "topRight"
            });

        })
        .finally(() => {
            form.reset();
        });
}
function createPromise(delay, state) {
    const shouldFulfilled = state === "fulfilled";
const value = delay;

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (shouldFulfilled) {
                resolve(value);  
            } else {
                reject(value);  
           }
        }, delay);
    });
}

