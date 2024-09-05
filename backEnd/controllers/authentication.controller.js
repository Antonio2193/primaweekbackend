import AuthorR from "../models/authorRegSchema.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";


export const register = async (req, res) => {
    //verificare che la mail non sia già registrata
    const author = await AuthorR.findOne({ email: req.body.email });
    if (author) return res.status(500).send("Email already exists");
    //se non è usata allora crea un nuovo utente
    const newAuthor = new AuthorR({
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        password: await bcrypt.hash(req.body.password, 10),
        avatar: req.file ? req.file.path : "https://picsum.photos/40/",
        verifiedAt: new Date()
    });

    const authorCreated = await newAuthor.save()
    res.send(authorCreated);

}


export const login = async (req, res) => {
    //cercare la mail nel db
    const author = await AuthorR.findOne({ email: req.body.email }).select("+password"); //la select mi fa prendere la password dal db
    // se non trova la mail 
    if (!author) return res.status(401).send("Invalid email or password");
    // se trova la mail allora controllo la password
    if (!(await bcrypt.compare(req.body.password, author.password))) {
        return res.status(401).send("Invalid email or password");
    }

    // se la password coincide allora genero il jwt e lo restituisco
    jwt.sign(
        { authorId: author.id, },
        process.env.JWT_SECRET,
        { expiresIn: "1h" },
        (err, jwtToken) => {
            if (err) return res.status(500).send();
            return res.send({
                token: jwtToken
            });
        })

}

export const me = async(req,res) =>{
    return res.send(req.loggedAuthor)
}
