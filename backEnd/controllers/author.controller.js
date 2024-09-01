import Author from "../models/authorSchema.js";

export const getAuthors = async (req, res) => {
    try {
        const authors = await Author.find();
        res.status(200).send(authors);
    } catch (error) {
        res.status(404).send({ message: "Authors not found" });
    } 
}

export const createAuthor = async (req, res) => {
    const author = new Author(req.body);
    author.avatar = author.avatar ? author.avatar : "https://picsum.photos/40";
    try {
        const newAuthor = await author.save();
        res.status(200).send(newAuthor);
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
}

export const getSingleAuthor = async (req, res) => {
    const { id } = req.params;
    try {
        const author = await Author.findById(id);
        res.status(200).send(author);
    } catch (error) {
        res.status(404).send({ message: "Author not found" });
    }   
}


export const editAuthor = async (req, res) => {
    const { id } = req.params;
    try {
        const author = await Author.findByIdAndUpdate(id, req.body , {new: true});
        author.avatar = author.avatar ? author.avatar : "https://picsum.photos/40";
        await author.save();
        res.status(200).send(author);
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
}

export const deleteAuthor = async (req, res) => {
    const { id } = req.params;
    try{
        if (await Author.exists({_id: id})){
            await Author.findByIdAndDelete(id);
            res.status(200).send({message: `Author ${id} has been deleted`});
        }else{
            res.status(400).send({ message: `Author ${id} not found` });
        }
    } catch (error) {
        res.status(400).send({ message: `Author ${id} not found` });
    }
}