const authModel = require('../models/authModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {formidable} = require('formidable')
const cloudinary = require('cloudinary').v2
class authController {
    login = async(req,res) => {
        const {email, password} = req.body
        if (!email) {
            return res.status(404).json({message: 'Please provide your email'})

        }
        if (!password) {
            return res.status(404).json({message: 'Please provide your password'})
            
        }
        try {
            const user = await authModel.findOne({email}).select('+password')
            //console.log(user)
            if (user) {
                const match = await bcrypt.compare(password, user.password)
                if (match) {
                    const obj = {
                        id: user.id,
                        name: user.name,
                        category: user.category,
                        role: user.role
                    }
                    const token = await jwt.sign(obj,process.env.secret,{
                        expiresIn: process.env.exp_time
                    })
                    return res.status(200).json({message: 'Login Success', token})
                } else {
                    return res.status(404).json({message: 'Invalid Password'})
                }
            }else {
                return res.status(404).json({message: "User not Found"})
            }

        } catch (error) {
            console.log(error)
        }
    }
    //End Method

    add_writer = async(req, res) => {
        ///console.log(req.body)
        const {name, email, password, category} = req.body
        if (!name) {
            return res.status(404).json({message: 'Please provide name'})

        }
        if (!email) {
            return res.status(404).json({message: 'Please provide email'})
            
        }
        if (!password) {
            return res.status(404).json({message: 'Please provide password'})
            
        }
        if (!category) {
            return res.status(404).json({message: 'Please provide category'})
            
        }
        try {
            const writer = await authModel.findOne({email : email.trim()})
            if (writer) {
                return res.status(404).json({message: 'Writer already exist'})
            }else {
                const new_writer = await authModel.create({
                    name: name.trim(),
                    email: email.trim(),
                    password: await bcrypt.hash(password.trim(), 10),
                    category: category.trim(),
                    role: 'writer'
                })
                return res.status(201).json({message: 'Writer Added Successfully', writer: new_writer})
            }
        } catch (error) {
            return res.status(500).json({message: 'Internal Server Error'})
        }
    }
    //End Method

    get_writers = async (req, res) => {
        try {
            const writers = await authModel.find({role : "writer"}).sort({createdAt: -1})
            return res.status(200).json({writers})
        } catch (error) {
            return res.status(500).json({message: 'Internal Server Error'})
        }
    }
    //End Method

    getWriterById = async (req,res) => {
        const {id} = req.params;
        try {
            const writer = await authModel.findById(id);
            if (!writer) {
                return res.status(404).json({message: 'Writer not found'});
            }
            return res.status(200).json({writer});
        } catch (error) {
            return res.status(500).json({message: 'Internal Server Error'})
        }
    }
    //End Method

    update_writer  = async (req,res) => {
        const {name, email, category, role} = req.body;
        const writerId = req.params.id

        if (!name || !email || !category) {
            return res.status(400).json({message: 'Please provide all field data'})
        }

        try {
            const writer = await authModel.findById(writerId)
            if (!writer) {
                return res.status(400).json({message:'Write not found'})
            }
            writer.name = name.trim();
            writer.email = email.trim();
            writer.category = category.trim();
            writer.role = role.trim();

            await writer.save();
            return res.status(200).json({meesage: 'Writer updated succesfully', writer})

        } catch (error) {
            return res.status(500).json({message: 'Internal Server Error'})
        }
        
    }
    //End Method

    delete_writer = async(req, res) => {
        const {id} = req.params;
        try {
            const writer = await authModel.findByIdAndDelete(id);
            if (!writer) {
                return res.status(400).json({message:'Write not found'})
            }
            return res.status(200).json({message: 'Writer deleted successfully'})
        } catch (error) {
            return res.status(500).json({message: 'Internal Server Error'})
        }
    }
    //End Method

    update_profile = async (req, res) => {
    // Configure Cloudinary
    cloudinary.config({
        cloud_name: process.env.cloud_name,
        api_key: process.env.api_key,
        api_secret: process.env.api_secret,
        secure: true
    });

    const form = formidable({
        multiples: true,
        maxFileSize: 5 * 1024 * 1024, // 5MB limit
        keepExtensions: true,
        allowEmptyFiles: false
    });

    form.parse(req, async (err, fields, files) => {
        if (err) {
            console.error('Formidable parsing error:', err);
            return res.status(400).json({
                message: 'Error parsing form data',
                error: err.message
            });
        }

        try {
            // Validate required fields
            const name = Array.isArray(fields.name) ? fields.name[0] : fields.name;
            const email = Array.isArray(fields.email) ? fields.email[0] : fields.email;

            if (!name || !email) {
                return res.status(400).json({ 
                    message: 'Name and email are required fields' 
                });
            }

            // Trim and sanitize input
            const updateData = {
                name: name.toString().trim(),
                email: email.toString().trim(),
            };

            // Handle image upload if present
            const uploadedImage = Array.isArray(files.image) ? files.image[0] : files.image;

            if (uploadedImage && uploadedImage.size > 0 && uploadedImage.filepath) {
                try {
                    const uploadResult = await cloudinary.uploader.upload(uploadedImage.filepath, {
                        folder: 'user_profile_images',
                        resource_type: 'auto',
                        transformation: [
                            { width: 500, height: 500, crop: 'limit' },
                            { quality: 'auto' }
                        ]
                    });
                    updateData.image = uploadResult.secure_url;
                } catch (uploadError) {
                    console.error('Cloudinary upload error:', uploadError);
                    return res.status(500).json({
                        message: 'Failed to upload image to Cloudinary',
                        error: uploadError.message
                    });
                }
            }

            // Update user in database
            const updatedUser = await authModel.findByIdAndUpdate(
                req.params.id,
                updateData,
                { new: true, runValidators: true }
            );

            if (!updatedUser) {
                return res.status(404).json({ message: 'User not found' });
            }

            return res.status(200).json({
                message: 'Profile updated successfully',
                user: {
                    id: updatedUser._id,
                    name: updatedUser.name,
                    email: updatedUser.email,
                    image: updatedUser.image
                }
            });

        } catch (error) {
            console.error('Profile update error:', error);
            return res.status(500).json({
                message: 'Internal server error',
                error: error.message
            });
        }
    });
};
    //End Method

    get_profile = async (req, res) => {
        try {
            const userId = req.params.id;
            if (!userId) {
                return res.status(400).json({message: 'User Id is required'})
            }
            const user = await authModel.findById(userId)
            return res.status(200).json({user})
        } catch (error) {
            return res.status(500).json({message: 'Internal Server Error'})
        }
    }

    //End Method

    changePassword = async (req,res) => {

        try {
            const {oldPassword,newPassword } = req.body;
            const userId = req.userInfo.id;
            
            const user = await authModel.findById(userId).select('+password')
            
            const isMatch = await bcrypt.compare(oldPassword, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: 'Old Password is incorrect'});
            }

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(newPassword,salt)

            user.password = hashedPassword;
            await user.save();

            return res.status(200).json({message: 'Password Updated Successfully'})        

        } catch (error) {
            return res.status(500).json({ message: 'Internal Server Error' })
        }

    }
    //End Method
    

}
module.exports = new authController