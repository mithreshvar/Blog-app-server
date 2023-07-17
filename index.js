require('dotenv').config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const userRoutes = require('./routes/user');
const blogRoutes = require('./routes/blog');
const commentRoutes = require('./routes/comment');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT;

// middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}))


// // Pick up React index.html file
// app.use(
//     express.static(path.join(__dirname, "./client/build"))
// );


// routes
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})
app.use('/api/user', userRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/comment', commentRoutes);

// // Catch all requests that don't match any route
// app.get("*", (req, res) => {
//     res.sendFile(
//         path.join(__dirname, "./client/build/index.html")
//     );
// });


// connect to db
mongoose.connect(process.env.MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
})
    .then(() => {
        // listen to port
        app.listen(port, () => {
            console.log("connected to database && Server running on port: ", port);
        });
    })
    .catch((error) => {
        console.log(error);
    })
