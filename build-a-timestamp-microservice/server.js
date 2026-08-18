import express from "express";
import cors from "cors";

const app = express();

app.use(cors({ optionsSuccessStatus: 200 }));

app.use(express.static("public"));

app.get("/", (_req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

// Do not change code above this line

// new Date()
// new Date(value)
// date.getTime()
// date.toUTCString()
// Date.now()
// isNaN()

app.get("/api", (req, res) => {
    return res.json({
      unix: Date.now(),
      utc: new Date(Date.now()).toUTCString()
    });
})

app.get("/api/:date", (req, res) => {
  let { date } = req.params;
  
  const regex = /^\d+$/;
  if (regex.test(date)) {
    date = Number(date);
  }

  const parsedDate = new Date(date);

  if (isNaN(parsedDate.getTime())) {
    res.status(400).json({
      error: "Invalid Date"
    });
  } else {
    res.json({
      unix: parsedDate.getTime(),
      utc: parsedDate.toUTCString()
    });
  }
})
// Do not change code below this line

const PORT = 8000;
const listener = app.listen(PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
