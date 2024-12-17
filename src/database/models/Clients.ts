import { Model } from "sequelize";
import db from '.'
import sequelize from "sequelize";

class Clients extends Model {
    declare id: number
    declare name: string
    declare cpfCnpj: string
    declare phone: string
    declare email: string | null
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
      }
    }, {
        sequelize: db,
        tableName: 'clients',
        timestamps: false,
        underscored: true,
    }
)

export default Clients