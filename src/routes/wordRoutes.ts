
import { Router } from "express";

export const wordRouter = Router();

import { auth } from "../middlewares/auth";
import { getWords, getWordsFromLevel, getWordsFromLevelToDivert } from "../controllers/wordController";

// Words:
wordRouter.get("/words", auth, getWords)
wordRouter.get("/words/level/:level_id", auth, getWordsFromLevel)
wordRouter.get("/words/level/diversion/:level_id", auth, getWordsFromLevelToDivert)


