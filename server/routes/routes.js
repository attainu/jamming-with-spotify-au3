module.exports = function(app) {

    const podcasts = require('../controllers/podcastController');

    // Create a new playlist
    app.post('/podcasts', podcasts.create);

    // Retrieve all playlists
    app.get('/podcasts', podcasts.findAll);

    // // Retrieve a single playlist by Id
    // // app.get('/playlists/:playlistId', playlists.findById);

    // // Update a playlist with Id
    // app.put('/playlists/:playlistId', playlists.update);

    // // Delete a playlist with Id
    // app.delete('/playlists/:playlistId', playlists.delete);
}