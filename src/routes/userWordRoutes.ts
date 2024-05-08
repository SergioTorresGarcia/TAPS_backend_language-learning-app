
import { Router } from "express";

export const userWordRouter = Router();

import { auth } from "../middlewares/auth";
import { getLearntWords, getWordToDivert, getWordToPlay, setUpWordAsLearnt } from "../controllers/userWordController";

// UserWords:
userWordRouter.get("/words/learnt", auth, getLearntWords)
userWordRouter.get("/words/current", auth, getWordToPlay)


userWordRouter.get("/words/divert", auth, getWordToDivert)
userWordRouter.post("/words/add-to-learnt", auth, setUpWordAsLearnt)

