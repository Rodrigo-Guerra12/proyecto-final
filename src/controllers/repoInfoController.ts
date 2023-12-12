import { Request, Response } from "express";
import { Octokit } from "octokit";
import Search from "../models/searchModel";

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN || "",
});

export async function repoInfoController(req: Request, res: Response) {
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
    console.log("Repo name 🎈🎈 ", repoName);
    const dataToSave = await data.save();
    console.log("dataToSave: ", dataToSave);
    res.json(response.data);
  } catch (error: any) {
    res.status(error.status || 500).json({ error: error.message });
  }
}
