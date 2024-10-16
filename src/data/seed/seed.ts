import { envs } from "../../config"
import { MongoDatabase } from "../mongo/mongo-conection"


(async() => {
    await MongoDatabase.connect({
        dbName: envs.MONGO_DB_NAME,
        mongoUrl: envs.MONGO_URL
    })

    await main()

    await MongoDatabase.disconnect()


})()


async function main() {
    
    // 1. Create user

    // 2. Create Categories

    // 3. Create products

}