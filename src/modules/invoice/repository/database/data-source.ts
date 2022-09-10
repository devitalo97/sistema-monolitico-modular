import "reflect-metadata"
import { DataSource } from "typeorm"
import { InvoiceModel } from "../invoice.model"
import { config } from "../../../../config"

export const AppDataSource = new DataSource({
    type: "mongodb",
    url: config.MONGO_DATABASE_URL,
    database: config.MONGO_DATABASE_NAME,
    synchronize: true,
    logging: false,
    entities: [InvoiceModel],
    migrations: [],
    subscribers: [],
    useUnifiedTopology: true,
})
