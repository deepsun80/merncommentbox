const express  = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const router = express.Router();

const port = process.env.PORT || 3100;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Import DB schema
const Comment = require('./model/comments');

//CORS settings
const corsOptions = {
    "origin": "*",
    "methods": "GET, HEAD, PUT, PATCH, POST, DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
};
// To prevent errors from Cross Origin Resource Sharing
app.use(cors());
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    //and remove cacheing so we get the most recent comments
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

// Mongoose DB connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/api', { useMongoClient: true });

// API
// Set the route path
router.get('/', (req, res) => {
    res.json({ message: 'API Initialized'});
});

// API calls to router
router.route('/comments/:_id')    
    .delete((req, res) => {
        const _id = req.params;
        Comment.remove({ _id }, (err, comment) => {
            if (err) throw err;
            res.json({ message: 'Comment has been deleted' });
        });
    });

router.route('/comments')
    .get((req, res) => {
        Comment.find({}, (err, comments) => {
           if (err) throw err;
           res.json(comments); 
        });
    })
    .post((req, res) => {
        const { author, text } = req.body;
        const comment = new Comment({author, text});
        comment.save((err) => {
            if (err) throw err;
            res.json({ message: 'Comment successfully added'});
        });
    });

//Use our router configuration when we call /api
app.use('/api', router);

// Start the server and listen
app.listen(port, () => {
    console.log(`api running on port ${port}`);
});
