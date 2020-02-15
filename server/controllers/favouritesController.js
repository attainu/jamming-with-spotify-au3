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
        duration: req.body.duration
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
          isFavourite: true
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

// // Find a podcast by Id
// module.exports.findById = (req, res) => {  
//  podcasts.findAll({
//    where:{
//      id: req.params.podcastId
//    }
//  })
//   .then(podcast => {
//     res.send(podcast);
//   })
//   .catch(err=>{
//     res.statusMessage = err.name
//       res.status(400).end()
//   })
// };

// // Update a podcast with tracks

// module.exports.update = (req, res) => {
//     const id = req.params.podcastId;
//     const tracks = req.body
    
//     podcasts.update( { tracks: [req.body] }, 
//              { where: {id: req.params.podcastId} }
//              )
//              .then(() => {
//               // console.log('track',req.body)
//              res.status(200).send(req.body);
//              })
//              .catch(err=>{
//               res.statusMessage = err.name
//                 res.status(400).end()
//             })
//   };
  
//   // Delete a podcast by Id
//   module.exports.delete = (req, res) => {
//     const id = req.params.podcastId;
//     podcasts.destroy({
//       where: { id: id }
//     }).then(() => {
//       res.status(200).send('ok');
//     });
//   };