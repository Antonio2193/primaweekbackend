import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';
import authorRoute from './routes/authorRoute.js';
import postRoute from './routes/postRoute.js';
import cors from 'cors';

const server = express();
const port = process.env.PORT || 5000;

await mongoose
    .connect(process.env.MONGODB_CONNECTION)
    .then(() => {
        console.log('Connected to MongoDB')
    })
    .catch((err) => {
        console.log(err)
    }) 


server.use(express.json()) // middleware che ci dice che tutti i body che inviama sono in json
server.use(cors()) // per connettere BE al FE
server.use('/api/v1/authors', authorRoute)
server.use('/api/v1/blogPosts', postRoute)



server.listen(port, () => {
    console.log(`Server running on port ${port}`)
})
