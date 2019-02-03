import express from "express";
const router = express.Router();
import fs from "fs";

router.post("/", (req, res) => {
  const base64Data = req.body.img.replace(/^data:image\/png;base64,/, "");
  const n = Date.now();
  fs.writeFile("./images/" + n + ".png", base64Data, "base64", err => {
    console.log(err);
    res.send(`localhost:8888/images/${n}.png`);
  });
});

router.get("/", (req, res) => {
  res.render("index");
});

export default router;
