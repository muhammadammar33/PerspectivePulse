const Joi = require('joi');
const fs = require('fs');
const Blog = require('../models/blog');
const {BACKEND_SERVER_PATH} = require('../config/index');
const BlogDTO = require('../dto/blog');

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

        const buffer = Buffer.from(photo.replace(/^data:image\/(png|jpg|jpeg);base64,/, ''), 'base64');
        const imagePath = `${Date.now()}-${author}.png`;

        try {
            fs.writeFileSync(`storage/${imagePath}`, buffer);
        } catch (error) {
            return next(error);
        }

        let newBlog;
        try {
            newBlog = new Blog({title, author, content, photoPath: `${BACKEND_SERVER_PATH}/storage/${imagePath}`});
            await newBlog.save();
        } catch (error) {
            return next(error);
        }

        const blogDTO = new BlogDTO(newBlog);
        return res.status(201).json({newBlog});

    },
    async getAll(req, res, next){
        const blogs = await Blog.findAll();
        res.json(blogs);
    },
    async getById(req, res, next){
        const { id } = req.params;
        const blog = await Blog.findByPk(id);
        res.json(blog);
    },
    async update(req, res, next){
        const { id } = req.params;
        const { title, content } = req.body;
        const blog = await Blog.findByPk(id);
        blog.title = title;
        blog.content = content;
        await blog.save();
        res.json(blog);
    },
    async delete(req, res, next){
        const { id } = req.params;
        await Blog.destroy({ where: { id } });
        res.json({ message: 'Blog deleted' });
    },
}

module.exports = blogController;