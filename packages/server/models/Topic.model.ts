import { DataType, Model } from 'sequelize-typescript'
import { ModelAttributes } from 'sequelize/types'
import { ITopic } from 'modelsTypes'

export const topicModel: ModelAttributes<Model, ITopic> = {
  title: {
    type: DataType.STRING,
    allowNull: false,
  },
  description: {
    type: DataType.STRING,
    allowNull: true,
  },
  userId: {
    type: DataType.INTEGER,
    allowNull: true,
  },
}
