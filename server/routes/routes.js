module.exports = function(app) {

    const podcasts = require('../controllers/podcastController');
    const favourites = require('../controllers/favouritesController')

    // Create a new playlist
    app.post('/podcasts', podcasts.create);

    // Retrieve all playlists
    app.get('/podcasts', podcasts.findAll);

    // Retrieve a single podcast by Id
    app.get('/podcasts/:podcastId', podcasts.findById);

    // Update a podcast with tracks using Id
    app.put('/podcasts/:podcastId', podcasts.update);

    // Delete a playlist with Id
    app.delete('/podcasts/:podcastId', podcasts.delete);

    //Add favourites
    app.post('/favourites', favourites.create)

    //Get all favourites
    app.get('/getAllFavourites', favourites.findAll)
}