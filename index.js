var express = require("express");
var app = express();
var cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const multer = require("multer");
var storage = multer.memoryStorage();
var upload = multer({ storage: storage });

mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(
    () => {
      console.log("Successfully Connected To Database");
    },
    (err) => {
      console.log("connection error:", err);
    }
  );

app.use(cors());
app.use("/public", express.static(process.cwd() + "/public"));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

app.post("/api/fileanalyse", upload.single("upfile"), (req, res) => {
  res.json({
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size,
  });
});

const port = process.env.PORT;
app.listen(port, function () {
  console.log("Your app is listening on port " + port);
});
