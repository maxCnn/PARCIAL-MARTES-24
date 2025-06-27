// api/db.js
import { Sequelize } from "sequelize";


const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./data/dbJuegos.sqlite"
});

export default sequelize;
