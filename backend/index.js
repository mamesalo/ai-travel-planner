import express from "express";
import dotenv from "dotenv";
import routes from "./routes/api.js";
import cookieParser from "cookie-parser";
import path from "path";
dotenv.config();

const __dirname = path.resolve();

const app = express();

app.use(express.json());

app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));

app.listen(5020, () => {
  console.log("Server is running on port 5020!");
});

app.use("/api", routes);

app.use(express.static(path.join(__dirname, "client", "dist")));

app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});
