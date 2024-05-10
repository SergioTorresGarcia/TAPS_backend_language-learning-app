
import { Router } from "express";

export const wordRouter = Router();

import { auth } from "../middlewares/auth";
import { createNewWord, deleteWord, getOneWord, getWordToPlay, getWords, getWordsFromLevel, getWordsFromLevelToDivert, updateWord } from "../controllers/wordController";

// Words:
wordRouter.get("/words", auth, getWords)
wordRouter.post("/words/new", auth, createNewWord)
wordRouter.get("/words/first", auth, getOneWord)

wordRouter.put("/words/:word_id", auth, updateWord)
wordRouter.delete("/words/:word_id", auth, deleteWord)

wordRouter.get("/words/level/:level_id", auth, getWordsFromLevel)
wordRouter.get("/words/level/diversion/:level_id", auth, getWordsFromLevelToDivert)


wordRouter.get("/words/current", auth, getWordToPlay)