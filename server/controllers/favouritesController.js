const {favouriteModel} = require('../databaseConfig/database')

// add a favourite
module.exports.create = (req, res) => {  

    favouriteModel.create({  
        isFavourite : true,
        trackId :req.body.trackId,
        trackName: req.body.trackName,
        artistName:req.body.artistName,
        albumName: req.body.albumName,
        albumReleaseDate: req.body.albumReleaseDate,
        duration: req.body.duration,
        userName: req.body.userName
    })
 
  .then(() => {  
    res.send(200).send('OK')
  })

  .catch((err) => {
    res.statusMessage = err.name
    res.status(400).end()
  })
};

// FETCH all favourites
module.exports.findAll = (req, res) => {
  
    favouriteModel.findAll({
      where:{
          isFavourite: true,
          userName: req.params.userName
      }
  })
   .then((data)=>{
    if(!data){
        res.status(400).send('notok')
    }else{
        res.json(data)
    }  
    
  })
  .catch(err=>{
    res.statusMessage = err.name
      res.status(400).end()
  })
};
  
// Remove a fav track by Id
module.exports.delete = (req, res) => {
  const id = req.params.trackId;
  console.log(id)
  favouriteModel.destroy({
    where: { 
      trackId: id 
    }
  })
  .then(() => {
    res.status(200).send('ok');
  })
  .catch(err => {
    console.log(err)
  })
};