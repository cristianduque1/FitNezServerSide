const express = require("express");
const app = express();
const PORT = 8080;
const videos = require("./routes/videos");
const cors = require("cors");

// This middleware allows us to post JSON in request.body
app.use(cors());
app.use(express.json());

app.use("/videos", express.static("./public/images"));

app.use("/videos", videos);

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
