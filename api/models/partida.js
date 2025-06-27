// api/models/partida.js
import { DataTypes, Model } from "sequelize";
import sequelize from "../db.js";
import Juego from "./juego.js";

class Partida extends Model { }

Partida.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: "ID_PARTIDA"
        },
        idJuego: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: "ID_JUEGO",
            references: {
                model: Juego,
                key: "id"
            }
        },
        fecha: {
            type: DataTypes.TEXT,
            allowNull: false,
            field: "FECHA"
        },
        jugadores: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: "JUGADORES"
        },
        ganador: {
            type: DataTypes.TEXT,
            allowNull: false,
            field: "GANADOR"
        }
    },
    {
        sequelize,
        modelName: "Partida",
        tableName: "PARTIDAS",
        timestamps: false
    }
);

// Relación
Partida.belongsTo(Juego, {
    foreignKey: "idJuego",
    as: "juego"
});

export default Partida;