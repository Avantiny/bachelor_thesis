import * as Sequelize from 'sequelize'

export default (sequelize: Sequelize.Sequelize, DataTypes: any) => {
  const VideosTagsModel = sequelize.define('videostags', {
    ID: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    VideoID: {
      type: Sequelize.INTEGER,
      defaultValue: null,
    },
    TagId: {
      type: Sequelize.INTEGER,
      defaultValue: null,
    },
    UserId: {
      type: Sequelize.INTEGER,
      defaultValue: null,
    },
    StartTime: {
      type: Sequelize.INTEGER,
      defaultValue: null,
    },
    StopTime: {
      type: Sequelize.INTEGER,
      defaultValue: null,
    },
  })

  // @ts-ignore
  VideosTagsModel.associate = models => {
    models.VideosTags.belongsTo(models.Tags, {
      foreignKey: 'tagID',
      sourceKey: 'TagID',
      constraints: false,
    })

    models.VideosTags.belongsTo(models.Videos, {
      foreignKey: 'VideoID',
      sourceKey: 'VideoID',
      constraints: false,
    })
  }

  return VideosTagsModel
}
