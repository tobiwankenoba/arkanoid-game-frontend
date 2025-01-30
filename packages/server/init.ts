import { Sequelize, SequelizeOptions } from 'sequelize-typescript'
import { topicModel } from './models/Topic.model'
import { commentModel } from './models/Comment.model'
import { reactionModel } from './models/Reaction.model'
import { userModel } from './models/User.model'

const sequelizeOptions: SequelizeOptions = {
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '111',
  database: 'arcanoid',
  dialect: 'postgres',
}

export const sequelize = new Sequelize(sequelizeOptions)

const createdUpdatedOptions = { createdAt: false, updatedAt: false }

export const User = sequelize.define('user', userModel, createdUpdatedOptions)
export const Topic = sequelize.define(
  'topic',
  topicModel,
  createdUpdatedOptions
)
export const Comment = sequelize.define(
  'comment',
  commentModel,
  createdUpdatedOptions
)
export const Reaction = sequelize.define(
  'reaction',
  reactionModel,
  createdUpdatedOptions
)

User.hasMany(Topic, { foreignKey: 'userId' })
Topic.belongsTo(User, { foreignKey: 'userId' })

User.hasMany(Comment, { foreignKey: 'userId' })
Comment.belongsTo(User, { foreignKey: 'userId' })

User.hasMany(Reaction, { foreignKey: 'userId' })
Reaction.belongsTo(User, { foreignKey: 'userId' })

Topic.hasMany(Comment, { foreignKey: 'topicId' })
Comment.belongsTo(Topic, { foreignKey: 'topicId' })

Comment.hasMany(Comment, { foreignKey: 'commentId' })
Comment.belongsTo(Comment, { foreignKey: 'commentId' })

Comment.hasMany(Reaction, { foreignKey: 'commentId' })
Reaction.belongsTo(Comment, { foreignKey: 'commentId' })

export async function dbConnect() {
  try {
    await sequelize.authenticate() // Проверка аутентификации в БД
    await sequelize.sync() // Синхронизация базы данных
    console.log('Connection has been established successfully.')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}
