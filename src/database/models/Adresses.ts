import { Model } from "sequelize";
import db from '.';
import sequelize from "sequelize";
import Clients from "./Clients";

class Adresses extends Model {
    declare id: number;
    declare city: string;
    declare uf: string | null;
    declare street: string;
    declare number: string;
    declare cep: string;
    declare clientId: number
}

Adresses.init({
    id: {
        type: sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    city: {
        type: sequelize.STRING(30),
        allowNull: false,
    },
    uf: {
        type: sequelize.STRING(20),
        allowNull: true, 
    },
    street: {
        type: sequelize.STRING(45),
        allowNull: false,
    },
    number: {
        type: sequelize.STRING(20),
        allowNull: false,
    },
    cep: {
        type: sequelize.STRING(12),
        allowNull: false,
    },
    clientId: {
      type: sequelize.INTEGER,
      references: {
        model: 'clients',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      allowNull: false,
    }
}, {
    sequelize: db,
    tableName: 'adresses',
    timestamps: false,
    underscored: true,
});

Adresses.belongsTo(Clients, { foreignKey: 'clientId', as: 'client' });

export default Adresses;
