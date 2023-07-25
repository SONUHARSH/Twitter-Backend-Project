import CommentService from "../services/comment-service.js";

const commentService = new CommentService();



export const createComment = async ( req,res ) => {

   try {
        const data = req.body;
        const response = await commentService.create(data.modelId,data.modelType,data.userId,data.content,data.commentable);
        console.log(response)
        return res.status(201).json({
            success:true,
            message:"Successfully create a new comment",
            data: response,
            err:{}
        });
   } catch (error) {
    return res.status(500).json({
        success:false,
        message:"Error Encountered in create a comment",
        data: {},
        err:error
    });
   }
}