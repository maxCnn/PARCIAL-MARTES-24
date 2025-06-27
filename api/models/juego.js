    //api/models/juego.js
    import { DataTypes, Model } from "sequelize";
    import sequelize from "../db.js";

    class Juego extends Model { }

    Juego.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                field: "ID_JUEGO"
            },
            nombre: {
                type: DataTypes.TEXT,
                allowNull: false,
                field: "NOMBRE"
            },
            duracionMinutos: {
                type: DataTypes.INTEGER,
                allowNull: false,
                field: "DURACION_MINUTOS"
            },
            edadRecomendada: {
                type: DataTypes.INTEGER,
                allowNull: false,
                field: "EDAD_RECOMENDADA"
            },
            descripcion: {
                type: DataTypes.TEXT,
                field: "DESCRIPCION"
            },
            urlImagen: {
                type: DataTypes.TEXT,
                field: "URL_IMAGEN"
            }
        },
        {
            sequelize,
            modelName: "Juego",
            tableName: "JUEGOS",
            timestamps: false
        }
    );

    export default Juego;