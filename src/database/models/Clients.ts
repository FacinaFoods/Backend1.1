import { Model } from "sequelize";
import db from '.'
import sequelize from "sequelize";
import Users from "./Users";

class Clients extends Model {
    declare id: number
    declare name: string
    declare cpfCnpj: string
    declare phone: string
    declare email: string | null
    declare userId: number
}

Clients.init({
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
      cpfCnpj: {
        type: sequelize.STRING(17),
        allowNull: false,
      },
      phone: {
        type: sequelize.STRING(14),
        allowNull: false,
      },
      email: {
        type: sequelize.STRING(30),
        allowNull: true,
      },
      userId: {
        type: sequelize.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false,
      }
    }, {
        sequelize: db,
        tableName: 'clients',
        timestamps: false,
        underscored: true,
    }
)

Clients.belongsTo(Users, { foreignKey: 'userId', as: 'user' });

export default Clients