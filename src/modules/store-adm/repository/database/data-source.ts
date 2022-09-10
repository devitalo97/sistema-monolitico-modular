import "reflect-metadata"
import { DataSource } from "typeorm"
import { StoreModel } from "../store.model"
import { config } from "../../../../config"


console.log(config)
export const AppDataSource = new DataSource({
    type: "mongodb",
    url: config.MONGO_DATABASE_URL,
    database: config.MONGO_DATABASE_NAME,
    synchronize: true,
    logging: false,
    entities: [StoreModel],
    migrations: [],
    subscribers: [],
    useUnifiedTopology: true,
})
