const express = require("express");
const router = express.Router();
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const timestamp = new Date().getTime();

function readVideosFile() {
  const videosList = fs.readFileSync("./data/vid.json");
  const parsedData = JSON.parse(videosList);
  return parsedData;
}

router.get("/", (req, res) => {
  const videos = readVideosFile();
  res.json(videos);
});

router.get("/:id", (req, res) => {
  const videoId = req.params.id;
  const videos = readVideosFile();
  const video = videos.find((v) => v.id === videoId);
  if (video) {
    res.json(video);
  } else {
    res.status(404).json({ error: `Video with ID ${videoId} not found` });
  }
});

router.post("/", (req, res) => {
  console.log(req.body);
  const newVideo = {
    id: uuidv4(),
    title: req.body.title,
    description: req.body.description,
    channel: "Blueee",
    image: "image9.jpeg",
    views: "85",
    likes: "8568",
    duration: "4:22",
    video: "https://project-2-api.herokuapp.com/stream",
    timestamp: timestamp,
    comments: [],
  };

  const videos = readVideosFile();
  videos.push(newVideo);
  fs.writeFileSync("./data/vid.json", JSON.stringify(videos));

  res.status(201).json(newVideo);
});

module.exports = router;
