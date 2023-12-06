import express, { Application } from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes";
import { Octokit, App } from "octokit";

dotenv.config();
console.log(process.env.GITHUB_TOKEN, "token");

if (!process.env.MONGO_URI) {
  throw new Error("MONGO_URI environment variable is not defined.");
}
const mongoUri: string = process.env.MONGO_URI;

if (!process.env.PORT) {
  throw new Error("PORT environment variable is not defined.");
}
const port: number = parseInt(process.env.PORT, 10);

const app: Application = express();

// const octokit = new Octokit({
//   auth: {
//     token: process.env.GITHUB_TOKEN + "",
//   },
// // });
app.get("/", async (req, res) => {
  try {
    const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

    const {
      data: { login },
    } = await octokit.rest.users.getAuthenticated();
    console.log("Hello, %s", login);
    // const { data } = await octokit.users.getAuthenticated();
    res.status(200).json({ users: login });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/repo-info", async (req, res) => {
  const repoName = req.query.name as string;
  // // if (!repoName) {
  // //   return res
  // //     .status(400)
  // //     .json({ error: "Missing repository name in query parameter" });
  // }
  try {
    const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
    // const response = await octokit.get({
    //   owner: "owner",
    //   repo: repoName,
    // });
    const {
      data: { login },
    } = await octokit.rest.users.getAuthenticated();
    console.log("Hello, %s", login);

    const response = await octokit.request(
      "POST /repos/{owner}/{repo}/issues",

      {
        owner: "Rodrigo-Guerra12",
        repo: "proyecto-final",
        title: "Hello, world!",
        body: "I created this issue using Octokit!",
      }
    );
    console.log("response", response);
    res.json(response.data);
  } catch (error: any) {
    res.status(error.status || 500).json({ error: error.message });
  }
});

// app.get("/repo-info", async (req, res) => {
//   const repoName = req.query.name as string;
//   if (!repoName) {
//     return res
//       .status(400)
//       .json({ error: "Missing repository name in query parameter" });
//   }
//   try {
//     const response = await Octokit.repos.get({
//       owner: "owner",
//       repo: repoName,
//     });
//     res.json(response.data);
//   } catch (error: any) {
//     res.status(error.status || 500).json({ error: error.message });
//   }
// });

// Connect to the MongoDB database
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
