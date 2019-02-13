import express from "express";
const router = express.Router();
import fs from "fs";
import fetch from "node-fetch";

router.post("/", (req, res) => {
  const base64Data = req.body.img.replace(/^data:image\/png;base64,/, "");
  const n = Date.now();
  fs.writeFile("./images/" + n + ".png", base64Data, "base64", err => {
    if (err) {
      console.log(err);
    }
    res.send(`localhost:8888/images/${n}.png`);
    console.log(req.body.cardId);
    fetch(
      `http://192.168.0.200/addlink/signagePhoto/${
        req.body.cardId
      }?url=http://192.168.0.204:8888/images/${n}.png`
    );
  });
});

router.get("/", (req, res) => {
  res.render("index");
});

export default router;
