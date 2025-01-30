import { DataType, Model } from 'sequelize-typescript'
import { ModelAttributes } from 'sequelize/types'
import { IComment } from 'modelsTypes'

export const commentModel: ModelAttributes<Model, IComment> = {
  content: {
    type: DataType.TEXT,
    allowNull: false,
  },
  commentId: {
    type: DataType.INTEGER,
    allowNull: true,
  },
  topicId: {
    type: DataType.INTEGER,
    allowNull: false,
  },
  userId: {
    type: DataType.INTEGER,
    allowNull: false,
  },
}
