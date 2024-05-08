
import { Request, Response } from "express"
import { UserWord } from "../database/models/UserWord";
import { Word } from "../database/models/Word";

// Lists all the words already learnt by the user
export const getLearntWords = async (req: Request, res: Response) => {
    try {
        const userId = req.tokenData.userId;

        // Find user's words
        const learntWords = await UserWord.find({ where: { userId }, relations: ["word"] });

        if (!learntWords) {
            return {};
        }

        // Get an array of words associated with the user
        // learntWords.pop();

        return res.status(200).json({
            success: true,
            message: "List of all learnt words retrieved successfully",
            data: learntWords
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to retrieve word",
            error: error
        });
    }
}

// Gives the word at play at the moment (current word)
export const getWordToPlay = async (req: Request, res: Response) => {
    try {
        const userId = req.tokenData.userId;

        // All words
        const words = await Word.find();
        // Find user's words
        const learntWords = await UserWord.find({ where: { userId }, relations: ["word"] });
        const learntConcepts = learntWords?.map(item => item.word.EN);

        const currentWord = words.find(word => !learntConcepts.includes(word.EN));
        if (learntWords.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No words found for the user"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Current word to play retrieved successfully",
            data: currentWord
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to retrieve word",
            error: error
        });
    }
}


///////////////////////////////////////////////////////
// Set up a word as "LEARNT"
export const setUpWordAsLearnt = async (req: Request, res: Response) => {
    try {
        const userId = req.tokenData.userId;

        // All words
        const words = await Word.find();
        // Find user's words
        const learntWords = await UserWord.find({ where: { userId }, relations: ["word"] });
        const learntConcepts = learntWords?.map(item => item.word.EN);

        const currentWord = words.find(word => !learntConcepts.includes(word.EN));
        const wordId = currentWord?.id

        const newUserWord = await UserWord.create({
            userId: userId,
            wordId: wordId
        }).save()

        return res.status(200).json({
            success: true,
            message: "Word added to the 'learnt words list' successfully",
            data: newUserWord
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to set up the word as learnt",
            error: error
        });
    }
}





// Lists the other words from the same level
// These plus the learnt words become the diversion group
export const getWordToDivert = async (req: Request, res: Response) => {
    try {
        const userId = req.tokenData.userId;

        // Find user's words
        const userWords = await UserWord.find({ where: { userId }, relations: ["word"] });

        if (userWords.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No words found for the user"
            });
        }

        // Get an array of words associated with the user
        const otherWords = userWords.slice(0, -1);
        console.log("all", userWords);
        console.log("other words", otherWords);

        return res.status(200).json({
            success: true,
            message: "Other words to divert retrieved successfully",
            data: otherWords
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to retrieve word",
            error: error
        });
    }
}
