class CommentDTO{
    constructor(comment){
        this._id = comment._id;
        this.createdAt = comment.createdAt;
        this.content = comment.content;
        this.author = comment.author.name;
    }
}

module.exports = CommentDTO;