import { DataType, Model } from 'sequelize-typescript'
import { ModelAttributes } from 'sequelize/types'
import { IUser } from 'modelsTypes'

export const userModel: ModelAttributes<Model, IUser> = {
  externalId: {
    type: DataType.INTEGER,
    allowNull: false,
  },
  login: {
    type: DataType.STRING,
    allowNull: false,
  },
  display_name: {
    type: DataType.STRING,
    allowNull: false,
  },
  avatar: {
    type: DataType.STRING,
    allowNull: true,
  },
}
