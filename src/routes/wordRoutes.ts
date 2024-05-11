
import { Router } from "express";

export const wordRouter = Router();

import { auth } from "../middlewares/auth";
import { createNewWord, deleteWord, getOneWord, getWordById, getWordToPlay, getWords, getWordsFromLevel, getWordsFromLevelToDivert, getWordsLearnt, updateWord } from "../controllers/wordController";
import { isAdmin } from "../middlewares/isAdmin";

// Words:
wordRouter.get("/words", auth, getWords)
wordRouter.post("/words/new", auth, isAdmin, createNewWord)
wordRouter.get("/words/first", auth, getOneWord)
wordRouter.get("/words/current", auth, getWordToPlay)
wordRouter.get("/words/learnt", auth, getWordsLearnt)

wordRouter.get("/words/:id", auth, isAdmin, getWordById)
wordRouter.put("/words/:id", auth, isAdmin, updateWord)
wordRouter.delete("/words/:id", auth, isAdmin, deleteWord)

wordRouter.get("/words/level/:level_id", auth, getWordsFromLevel)
wordRouter.get("/words/level/diversion/:level_id", auth, getWordsFromLevelToDivert)

