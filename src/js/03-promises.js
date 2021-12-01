import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  formDelay: document.querySelector('.form'),
  numberDelay: document.querySelector('input[name="step"]'),
  nameDelay: document.querySelector('input[name="delay"]'),
  amountDelay: document.querySelector('input[name="amount"]'),
  buttonSubmit: document.querySelector('button[type="submit"]')
};

refs.formDelay.addEventListener('submit', onClickBtn);

function createPromise(position, delay) {
  const promise = new Promise((resolve, reject) => {
    setTimeout (() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        // Fulfill
        resolve({ position, delay })
      } else {
        // Reject
        reject({ position, delay })
      }
    }, delay)
  })
  return promise;
};

function onClickBtn(event) {
  event.preventDefault();
  
  const firstStep = Number(refs.numberDelay.value);
  const delayStep = Number(refs.nameDelay.value);
  const amount = Number(refs.amountDelay.value);

  let delay = delayStep;
  for (let position = 1; position <= amount; position++) {
    delay += firstStep
    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
};


// const isSuccess = true;

// const promise = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     if (isSuccess) {
//       resolve("Success! Value passed to resolve function");
//     } else {
//       reject("Error! Error passed to reject function");
//     }
//   }, 2000);
// });

// promise.then(
//   // onResolve will run third or not at all
//   value => {
//     console.log("onResolve call inside promise.then()");
//     console.log(value); // "Success! Value passed to resolve function"
//   },
//   // onReject will run third or not at all
//   error => {
//     console.log("onReject call inside promise.then()");
//     console.log(error); // "Error! Error passed to reject function"
//   }
// );

// promise
//   .then(value => console.log(value)) // "Success! Value passed to resolve function"
//   .catch(error => console.log(error)) // "Error! Error passed to reject function"
//   .finally(() => console.log("Promise settled")); // "Promise se






//   function order (type) {
//   return new Promise(function(resolve, reject) {
//     var burger = cookBurger(type)
//     burger.ready = function (err, burger) {
//       if (err) {
//         return reject(Error('Error while cooking'))
//       }
//       return resolve(burger)
//     }
//   })
// }

// order('JakeBurger')
//   .then( burger => {
//     const milkshake = makeMilkshake('vanila')
//     return { burger: burger, shake: milkshake }
//   })
//   .then( foodItems => {
//     console.log('BURGER PARTY !', foodItems)
//   })
//   .catch( err => {
//     console.log(err)
//   })



// var p = new Promise(function(resolve, reject) {
//     someAsyncOperation(function(e, result) {
//         if (e) {
//             reject(e);
//         } else {
//             resolve(result);
//         }
//     });
// }).then(function(value) {
//     //on success
// }, function(e) {
//     //on fail
//     console.error(e);
// });








// const makePromise = (text, delay) => {
//   return new Promise(resolve => {
//     setTimeout(() => resolve(text), delay);
//   });
// };

// const promiseA = makePromise("promiseA value", 1000);
// const promiseB = makePromise("promiseB value", 3000);

// Promise.all([promiseA, promiseB])
//   .then(value => console.log(value)) //["promiseA value", "promiseB value"]
//   .catch(error => console.log(error));