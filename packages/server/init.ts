import { Sequelize, SequelizeOptions } from 'sequelize-typescript'
import { topicModel } from './models/Topic.model'
import { commentModel } from './models/Comment.model'
import { reactionModel } from './models/Reaction.model'
import { userModel } from './models/User.model'
import { themeModel } from './models/Theme.model'
const {
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
  POSTGRES_PORT,
  POSTGRES_HOST,
} = process.env
console.log(POSTGRES_HOST, 777)
const sequelizeOptions: SequelizeOptions = {
  host: POSTGRES_HOST,
  port: Number(POSTGRES_PORT),
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
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

export const Theme = sequelize.define(
  'theme',
  themeModel,
  createdUpdatedOptions
)

User.hasMany(Topic, { foreignKey: 'userId' })
Topic.belongsTo(User, { foreignKey: 'userId' })

User.hasMany(Comment, { foreignKey: 'userId' })
Comment.belongsTo(User, { foreignKey: 'userId' })

User.hasMany(Reaction, { foreignKey: 'userId' })
Reaction.belongsTo(User, { foreignKey: 'userId' })

User.hasMany(Theme, { foreignKey: 'userId' })
Theme.belongsTo(User, { foreignKey: 'userId' })

Topic.hasMany(Comment, { foreignKey: 'topicId' })
Comment.belongsTo(Topic, { foreignKey: 'topicId' })

Comment.hasMany(Comment, { foreignKey: 'commentId' })
Comment.belongsTo(Comment, { foreignKey: 'commentId' })

Comment.hasMany(Reaction, { foreignKey: 'commentId' })
Reaction.belongsTo(Comment, { foreignKey: 'commentId' })

export async function dbConnect() {
  try {
    await sequelize.authenticate()
    await sequelize.sync()
    console.log('Connection has been established successfully.')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}
