const { formidable } = require('formidable');
const cloudinary = require('cloudinary').v2;
const Video = require('../models/videoModel');

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.api_key,
    api_secret: process.env.api_secret,
    secure: true
});

class VideoController {
    async addVideo(req, res) {
        const form = formidable({});
        
        try {
            const [fields, files] = await form.parse(req);
            const { title, description } = fields;
            
            if (!files.video) {
                return res.status(400).json({ message: 'Video file is required' });
            }

            // Upload video to Cloudinary in the video_news folder
            const { url } = await cloudinary.uploader.upload(files.video[0].filepath, {
                resource_type: "video",
                folder: "news_video",
                chunk_size: 6000000 // 6MB chunks for large files
            });

            const video = await Video.create({
                title: title[0],
                description: description[0],
                videoUrl: url
            });

            return res.status(201).json({ 
                message: 'Video uploaded successfully',
                video
            });
            
        } catch (error) {
            console.error('Error uploading video:', error);
            return res.status(500).json({ message: 'Error uploading video' });
        }
    }

    async getVideos(req, res) {
        try {
            const videos = await Video.find().sort({ createdAt: -1 });
            return res.status(200).json({ videos });
        } catch (error) {
            console.error('Error fetching videos:', error);
            return res.status(500).json({ message: 'Error fetching videos' });
        }
    }

    async getVideoDetails(req, res) {
    try {
        const { slugvideo } = req.params; // Changed from id to slugvideo
        
        if (!slugvideo) {
            return res.status(400).json({ message: 'Slug parameter is required' });
        }

        // Cari video berdasarkan slugvideo
        const video = await Video.findOne({ slugvideo });
        
        if (!video) {
            return res.status(404).json({ message: 'Video not found' });
        }

        const relatedVideos = await Video.find({
            _id: { $ne: video._id }
        }).limit(3).sort({ createdAt: -1 });

        return res.status(200).json({ 
            video,
            relatedVideos
        });
    } catch (error) {
        console.error('Error fetching video details:', error);
        return res.status(500).json({ 
            message: 'Error fetching video details',
            error: error.message 
        });
    }
}
}

module.exports = new VideoController();