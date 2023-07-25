import CommentRepository from '../repository/comment-repository.js'
import TweetRepository from '../repository/tweet-repository.js'

class CommentService {
    constructor() {
        this.commentRepository =new CommentRepository();
        this.tweetRepository =  new TweetRepository();
    }

    async create(modelId,modelType,userId, content) { 
        let commentable;
        if(modelType === 'Tweet') {
            commentable = await this.tweetRepository.getTweet(modelId)
        }
        else if(modelType === 'Comment') {
            //Todo
            commentable = await this.commentRepository.get(modelId);
        }
        else{
            console.log("wrong modeltype")
        }
        const comment = await this.commentRepository.findByUserAndCommentable({
                content: content,
                userId: userId,
                onModel: modelType,
                commentable: modelId,
                comments: []
        })
        console.log("alreadypresent",comment)
        let isAdded;
        if(comment)
        {
            commentable.comment.pull(comment.id);
            await commentable.save();
            this.commentRepository.destroy(comment.id)
            isAdded =false;
        }
        else{
            const newComment = await this.commentRepository.create({
                content: content,
                userId: userId,
                onModel: modelType,
                commentable: modelId,
                comments: []
            })
            commentable.comment.push(newComment);
            await commentable.save();
            isAdded =true;
        }
        console.log(isAdded)
        return isAdded;

    }
    
}


export default CommentService;