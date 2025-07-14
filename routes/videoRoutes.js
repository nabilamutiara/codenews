const express = require('express');
const router = express.Router();
const videoController = require('../controllers/videoController');
const middleware = require('../middlewares/middleware');

// Add video
router.post('/api/videos/add', middleware.auth, videoController.addVideo);

// Get all videos
router.get('/api/videos', videoController.getVideos);

// Add this to your routes file (videoRoutes.js)
// Ubah route untuk lebih eksplisit
// In your route file (videoRoutes.js)
router.get('/api/videos/details/:slugvideo', videoController.getVideoDetails);

module.exports = router;