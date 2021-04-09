import * as Sequelize from 'sequelize'

export default (sequelize: Sequelize.Sequelize, DataTypes: any) => {
  const GroupsModel = sequelize.define('groups', {
    ID: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Name: {
      type: Sequelize.INTEGER,
      defaultValue: null,
    },
  })

  return GroupsModel
}
