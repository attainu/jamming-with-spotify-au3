const Sequelize = require('sequelize');
const podcast = require('../models/podcastModel');

const data = {
  "user":"postgres",
  "password":"5690",
  "host":"localhost",
  "port":5432,
  "database":"jamming-spotify"
}

const sequelize = new Sequelize(data.database,data.user,data.password,{
  host:data.host,
  dialect:data.user,
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

//creating table
sequelize.sync()
.then(() => console.log('podcast model created'))
.catch((err) => console.log("error creating model", err))


const podcastModel = podcast(sequelize,Sequelize);


module.exports = podcastModel;