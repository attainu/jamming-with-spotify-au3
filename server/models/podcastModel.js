module.exports = (sequelize,Sequelize) =>{
    const podcast = sequelize.define("podcasts",{
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement : true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
       },
      description: {
        type: Sequelize.TEXT
      }
    })
    return podcast
};