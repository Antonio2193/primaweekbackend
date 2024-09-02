import { model, Schema } from "mongoose";

const postSchema = new Schema ({
    category: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    cover: {
        type: String,
    },
    readTime: {
        value : {
            type: Number
        },
        unit : {
            type: String
        }
    },
    content : {
        type: String,
        required: true
    },
    author : {
        type: String,
        ref: 'Author'
    }
},
{collection: 'posts'})

export default model('Post', postSchema)