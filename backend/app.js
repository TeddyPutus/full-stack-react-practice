const express = require('express');
const cors = require('cors');
const postRouter = require('./routes/postRouter.js');
const db = require('./db/db.js');
const app = express();

app.use(express.urlencoded({ extended: false }));;
app.use(cors());
app.use(express.json());
app.use('/posts', postRouter);


app.listen(5001, async () => {
    try {
        console.log("Server listening on post 5001");
    } catch (error) {
        console.log(error);
    }
})
