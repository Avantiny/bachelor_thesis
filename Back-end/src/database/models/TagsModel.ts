import * as Sequelize from 'sequelize'

export default (sequelize: Sequelize.Sequelize, DataTypes: any) => {
  const TagsModel = sequelize.define('tags', {
    tagID: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Name: {
      type: Sequelize.TEXT,
      defaultValue: null,
    },
  })

  // @ts-ignore
  TagsModel.associate = models => {
    models.Tags.hasMany(models.VideosTags, {
      sourceKey: 'tagID',
      foreignKey: 'TagID',
      constraints: false,
    })
  }

  return TagsModel
}
