import { Request, Response } from "express"
import { Word } from "../database/models/Word";
import { UserWord } from "../database/models/UserWord";


export const getWords = async (req: Request, res: Response) => {
    try {
        const words = await Word.find();

        res.status(200).json({
            success: true,
            message: "Words retrieved successfuly",
            data: words
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Words couldn't be retrieved",
            error: error
        })
    }
}

export const getWordsFromLevel = async (req: Request, res: Response) => {
    try {
        const levelId = req.params.level_id;
        const wordsFromLevel = await Word.find({
            where: {
                levelId: parseInt(levelId)
            }
        }); // Fetch words for the specified level_id

        res.status(200).json({
            success: true,
            message: "Words retrieved successfully",
            data: wordsFromLevel
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Words couldn't be retrieved",
            error: error
        });
    }
}

export const getWordsFromLevelToDivert = async (req: Request, res: Response) => {
    try {
        const userId = req.tokenData.userId;
        // All words
        const words = await Word.find();
        // Find user's words
        const learntWords = await UserWord.find({ where: { userId }, relations: ["word"] });
        const learntConcepts = learntWords?.map(item => item.word.EN);
        const currentWord = words.find(word => !learntConcepts.includes(word.EN));
        console.log(learntConcepts);
        console.log(currentWord);

        const levelId = req.params.level_id;
        const wordsFromLevel = await Word.find({
            where: {
                levelId: parseInt(levelId)
            }
        }); // Fetch words for the specified level_id

        const wordsToDivert = wordsFromLevel.filter(word => word.id !== currentWord?.id);
        res.status(200).json({
            success: true,
            message: "Words retrieved successfully",
            data: wordsToDivert
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Words couldn't be retrieved",
            error: error
        });
    }
}


