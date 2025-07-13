const {formidable} = require('formidable')
const cloudinary = require('cloudinary').v2
const newsModel = require('../models/newsModel')
const galleryModel = require('../models/galleryModel')
const {mongo: {ObjectId}} = require('mongoose')
const moment = require('moment')
const authModel = require('../models/authModel')


class newsControllers {
    add_news = async (req,res) => {
        const {id, name, category} = req.userInfo
        const form = formidable({})
        cloudinary.config({
            cloud_name: process.env.cloud_name,
            api_key: process.env.api_key,
            api_secret: process.env.api_secret,
            secure: true
        })

        try {
            const [fields, files] = await form.parse(req)
            const {url} = await cloudinary.uploader.upload(files.image[0].filepath, {folder: 'news_images'})
            const {title, description} = fields
            const news = await  newsModel.create({
                writerId: id, 
                writerName: name,
                title : title[0].trim(),
                slug : title[0].trim().split(' ').join('-'),
                category,
                description: description[0],
                date: moment().format('LL'),
                image: url 
            })
            return res.status(201).json({message: 'News Added Successfully', news})
        } catch (error) {
            console.error("Error adding news:", error)
            return res.status(500).json({message: 'Internal Server Error'})
        }


    }
    //End Method
    get_images = async (req, res) => {
        const {id} = req.userInfo
        try {
            const images = await galleryModel.find({ writerId: new ObjectId (id)}).sort({createdAt: -1})
            return res.status(201).json({images})
        } catch (error) {
            return res.status(500).json({message: 'Internal Server Error'})
        }
    }
    //End Method
    add_images = async (req,res) => {
        const {id} = req.userInfo
        const form = formidable({})
        cloudinary.config({
            cloud_name: process.env.cloud_name,
            api_key: process.env.api_key,
            api_secret: process.env.api_secret,
            secure: true
        })
        try {
            const [_, files] = await form.parse(req)
            let allImages = []
            const {images} = files

            for (let index = 0; index < images.length; index++) {
                const {url} = await cloudinary.uploader.upload(images[index].filepath, {folder: 'news_images'})
                allImages.push({ writerId: id, url})
                
            }
            const image = await galleryModel.insertMany(allImages)
            return res.status(201).json({ images: image, message: "Images Upload Successfully"})
        } catch (error) {
            return res.status(500).json({message: 'Internal Server Error'})
        }
    }

    //End Method
    get_dashboard_news = async (req, res) => {
        const {id, role} = req.userInfo
        try {
            if (role==='admin') {
                const news = await newsModel.find({}).sort({createdAt: -1})
                return res.status(200).json({news})
            } else {
                const news = await newsModel.find({writerId: new ObjectId(id)}).sort({createdAt : -1})
                return res.status(200).json({news})
            }
        } catch (error) {
            return res.status(500).json({message: 'Internal server Error'})
        }
    }
    //End Method
    get_edit_dashboard_news = async(req, res) => {
        const {news_id} = req.params
        try {
            const news = await newsModel.findById(news_id)
            return res.status(200).json({news})
        } catch (error) {
            return res.status(500).json({message: 'Internal Server '})
        }
    }
    //End Method

    update_news = async (req,res) => {
        const {news_id} = req.params
        const form = formidable({})
    
        cloudinary.config({
            cloud_name: process.env.cloud_name,
            api_key: process.env.api_key,
            api_secret: process.env.api_secret,
            secure: true
        })
    
        try {
            const [fields, files] = await new Promise((resolve, reject) => {
                form.parse(req, (err, fields, files) => {
                    if (err) reject(err)
                    else resolve([fields, files])
                });
            });
    
            const {title, description, old_image} = fields;
            let url = old_image[0];
    
            if (files.new_image && files.new_image.length > 0) {
                const spliteImage = url.split('/');
                const imagesFile = spliteImage[spliteImage.length-1].split('.')[0];
                await cloudinary.uploader.destroy(imagesFile);
    
                const data = await cloudinary.uploader.upload(files.new_image[0].filepath, {
                    folder: 'news_images'
                });
                url = data.url;
            }
    
            const news = await newsModel.findByIdAndUpdate(news_id, {
                title: title[0].trim(),
                slug: title[0].trim().split(' ').join('-'),
                description: description[0],
                image: url
            }, {new: true});
    
            return res.status(201).json({message: 'News Updated Successfully', news});
    
        } catch (error) {
            
            return res.status(500).json({message: 'Internal Server Error'});
        }
    }
    //End Method

