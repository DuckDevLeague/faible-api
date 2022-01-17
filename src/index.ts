import express from "express";
import { router } from "./routes";

const app = express();

app.use(router);

app.listen(process.env.PORT || 3333, () => {
  console.log("Server is Running!");
});