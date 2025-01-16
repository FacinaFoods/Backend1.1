import { Model } from "sequelize";
import db from '.';
import sequelize from "sequelize";

class Users extends Model {
    declare id: number;
    declare name: string;
    declare level: string | null;
    declare email: string;
    declare password: string;
}

Users.init({
    id: {
        type: sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    name: {
        type: sequelize.STRING(60),
        allowNull: false,
    },
    level: {
        type: sequelize.STRING(60),
        allowNull: true,
    },
    email: {
        type: sequelize.STRING(100),
        allowNull: false,
        unique: true,
    },
    password: {
        type: sequelize.STRING,
        allowNull: false,
    },
}, {
    sequelize: db,
    tableName: 'users',
    timestamps: false,
});

export default Users;