    delete_news = async (req, res) => {
        const {news_id} = req.params
        cloudinary.config({
            cloud_name: process.env.cloud_name,
            api_key: process.env.api_key,
            api_secret: process.env.api_secret,
            secure: true
        })

        try {
            const news = await newsModel.findById(news_id);
            if (!news) {
                return res.status(404).json({message: 'News not found'});
            }
            const imageUrl = news.image
            const publicId = imageUrl.split('/').pop().split('.')[0];

            await cloudinary.uploader.destroy(`news_images/${publicId}`, (error,result)=>{
                if (error) {
                    console.log('error deleting image from cloudinary', error)
                    return res.status(500).json({message:'Failed to delete image from cloudinary'})
                }
                console.log('Image Deleted from Cloudinary', result)
            })

            await newsModel.findByIdAndDelete(news_id)
            return res.status(200).json({message: 'News deleted with Image successfully'})
        } catch (error) {
            return res.status(500).json({message: 'Internal server Error'})
        }
    }
    //End Method

    update_news_status = async (req, res) => {
        const {role} = req.userInfo
        const {news_id} = req.params
        const {status} = req.body

        if (role === 'admin') {
            const news = await newsModel.findByIdAndUpdate(news_id, {status}, {news:true})
            return res.status(200).json({message: 'News Status Update Success', news})
        } else {
            return res.status(401).json({message: 'You cannot access this api'})
        }
    }
    //End Method

    get_all_news = async (req,res) => {
        try {
            const category_news = await newsModel.aggregate([
                {
                    $sort: {createdAt: -1}

                },
                {
                    $match: {
                        status: 'active'
                    }
                },
                {
                    $group: {
                        _id: "$category", 
                        news: {
                            $push: {
                                _id: '$_id', 
                                title: '$title',
                                slug: '$slug',
                                writerName: '$writerName',
                                image: '$image',
                                description: '$description',
                                date: '$date',
                                title: '$title',
                                category: '$category',

                            }
                        }
                    }
                },
                {
                    $project: {
                        _id: 0,
                        category: '$_id',
                        news: {
                            $slice: ['$news', 5]
                        }
                    }
                }
            ])
            const news = {}
            for (let i=0; i < category_news.length; i++){
                news[category_news[i].category] = category_news[i].news
                console.log("Category news result:", category_news)

            }
            return res.status(200).json({news })
        } catch (error) {
            return res.status(500).json({message: 'Internal Server Error'})
        }
        
    }

    //End Method

    get_categories = async (req, res) => {
        try {
            const categories = await newsModel.aggregate([
                {
                    $group: {
                        _id : '$category',
                        count: {$sum: 1}
                    }
                },
                {
                    $project: {
                        _id: 0,
                        category: "$_id",
                        count: 1
                    }
                }
            ])
            return res.status(200).json({categories})
        } catch (error) {
            return res.status(500).json({message: 'Internal Server Error'})
        }
    }

     //End Method

    get_details_news = async (req, res) => {
        const {slug} = req.params;
        try {
            const news = await newsModel.findOneAndUpdate(
                {slug}, 
                {$inc: {count: 1}},
                {new: true} // Untuk mengembalikan dokumen yang sudah diupdate
            );

            if (!news) {
                return res.status(404).json({message: 'News not found'});
            }

            const relatedNews = await newsModel.find({
                $and: [
                    {slug: {$ne: slug}},
                    {category: {$eq: news.category}}
                ]
            })
            .limit(4)
            .sort({createdAt: -1}); // Diperbaiki dari createAt ke createdAt

            return res.status(200).json({
                news: news || {},
                relatedNews: relatedNews || []
            });
        } catch (error) {
            console.error("Error in get_details_news:", error);
            return res.status(500).json({message: 'Internal Server Error'});
        }
    }

    //End Method

