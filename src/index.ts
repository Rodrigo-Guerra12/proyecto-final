import express, { Application } from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes";
import { Octokit, App } from "octokit";
import Search from "./models/searchModel";

dotenv.config();
console.log("token", process.env.GITHUB_TOKEN);

if (!process.env.MONGO_URI) {
  throw new Error("MONGO_URI environment variable is not defined.");
}
const mongoUri: string = process.env.MONGO_URI;

if (!process.env.PORT) {
  throw new Error("PORT environment variable is not defined.");
}
const port: number = parseInt(process.env.PORT, 10);

const app: Application = express();

app.get("/repos", async (req, res) => {
  try {
    const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

    const {
      data: { login },
    } = await octokit.rest.users.getAuthenticated();
    console.log("Hello, %s", login);

    res.status(200).json({ users: login });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/repo-info", async (req, res) => {
  const repoName = req.query.name as string;

  try {
    const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

    console.log("Hello, %s");

    const response = await octokit.rest.search.repos({
      q: repoName,
    });

    const data = new Search({
      searchType: "repos",
      queryOptions: {
        q: repoName,
      },
    });

    const dataToSave = await data.save();
    console.log("dataToSave: ", dataToSave);
    res.json(response.data);
  } catch (error: any) {
    res.status(error.status || 500).json({ error: error.message });
  }
});

app.get("/users-info", async (req, res) => {
  const userName = req.query.name as string;

  try {
    const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

    console.log("Hello, %s");

    const response = await octokit.rest.search.users({
      q: userName,
    });

    console.log("response", response);
    res.json(response.data);
  } catch (error: any) {
    res.status(error.status || 500).json({ error: error.message });
  }
});

mongoose.connect(mongoUri);

const db = mongoose.connection;

db.on("error", (err) => {
  console.error(`MongoDB connection error: ${err}`);
});

db.once("open", () => {
  console.log("Connected to MongoDB");
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use("/api/users", userRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
