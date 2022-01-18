import express from "express";
import { router } from "./routes";
import cors from 'cors';

const app = express();
app.use(cors());

app.use(router);

app.listen(process.env.PORT || 3333, () => {
  console.log("Server is Running!");
});