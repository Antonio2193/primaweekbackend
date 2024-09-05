import AuthorR from "../models/authorRegSchema.js";

export const getAuthors = async (req, res) => {
    const page = req.query.page || 1
    let perPage = req.query.perPage || 8
    perPage = perPage > 10 ? 8 : perPage
    try {
        const authors = await AuthorR.find(req.query.name ? {name: {$regex: req.query.name, $options: "i"}}:{})
        .collation({locale: 'it'}) //serve per ignorare maiuscole e minuscole nell'ordine alfabetico del sort
        .sort({ name:1, surname:1})
        .skip((page-1)*perPage)
        .limit(perPage);
        const totalResults = await AuthorR.countDocuments()// mi da il numero totale di documenti
        const totalPages = Math.ceil(totalResults / perPage )
        res.send({
            dati: authors,
            page,
            totalPages,
            totalResults,
        })
    } catch (error) {
        res.status(404).send({ message: "Authors not found" });
    } 
}

export const createAuthor = async (req, res) => {
    const author = new AuthorR(req.body);
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
        const author = await AuthorR.findById(id);
        res.status(200).send(author);
    } catch (error) {
        res.status(404).send({ message: "Author not found" });
    }   
}


export const editAuthor = async (req, res) => {
    const { id } = req.params;
    try {
        const author = await AuthorR.findByIdAndUpdate(id, req.body , {new: true});
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
        if (await AuthorR.exists({_id: id})){
            await AuthorR.findByIdAndDelete(id);
            res.status(200).send({message: `Author ${id} has been deleted`});
        }else{
            res.status(400).send({ message: `Author ${id} not found` });
        }
    } catch (error) {
        res.status(400).send({ message: `Author ${id} not found` });
    }
}

export const patchAuthor = async (req, res) => {
    const { authorId } = req.params;
    try {
        const author = await AuthorR.findByIdAndUpdate(authorId, {avatar: req.file.path}, {new: true});
        await author.save();
        res.status(200).send(author);
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
}