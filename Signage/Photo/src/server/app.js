import express from "express";
import Gyazo from "gyazo-api";
import cors from "cors";
import bodyParser from "body-parser";
const router = express.Router();
import fs from "fs";

const client = new Gyazo();

const app = express();
app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
  })
);
app.use(cors());
app.use(
  "/",
  router.post("/", (req, res) => {
    console.log("png!");
    const base64Data = req.body.img.replace(/^data:image\/png;base64,/, "");
    const n = Date.now();
    fs.writeFile("./images/" + n + ".png", base64Data, "base64", err => {
      console.log(err);
      res.send("書き込み完了");
    });
  })
);

app.listen(8888, () => console.log("Example app listening on port 3000!"));
