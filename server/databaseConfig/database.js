const Sequelize = require('sequelize');
const podcast = require('../models/podcastModel');
const favourite = require('../models/favouritesModel')

const data = {
  user: "sjbnyypj",
  password: "VjCUHiM21kQ9qfegJb-GybSQ2RiHmpDL",
  host: "drona.db.elephantsql.com",
  port: 5432,
  database: "sjbnyypj"
};
const sequelize = new Sequelize(data.database, data.user, data.password, {
  host: data.host,
  dialect: "postgres",
  logging: false,
  dialectOptions: {
    ssl: true
  }
});

//checking connection
sequelize
  .authenticate()
  .then(() => {
    console.log('db connection successful');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
});

// creating table
sequelize.sync()
.then(() => console.log(' model created'))
.catch((err) => console.log("error creating model", err));


const podcastModel = podcast(sequelize,Sequelize);
const favouriteModel = favourite(sequelize, Sequelize)

module.exports = {podcastModel, favouriteModel, sequelize};