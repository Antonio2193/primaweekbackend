import GoogleStrategy from 'passport-google-oauth20';
import AuthorR from '../models/authorRegSchema.js';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

const googleStrategy = new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK
}, async function (accessToken, refreshToken, profile, passportNext) {
    const {given_name: name, family_name: surname, email, sub: googleId ,picture: avatar} = profile._json;
    let author = await AuthorR.findOne({ googleId });
    if (!author){
        const newAuthor = new AuthorR({
            googleId,
            name,
            surname,
            email,
            avatar
        })
        author = await newAuthor.save();
    }
    jwt.sign({ authorId: author.id }, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, jwtToken) => {
        if (err) return res.status(500).send();
        return passportNext(null, {jwtToken});
    })
})

export default googleStrategy
    