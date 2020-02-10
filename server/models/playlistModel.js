module.exports = (sequelize,Sequelize) =>{
    const playlist = sequelize.define("playlists",{
      name: {
        type: Sequelize.STRING,
        allowNull: false,
       },
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement : true
      },
      description: {
        type: Sequelize.TEXT
      },
      createdBy: {
        type: Sequelize.STRING
      }
  
    })
    return playlist
};