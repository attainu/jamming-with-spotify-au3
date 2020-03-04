module.exports = function(app) {

    const podcasts = require('../controllers/podcastController');
    const favourites = require('../controllers/favouritesController')

    // Create a new podcast
    app.post('/podcasts', podcasts.create);

    // Retrieve all podcasts of a user
    app.get('/podcasts/:userName', podcasts.findAll);

    // Retrieve a single podcast by Id
    app.get('/podcast/:podcastId', podcasts.findById);

    // Update a podcast with tracks using Id
    app.put('/updatePodcast/:podcastId', podcasts.update);

    // Delete a track from podcast using Id
    app.delete('/podcast/:podcastId/:trackId', podcasts.deleteTrack)

    // Delete a podcast with Id
    app.delete('/podcasts/:podcastId', podcasts.delete);

    //Add favourites
    app.post('/favourites', favourites.create)

    //Get all favourites
    app.get('/getAllFavourites/:userName', favourites.findAll)
}