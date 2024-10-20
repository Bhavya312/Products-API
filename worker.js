const {parentPort, workerData, getEnvironmentData} = require('node:worker_threads');
console.log(getEnvironmentData('Hello'));
// parentPort.postMessage(workerData.num);
parentPort.postMessage(workerData.num * workerData.num);