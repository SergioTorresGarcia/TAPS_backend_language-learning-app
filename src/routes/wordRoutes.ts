
import { Router } from "express";

export const wordRouter = Router();

import { auth } from "../middlewares/auth";
import { createNewWord, getOneWord, getWordToPlay, getWords, getWordsFromLevel, getWordsFromLevelToDivert } from "../controllers/wordController";

// Words:
wordRouter.get("/words", auth, getWords)
wordRouter.post("/words", auth, createNewWord)
wordRouter.get("/words/first", auth, getOneWord)

wordRouter.get("/words/level/:level_id", auth, getWordsFromLevel)
wordRouter.get("/words/level/diversion/:level_id", auth, getWordsFromLevelToDivert)
wordRouter.post("/words/new", auth, createNewWord)


wordRouter.get("/words/current", auth, getWordToPlay)