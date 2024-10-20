const { Worker, workerData, setEnvironmentData} = require('node:worker_threads');
setEnvironmentData('Hello', 'World');
const worker = new Worker('./worker.js', {workerData: {num: 5}});
worker.on('message', (result) => {
    console.log('square of 5 is:', result);
})

worker.on("error", (msg) => {
  console.log(msg);
});

console.log('hureey');