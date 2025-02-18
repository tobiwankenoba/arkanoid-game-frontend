import { DataType, Model } from 'sequelize-typescript'
import { ModelAttributes } from 'sequelize/types'
import { ITheme } from 'modelsTypes'

export const themeModel: ModelAttributes<Model, ITheme> = {
  title: {
    type: DataType.ENUM('white', 'black'),
    allowNull: false,
    defaultValue: 'white',
  },
  userId: {
    type: DataType.INTEGER,
    allowNull: false,
    onDelete: 'CASCADE',
  },
}
