
import bcrypt from "bcrypt";

import { Role } from "./../models/Role";
import { User } from "./../models/User";
import { Level } from "./../models/Level"
import { Challenge } from "./../models/Challenge"
import { Word } from "./../models/Word"
import { UserWord } from "./../models/UserWord"

import dayjs from "dayjs"
import { AppDataSource } from "../db";
import { faker } from "@faker-js/faker";

//number of fake users we want to populate DB with
let num_seeds = 20;

// Roles hardcoded, Admin (id=1) and User (id = 2 by default). 
const roleSeedDatabase = async () => {
    try {
        await AppDataSource.initialize();

        const roleUser = new Role();
        roleUser.name = "admin"
        await roleUser.save();

        const roleAdmin = new Role();
        roleAdmin.name = "user"
        await roleAdmin.save();


        console.log("---------------------");
        console.log("Roles saved correctly");
        console.log("---------------------");

    } catch (error) {
        console.log(error);

    } finally {
        if (AppDataSource) {
            await AppDataSource.destroy();
        }
    }
}


// create false users to populate DB (with Faker)
const birthday = dayjs(faker.date.between({ from: '1950-01-01', to: '2006-01-01' })).format("YYYY-MM-DD")
const generateFakeUsers = () => {
    const user = new User();
    let name = faker.internet.userName();
    user.username = name.toLowerCase();
    user.email = name + '@mail.com' // faker.internet.email();
    user.passwordHash = bcrypt.hashSync("Aa123456", 8)

    return user;
}
const userSeedDatabase = async () => {
    try {
        await AppDataSource.initialize();

        // hardcoded admin
        const admin = new User();
        admin.username = "Admin";
        admin.email = "admin@mail.com";
        admin.passwordHash = bcrypt.hashSync("Aa123456", 8)
        admin.role = new Role();
        admin.role.id = 1;
        admin.save();

        // hardcoded user
        const user = new User();
        user.username = "User";
        user.email = "user@mail.com";
        user.passwordHash = bcrypt.hashSync("Aa123456", 8)
        user.role = new Role();
        user.role.id = 2;
        user.save();

        // fake users (with role_id = 2 by default)
        const fakeUsers = Array.from({ length: num_seeds - 2 }, generateFakeUsers);
        await User.save(fakeUsers);

        console.log("---------------------");
        console.log("Users saved correctly");
        console.log("---------------------");

    } catch (error) {

        console.log(error);

    } finally {

        if (AppDataSource) {
            await AppDataSource.destroy();
        }
    }
}


// create levels (Basic, Intermediate, Advanced, Proficient, Bilingual Proficiency)
const levelSeedDatabase = async () => {
    try {
        await AppDataSource.initialize();

        // Basic level
        const level1 = new Level();
        level1.name = "Basic Level"
        await level1.save();

        // Intermediate level
        const level2 = new Level();
        level2.name = "Intermediate Level"
        await level2.save();

        // Advanced level
        const level3 = new Level();
        level3.name = "Advanced Level"
        await level3.save();

        // Proficient level
        const level4 = new Level();
        level4.name = "Proficient Level"
        await level4.save();

        // Master level
        const level5 = new Level();
        level5.name = "Master Level"
        await level5.save();

        console.log("----------------------");
        console.log("Levels saved correctly");
        console.log("----------------------");

    } catch (error) {
        console.log(error);

    } finally {
        if (AppDataSource) {
            await AppDataSource.destroy();
        }
    }
}


// create challenges (Basic, Intermediate, Advanced, Proficient, Bilingual Proficiency)
const challengeSeedDatabase = async () => {
    try {
        await AppDataSource.initialize();

        for (let i = 1; i <= 25; i++) {
            const ch = new Challenge();
            ch.name = `Challenge ${i}`
            await ch.save();
        }

        console.log("----------------------");
        console.log("Challenges saved correctly");
        console.log("----------------------");

    } catch (error) {
        console.log(error);

    } finally {
        if (AppDataSource) {
            await AppDataSource.destroy();
        }
    }
}


