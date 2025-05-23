import { DataSource } from "typeorm";
import { Categoria } from "./model/Categoria";
import { Cliente } from "./model/Cliente";
import { Pedido } from "./model/Pedido";
import { Produto } from "./model/Produto";
import { Usuario } from "./model/Usuario";

export const AppDataSource = new DataSource({
    type: "postgres",    
    host: "localhost",
    port: 5433,
    username: "postgres",
    password: "123456",
    database: "crud_api",
    synchronize: true,
    logging: true,
    // dropSchema: true, //adicionar se quiser limpar o banco
    entities: [Produto, Categoria, Cliente, Pedido, Usuario],
    subscribers: [],
    migrations: [],
})
