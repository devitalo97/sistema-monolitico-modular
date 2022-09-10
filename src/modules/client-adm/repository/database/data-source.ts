import "reflect-metadata"
import { DataSource } from "typeorm"
import { ClientModel } from "../client.model"

export const AppDataSource = new DataSource({
    type: "mongodb",
    url: "mongodb+srv://beinus_mono:QbY5CVcOuMOWcimq@beinus-cluster.132sj.mongodb.net/?retryWrites=true&w=majority",
    database: "sistema-monolitico",
    synchronize: true,
    logging: false,
    entities: [ClientModel],
    migrations: [],
    subscribers: [],
    useUnifiedTopology: true,
})
