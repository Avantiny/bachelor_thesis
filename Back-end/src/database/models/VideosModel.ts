import * as Sequelize from 'sequelize'

export default (sequelize: Sequelize.Sequelize, DataTypes: any) => {
  const VideosModel = sequelize.define('videos', {
    VideoID: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Name: {
      type: DataTypes.TEXT,
      defaultValue: null,
    },
    NameFromUser: {
      type: DataTypes.TEXT,
      defaultValue: null,
    },
    Author: {
      type: DataTypes.TEXT,
      defaultValue: null,
    },
    Year: {
      type: DataTypes.INTEGER,
      defaultValue: null,
    },
    Comment: {
      type: DataTypes.TEXT,
      defaultValue: null,
    },
    Completed: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    PathId: {
      type: DataTypes.TEXT,
      defaultValue: null,
    },
  })

  // @ts-ignore
  VideosModel.associate = models => {
    models.Videos.hasMany(models.VideosTags, {
      foreignKey: 'VideoID',
      sourceKey: 'VideoID',
      constraints: false,
    })
  }

  return VideosModel
}
