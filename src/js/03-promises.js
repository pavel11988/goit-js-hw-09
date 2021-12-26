import Notiflix from 'notiflix';

const form = document.querySelector('.form');


form.addEventListener('submit', onButtonCreate);

function onButtonCreate(event) {
  event.preventDefault();
  let delay = +event.currentTarget.elements.delay.value;
  let step = +event.currentTarget.elements.step.value;
  const amount = +event.currentTarget.elements.amount.value;

  for (let position = 1; position <= amount; position += 1) {
    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position,delay }) => {
        Notiflix.Notify.failure(`Rejected promise ${position} in ${delay}ms`);
      })
      delay += step;
    }   
  }

  //Через цикл и массив:
  // let array = [];
  // if (delay < 0 || step < 0 || amount < 0) {
  //   Notiflix.Notify.warning('Error! Values must be >= 0')
  //   return;
  // }

  // for (let i = 0; i < amount; i += 1) {
  //   array.push(delay + i * step);
  // }

  // const promises = array.map((value, index) => {
  //   createPromise(index + 1, value)
  //     .then(({i, delay}) => Notiflix.Notify.success(`Fulfilled promise ${index + 1} in ${value}ms`))
  //     .catch(({i, delay}) => Notiflix.Notify.failure(`Rejected promise ${index + 1} in ${value}ms`))
  // })
// }
 

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