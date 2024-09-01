import Post from "../models/postSchema.js";

export const getPosts = async (req, res) => {
    const page = req.query.page || 1
    let perPage = req.query.perPage || 8
    perPage = perPage > 10 ? 8 : perPage
    try {
        const posts = await Post.find(req.query.title ? {title: {$regex: req.query.title, $options: "i"}}:{})
        .collation({locale: 'it'}) //serve per ignorare maiuscole e minuscole nell'ordine alfabetico del sort
        .sort({ title:1, category:1})
        .skip((page-1)*perPage)
        .limit(perPage)
        const totalResults = await Post.countDocuments()// mi da il numero totale di documenti
        const totalPages = Math.ceil(totalResults / perPage ) 
        res.send({
            dati: posts,
            page,
            totalPages,
            totalResults,
        })
    } catch (error) {
        res.status(404).send({ message: "Posts not found" });
    } 
}

export const createPost = async (req, res) => {
    const post = new Post(req.body);
    post.cover = post.cover ? post.cover : "https://picsum.photos/200/300";
    try {
        const newPost = await post.save();
        res.status(200).send(newPost);
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
}

export const getSinglePost = async (req, res) => {
    const { id } = req.params;
    try {
        const post = await Post.findById(id);
        res.status(200).send(post);
    } catch (error) {
        res.status(404).send({ message: "Post not found" });
    }   
}


export const editPost = async (req, res) => {
    const { id } = req.params;
    try {
        const post = await Post.findByIdAndUpdate(id, req.body , {new: true});
        post.cover = post.cover ? post.cover : "https://picsum.photos/200/300";
        await post.save();
        res.status(200).send(post);
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
}

export const deletePost = async (req, res) => {
    const { id } = req.params;
    try{
        if (await Post.exists({_id: id})){
            await Post.findByIdAndDelete(id);
            res.status(200).send({message: `Post ${id} has been deleted`});
        }else{
            res.status(400).send({ message: `Post ${id} not found` });
        }
    } catch (error) {
        res.status(400).send({ message: `Post ${id} not found` });
    }
}

export const patchPost = async (req, res) => {
    const { blogPostId } = req.params;
    try {
        const post = await Post.findByIdAndUpdate(blogPostId, {cover: req.file.path}, {new: true});
        await post.save();
        res.status(200).send(post);
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
}