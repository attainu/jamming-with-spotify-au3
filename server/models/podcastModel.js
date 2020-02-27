module.exports = (sequelize,Sequelize) =>{
    const podcast = sequelize.define("podcasts",{
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement : true
      },
      podcastName: {
        type: Sequelize.STRING,
        allowNull: false,
       },
      description: {
        type: Sequelize.TEXT
      },
      tracks: {
        type: Sequelize.ARRAY(Sequelize.JSON)
      },
      createdBy: {
        type: Sequelize.STRING
      }
    })
    return podcast
};