    get_category_news = async (req, res) => {
        const {category} = req.params;
        
        try {
            const news = await newsModel.find({ 
                category: decodeURIComponent(category),
                status: 'active'
            }).sort({ createdAt: -1 });
            
            return res.status(200).json({ news });
        } catch (error) {
            console.error("Error in get_category_news:", error);
            return res.status(500).json({ 
                message: 'Internal Server Error',
                error: error.message 
            });
        }
    }
    //End Method   

    get_popular_news = async (req, res) => {
        try {
            const popularNews = await newsModel.find({status: 'active'}).sort({count: -1}).limit(8)
            return res.status(200).json({popularNews})
        } catch (error) {
            return res.status(500).json({message: 'Internal Server Error'});
        }
    }
    //End Method 

    get_latest_news = async (req,res) => {
        try {
            const news = await newsModel.find({status: 'active'}).sort({createdAt: -1}).limit(5)
            return res.status(200).json({news})
        } catch (error) {
            return res.status(500).json({message: 'Internal Server Error'});
        }
    }
    //End Method 

    get_recent_news = async (req,res) => {
        try {
            const news = await newsModel.find({status: 'active'}).sort({createdAt: -1}).skip(10).limit(5)
            return res.status(200).json({news})
        } catch (error) {
            return res.status(500).json({message: 'Internal Server Error'});
        }
    }
    //End Method 

    get_images_news = async (req, res) => {
        try {
            const images = await newsModel.aggregate([
                {
                    $match: {
                        status: 'active'
                    }

                }, {
                    $sample: {
                        size: 9
                    }
                },{
                    $project: {
                        image: 1
                    }
                }
            ])
            return res.status(200).json({images})
        } catch (error) {
            return res.status(500).json({message: 'Internal Server Error'})
        }
    }
    //End Method 

    news_search = async (req, res) => {
        const {value} = req.query;
        try {
            if (!value) {
                return res.status(400).json({message: 'Search value is required'})
            }
            const news = await newsModel.find({
                status: 'active',
                title: {$regex: value, $options: 'i'}
            })
            return res.status(200).json({news})
        } catch (error) {
            return res.status(500).json({message: 'Internal Server Error'})
        }

    }
    //End Method 
    news_statistics = async (req, res) => {
        try {
            const totalNews = await newsModel.countDocuments()
            const pendingNews = await newsModel.countDocuments({ status: 'pending' })
            const activeNews = await newsModel.countDocuments({ status: 'active' })
            const deactiveNews = await newsModel.countDocuments({ status: 'deactive' })
            const totalWriters = await authModel.countDocuments({ role: 'writer' })

            return res.status(200).json({
                totalNews,
                pendingNews,
                activeNews,
                deactiveNews,
                totalWriters
            });

                } catch (error) {
                    return res.status(500).json({message: 'Internal server Error'})
                }

            }

            //End Method
       // Di newsControllers.js

        add_comment = async (req, res) => {
            try {
                const { newsId, name, comment } = req.body;

                if (!newsId || !name || !comment) {
                    return res.status(400).json({ error: "All fields are required" });
                }

                const newComment = { name, comment };

                const updatedNews = await newsModel.findByIdAndUpdate(
                    newsId,
                    { $push: { comments: newComment } },
                    { new: true }
                );

                if (!updatedNews) {
                    return res.status(404).json({ error: "News not found" });
                }

                const addedComment = updatedNews.comments?.[updatedNews.comments.length - 1] || newComment;
                res.status(201).json(addedComment);
            } catch (error) {
                console.error("Error adding comment:", error);
                res.status(500).json({ error: "Failed to add comment" });
            }
        };

        get_comments = async (req, res) => {
            try {
                const { newsId } = req.params;

                const mongoose = require('mongoose');
                if (!newsId || !mongoose.Types.ObjectId.isValid(newsId)) {
                    return res.status(400).json({ error: "Valid News ID is required" });
                }

                const news = await newsModel.findById(newsId);
                if (!news) {
                    return res.status(404).json({ error: "News not found" });
                }

                const sortedComments = news.comments.sort((a, b) => b.createdAt - a.createdAt);
                res.status(200).json(sortedComments);
            } catch (error) {
                console.error("Error fetching comments:", error);
                res.status(500).json({ error: "Failed to fetch comments" });
            }
        };

        
    }



module.exports = new newsControllers()