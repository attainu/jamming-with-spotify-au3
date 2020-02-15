const {podcastModel} = require('../databaseConfig/database')

// Post a podcast
module.exports.create = (req, res) => {  

    podcastModel.create({  
     podcastName: req.body.name,
     description: req.body.description,
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

// FETCH all podcasts
module.exports.findAll = (req, res) => {
  
  podcastModel.findAll()
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
  podcastModel.findAll({
   where:{
     id: req.params.podcastId
   }
 })
  .then(podcast => {
    res.send(podcast);
  })
  .catch(err=>{
    res.statusMessage = err.name
      res.status(400).end()
  })
};

// Update a podcast with tracks

module.exports.update = (req, res) => {
    const id = req.params.podcastId;
    const tracks = req.body
    
    podcastModel.update( { tracks: [req.body] }, 
             { where: {id: req.params.podcastId} }
             )
             .then(() => {
              // console.log('track',req.body)
             res.status(200).send(req.body);
             })
             .catch(err=>{
              res.statusMessage = err.name
                res.status(400).end()
            })
  };
  
  // Delete a podcast by Id
  module.exports.delete = (req, res) => {
    const id = req.params.podcastId;
    podcastModel.destroy({
      where: { id: id }
    }).then(() => {
      res.status(200).send('ok');
    });
  };