import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import indexRoute from "./routes/index";

const PORT: number = Number(process.env.PORT) || 8888;
dotenv.load();

const app = express();

const main = async () => {
  app.use(bodyParser.json({ limit: "50mb" }));
  app.use(
    bodyParser.urlencoded({
      limit: "50mb",
      extended: true,
    })
  );
  app.use(cors());
  app.use(express.static("public"));
  app.use("/images", express.static("images"));
  app.use("/", indexRoute);
};

main().catch(e => {
  console.log(`error:${e}`);
  process.exit(1);
});

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
