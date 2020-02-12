const podcasts = require('../databaseConfig/database')

// Post a podcast
module.exports.create = (req, res) => {  
    console.log(req.body)

    podcasts.create({  
     name: req.body.name,
     description: req.body.description
    })
 
  .then(data => {  
      console.log('podcast', data)  
    res.send(200).send('OK')
  })

  .catch((err) => {
    console.log(err.name)
    res.statusMessage = err.name
    res.status(400).end()
  })
};

// FETCH all podcasts
module.exports.findAll = (req, res) => {
  
  podcasts.findAll()
   .then((data)=>{
     console.log('all podcasts', data)
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

// // Find a Customer by Id
// exports.findById = (req, res) => {  
//   Customer.findById(req.params.customerId).then(customer => {
//     res.send(customer);
//   })
// };

// // Update a Customer
// exports.update = (req, res) => {
//     const id = req.params.customerId;
//     Customer.update( { firstname: req.body.firstname, lastname: req.body.lastname, age: req.body.age }, 
//              { where: {id: req.params.customerId} }
//              ).then(() => {
//              res.status(200).send("updated successfully a customer with id = " + id);
//              });
//   };
  
//   // Delete a Customer by Id
//   exports.delete = (req, res) => {
//     const id = req.params.customerId;
//     Customer.destroy({
//       where: { id: id }
//     }).then(() => {
//       res.status(200).send('deleted successfully a customer with id = ' + id);
//     });
//   };