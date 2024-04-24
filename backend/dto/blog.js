const blog = require("../models/blog");

class BlogDTO{
    costructor(blog) {
        this.title = blog.title;
        this.content = blog.content;
        this.author = blog.author;
        this.photo = blog.photoPath;
    }
}

module.exports = BlogDTO;