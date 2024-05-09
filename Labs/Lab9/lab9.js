// Creates two promises with timers, one to log an error the other to log data
const init = () => {
    const firstPromise = new Promise((resolve, reject) => {
        setTimeout(() => resolve("hello world"), 1500);
    });

    const secondPromise = new Promise((resolve, reject) => {
        setTimeout(() => reject("unable to resolve the request"), 500);
    });

    firstPromise.then(data => console.log(data));

    secondPromise.catch(error => console.error(error));
}

window.onload = init;
