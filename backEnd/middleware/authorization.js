import jwt from "jsonwebtoken";
import AuthorR from "../models/authorRegSchema.js";

export default (req, res, next) => {
    //Verificare se c'è l'header Authorization e se è di tipo Bearer 
    if(!req.headers.authorization) return res.status(401).send("Unauthorized");
    const parts = req.headers.authorization.split(' ');
    if(parts.lenght !== 2) return res.status(401).send("Unauthorized");
    if(parts[0] !== 'Bearer') return res.status(401).send("Unauthorized");

    const jwtToken = parts[1];
    //verifica la firma del token
    jwt.verify(jwtToken, process.env.JWT_SECRET, (err, payload) => {
        //errore: probabilmente il token è stato manomesso o scaduto
        if(err) return res.status(401).send("Unauthorized");
        //recuperiamo i dati dell'utente dal database escludendo il campo password
        const author = AuthorR.findById(payload.authorId).select('-password');
        //l'utente potrebbe aver eliminato l'account nel frattempo quindi non esistere più nel db
        if(!author) return res.status(401).send("Unauthorized");

        //aggiungiamo i dati dell'utente loggato all'oggetto req in maniera da
        //essere utilizzabili dai middlwares successivi in caso ne avessero bisogno
        req.loggedAuthor = author;
        console.log(author);

        //continuare l'esecuzione del middleware successivo
        next();
    })
}