import { Request, Response } from "express";
import { Octokit } from "octokit";
import Search from "../models/searchModel";

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN || "",
});

export async function userInfoController(req: Request, res: Response) {
  const userName = req.query.name as string;

  try {
    const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

    console.log("Hello, %s");

    const response = await octokit.rest.search.users({
      q: userName,
    });
    const data = new Search({
      searchType: "repos",
      queryOptions: {
        q: userName,
      },
    });
    console.log("Repo name 🎈🎈 ", userName);
    const dataToSave = await data.save();
    console.log("response", response);
    res.json(response.data);
  } catch (error: any) {
    res.status(error.status || 500).json({ error: error.message });
  }
}
