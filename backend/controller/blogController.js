const Joi = require('joi');
const fs = require('fs');
const Blog = require('../models/blog');
const {BACKEND_SERVER_PATH, CLOUD_NAME, API_KEY, API_SECRET} = require('../config/index');
const BlogDTO = require('../dto/blog');
const BlogDetailsDTO = require('../dto/blog-details');
const Comment = require('../models/comment');
const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
    cloud_name: CLOUD_NAME, 
    api_key: API_KEY, 
    api_secret: API_SECRET
});

const mongoIdPattern = /^[0-9a-fA-F]{24}$/;

const blogController = {
    async create(req, res, next){

        const createBlogSchema = Joi.object({
            title: Joi.string().required(),
            author: Joi.string().regex(mongoIdPattern).required(),
            content: Joi.string().required(),
            photo: Joi.string().required(),
        });

        const { error } = createBlogSchema.validate(req.body);
        if(error){
            return next(error);
        }
        const {title, author, content, photo} = req.body;

        // const buffer = Buffer.from(photo.replace(/^data:image\/(png|jpg|jpeg);base64,/, ''), 'base64');
        // const imagePath = `${Date.now()}-${author}.png`;

        // Save to cloudinary
        let response;

        try {
        response = await cloudinary.uploader.upload(photo);
        // fs.writeFileSync(`storage/${imagePath}`, buffer);
        } catch (error) {
        return next(error);
        }

        // save blog in db
        let newBlog;
        try {
        newBlog = new Blog({
            title,
            author,
            content,
            photoPath: response.url,
        });

        await newBlog.save();
        } catch (error) {
        return next(error);
        }

        const blogDto = new BlogDTO(newBlog);

        return res.status(201).json({ blog: blogDto });

    },
    async getAll(req, res, next){

        try {
            const blogs = await Blog.find({});

            const blogsDto = [];

            for (let i = 0; i < blogs.length; i++) {
                const dto = new BlogDTO(blogs[i]);
                blogsDto.push(dto);
            }

            return res.status(200).json({ blogs: blogsDto });
        } catch (error) {
            return next(error);
        }
        // try{
        //     const blogs = await Blog.find({});
        //     return res.status(200).json(blogs);
        // }catch(error){
        //     next(error);
        // }
    },
    async getById(req, res, next){
        // const { id } = req.params;
        // const blog = await Blog.findOne({_id: id}).populate('author');
        // const blogDTO = new BlogDetailsDTO(blog);
        // return res.status(200).json(blogDTO);

        const getByIdSchema = Joi.object({
        id: Joi.string().regex(mongoIdPattern).required(),
        });

        const { error } = getByIdSchema.validate(req.params);

        if (error) {
        return next(error);
        }

        let blog;

        const { id } = req.params;

        try {
        blog = await Blog.findOne({ _id: id }).populate("author");
        } catch (error) {
        return next(error);
        }

        const blogDto = new BlogDetailsDTO(blog);

        return res.status(200).json({ blog: blogDto });
    },

    async update(req, res, next){
        const updateBlogSchema = Joi.object({
            title: Joi.string().required(),
            author: Joi.string().regex(mongoIdPattern).required(),
            blogId: Joi.string().regex(mongoIdPattern).required(),
            content: Joi.string().required(),
            photo: Joi.string(),
        });
        const { error } = updateBlogSchema.validate(req.body);
        if(error){
            return next(error);
        }
        const { title, author, blogId, content, photo } = req.body;

        let blog;
        try {
            blog = await Blog.findOne({ _id: blogId });
        } catch (error) {
            return next(error);
        }

        if(photo){
            let previousPhoto = blog.photoPath;
            if(previousPhoto){
                previousPhoto = previousPhoto.replace(`${BACKEND_SERVER_PATH}/`, '');
                fs.unlinkSync(`storage/${previousPhoto}`);
            }
            // const buffer = Buffer.from(photo.replace(/^data:image\/(png|jpg|jpeg);base64, /, ''), 'base64');
            // const imagePath = `${Date.now()}-${author}.png`;

            let response;
            try {
                response = await cloudinary.uploader.upload(photo);
                // fs.writeFileSync(`storage/${imagePath}`, buffer);
            } catch (error) {
                return next(error);
            }
            blog.photoPath = `${BACKEND_SERVER_PATH}/storage/${imagePath}`;
            await blog.updateOne({
                _id: blogId,
                title,
                content,
                photoPath: response.url,
            });
        }
        else{
            await blog.updateOne({
                _id: blogId,
                title,
                content,
            });
        }
        return res.status(200).json({ message: 'Blog updated'});
    },
    async delete(req, res, next){
        const deleteBlogSchema = Joi.object({
            id: Joi.string().regex(mongoIdPattern).required(),
        });
        const { error } = deleteBlogSchema.validate(req.params);
        if(error){
            return next(error);
        }
        const { id } = req.params;
        try {
            await Blog.deleteOne({ _id: id });
            await Comment.deleteMany({ id });
        } catch (error) {
            return next(error);
        }
        return res.status(200).json({ message: 'Blog deleted'});
    },
}

module.exports = blogController;