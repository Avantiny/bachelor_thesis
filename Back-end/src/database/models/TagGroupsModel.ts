import * as Sequelize from 'sequelize'

export default (sequelize: Sequelize.Sequelize, DataTypes: any) => {
  const TagGroupModel = sequelize.define('taggroups', {
    videoTagId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    GroupId: {
      type: DataTypes.INTEGER,
      defaultValue: null,
    },
    TagId: {
      type: DataTypes.INTEGER,
      defaultValue: null,
    },
  })

  return TagGroupModel
}
