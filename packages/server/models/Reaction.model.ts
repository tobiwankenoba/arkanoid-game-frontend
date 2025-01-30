import { DataType, Model } from 'sequelize-typescript'
import { ModelAttributes } from 'sequelize/types'
import { IReaction } from 'modelsTypes'

export const reactionModel: ModelAttributes<Model, IReaction> = {
  title: {
    type: DataType.STRING,
    allowNull: false,
  },
  imageSrc: {
    type: DataType.STRING,
    allowNull: true,
  },
  commentId: {
    type: DataType.INTEGER,
    allowNull: true,
  },
  userId: {
    type: DataType.INTEGER,
    allowNull: true,
  },
}
