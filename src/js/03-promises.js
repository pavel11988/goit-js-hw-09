import Notiflix from 'notiflix';


const form = document.querySelector('.form');
let position = 0;
let timerId = null;

form.addEventListener('submit', onButtonCreate);

function onButtonCreate(event) {
  event.preventDefault();
  let delay = +event.currentTarget.elements.delay.value;
  const step = +event.currentTarget.elements.step.value;
  const amount = +event.currentTarget.elements.amount.value;


  timerId = setInterval(() => {

    position += 1;  
    if (position == amount+1) {clearInterval(timerId); return}

    setTimeout(() => delay += step) 

    createPromise(position, delay)
      .then(({position, delay}) => Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay}ms`))
      .catch(({position, delay}) => Notiflix.Notify.failure(`Rejected promise ${position} in ${delay}ms`))
  },step)
} 


function createPromise(position, delay) {
  const promise = new Promise((reslove , reject) => {
   
    setInterval(() => {
      const shouldResolve = Math.random() > 0.3;

      if(shouldResolve) reslove({position, delay});
      else reject({position, delay});

      },delay);
  })

  return promise;
}  

