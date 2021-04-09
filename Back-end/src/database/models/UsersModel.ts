import * as Sequelize from 'sequelize'

export default (sequelize: Sequelize.Sequelize, DataTypes: any) => {
  const UsersModel = sequelize.define('users', {
    UserId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    UserName: {
      type: DataTypes.TEXT,
      defaultValue: null,
    },
    Password: {
      type: DataTypes.TEXT,
      defaultValue: null,
    },
    attempt: {
      type: DataTypes.TEXT,
      defaultValue: null,
    },
    staff: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    administrator: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  })

  return UsersModel
}
