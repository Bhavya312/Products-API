const { default: axios } = require('axios');
const { parentPort } = require('node:worker_threads');

const animes = ['bleach', 'one piece', 'dragon ball z', 'naruto'];

const storeAnimess = async() => {
  // animes.forEach(anime  async=> {
  // const data = (await axios.get('https://kitsu.io/api/edge/anime')).data.data;
  // console.log(data);
    // console.log(anime);
  // })
}
storeAnimess();
parentPort.postMessage('hello');
// console.log('child');