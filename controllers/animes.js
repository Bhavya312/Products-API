const asyncWrapper = require("../middleware/async");
const { Worker } = require('node:worker_threads')
const path = require('path');
const Anime = require("../models/Anime");
const fs = require('fs');

const getAllAnimes = asyncWrapper(async (req, res) => {
  const workerPath = path.join(__dirname, '../worker/getAnimesThread.js');
  
    // const worker = new Worker(workerPath);
  // worker.on('message', (result) => {
  //   console.log(result);
  // });

  // worker.on('error', (msg) => {
  //   console.log(msg);
  // })
  res.status(200).json('data');
});

const storeAnime = asyncWrapper(async (req, res) => {
  const data = { ...req.body };
  const anime = await Anime.create(data);
  res.status(201).json({ anime });
})

const getAnime = asyncWrapper(async (req, res) => {
  const videoPath = path.join('assets/new.mp4');
  
  const videoStat = fs.statSync(videoPath)
  const fileSize = videoStat.size;
  const videoRange = req?.haeaders?.range;
  console.log(videoRange);
  if(videoRange){
    const parts = videoRange.replace('/bytes=/', "").split('-');
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize-1;
    const chunksize = (end-start) + 1;
    const file = fs.createReadStream(videoPath, {start, end});
    const header = {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,

      'Accept-Ranges': 'bytes',

      'Content-Length': chunksize,

      'Content-Type': 'video/mp4',
    }
    res.writeHead(206, header);
    file.pipe(res)
  } else {
  const head = {

    'Content-Length': fileSize,
    
    'Content-Type': 'video/mp4',
    
    };
    
    res.writeHead(200, head);
    
    fs.createReadStream(videoPath).pipe(res);
    
  }
    
  // console.log(fileSize);
  // res.send('1654');
})

module.exports = { getAllAnimes, storeAnime, getAnime}