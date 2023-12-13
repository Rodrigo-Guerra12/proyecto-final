import express, { Application, Router } from "express";

import { repoSearchController } from "../controllers/repoSearchController";
import { repoInfoController } from "../controllers/repoInfoController";
import { userInfoController } from "../controllers/userInfoController";
import { queryController } from "../controllers/queryController";
import { queryIdController } from "../controllers/queryIdController";
import { queryDeleteController } from "../controllers/queryDeleteController";

const router = express.Router();

router.get("/repos", repoSearchController);
router.get("/repo-info", repoInfoController);
router.get("/users-info", userInfoController);
router.get("/queries", queryController);
router.get("/queries/:id", queryIdController);
router.delete("/queries/:id", queryDeleteController);

export default router;
