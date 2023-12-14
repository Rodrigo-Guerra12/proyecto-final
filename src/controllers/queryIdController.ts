import { Request, Response } from "express";
import { Octokit } from "octokit";
import Search from "../models/searchModel";

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN || "",
});

export async function queryIdController(req: Request, res: Response) {
  let data;
  try {
    data = await Search.findById(req.params.id);

    if (!data) {
      throw new Error("El ID que intentas buscar no existe 💥");
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
    return;
  }
  res.json({ message: data });
}
