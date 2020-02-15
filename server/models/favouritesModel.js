module.exports = (sequelize,Sequelize) =>{
    const favourite = sequelize.define("favourites",{
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement : true
      },
      isFavourite : {
        type: Sequelize.BOOLEAN,
        allowNull : false,
        defaultValue: false
      },
      trackId : {
        type: Sequelize.STRING
      },
      trackName: {
        type: Sequelize.STRING
       },
      artistName: {
        type: Sequelize.STRING
      },
      albumName: {
        type: Sequelize.STRING
      },
      albumReleaseDate: {
        type: Sequelize.STRING
      },
      duration: {
        type: Sequelize.STRING
      }
    })
    return favourite
};