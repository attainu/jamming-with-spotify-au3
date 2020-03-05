const {podcastModel , sequelize} = require('../databaseConfig/database')

// Post a podcast
module.exports.create = (req, res) => {  

    podcastModel.create({  
     podcastName: req.body.name,
     description: req.body.description,
     createdBy: req.body.createdBy
    })
 
  .then(() => {  
    res.send(200).send('OK')
  })

  .catch((err) => {
    res.statusMessage = err.name
    res.status(400).end()
  })
};

// FETCH all podcasts
module.exports.findAll = (req, res) => {
  
  podcastModel.findAll({
    where:{
      createdBy: req.params.userName
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

// Find a podcast by Id
module.exports.findById = (req, res) => {  
  podcastModel.findOne({
   attributes : [['tracks', 'songs']],
   where:{
     id: req.params.podcastId
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

// Update a podcast with tracks
module.exports.update = (req, res) => {
    podcastModel.update( 
      {'tracks': sequelize.fn('array_append', sequelize.col('tracks'), JSON.stringify(req.body))},
      { where: {id: req.params.podcastId} }
      )
      .then( ()=> {
      res.status(200).send('ok');
      })
      .catch(err=>{
        console.log(err)
      res.statusMessage = err.name
        res.status(400).end()
    })
  };
  
// Delete a track from podcast by Id
module.exports.deleteTrack = (req, res) => {
  podcastModel.findOne({
    attributes : ['tracks'],
    where: {
      id: req.params.podcastId
    }
  })
   .then((res) => {
    res = JSON.stringify(res.tracks)
    return res
   })
   .then(tracks => {
    tracks = JSON.parse(tracks)
    
    function trackIndex (tracks){
      let index = -1
     for(let i=0; i<tracks.length; i++){
      if(tracks[i].id == req.params.trackId){
         index = i
       }
      }
      return index
    }
    const indx = trackIndex(tracks)
     
    tracks.splice(indx,1)
    return tracks
   })
  .then(data => {
    data = JSON.stringify(data)
    
   podcastModel.update(
     {tracks : JSON.parse(data)},
     {where : {
       id : req.params.podcastId
     }
    })
   .then(() => {
      res.send('ok')
   })
   .catch(err => {
     res.send(err)
   })
  })
   .catch(err => {
    res.send(err)
  })
}

// Delete a podcast by Id
module.exports.delete = (req, res) => {
  const id = req.params.podcastId;
  podcastModel.destroy({
    where: { id: id }
  }).then(() => {
    res.status(200).send('ok');
  });
};

// Update a podcast by Id
module.exports.updatePodcast = (req,res) => {
  console.log(req.body)
  podcastModel.update(
   { podcastName : req.body.name,
    description : req.body.description,
   },
    {where: {
      id: req.params.podcastId
    }
  })
  .then(() => {
    res.status(200).send('ok')
  })
  .catch(err => {
    console.log(err)
    res.status(500).end()
  })
}