// create words
const wordSeedDatabase = async () => {
    try {
        await AppDataSource.initialize();

        const wordLvl1 = [
            // 1 level / 5 challenges / 10 words
            // Basic level
            { EN: "CITY", JP: "トシ", romanji: "Toshi", image: "./icons/city.png", challengeId: 1 },
            { EN: "MUSEUM", JP: "びじゅつかん", romanji: "Bijutsukan", image: "./icons/museum.png", challengeId: 1 },
            { EN: "HOUSE", JP: "いえ", romanji: "Ie", image: "./icons/house.png", challengeId: 2 },
            { EN: "AIRPORT", JP: "くうこう", romanji: "Kūkō", image: "./icons/airport.png", challengeId: 2 },
            { EN: "FASHION", JP: "ファッション", romanji: "Fasshon", image: "./icons/fashion.png", challengeId: 3 },
            { EN: "CAR", JP: "くるま", romanji: "Kuruma", image: "./icons/car.png", challengeId: 3 },
            { EN: "TRAIN", JP: "でんしゃ", romanji: "Densha", image: "./icons/train.png", challengeId: 4 },
            { EN: "BIKE", JP: "じてんしゃ", romanji: "Jitensha", image: "./icons/bike.png", challengeId: 4 },
            { EN: "PLANE", JP: "ひこうき", romanji: "Hikōki", image: "./icons/plane.png", challengeId: 5 },
            { EN: "BOAT", JP: "ふね", romanji: "Fune", image: "./icons/boat.png", challengeId: 5 },
        ];
        await Promise.all(wordLvl1.map(async data => {
            const word = new Word();
            Object.assign(word, data);
            word.userwords = [];
            word.levelId = 1;
            await word.save();
            return word;
        }));

        const wordLvl2 = [
            // Intermediate level            
            { EN: "SCOOTER", JP: "スクーター", romanji: "Sukūtā", image: "./icons/scooter.png", levelId: 2, challengeId: 6 },
            { EN: "BUS", JP: "バス", romanji: "Basu", image: "./icons/bus.png", levelId: 2, challengeId: 6 },
            { EN: "HELLO!", JP: "こんにちは", romanji: "Konnichiwa!", image: "./icons/hello.png", levelId: 2, challengeId: 7 },
            { EN: "THANK YOU", JP: "ありがとう", romanji: "Arigatou", image: "./icons/thank_you.png", levelId: 2, challengeId: 7 },
            { EN: "PLEASE", JP: "おねがいします", romanji: "Onegaishimasu", image: "./icons/please.png", levelId: 2, challengeId: 8 },
            { EN: "JAPANESE", JP: "にほんご", romanji: "Nihongo", image: "./icons/japanese.png", levelId: 2, challengeId: 8 },
            { EN: "ENGLISH", JP: "えいご", romanji: "Eigo", image: "./icons/english.png", levelId: 2, challengeId: 9 },
            { EN: "LOVE", JP: "あい", romanji: "Ai", image: "./icons/love.png", levelId: 2, challengeId: 9 },
            { EN: "FOOD", JP: "たべもの", romanji: "Tabemono", image: "./icons/food.png", levelId: 2, challengeId: 10 },
            { EN: "LEMON", JP: "レモン", romanji: "Re-mon", image: "./icons/lemon.png", levelId: 2, challengeId: 10 },
        ];
        await Promise.all(wordLvl2.map(async data => {
            const word = new Word();
            Object.assign(word, data);
            word.userwords = [];
            await word.save();
            return word;
        }));
        const wordLvl3 = [
            // Advanced level
            { EN: "SOUP", JP: "スープ", romanji: "Sūpu", image: "./icons/soup.png", levelId: 3, challengeId: 11 },
            { EN: "ICE CREAM", JP: "アイスクリーム", romanji: "Aisukurīmu", image: "./icons/ice_cream.png", levelId: 3, challengeId: 11 },
            { EN: "SUITCASE", JP: "スーツケース", romanji: "Sūtsukēsu", image: "./icons/suitcase.png", levelId: 3, challengeId: 12 },
            { EN: "RAMEN", JP: "らーめん", romanji: "Ramen", image: "./icons/ramen.png", levelId: 3, challengeId: 12 },
            { EN: "SUSHI", JP: "すし", romanji: "Sushi", image: "./icons/sushi.png", levelId: 3, challengeId: 13 },
            { EN: "WATER", JP: "みず", romanji: "Mizu", image: "./icons/water.png", levelId: 3, challengeId: 13 },
            { EN: "MILK", JP: "ぎゅうにゅう", romanji: "Gyūnyū", image: "./icons/milk.png", levelId: 3, challengeId: 14 },
            { EN: "BEER", JP: "ビール", romanji: "Bīru", image: "./icons/beer.png", levelId: 3, challengeId: 14 },
            { EN: "COFFEE", JP: "コーヒー", romanji: "Kōhī", image: "./icons/coffee.png", levelId: 3, challengeId: 15 },
            { EN: "SAKE", JP: "さけ", romanji: "Sake", image: "./icons/sake.png", levelId: 3, challengeId: 15 },
        ];
        await Promise.all(wordLvl3.map(async data => {
            const word = new Word();
            Object.assign(word, data);
            word.userwords = [];
            await word.save();
            return word;
        }));
        const wordLvl4 = [
            // Proficient level
            { EN: "TEA", JP: "おちゃ", romanji: "Ocha", image: "./icons/tea.png", levelId: 4, challengeId: 16 },
            { EN: "ALARM", JP: "あらーむ", romanji: "Arāmu", image: "./icons/alarm.png", levelId: 4, challengeId: 16 },
            { EN: "KIMONO", JP: "きもの", romanji: "Kimono", image: "./icons/kimono.png", levelId: 4, challengeId: 17 },
            { EN: "BED", JP: "ベッド", romanji: "Beddo", image: "./icons/bed.png", levelId: 4, challengeId: 17 },
            { EN: "BOTTLE", JP: "ぼとる", romanji: "Botoru", image: "./icons/bottle.png", levelId: 4, challengeId: 18 },
            { EN: "CASTLE", JP: "しろ", romanji: "Shiro", image: "./icons/castle.png", levelId: 4, challengeId: 18 },
            { EN: "OPEN", JP: "あいた", romanji: "Aita", image: "./icons/open.png", levelId: 4, challengeId: 19 },
            { EN: "CLOSED", JP: "クローズド", romanji: "Kurōzudo", image: "./icons/closed.png", levelId: 4, challengeId: 19 },
            { EN: "COCKTAIL", JP: "カクテル", romanji: "Kakuteru", image: "./icons/cocktail.png", levelId: 4, challengeId: 20 },
            { EN: "FRENCH FRIES", JP: "フライドポテト", romanji: "Furaidopoteto", image: "./icons/french_fries.png", levelId: 4, challengeId: 20 },
        ];
        await Promise.all(wordLvl4.map(async data => {
            const word = new Word();
            Object.assign(word, data);
            word.userwords = [];
            await word.save();
            return word;
        }));
        const wordLvl5 = [
            // Master level
            { EN: "GAS STATION", JP: "ガソリンスタンド", romanji: "Gasorinsutando", image: "./icons/gas_station.png", levelId: 5, challengeId: 21 },
            { EN: "CLINIC", JP: "クリニック", romanji: "Kurinikku", image: "./icons/clinic.png", levelId: 5, challengeId: 21 },
            { EN: "MOON", JP: "つき", romanji: "Tsuki", image: "./icons/moon.png", levelId: 5, challengeId: 22 },
            { EN: "SUN", JP: "たいよう", romanji: "Taiyō", image: "./icons/sun.png", levelId: 5, challengeId: 22 },
            { EN: "OVEN", JP: "オーブン", romanji: "Ōbun", image: "./icons/oven.png", levelId: 5, challengeId: 23 },
            { EN: "STORE", JP: "シュトレ", romanji: "Shutore", image: "./icons/store.png", levelId: 5, challengeId: 23 },
            { EN: "SODA", JP: "ソーダ", romanji: "Sōda", image: "./icons/soda.png", levelId: 5, challengeId: 24 },
            { EN: "SLEEP", JP: "ねむり", romanji: "Nemuri", image: "./icons/sleep.png", levelId: 5, challengeId: 24 },
            { EN: "TICKET", JP: "ちけっと", romanji: "Chiketto", image: "./icons/ticket.png", levelId: 5, challengeId: 25 },
            { EN: "TOILET PAPER", JP: "トイレットペーパー", romanji: "Toiretto pēpā", image: "./icons/toilet_paper.png", levelId: 5, challengeId: 25 },
        ];
        await Promise.all(wordLvl5.map(async data => {
            const word = new Word();
            Object.assign(word, data);
            word.userwords = [];
            await word.save();
            return word;
        }));

        console.log("---------------------");
        console.log("Words saved correctly");
        console.log("---------------------");
    } catch (error) {
        console.log(error);
    } finally {
        if (AppDataSource) {
            await AppDataSource.destroy();
        }
    }
}


// create words
const userwordSeedDatabase = async () => {
    try {
        await AppDataSource.initialize();

        const userwords = [
            // user 1 finished level 1 (10 words) and is playing challenge 2 from level 2 (missing one more word)
            //level 1
            { wordId: 1 },
            { wordId: 2 },
            { wordId: 3 },
            { wordId: 4 },
            { wordId: 5 },
            { wordId: 6 },
            { wordId: 7 },
            { wordId: 8 },
            { wordId: 9 },
            { wordId: 10 },
            //level 2
            { wordId: 11 },
            { wordId: 12 },
            { wordId: 13 },
        ];
        await Promise.all(userwords.map(async data => {
            const word = new UserWord();
            Object.assign(word, data);
            word.userId = 1;
            await word.save();
            return word;
        }));

        console.log("-------------------------");
        console.log("UserWords saved correctly");
        console.log("-------------------------");
    } catch (error) {
        console.log(error);
    } finally {
        if (AppDataSource) {
            await AppDataSource.destroy();
        }
    }
}


const startSeeders = async () => {
    await roleSeedDatabase()
    await userSeedDatabase()
    await levelSeedDatabase()
    await challengeSeedDatabase()
    await wordSeedDatabase()
    await userwordSeedDatabase()
}

startSeeders();